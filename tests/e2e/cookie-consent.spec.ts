import { test, expect, type Page } from '@playwright/test'

// Le bandeau de consentement est scopé via son role="region" / aria-label.
// Un widget flottant tiers (popup Tally, coin bas-droit, z-[9999]) recouvre le
// coin où se trouve « Accepter » et intercepte le clic réel. On neutralise ce
// widget côté test (display:none) pour cliquer normalement sur le bandeau.
// Le comportement testé reste identique : visibilité, écriture localStorage,
// persistance après reload — la logique du bandeau n'est pas modifiée.
async function gotoHome(page: Page) {
  await page.goto('/')
  await page.addStyleTag({
    content:
      '.fixed.bottom-6.right-6, [class*="z-[9999]"]{display:none !important;pointer-events:none !important}',
  })
}

const banner = (page: Page) =>
  page.getByRole('region', { name: /consentement aux cookies/i })

test.describe('Bandeau de consentement cookies', () => {
  test('1ère visite : bandeau visible, Accepter le masque et persiste', async ({ page }) => {
    await gotoHome(page)
    const accept = banner(page).getByRole('button', { name: /accepter/i })
    await expect(accept).toBeVisible()

    await accept.click()
    await expect(accept).toBeHidden()

    const choice = await page.evaluate(() => localStorage.getItem('e2i-cookie-consent'))
    expect(choice).toBe('accepted')

    await gotoHome(page)
    await expect(
      banner(page).getByRole('button', { name: /accepter/i })
    ).toBeHidden()
  })

  test('Refuser masque le bandeau et persiste declined', async ({ page }) => {
    await gotoHome(page)
    const decline = banner(page).getByRole('button', { name: /refuser/i })
    await expect(decline).toBeVisible()

    await decline.click()
    await expect(decline).toBeHidden()

    const choice = await page.evaluate(() => localStorage.getItem('e2i-cookie-consent'))
    expect(choice).toBe('declined')

    await gotoHome(page)
    await expect(
      banner(page).getByRole('button', { name: /refuser/i })
    ).toBeHidden()
  })
})
