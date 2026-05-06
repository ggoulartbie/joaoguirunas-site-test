import { test, expect } from '@playwright/test'

test.describe('Checkout — /turmas public page', () => {
  test('/turmas carrega sem erros de servidor', async ({ page }) => {
    await page.goto('/turmas')
    // Não deve ter erro 500
    expect(page.url()).toContain('/turmas')
    // Deve ter o heading principal
    await expect(
      page.getByRole('heading', { name: 'Turmas disponíveis' })
    ).toBeVisible({ timeout: 10000 })
  })

  test('/turmas exibe grid de turmas ou empty state', async ({ page }) => {
    await page.goto('/turmas')
    await page.waitForLoadState('networkidle')

    const hasCards = await page.locator('h2').count()
    const hasEmptyState = await page
      .getByText('Nenhuma turma aberta no momento.')
      .isVisible()
      .catch(() => false)

    // Deve ter ao menos uma das duas situações
    expect(hasCards > 0 || hasEmptyState).toBeTruthy()
  })

  test('clicar Matricular-se sem login redireciona para /login', async ({ page }) => {
    await page.goto('/turmas')
    await page.waitForLoadState('networkidle')

    const matricularBtn = page.getByRole('link', { name: 'Matricular-se' }).first()
    const exists = await matricularBtn.isVisible().catch(() => false)

    if (!exists) {
      // Sem turmas disponíveis — empty state é válido
      await expect(
        page.getByText('Nenhuma turma aberta no momento.')
      ).toBeVisible()
      return
    }

    // Verifica que o href aponta para /login?next=... antes de clicar
    const href = await matricularBtn.getAttribute('href')
    expect(href).toContain('/login')
    expect(href).toContain('next=')
  })

  test('/checkout/[slug] sem login redireciona para /login', async ({ page }) => {
    await page.goto('/checkout/mentoria-maio-2026')
    await page.waitForURL(/\/login/, { timeout: 8000 })
    expect(page.url()).toContain('/login')
  })
})
