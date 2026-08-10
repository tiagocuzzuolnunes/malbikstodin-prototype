export type MeasurementUnit = 'm' | 'm2' | 'pcs'

export type MeasurementTypeId =
  | 'asphalt'
  | 'subBase'
  | 'sawing'
  | 'milling'
  | 'manholes'
  | 'gullies'

export type MeasurementType = {
  id: MeasurementTypeId
  labelKey: string
  unit: MeasurementUnit
}

export type MeasurementJobOption = {
  id: string
  serial: string
  clientKey: string
}

export const measurementTypes: MeasurementType[] = [
  { id: 'asphalt', labelKey: 'siteMeasurements.types.asphalt', unit: 'm2' },
  { id: 'subBase', labelKey: 'siteMeasurements.types.subBase', unit: 'm2' },
  { id: 'sawing', labelKey: 'siteMeasurements.types.sawing', unit: 'm' },
  { id: 'milling', labelKey: 'siteMeasurements.types.milling', unit: 'm2' },
  { id: 'manholes', labelKey: 'siteMeasurements.types.manholes', unit: 'pcs' },
  { id: 'gullies', labelKey: 'siteMeasurements.types.gullies', unit: 'pcs' },
]

/** Active field jobs available for measurement entry. */
export const measurementJobs: MeasurementJobOption[] = [
  { id: 'jp-j1', serial: '26-0388', clientKey: 'jobPipeline.clients.vegagerdin' },
  { id: 'jp-j2', serial: '26-0392', clientKey: 'jobPipeline.clients.istak' },
  { id: 'jp-j4', serial: '26-0399', clientKey: 'jobPipeline.clients.hafnarfjordur' },
  { id: 'jp-j6', serial: '26-0407', clientKey: 'jobPipeline.clients.reykjavik' },
  { id: 'jp-j8', serial: '26-0415', clientKey: 'jobPipeline.clients.mosfellsbaer' },
  { id: 'jp-s2', serial: '26-0366', clientKey: 'jobPipeline.clients.reykjavik' },
  { id: 'jp-s4', serial: '26-0374', clientKey: 'jobPipeline.clients.hafnarfjordur' },
  { id: 'jp-s6', serial: '26-0381', clientKey: 'jobPipeline.clients.veitur' },
]

export type SiteMeasurementsView = 'register' | 'measurements'

export function parseSiteMeasurementsView(
  value: string | null,
): SiteMeasurementsView {
  return value === 'measurements' ? 'measurements' : 'register'
}

export type MeasurementRegistrationStatus =
  | 'sent'
  | 'reviewed'
  | 'needsReview'
  | 'awaitingFix'

export type MeasurementRegistration = {
  id: string
  jobId: string
  typeId: MeasurementTypeId
  /** Canonical quantity; decimals only for m / m². */
  quantity: number
  note: string | null
  status: MeasurementRegistrationStatus
  /** ISO date (YYYY-MM-DD). */
  recordedAt: string
  recordedBy: string
}

/** Seeded field registrations shown in the measurements table. */
export const measurementRegistrations: MeasurementRegistration[] = [
  {
    id: 'sm-1',
    jobId: 'jp-j1',
    typeId: 'asphalt',
    quantity: 1240.5,
    note: null,
    status: 'sent',
    recordedAt: '2026-07-24',
    recordedBy: 'Björn Halldórsson',
  },
  {
    id: 'sm-2',
    jobId: 'jp-j6',
    typeId: 'milling',
    quantity: 860,
    note: 'Northbound lane only',
    status: 'needsReview',
    recordedAt: '2026-07-24',
    recordedBy: 'Ásta Ragnarsdóttir',
  },
  {
    id: 'sm-3',
    jobId: 'jp-j4',
    typeId: 'sawing',
    quantity: 112.5,
    note: null,
    status: 'reviewed',
    recordedAt: '2026-07-23',
    recordedBy: 'Ólafur Sigurðsson',
  },
  {
    id: 'sm-4',
    jobId: 'jp-j8',
    typeId: 'manholes',
    quantity: 6,
    note: 'Adjusted two covers',
    status: 'awaitingFix',
    recordedAt: '2026-07-23',
    recordedBy: 'Guðrún Pálsdóttir',
  },
  {
    id: 'sm-5',
    jobId: 'jp-s2',
    typeId: 'subBase',
    quantity: 450,
    note: null,
    status: 'reviewed',
    recordedAt: '2026-07-22',
    recordedBy: 'Margrét Elíasdóttir',
  },
  {
    id: 'sm-6',
    jobId: 'jp-s6',
    typeId: 'gullies',
    quantity: 4,
    note: null,
    status: 'sent',
    recordedAt: '2026-07-22',
    recordedBy: 'Björn Halldórsson',
  },
  {
    id: 'sm-7',
    jobId: 'jp-j2',
    typeId: 'asphalt',
    quantity: 980,
    note: 'Patch near roundabout',
    status: 'needsReview',
    recordedAt: '2026-07-21',
    recordedBy: 'Ásta Ragnarsdóttir',
  },
  {
    id: 'sm-8',
    jobId: 'jp-s4',
    typeId: 'milling',
    quantity: 320.5,
    note: null,
    status: 'awaitingFix',
    recordedAt: '2026-07-21',
    recordedBy: 'Ólafur Sigurðsson',
  },
]

export function getMeasurementJob(jobId: string) {
  return measurementJobs.find((job) => job.id === jobId)
}

export function getMeasurementType(typeId: MeasurementTypeId) {
  return measurementTypes.find((type) => type.id === typeId)
}

export function formatMeasurementQuantity(value: number, unit: MeasurementUnit) {
  const allowDecimals = unit === 'm' || unit === 'm2'
  const [intPart, decPart] = allowDecimals
    ? value.toFixed(value % 1 === 0 ? 0 : 1).split('.')
    : [String(Math.round(value))]

  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return decPart !== undefined ? `${grouped}.${decPart}` : grouped
}
