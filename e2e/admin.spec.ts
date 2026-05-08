import { test, expect } from '@playwright/test'

/**
 * F8.5 — Proteção de rotas admin (sweep adicional ao academy-admin-gate.spec.ts).
 *
 * Cobre as sub-rotas admin com checagem rápida de redirect. O gate completo
 * (anônimo/STUDENT/ADMIN) está em academy-admin-gate.spec.ts.
 */

test.describe('Admin — proteção de sub-rotas (anônimo)', () => {
  for (const path of [
    '/academy/admin',
    '/academy/admin/turmas',
    '/academy/admin/usuarios',
    '/academy/admin/pagamentos',
    '/academy/admin/moderacao',
  ]) {
    test(`${path} sem login redireciona para /academy/login`, async ({ page }) => {
      await page.goto(path)
      await page.waitForURL(/\/academy\/login/, { timeout: 8000 })
      expect(page.url()).toContain('/academy/login')
    })
  }
})

test.describe('Admin — página /academy/403', () => {
  test('/academy/403 renderiza sem 500', async ({ page }) => {
    const response = await page.goto('/academy/403')
    expect(response?.status()).not.toBe(500)
    await expect(page.getByText('403')).toBeVisible()
  })

  test('/academy/403 tem link de retorno ao dashboard', async ({ page }) => {
    await page.goto('/academy/403')
    const link = page.getByRole('link', { name: /dashboard/i })
    const href = await link.getAttribute('href')
    expect(href).toBe('/academy/dashboard')
  })
})
