import { test, expect, type Page } from '@playwright/test'

// Le bandeau de consentement est scopé via son role="region" / aria-label.
// Le bandeau passe au-dessus du widget chat flottant (z-[10000] > z-[9999]),
// donc « Accepter » / « Refuser » sont cliquables en clic normal, sans
// neutraliser le widget. Comportement testé : visibilité, écriture
// localStorage, persistance après reload.
async function gotoHome(page: Page) {
  await page.goto('/')
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

    await page.reload()
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

    await page.reload()
    await expect(
      banner(page).getByRole('button', { name: /refuser/i })
    ).toBeHidden()
  })
})

test.describe('Retrait du consentement', () => {
  test('« Gérer mes cookies » rouvre le choix après une acceptation', async ({
    page,
  }) => {
    await gotoHome(page)
    await banner(page).getByRole('button', { name: /accepter/i }).click()
    await expect(banner(page)).toBeHidden()

    // Le lien vit en pied de page : c'est le seul point de retrait offert au
    // visiteur, il doit rester atteignable sans passer par une page légale.
    await page
      .getByRole('button', { name: /gérer mes cookies/i })
      .click()

    await expect(banner(page)).toBeVisible()

    // Le retrait doit valoir refus tant qu'aucun nouveau choix n'est fait :
    // un choix mémorisé qui survivrait rendrait le bouton décoratif.
    const choice = await page.evaluate(() =>
      localStorage.getItem('e2i-cookie-consent')
    )
    expect(choice).toBeNull()
  })

  test('un nouveau refus après retrait est bien mémorisé', async ({ page }) => {
    await gotoHome(page)
    await banner(page).getByRole('button', { name: /accepter/i }).click()
    await page.getByRole('button', { name: /gérer mes cookies/i }).click()

    await banner(page).getByRole('button', { name: /refuser/i }).click()
    await expect(banner(page)).toBeHidden()

    const choice = await page.evaluate(() =>
      localStorage.getItem('e2i-cookie-consent')
    )
    expect(choice).toBe('declined')
  })
})
