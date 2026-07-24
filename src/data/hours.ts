export const hourCategories = [
  'driverRegistration',
  'underwork',
  'paving',
  'repairs',
  'mvProjects',
] as const

export type HourCategory = (typeof hourCategories)[number]

export const driverJobs = [
  'capitalHaul',
  'quarryRun',
  'siteDelivery',
  'plantFeed',
  'nightShift',
] as const

export type DriverJob = (typeof driverJobs)[number]

export const driverOrigins = [
  'esjaQuarry',
  'plantYard',
  'kopavogurSite',
  'airsideApron',
  'ringRoadDump',
] as const

export type DriverOrigin = (typeof driverOrigins)[number]

export const driverProducts = [
  'binder',
  'aggregate',
  'asphaltMix',
  'millings',
  'fill',
] as const

export type DriverProduct = (typeof driverProducts)[number]

export type DriverDetails = {
  job: DriverJob
  equipmentId: string
  origin: DriverOrigin
  startOdometerKm: number
  product: DriverProduct
  comments: string
}

export type HourEntry = {
  id: string
  serial: string
  description: string
  category: HourCategory
  hours: number
  date: string
  submittedBy: string
  driverDetails?: DriverDetails
}

export const initialHourEntries: HourEntry[] = [
  {
    id: 'hr1',
    serial: 'TIM-01',
    description: 'Material haul to capital area sites',
    category: 'driverRegistration',
    hours: 8,
    date: '2026-07-20',
    submittedBy: 'Björn Halldórsson',
    driverDetails: {
      job: 'capitalHaul',
      equipmentId: 'eq-e1',
      origin: 'esjaQuarry',
      startOdometerKm: 124_580,
      product: 'aggregate',
      comments: 'Morning run to capital sites',
    },
  },
  {
    id: 'hr2',
    serial: 'TIM-02',
    description: 'Base preparation on Kópavogur stretch',
    category: 'underwork',
    hours: 7.5,
    date: '2026-07-21',
    submittedBy: 'Ólafur Sigurðsson',
  },
  {
    id: 'hr3',
    serial: 'TIM-03',
    description: 'Evening paving crew on Ring Road section',
    category: 'paving',
    hours: 9,
    date: '2026-07-21',
    submittedBy: 'Guðrún Pálsdóttir',
  },
  {
    id: 'hr4',
    serial: 'TIM-04',
    description: 'Pavers hydraulic repair',
    category: 'repairs',
    hours: 4,
    date: '2026-07-22',
    submittedBy: 'Ásta Ragnarsdóttir',
  },
  {
    id: 'hr5',
    serial: 'TIM-05',
    description: 'MV project coordination on site',
    category: 'mvProjects',
    hours: 6,
    date: '2026-07-22',
    submittedBy: 'Margrét Elíasdóttir',
  },
]

export function nextHourSerial(entries: HourEntry[]) {
  const next = entries.length + 1
  return `TIM-${String(next).padStart(2, '0')}`
}
