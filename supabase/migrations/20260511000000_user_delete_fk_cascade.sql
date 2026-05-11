-- F13.1 — Fix FKs to allow hard delete of auth.users without blocking
-- profiles is linked to auth.users via trigger; deleting from auth.users cascades to profiles.
-- These tables reference profiles(id) without ON DELETE — add CASCADE or SET NULL as appropriate.

-- payments: keep records for fiscal compliance, nullify user reference
alter table public.payments
  drop constraint payments_user_id_fkey,
  add constraint payments_user_id_fkey
    foreign key (user_id) references public.profiles(id) on delete set null;

-- certificates: cascade delete with user account
alter table public.certificates
  drop constraint certificates_user_id_fkey,
  add constraint certificates_user_id_fkey
    foreign key (user_id) references public.profiles(id) on delete cascade;

-- comments: cascade delete with user account
alter table public.comments
  drop constraint comments_author_id_fkey,
  add constraint comments_author_id_fkey
    foreign key (author_id) references public.profiles(id) on delete cascade;

-- forum_threads: cascade delete with user account
alter table public.forum_threads
  drop constraint forum_threads_author_id_fkey,
  add constraint forum_threads_author_id_fkey
    foreign key (author_id) references public.profiles(id) on delete cascade;

-- forum_replies: cascade delete with user account
alter table public.forum_replies
  drop constraint forum_replies_author_id_fkey,
  add constraint forum_replies_author_id_fkey
    foreign key (author_id) references public.profiles(id) on delete cascade;

-- votes: cascade delete with user account
alter table public.votes
  drop constraint votes_user_id_fkey,
  add constraint votes_user_id_fkey
    foreign key (user_id) references public.profiles(id) on delete cascade;
