import { test, expect } from '@playwright/test'

/**
 * F8.5 — Auth: estrutura básica das páginas /academy/login, /academy/cadastro,
 * /academy/recuperar-senha. Login com credenciais reais é gated por .env.test.
 */

const hasEnvTest = !!(
  process.env.E2E_TEST_EMAIL && process.env.E2E_TEST_PASSWORD
)

test.describe('Auth — login page structure', () => {
  test('/academy/login renderiza form', async ({ page }) => {
    await page.goto('/academy/login')
    await expect(page.getByRole('heading', { name: 'Entrar' })).toBeVisible()
    await expect(page.getByLabel('Email')).toBeVisible()
    await expect(page.getByLabel('Senha')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible()
  })

  test('/academy/login tem link para recuperar senha', async ({ page }) => {
    await page.goto('/academy/login')
    await expect(page.getByRole('link', { name: 'Esqueci minha senha' })).toBeVisible()
  })

  test('/academy/login com credenciais inválidas exibe erro', async ({ page }) => {
    await page.goto('/academy/login')
    await page.getByLabel('Email').fill('naoexiste@exemplo.com')
    await page.getByLabel('Senha').fill('senhaerrada123')
    await page.getByRole('button', { name: 'Entrar' }).click()
    await expect(page.getByText('Email ou senha incorretos.')).toBeVisible({ timeout: 8000 })
  })

  test('/academy/cadastro renderiza form', async ({ page }) => {
    await page.goto('/academy/cadastro')
    await expect(page.locator('form')).toBeVisible()
  })

  test('/academy/recuperar-senha renderiza input de email', async ({ page }) => {
    await page.goto('/academy/recuperar-senha')
    await expect(page.locator('input[type="email"]')).toBeVisible()
  })
})

test.describe('Auth — login com credenciais reais', () => {
  test.skip(!hasEnvTest, 'requires .env.test with E2E_TEST_EMAIL and E2E_TEST_PASSWORD')

  test('login válido redireciona para /academy/aluno (STUDENT) ou /academy/admin (ADMIN)', async ({ page }) => {
    await page.goto('/academy/login')
    await page.getByLabel('Email').fill(process.env.E2E_TEST_EMAIL!)
    await page.getByLabel('Senha').fill(process.env.E2E_TEST_PASSWORD!)
    await page.getByRole('button', { name: 'Entrar' }).click()
    await page.waitForURL(/\/academy\/(aluno|admin|dashboard)/, { timeout: 10000 })
    expect(page.url()).toMatch(/\/academy\/(aluno|admin|dashboard)/)
  })
})
