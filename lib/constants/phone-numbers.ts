export interface TerritoryPhone {
  territory: string
  number: string
  tel: string
}

export const TERRITORY_PHONES: TerritoryPhone[] = [
  { territory: 'Guyane', number: '05 94 96 35 00', tel: '+594594963500' },
  { territory: 'Guadeloupe', number: '05 90 17 35 00', tel: '+590590173500' },
  { territory: 'Martinique', number: '05 96 31 35 00', tel: '+596596313500' },
  { territory: 'La Reunion', number: '02 63 08 55 00', tel: '+262263085500' },
  { territory: 'France', number: '01 89 56 05 00', tel: '+33189560500' },
]
