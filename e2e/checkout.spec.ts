import { test, expect } from '@playwright/test'

/**
 * F8.5 — Smoke da listagem pública /academy/turmas e gate do /academy/checkout/[slug].
 *
 * Para o checkout do produto Curso Online, ver curso-online-checkout.spec.ts.
 */

test.describe('Checkout — /academy/turmas (lista pública)', () => {
  test('/academy/turmas carrega sem erros de servidor', async ({ page }) => {
    const response = await page.goto('/academy/turmas')
    expect(response?.status()).not.toBe(500)
    expect(page.url()).toContain('/academy/turmas')
  })

  test('/academy/turmas exibe heading "Escolha sua turma"', async ({ page }) => {
    await page.goto('/academy/turmas')
    await expect(
      page.getByRole('heading', { name: /Escolha sua turma/i })
    ).toBeVisible({ timeout: 10000 })
  })
})

test.describe('Checkout — /academy/checkout/[slug] gate', () => {
  test('checkout sem login redireciona para /academy/login', async ({ page }) => {
    await page.goto('/academy/checkout/curso-online-padrao')
    await page.waitForURL(/\/academy\/login/, { timeout: 20000 })
    expect(page.url()).toContain('/academy/login')
  })

  test('URL de login mantém ?next= apontando para o checkout', async ({ page }) => {
    await page.goto('/academy/checkout/curso-online-padrao')
    await page.waitForURL(/\/academy\/login/, { timeout: 20000 })
    const url = new URL(page.url())
    expect(url.searchParams.get('next')).toBe('/academy/checkout/curso-online-padrao')
  })
})
