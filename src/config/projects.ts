export const projectAreas = [
  {
    id: 'rekstrarsvid',
    to: '/verkefni/rekstrarsvid',
    titleKey: 'nav.rekstrarsvid',
    descriptionKey: 'pages.verkefni.areas.rekstrarsvid.description',
  },
  {
    id: 'flugusvid',
    to: '/verkefni/flugusvid',
    titleKey: 'nav.flugusvid',
    descriptionKey: 'pages.verkefni.areas.flugusvid.description',
  },
  {
    id: 'esjusvid',
    to: '/verkefni/esjusvid',
    titleKey: 'nav.esjusvid',
    descriptionKey: 'pages.verkefni.areas.esjusvid.description',
  },
] as const

export type ProjectAreaId = (typeof projectAreas)[number]['id']
