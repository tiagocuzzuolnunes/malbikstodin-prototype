export type EquipmentHistoryType =
  | 'repair'
  | 'runningHours'
  | 'cost'
  | 'service'

export type EquipmentServiceStatus = 'overdue' | 'dueSoon' | 'ok'

export type EquipmentMaintenanceMachine = {
  id: string
  serial: string
  nameKey: string
  ownerKey: string
  departmentKey: string
  serviceStatus: EquipmentServiceStatus
  meterReadingHours: number
  nextServiceKey: string
  nextServiceInHours: number
  yesterdayLocationKey: string
}

export type EquipmentMaintenanceStat = {
  id: string
  labelKey: string
  /** Numeric primary value; use valueKey when set. */
  value?: number
  valueKey?: string
  valueParams?: Record<string, string | number>
  format: 'isk' | 'hours' | 'iskPerHour' | 'text'
}

export type EquipmentHistoryRow = {
  id: string
  date: string
  type: EquipmentHistoryType
  descriptionKey: string
  jobKey: string | null
  workerKey: string | null
  hours: number | null
  costIsk: number | null
  sourceKey: string
}

export const equipmentMaintenanceMachine: EquipmentMaintenanceMachine = {
  id: 'eq-tf-812',
  serial: 'TF-812',
  nameKey: 'equipmentMaintenance.machine.name',
  ownerKey: 'equipmentMaintenance.machine.owner',
  departmentKey: 'equipmentMaintenance.machine.department',
  serviceStatus: 'overdue',
  meterReadingHours: 4128.5,
  nextServiceKey: 'equipmentMaintenance.machine.nextServiceOil',
  nextServiceInHours: 42,
  yesterdayLocationKey: 'equipmentMaintenance.machine.yesterdayLocation',
}

export const equipmentMaintenanceStats: EquipmentMaintenanceStat[] = [
  {
    id: 'runningCost30d',
    labelKey: 'equipmentMaintenance.stats.runningCost30d',
    value: 1284650,
    format: 'isk',
  },
  {
    id: 'hoursThisYear',
    labelKey: 'equipmentMaintenance.stats.hoursThisYear',
    value: 1412.25,
    format: 'hours',
  },
  {
    id: 'costPerHour',
    labelKey: 'equipmentMaintenance.stats.costPerHour',
    value: 4870.5,
    format: 'iskPerHour',
  },
  {
    id: 'nextService',
    labelKey: 'equipmentMaintenance.stats.nextService',
    valueKey: 'equipmentMaintenance.stats.nextServiceValue',
    valueParams: { hours: 42 },
    format: 'text',
  },
]

export const equipmentHistoryRows: EquipmentHistoryRow[] = [
  {
    id: 'eh-1',
    date: '2026-07-14',
    type: 'repair',
    descriptionKey: 'equipmentMaintenance.history.drumWearPlate',
    jobKey: 'equipmentMaintenance.jobs.workshop',
    workerKey: 'equipmentMaintenance.workers.hafthor',
    hours: 6.25,
    costIsk: 184320,
    sourceKey: 'equipmentMaintenance.sources.docket118432',
  },
  {
    id: 'eh-2',
    date: '2026-07-12',
    type: 'runningHours',
    descriptionKey: 'equipmentMaintenance.history.pavingOverlay',
    jobKey: 'equipmentMaintenance.jobs.miklabraut',
    workerKey: 'equipmentMaintenance.workers.jonBjarki',
    hours: 8,
    costIsk: null,
    sourceKey: 'equipmentMaintenance.sources.jobReport',
  },
  {
    id: 'eh-3',
    date: '2026-07-11',
    type: 'runningHours',
    descriptionKey: 'equipmentMaintenance.history.pavingOverlay',
    jobKey: 'equipmentMaintenance.jobs.miklabraut',
    workerKey: 'equipmentMaintenance.workers.jonBjarki',
    hours: 7.5,
    costIsk: null,
    sourceKey: 'equipmentMaintenance.sources.jobReport',
  },
  {
    id: 'eh-4',
    date: '2026-07-08',
    type: 'cost',
    descriptionKey: 'equipmentMaintenance.history.oilFilters',
    jobKey: null,
    workerKey: null,
    hours: null,
    costIsk: 48900,
    sourceKey: 'equipmentMaintenance.sources.invoice904471',
  },
  {
    id: 'eh-5',
    date: '2026-07-01',
    type: 'service',
    descriptionKey: 'equipmentMaintenance.history.scheduled500h',
    jobKey: 'equipmentMaintenance.jobs.workshop',
    workerKey: 'equipmentMaintenance.workers.hafthor',
    hours: 4,
    costIsk: 122400,
    sourceKey: 'equipmentMaintenance.sources.serviceLog',
  },
]
