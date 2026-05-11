---
name: Infra via CLI, nunca via dashboards
description: Em guias operacionais e ACs, sempre referenciar comandos CLI (vercel, supabase) para configurar env vars, ver logs e gerenciar infra. Nunca instruir "clique no dashboard Vercel".
type: feedback
---

Toda configuração de infra deve ser documentada via CLI, não via cliques em painel/dashboard. João prefere `vercel env add/ls/rm` e `supabase` CLI a clicar no dashboard Vercel.

**Why:** João (lead) instruiu em 2026-05-12 ao revisar o AC3 da F13.4 que referenciava "configurar em produção (Vercel)" como se fosse dashboard. Razões prováveis: (a) drift entre ambientes é menor com CLI versionada/scriptable; (b) conhecimento operacional fica em runbooks (`.md`), reproduzível; (c) dashboards mudam UI, comandos CLI são estáveis.

**How to apply:**
- Para env vars de produção: `vercel env add NOME production` (e `preview`/`development` quando aplicável). Listar com `vercel env ls production`. Remover com `vercel env rm`.
- Para env vars de dev local: instruir `.env.local` (gitignored).
- Para logs em produção: `vercel logs --follow` ou `vercel logs <deployment-url>`.
- Para Supabase: priorizar `supabase` CLI (migrations, secrets, functions deploy) sobre Studio quando possível.
- Exceção legítima: painel de terceiros sem CLI (ex.: configurar webhook URL no painel InfinitePay — não há CLI deles). Marcar explicitamente como exceção no guia.
- Nunca escrever "vá ao dashboard Vercel" ou "clique em Settings → Environment Variables" nos guias.
