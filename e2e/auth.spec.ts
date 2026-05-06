import { test, expect } from '@playwright/test'

// Tests that require a real Supabase connection need .env.test with valid credentials.
// Without it, the auth submission tests are skipped.
const hasEnvTest = !!(
  process.env.E2E_TEST_EMAIL && process.env.E2E_TEST_PASSWORD
)

test.describe('Auth — login page structure', () => {
  test('login page renders form', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByRole('heading', { name: 'Entrar na plataforma' })).toBeVisible()
    await expect(page.getByLabel('Email')).toBeVisible()
    await expect(page.getByLabel('Senha')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible()
  })

  test('login page has link to cadastro', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByRole('link', { name: 'Cadastre-se' })).toBeVisible()
  })

  test('login page has link to recuperar-senha', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByRole('link', { name: 'Esqueci minha senha' })).toBeVisible()
  })

  test('login with wrong credentials shows error message', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel('Email').fill('naoexiste@exemplo.com')
    await page.getByLabel('Senha').fill('senhaerrada123')
    await page.getByRole('button', { name: 'Entrar' }).click()
    await expect(page.getByText('Email ou senha incorretos.')).toBeVisible({ timeout: 8000 })
  })

  test('cadastro page renders', async ({ page }) => {
    await page.goto('/cadastro')
    // Deve ter pelo menos um campo de email ou formulário de cadastro
    await expect(page.locator('form')).toBeVisible()
  })

  test('recuperar-senha page renders email form', async ({ page }) => {
    await page.goto('/recuperar-senha')
    await expect(page.locator('input[type="email"]')).toBeVisible()
  })
})

test.describe('Auth — login com credenciais reais', () => {
  test.skip(!hasEnvTest, 'requires .env.test with E2E_TEST_EMAIL and E2E_TEST_PASSWORD')

  test('login com credenciais válidas redireciona para /dashboard', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel('Email').fill(process.env.E2E_TEST_EMAIL!)
    await page.getByLabel('Senha').fill(process.env.E2E_TEST_PASSWORD!)
    await page.getByRole('button', { name: 'Entrar' }).click()
    await page.waitForURL('**/dashboard', { timeout: 10000 })
    expect(page.url()).toContain('/dashboard')
  })
})
