import { TERRITORY_PHONES, TerritoryPhone } from '@/lib/constants/phone-numbers'

describe('TERRITORY_PHONES', () => {
  test('contains entries for Guyane, Guadeloupe, Martinique, Reunion, France', () => {
    const territories = TERRITORY_PHONES.map((p: TerritoryPhone) => p.territory)

    expect(territories).toContain('Guyane')
    expect(territories).toContain('Guadeloupe')
    expect(territories).toContain('Martinique')
    expect(territories).toContain('La Reunion')
    expect(territories).toContain('France')
    expect(TERRITORY_PHONES).toHaveLength(5)
  })

  test('each entry has territory, number, and tel fields', () => {
    for (const phone of TERRITORY_PHONES) {
      expect(phone.territory).toBeDefined()
      expect(phone.number).toBeDefined()
      expect(phone.tel).toBeDefined()
      expect(phone.tel.startsWith('+')).toBe(true)
    }
  })
})
