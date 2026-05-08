import { test, expect } from '@playwright/test'

/**
 * F8.5 — Acesso a aulas sem auth deve redirecionar para /academy/login.
 *
 * Path real: /academy/curso/[courseSlug]/aula/[lessonSlug]
 */

const DEMO_LESSON_URL = '/academy/curso/mentoria-claude-code-aiox/aula/abertura-desbloqueio'

test.describe('Lesson access — sem autenticação', () => {
  test('acesso anônimo redireciona para /academy/login', async ({ page }) => {
    await page.goto(DEMO_LESSON_URL)
    await page.waitForURL(/\/academy\/login/, { timeout: 8000 })
    expect(page.url()).toContain('/academy/login')
  })

  test('URL de login pode conter ?next= apontando para a aula', async ({ page }) => {
    await page.goto(DEMO_LESSON_URL)
    await page.waitForURL(/\/academy\/login/, { timeout: 8000 })
    const url = new URL(page.url())
    expect(url.pathname).toBe('/academy/login')
    const next = url.searchParams.get('next')
    if (next) {
      expect(next).toContain('/academy/curso/')
    }
  })

  test('/academy/login renderiza após redirect', async ({ page }) => {
    await page.goto(DEMO_LESSON_URL)
    await page.waitForURL(/\/academy\/login/, { timeout: 8000 })
    await expect(page.getByRole('heading', { name: 'Entrar' })).toBeVisible()
  })
})
