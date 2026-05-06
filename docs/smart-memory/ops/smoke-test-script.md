---
title: Smoke Test Script — pós-deploy
type: ops
updated: 2026-05-06
tags: [ops, smoke-test, launch]
---

# Smoke Test Script — pós-deploy

Executar manualmente por João após cada deploy em produção.
Usar dois navegadores: um anônimo (não autenticado) e um com conta de teste.

---

## 1. Site institucional (não deve ser afetado)

- [ ] `/` carrega normalmente (sem redirect para /login)
- [ ] `/mentoria` carrega — hero, facilitadores, CTA visíveis
- [ ] `/agentes` carrega — página de agentes renderiza
- [ ] `/open-source` carrega — grid de skills visível
- [ ] `/turmas` carrega sem login — grid de cohorts ou empty state

---

## 2. Fluxo de cadastro + login

- [ ] `/cadastro` — formulário renderiza (campos nome, email, senha)
- [ ] Criar conta com e-mail real de teste (ex: `teste+smoke@seudominio.com`)
- [ ] E-mail de boas-vindas recebido na caixa de entrada (WelcomeEmail)
- [ ] `/login` — entrar com a conta criada
- [ ] Redirect para `/dashboard` após login bem-sucedido
- [ ] Login com senha errada → mensagem "Email ou senha incorretos." aparece (sem 500)
- [ ] `/recuperar-senha` — formulário de e-mail renderiza sem erros

---

## 3. LP de turmas (pública)

- [ ] `/turmas` carrega sem login — heading "Turmas disponíveis" visível
- [ ] Grid de turmas **ou** empty state "Nenhuma turma aberta no momento." visível
- [ ] Se houver turmas: clicar "Matricular-se" (sem estar logado) → redirect `/login?next=/checkout/[slug]`
- [ ] Parâmetro `next` presente na URL de login após redirect

---

## 4. Área do aluno (requer conta com matrícula de teste)

> Usar conta de admin para criar matrícula de teste via `/admin/turmas/[id]` antes de executar estes checks.

- [ ] `/dashboard` carrega — progresso geral e próximas sessões visíveis
- [ ] `/meus-cursos` carrega — lista de turmas com progresso
- [ ] `/curso/[slug]` carrega — módulos e aulas listados
- [ ] `/curso/[slug]/aula/[lesson-slug]` — lição acessível abre **com** player de vídeo (VideoPlayer presente no DOM)
- [ ] Lição bloqueada (sem acesso) → LockedContent visível, **sem** iframe de vídeo no DOM
- [ ] Marcar aula como concluída → progresso na barra atualiza (sem recarregar)
- [ ] `/forum` — carrega, categorias visíveis
- [ ] `/agenda` — sessões ao vivo listadas (ou empty state se nenhuma agendada)
- [ ] `/certificados` — página carrega (lista vazia ou com certificado se 100% concluído)
- [ ] `/perfil` — dados do usuário carregam (nome, email, data de cadastro)
- [ ] `/perfil` tab Matrículas — turma de teste aparece com status "Ativa"
- [ ] `/perfil` tab Pagamentos — histórico de pagamento visível

---

## 5. Checkout (modo test Stripe)

> Usar cartão de teste Stripe: `4242 4242 4242 4242` | exp: qualquer futura | CVC: qualquer

- [ ] Logado: clicar "Matricular-se" em `/turmas` → redirect para Stripe Checkout (não para /login)
- [ ] URL começa com `https://checkout.stripe.com/...`
- [ ] Preencher dados com cartão `4242 4242 4242 4242`
- [ ] Checkout completa sem erro
- [ ] Redirect para `/checkout/sucesso` após pagamento
- [ ] Webhook recebido no Supabase → matrícula criada em `cohort_members`
- [ ] E-mail de confirmação recebido (PaymentApprovedEmail)
- [ ] `/perfil` → Matrículas → nova matrícula aparece com status "Ativa"

---

## 6. Área admin

- [ ] `/admin` com conta **aluno** (STUDENT) → redirect para `/403`
- [ ] `/403` renderiza "Acesso negado" e link "Voltar ao dashboard" (não 500)
- [ ] `/admin` com conta **admin** (ADMIN/MENTOR) → dashboard carrega com métricas
- [ ] `/admin/cursos` → lista de cursos carrega
- [ ] `/admin/turmas` → lista de turmas carrega com filtros de status
- [ ] `/admin/turmas/nova` → formulário de criação abre sem erros
- [ ] `/admin/usuarios` → tabela de usuários carrega
- [ ] `/admin/pagamentos` → tabela de pagamentos carrega
- [ ] `/admin/moderacao` → fila de comentários carrega

---

## 7. Infraestrutura e edge cases

- [ ] `POST /api/webhooks/stripe` sem header `Stripe-Signature` → responde `400` (não `500`)
- [ ] `/certificado/v/CODIGO_INVALIDO` → exibe "Certificado inválido ou não encontrado" (não exibe certificado "válido")
- [ ] `/certificado/v/CODIGO_REAL` (de certificado gerado no teste) → exibe dados corretos do aluno
- [ ] `/403` — página carrega corretamente
- [ ] Qualquer rota protegida sem sessão → redirect para `/login` (não 500)
- [ ] `/api/cron/daily` sem header `Authorization: Bearer CRON_SECRET` → responde `401`

---

## Notas pós-teste

**Data de execução:** ___________
**Executado por:** ___________
**Ambiente:** produção / staging

**Itens com falha:**
(listar aqui qualquer check que não passou)

**Observações:**
