import { test, expect } from '@playwright/test'

test.describe('Admin — proteção de rotas', () => {
  test('/admin sem login redireciona para /login', async ({ page }) => {
    await page.goto('/admin')
    await page.waitForURL(/\/login/, { timeout: 8000 })
    expect(page.url()).toContain('/login')
  })

  test('/admin/turmas sem login redireciona para /login', async ({ page }) => {
    await page.goto('/admin/turmas')
    await page.waitForURL(/\/login/, { timeout: 8000 })
    expect(page.url()).toContain('/login')
  })

  test('/admin/usuarios sem login redireciona para /login', async ({ page }) => {
    await page.goto('/admin/usuarios')
    await page.waitForURL(/\/login/, { timeout: 8000 })
    expect(page.url()).toContain('/login')
  })

  test('/admin/pagamentos sem login redireciona para /login', async ({ page }) => {
    await page.goto('/admin/pagamentos')
    await page.waitForURL(/\/login/, { timeout: 8000 })
    expect(page.url()).toContain('/login')
  })

  test('/admin/moderacao sem login redireciona para /login', async ({ page }) => {
    await page.goto('/admin/moderacao')
    await page.waitForURL(/\/login/, { timeout: 8000 })
    expect(page.url()).toContain('/login')
  })
})

test.describe('Admin — 403 page', () => {
  test('/403 renderiza sem erros', async ({ page }) => {
    const response = await page.goto('/403')
    // Página deve renderizar (200 é aceitável — Next.js serve a page independente do status HTTP)
    expect(response?.status()).not.toBe(500)
    await expect(page.getByText('403')).toBeVisible()
    await expect(page.getByText('Acesso negado')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Voltar ao dashboard' })).toBeVisible()
  })

  test('/403 tem link para /dashboard', async ({ page }) => {
    await page.goto('/403')
    const link = page.getByRole('link', { name: 'Voltar ao dashboard' })
    const href = await link.getAttribute('href')
    expect(href).toBe('/dashboard')
  })
})

test.describe('Admin — student redirect', () => {
  // requires .env.test com E2E_STUDENT_EMAIL e E2E_STUDENT_PASSWORD
  test.skip(
    !(process.env.E2E_STUDENT_EMAIL && process.env.E2E_STUDENT_PASSWORD),
    'requires .env.test with E2E_STUDENT_EMAIL and E2E_STUDENT_PASSWORD'
  )

  test('/admin com usuário STUDENT redireciona para /403', async ({ page }) => {
    // Login como student
    await page.goto('/login')
    await page.getByLabel('Email').fill(process.env.E2E_STUDENT_EMAIL!)
    await page.getByLabel('Senha').fill(process.env.E2E_STUDENT_PASSWORD!)
    await page.getByRole('button', { name: 'Entrar' }).click()
    await page.waitForURL('**/dashboard', { timeout: 10000 })

    // Tentar acessar admin
    await page.goto('/admin')
    await page.waitForURL(/\/403/, { timeout: 8000 })
    expect(page.url()).toContain('/403')
  })
})
