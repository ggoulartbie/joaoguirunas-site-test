import { test, expect } from '@playwright/test'

/**
 * F9.3 — Smoke tests do gate ADMIN em /academy/admin/*
 *
 * Cenário 1: usuário anônimo → redireciona para /academy/login?next=/academy/admin
 * Cenário 2: usuário STUDENT logado → redireciona para /academy/403
 * Cenário 3: usuário ADMIN logado → acessa /academy/admin normalmente
 *
 * Cenários 2 e 3 requerem credenciais reais em .env.test.
 */

const hasStudentEnv = !!(process.env.E2E_STUDENT_EMAIL && process.env.E2E_STUDENT_PASSWORD)
const hasAdminEnv = !!(process.env.E2E_ADMIN_EMAIL && process.env.E2E_ADMIN_PASSWORD)

// ─── Cenário 1: anônimo ───────────────────────────────────────────────────────

test.describe('F9.3 AC1 — Acesso anônimo a /academy/admin', () => {
  test('redireciona para /academy/login', async ({ page }) => {
    await page.goto('/academy/admin')
    await page.waitForURL(/\/academy\/login/, { timeout: 8000 })
    expect(page.url()).toContain('/academy/login')
  })

  test('URL de login contém ?next=/academy/admin', async ({ page }) => {
    await page.goto('/academy/admin')
    await page.waitForURL(/\/academy\/login/, { timeout: 8000 })
    const url = new URL(page.url())
    expect(url.pathname).toBe('/academy/login')
    expect(url.searchParams.get('next')).toBe('/academy/admin')
  })

  test('sub-rota /academy/admin/turmas também redireciona anônimo para /academy/login', async ({ page }) => {
    await page.goto('/academy/admin/turmas')
    await page.waitForURL(/\/academy\/login/, { timeout: 8000 })
    expect(page.url()).toContain('/academy/login')
  })
})

// ─── Cenário 2: usuário STUDENT ───────────────────────────────────────────────

test.describe('F9.3 AC2 — Usuário STUDENT bloqueado em /academy/admin', () => {
  test.skip(!hasStudentEnv, 'requires .env.test: E2E_STUDENT_EMAIL e E2E_STUDENT_PASSWORD')

  test.beforeEach(async ({ page }) => {
    await page.goto('/academy/login')
    await page.getByLabel('Email').fill(process.env.E2E_STUDENT_EMAIL!)
    await page.getByLabel('Senha').fill(process.env.E2E_STUDENT_PASSWORD!)
    await page.getByRole('button', { name: 'Entrar' }).click()
    await page.waitForURL(/\/academy\/aluno/, { timeout: 10000 })
  })

  test('redireciona para /academy/403', async ({ page }) => {
    await page.goto('/academy/admin')
    await page.waitForURL(/\/academy\/403/, { timeout: 8000 })
    expect(page.url()).toContain('/academy/403')
  })

  test('página 403 renderiza com texto correto', async ({ page }) => {
    await page.goto('/academy/admin')
    await page.waitForURL(/\/academy\/403/, { timeout: 8000 })
    await expect(page.getByText('403')).toBeVisible()
    await expect(page.getByText('Acesso restrito')).toBeVisible()
  })

  test('página 403 tem link para /academy/dashboard', async ({ page }) => {
    await page.goto('/academy/admin')
    await page.waitForURL(/\/academy\/403/, { timeout: 8000 })
    const link = page.getByRole('link', { name: /dashboard/i })
    const href = await link.getAttribute('href')
    expect(href).toBe('/academy/dashboard')
  })

  test('sub-rota /academy/admin/usuarios também bloqueia STUDENT', async ({ page }) => {
    await page.goto('/academy/admin/usuarios')
    await page.waitForURL(/\/academy\/403/, { timeout: 8000 })
    expect(page.url()).toContain('/academy/403')
  })
})

// ─── Cenário 3: usuário ADMIN ─────────────────────────────────────────────────

test.describe('F9.3 AC3 — Usuário ADMIN acessa /academy/admin normalmente', () => {
  test.skip(!hasAdminEnv, 'requires .env.test: E2E_ADMIN_EMAIL e E2E_ADMIN_PASSWORD')

  test.beforeEach(async ({ page }) => {
    await page.goto('/academy/login')
    await page.getByLabel('Email').fill(process.env.E2E_ADMIN_EMAIL!)
    await page.getByLabel('Senha').fill(process.env.E2E_ADMIN_PASSWORD!)
    await page.getByRole('button', { name: 'Entrar' }).click()
    await page.waitForURL(/\/academy\/admin/, { timeout: 10000 })
  })

  test('acessa /academy/admin sem redirect', async ({ page }) => {
    await page.goto('/academy/admin')
    // Não deve redirecionar para login nem 403
    await page.waitForLoadState('networkidle')
    expect(page.url()).not.toContain('/academy/login')
    expect(page.url()).not.toContain('/academy/403')
    expect(page.url()).toContain('/academy/admin')
  })

  test('página admin retorna HTTP não-500', async ({ page }) => {
    const response = await page.goto('/academy/admin')
    expect(response?.status()).not.toBe(500)
  })
})
