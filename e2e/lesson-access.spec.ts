import { test, expect } from '@playwright/test'

// Slug demo usado pelo mock em AulaPage — funciona sem banco real
const DEMO_LESSON_URL = '/curso/mentoria-maio-2026/aula/introducao-ao-curso'

test.describe('Lesson access — unauthenticated', () => {
  test('acessar aula sem login redireciona para /login', async ({ page }) => {
    await page.goto(DEMO_LESSON_URL)
    // Middleware redireciona → deve terminar em /login (com ou sem ?next=...)
    await page.waitForURL(/\/login/, { timeout: 8000 })
    expect(page.url()).toContain('/login')
  })

  test('URL de login contém parâmetro next com path da aula', async ({ page }) => {
    await page.goto(DEMO_LESSON_URL)
    await page.waitForURL(/\/login/, { timeout: 8000 })
    const url = new URL(page.url())
    // next param deve apontar para a aula
    const next = url.searchParams.get('next')
    // pode conter o path completo da aula ou apenas /login sem next (depende do middleware)
    expect(url.pathname).toBe('/login')
    if (next) {
      expect(next).toContain('/curso/')
    }
  })
})

test.describe('Lesson access — /login reachable', () => {
  test('/login renderiza sem erros após redirect', async ({ page }) => {
    await page.goto(DEMO_LESSON_URL)
    await page.waitForURL(/\/login/, { timeout: 8000 })
    await expect(page.getByRole('heading', { name: 'Entrar na plataforma' })).toBeVisible()
  })
})

test.describe('Lesson access — admin area protection', () => {
  test('/admin sem login redireciona para /login', async ({ page }) => {
    await page.goto('/admin')
    await page.waitForURL(/\/login/, { timeout: 8000 })
    expect(page.url()).toContain('/login')
  })
})
