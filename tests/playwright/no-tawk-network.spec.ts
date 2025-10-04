import { test, expect } from '@playwright/test'

test('aucune requête réseau ne doit pointer vers tawk.to', async ({ page }) => {
  const tawkRequests: string[] = []

  page.on('request', (req) => {
    const url = req.url()
    if (url.includes('tawk.to')) {
      tawkRequests.push(url)
    }
  })

  await page.goto('/')

  // Attendre un peu que les scripts tiers tentent de se charger
  await page.waitForTimeout(1500)

  expect(tawkRequests, `Des requêtes Tawk.to ont été détectées: ${tawkRequests.join(', ')}`).toHaveLength(0)
})


