import { test, expect } from '@playwright/test'

/**
 * Story F8.5 — 4 testes críticos exigidos pelos AC2-AC5.
 *
 * Cada teste é gated por env vars específicas. Sem as credenciais de teste
 * configuradas em `.env.test`, o teste é skipped (não falha CI) mas a intenção
 * fica registrada como dívida explícita.
 *
 * Ver: docs/smart-memory/stories/backlog/F8.5-e2e-playwright-tests.md
 */

const hasStripeTestEnv = !!(
  process.env.E2E_TEST_EMAIL &&
  process.env.E2E_TEST_PASSWORD &&
  process.env.E2E_TEST_COHORT_SLUG &&
  process.env.STRIPE_TEST_MODE === 'true'
)

const hasBlockingTestEnv = !!(
  process.env.E2E_TEST_EMAIL &&
  process.env.E2E_TEST_PASSWORD &&
  process.env.E2E_LOCKED_LESSON_PATH
)

const hasWebhookTestEnv = !!(
  process.env.E2E_WEBHOOK_TEST_URL && process.env.E2E_WEBHOOK_TEST_SECRET
)

const hasCrossExtensionEnv = !!(
  process.env.E2E_TEST_EMAIL &&
  process.env.E2E_TEST_PASSWORD &&
  process.env.E2E_SOURCE_COHORT_SLUG &&
  process.env.E2E_TARGET_COHORT_SLUG
)

test.describe('F8.5 AC2 — Compra Stripe modo test → cohort ativa → aula → progresso', () => {
  test.skip(!hasStripeTestEnv, 'requires .env.test: E2E_TEST_EMAIL, E2E_TEST_PASSWORD, E2E_TEST_COHORT_SLUG, STRIPE_TEST_MODE=true')

  test('aluno completa fluxo signup → checkout → aula → progresso', async ({ page }) => {
    // 1. Login com conta de teste
    await page.goto('/login')
    await page.getByLabel('Email').fill(process.env.E2E_TEST_EMAIL!)
    await page.getByLabel('Senha').fill(process.env.E2E_TEST_PASSWORD!)
    await page.getByRole('button', { name: 'Entrar' }).click()
    await page.waitForURL('**/dashboard', { timeout: 10000 })

    // 2. Acessa /turmas e clica matricular
    await page.goto(`/turmas`)
    await page.getByRole('link', { name: /Matricular-se/i }).first().click()

    // 3. Stripe Checkout abre — preenche cartão de teste 4242
    await page.waitForURL(/checkout\.stripe\.com/, { timeout: 15000 })
    await page.getByLabel('Card number').fill('4242 4242 4242 4242')
    await page.getByLabel('Expiration').fill('12 / 30')
    await page.getByLabel('CVC').fill('123')
    await page.getByRole('button', { name: /Pay/i }).click()

    // 4. Redirect /checkout/sucesso
    await page.waitForURL(/checkout\/sucesso/, { timeout: 30000 })

    // 5. Acessa /dashboard, cohort ativa visível
    await page.goto('/dashboard')
    await expect(page.getByText(/Próximas sessões|Meus cursos/i)).toBeVisible()

    // 6. Acessa lesson, VideoPlayer carrega
    await page.goto(`/curso/${process.env.E2E_TEST_COURSE_SLUG}/aula/${process.env.E2E_TEST_LESSON_SLUG}`)
    await expect(page.locator('iframe[src*="vimeo"]')).toBeVisible({ timeout: 10000 })

    // 7. Progresso salva e retoma ao recarregar
    await page.waitForTimeout(5000)
    await page.reload()
    await expect(page.getByText(/Continuar|Retomar|continuar de onde parou/i)).toBeVisible({ timeout: 5000 })
  })
})

test.describe('F8.5 AC3 — Bloqueio: LockedContent + sem video_id no DOM', () => {
  test.skip(!hasBlockingTestEnv, 'requires .env.test: E2E_TEST_EMAIL, E2E_TEST_PASSWORD, E2E_LOCKED_LESSON_PATH')

  test('aluno em cohort A tenta acessar aula da cohort B → LockedContent sem video_id', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel('Email').fill(process.env.E2E_TEST_EMAIL!)
    await page.getByLabel('Senha').fill(process.env.E2E_TEST_PASSWORD!)
    await page.getByRole('button', { name: 'Entrar' }).click()
    await page.waitForURL('**/dashboard', { timeout: 10000 })

    await page.goto(process.env.E2E_LOCKED_LESSON_PATH!)

    // LockedContent visível
    await expect(page.getByText(/conteúdo bloqueado|você não tem acesso|matricule-se/i)).toBeVisible({ timeout: 8000 })

    // Critério vital de segurança: video_id NÃO no DOM
    const html = await page.content()
    expect(html).not.toMatch(/vimeo\.com\/video\/\d+/)
    expect(html).not.toMatch(/data-video-id=["'][^"']+["']/)

    // CTA visível
    await expect(page.getByRole('link', { name: /matricular|comprar|inscrever/i })).toBeVisible()
  })
})

test.describe('F8.5 AC4 — Webhook Stripe idempotência (2x evento → 1 payment)', () => {
  test.skip(!hasWebhookTestEnv, 'requires .env.test: E2E_WEBHOOK_TEST_URL, E2E_WEBHOOK_TEST_SECRET (Stripe CLI ou mock)')

  test('disparar checkout.session.completed 2x cria apenas 1 payment + 1 cohort_member', async () => {
    // Implementar com Stripe CLI (`stripe trigger checkout.session.completed`) ou
    // mock fetch direto ao endpoint /api/webhooks/stripe com signature válida.
    // Verificação SQL: count(payments WHERE stripe_session_id=X) == 1 ;
    //                  count(cohort_members WHERE user_id=Y, cohort_id=Z) == 1
    test.fail(true, 'TODO: implementar disparo duplicado + assert SQL via supabaseAdmin')
  })
})

test.describe('F8.5 AC5 — Cross-extension: days_granted aplica em cohort target', () => {
  test.skip(!hasCrossExtensionEnv, 'requires .env.test: E2E_TEST_EMAIL, E2E_TEST_PASSWORD, E2E_SOURCE_COHORT_SLUG, E2E_TARGET_COHORT_SLUG')

  test('aluno com membership em mentoria + compra online → mentoria estendida em N dias', async () => {
    // 1. Setup: aluno tem cohort_member ACTIVE em E2E_TARGET_COHORT_SLUG (mentoria)
    //    com expires_at conhecido (capturar via API/SQL antes do teste)
    // 2. Aluno compra E2E_SOURCE_COHORT_SLUG (online) → fluxo completo Stripe
    // 3. Webhook processa cross_extension → cohort_members.expires_at da mentoria
    //    é estendido em N dias (cohort_cross_extensions.days_granted)
    // 4. Assert via API GET /api/admin/users/[id]/memberships ou query Supabase direta
    test.fail(true, 'TODO: implementar setup + compra + assert expires_at +days_granted')
  })
})
