export type OwnershipStatus =
  | 'decided'
  | 'needsDecision'
  | 'conflict'
  | 'doubleEntry'
  | 'beingBuilt'

export type OwnershipStat = {
  id: string
  value: number
  labelKey: string
  /** Optional percent label shown under the value (e.g. decided). */
  percent?: number
}

export type OwnershipRow = {
  id: string
  objectKey: string
  areaKey: string
  owner: string | null
  displayedIn: string | null
  syncKey: string | null
  responsible: string
  status: OwnershipStatus
}

export const ownershipMeta = {
  subtitleKey: 'dataOwnership.subtitle',
} as const

export const ownershipStats: OwnershipStat[] = [
  { id: 'objects', value: 42, labelKey: 'dataOwnership.stats.objects' },
  {
    id: 'decided',
    value: 26,
    labelKey: 'dataOwnership.stats.decided',
    percent: 61.9,
  },
  {
    id: 'needsDecision',
    value: 10,
    labelKey: 'dataOwnership.stats.needsDecision',
  },
  { id: 'conflicts', value: 6, labelKey: 'dataOwnership.stats.conflicts' },
]

export const ownershipRows: OwnershipRow[] = [
  {
    id: 'own-1',
    objectKey: 'dataOwnership.objects.workRequest',
    areaKey: 'dataOwnership.areas.v7SiteOps',
    owner: null,
    displayedIn: null,
    syncKey: null,
    responsible: 'Þór Sigurðsson',
    status: 'conflict',
  },
  {
    id: 'own-2',
    objectKey: 'dataOwnership.objects.equipmentRegister',
    areaKey: 'dataOwnership.areas.v12Equipment',
    owner: null,
    displayedIn: null,
    syncKey: null,
    responsible: 'Þór Sigurðsson',
    status: 'conflict',
  },
  {
    id: 'own-3',
    objectKey: 'dataOwnership.objects.deviationsReports',
    areaKey: 'dataOwnership.areas.v9Hatch',
    owner: null,
    displayedIn: null,
    syncKey: null,
    responsible: 'Vilhjálmur',
    status: 'doubleEntry',
  },
  {
    id: 'own-4',
    objectKey: 'dataOwnership.objects.workingTime',
    areaKey: 'dataOwnership.areas.v1Registration',
    owner: 'bik.is',
    displayedIn: 'SharePoint',
    syncKey: 'dataOwnership.sync.dashboard15min',
    responsible: 'Muhammad',
    status: 'decided',
  },
  {
    id: 'own-5',
    objectKey: 'dataOwnership.objects.newsHr',
    areaKey: 'dataOwnership.areas.people',
    owner: 'SharePoint',
    displayedIn: null,
    syncKey: 'dataOwnership.sync.none',
    responsible: 'Vilhjálmur',
    status: 'decided',
  },
  {
    id: 'own-6',
    objectKey: 'dataOwnership.objects.qualityMeasurements',
    areaKey: 'dataOwnership.areas.v7v8Quality',
    owner: 'bik.is',
    displayedIn: 'SharePoint',
    syncKey: 'dataOwnership.sync.apiList',
    responsible: 'Muhammad',
    status: 'beingBuilt',
  },
  {
    id: 'own-7',
    objectKey: 'dataOwnership.objects.accessControl',
    areaKey: 'dataOwnership.areas.v5Security',
    owner: null,
    displayedIn: null,
    syncKey: null,
    responsible: 'Vilhjálmur',
    status: 'needsDecision',
  },
]
