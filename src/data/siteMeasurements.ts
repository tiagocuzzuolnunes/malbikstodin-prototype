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
