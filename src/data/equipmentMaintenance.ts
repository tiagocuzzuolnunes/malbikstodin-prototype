export type EquipmentHistoryType =
  | 'repair'
  | 'runningHours'
  | 'cost'
  | 'service'

export type EquipmentServiceStatus = 'overdue' | 'dueSoon' | 'ok'

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

export type EquipmentMaintenanceMachine = {
  id: string
  serial: string
  nameKey: string
  ownerKey: string
  departmentKey: string
  serviceStatus: EquipmentServiceStatus
  meterReadingHours: number
  nextServiceLabelKey: string
  nextServiceInHours: number
  yesterdayLocationKey: string
  stats: EquipmentMaintenanceStat[]
  history: EquipmentHistoryRow[]
}

const sharedOwnerKey = 'equipmentMaintenance.machine.owner'

export const maintenanceEquipment: EquipmentMaintenanceMachine[] = [
  {
    id: 'eq-tf-812',
    serial: 'TF-812',
    nameKey: 'equipmentMaintenance.machines.tf812',
    ownerKey: sharedOwnerKey,
    departmentKey: 'equipmentMaintenance.departments.asphalt',
    serviceStatus: 'overdue',
    meterReadingHours: 4128.5,
    nextServiceLabelKey: 'equipmentMaintenance.nextService.oilChange',
    nextServiceInHours: 42,
    yesterdayLocationKey: 'equipmentMaintenance.locations.workshopBay2',
    stats: [
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
        labelKey: 'equipmentMaintenance.nextService.oilChange',
        valueKey: 'equipmentMaintenance.stats.nextServiceValue',
        valueParams: { hours: 42 },
        format: 'text',
      },
    ],
    history: [
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
    ],
  },
  {
    id: 'eq-mu-471',
    serial: 'MU-471',
    nameKey: 'equipmentMaintenance.machines.mu471',
    ownerKey: sharedOwnerKey,
    departmentKey: 'equipmentMaintenance.departments.paving',
    serviceStatus: 'dueSoon',
    meterReadingHours: 28640,
    nextServiceLabelKey: 'equipmentMaintenance.nextService.brakeInspection',
    nextServiceInHours: 120,
    yesterdayLocationKey: 'equipmentMaintenance.locations.miklabraut',
    stats: [
      {
        id: 'runningCost30d',
        labelKey: 'equipmentMaintenance.stats.runningCost30d',
        value: 942800,
        format: 'isk',
      },
      {
        id: 'hoursThisYear',
        labelKey: 'equipmentMaintenance.stats.hoursThisYear',
        value: 986.5,
        format: 'hours',
      },
      {
        id: 'costPerHour',
        labelKey: 'equipmentMaintenance.stats.costPerHour',
        value: 3120,
        format: 'iskPerHour',
      },
      {
        id: 'nextService',
        labelKey: 'equipmentMaintenance.nextService.brakeInspection',
        valueKey: 'equipmentMaintenance.stats.nextServiceValue',
        valueParams: { hours: 120 },
        format: 'text',
      },
    ],
    history: [
      {
        id: 'mu-1',
        date: '2026-07-13',
        type: 'runningHours',
        descriptionKey: 'equipmentMaintenance.history.haulage',
        jobKey: 'equipmentMaintenance.jobs.miklabraut',
        workerKey: 'equipmentMaintenance.workers.jonBjarki',
        hours: 9,
        costIsk: null,
        sourceKey: 'equipmentMaintenance.sources.jobReport',
      },
      {
        id: 'mu-2',
        date: '2026-07-06',
        type: 'cost',
        descriptionKey: 'equipmentMaintenance.history.tyres',
        jobKey: null,
        workerKey: null,
        hours: null,
        costIsk: 286000,
        sourceKey: 'equipmentMaintenance.sources.invoice904471',
      },
      {
        id: 'mu-3',
        date: '2026-06-22',
        type: 'service',
        descriptionKey: 'equipmentMaintenance.history.scheduled1000h',
        jobKey: 'equipmentMaintenance.jobs.workshop',
        workerKey: 'equipmentMaintenance.workers.hafthor',
        hours: 3.5,
        costIsk: 98400,
        sourceKey: 'equipmentMaintenance.sources.serviceLog',
      },
    ],
  },
  {
    id: 'eq-af-208',
    serial: 'AF-208',
    nameKey: 'equipmentMaintenance.machines.af208',
    ownerKey: sharedOwnerKey,
    departmentKey: 'equipmentMaintenance.departments.airport',
    serviceStatus: 'ok',
    meterReadingHours: 15420,
    nextServiceLabelKey: 'equipmentMaintenance.nextService.hydraulic',
    nextServiceInHours: 310,
    yesterdayLocationKey: 'equipmentMaintenance.locations.airside',
    stats: [
      {
        id: 'runningCost30d',
        labelKey: 'equipmentMaintenance.stats.runningCost30d',
        value: 518200,
        format: 'isk',
      },
      {
        id: 'hoursThisYear',
        labelKey: 'equipmentMaintenance.stats.hoursThisYear',
        value: 612,
        format: 'hours',
      },
      {
        id: 'costPerHour',
        labelKey: 'equipmentMaintenance.stats.costPerHour',
        value: 2680.25,
        format: 'iskPerHour',
      },
      {
        id: 'nextService',
        labelKey: 'equipmentMaintenance.nextService.hydraulic',
        valueKey: 'equipmentMaintenance.stats.nextServiceValue',
        valueParams: { hours: 310 },
        format: 'text',
      },
    ],
    history: [
      {
        id: 'af-1',
        date: '2026-07-10',
        type: 'runningHours',
        descriptionKey: 'equipmentMaintenance.history.airsideSupport',
        jobKey: 'equipmentMaintenance.jobs.airportApron',
        workerKey: 'equipmentMaintenance.workers.jonBjarki',
        hours: 6,
        costIsk: null,
        sourceKey: 'equipmentMaintenance.sources.jobReport',
      },
      {
        id: 'af-2',
        date: '2026-06-28',
        type: 'repair',
        descriptionKey: 'equipmentMaintenance.history.tailgateLatch',
        jobKey: 'equipmentMaintenance.jobs.workshop',
        workerKey: 'equipmentMaintenance.workers.hafthor',
        hours: 2.25,
        costIsk: 41200,
        sourceKey: 'equipmentMaintenance.sources.docket118432',
      },
    ],
  },
  {
    id: 'eq-es-101',
    serial: 'ES-101',
    nameKey: 'equipmentMaintenance.machines.es101',
    ownerKey: sharedOwnerKey,
    departmentKey: 'equipmentMaintenance.departments.quarry',
    serviceStatus: 'overdue',
    meterReadingHours: 22105,
    nextServiceLabelKey: 'equipmentMaintenance.nextService.engineService',
    nextServiceInHours: 18,
    yesterdayLocationKey: 'equipmentMaintenance.locations.quarry',
    stats: [
      {
        id: 'runningCost30d',
        labelKey: 'equipmentMaintenance.stats.runningCost30d',
        value: 1104800,
        format: 'isk',
      },
      {
        id: 'hoursThisYear',
        labelKey: 'equipmentMaintenance.stats.hoursThisYear',
        value: 1204.75,
        format: 'hours',
      },
      {
        id: 'costPerHour',
        labelKey: 'equipmentMaintenance.stats.costPerHour',
        value: 3540,
        format: 'iskPerHour',
      },
      {
        id: 'nextService',
        labelKey: 'equipmentMaintenance.nextService.engineService',
        valueKey: 'equipmentMaintenance.stats.nextServiceValue',
        valueParams: { hours: 18 },
        format: 'text',
      },
    ],
    history: [
      {
        id: 'es-1',
        date: '2026-07-12',
        type: 'runningHours',
        descriptionKey: 'equipmentMaintenance.history.quarryHaul',
        jobKey: 'equipmentMaintenance.jobs.esjaPlant',
        workerKey: 'equipmentMaintenance.workers.jonBjarki',
        hours: 10,
        costIsk: null,
        sourceKey: 'equipmentMaintenance.sources.jobReport',
      },
      {
        id: 'es-2',
        date: '2026-07-04',
        type: 'cost',
        descriptionKey: 'equipmentMaintenance.history.filters',
        jobKey: null,
        workerKey: null,
        hours: null,
        costIsk: 67200,
        sourceKey: 'equipmentMaintenance.sources.invoice904471',
      },
      {
        id: 'es-3',
        date: '2026-06-15',
        type: 'service',
        descriptionKey: 'equipmentMaintenance.history.scheduled500h',
        jobKey: 'equipmentMaintenance.jobs.workshop',
        workerKey: 'equipmentMaintenance.workers.hafthor',
        hours: 5,
        costIsk: 156000,
        sourceKey: 'equipmentMaintenance.sources.serviceLog',
      },
    ],
  },
  {
    id: 'eq-mb-401',
    serial: 'MB-401',
    nameKey: 'equipmentMaintenance.machines.mb401',
    ownerKey: sharedOwnerKey,
    departmentKey: 'equipmentMaintenance.departments.ops',
    serviceStatus: 'ok',
    meterReadingHours: 8450,
    nextServiceLabelKey: 'equipmentMaintenance.nextService.general',
    nextServiceInHours: 480,
    yesterdayLocationKey: 'equipmentMaintenance.locations.yard',
    stats: [
      {
        id: 'runningCost30d',
        labelKey: 'equipmentMaintenance.stats.runningCost30d',
        value: 214600,
        format: 'isk',
      },
      {
        id: 'hoursThisYear',
        labelKey: 'equipmentMaintenance.stats.hoursThisYear',
        value: 318,
        format: 'hours',
      },
      {
        id: 'costPerHour',
        labelKey: 'equipmentMaintenance.stats.costPerHour',
        value: 1890,
        format: 'iskPerHour',
      },
      {
        id: 'nextService',
        labelKey: 'equipmentMaintenance.nextService.general',
        valueKey: 'equipmentMaintenance.stats.nextServiceValue',
        valueParams: { hours: 480 },
        format: 'text',
      },
    ],
    history: [
      {
        id: 'mb-1',
        date: '2026-07-09',
        type: 'runningHours',
        descriptionKey: 'equipmentMaintenance.history.emergencyStandby',
        jobKey: 'equipmentMaintenance.jobs.opsDesk',
        workerKey: 'equipmentMaintenance.workers.jonBjarki',
        hours: 4,
        costIsk: null,
        sourceKey: 'equipmentMaintenance.sources.jobReport',
      },
      {
        id: 'mb-2',
        date: '2026-05-30',
        type: 'service',
        descriptionKey: 'equipmentMaintenance.history.scheduled500h',
        jobKey: 'equipmentMaintenance.jobs.workshop',
        workerKey: 'equipmentMaintenance.workers.hafthor',
        hours: 2,
        costIsk: 54800,
        sourceKey: 'equipmentMaintenance.sources.serviceLog',
      },
    ],
  },
]

export function getMaintenanceEquipment(id: string) {
  return maintenanceEquipment.find((item) => item.id === id) ?? null
}

export function getMaintenanceEquipmentStats() {
  return {
    total: maintenanceEquipment.length,
    overdue: maintenanceEquipment.filter((item) => item.serviceStatus === 'overdue')
      .length,
    dueSoon: maintenanceEquipment.filter((item) => item.serviceStatus === 'dueSoon')
      .length,
    ok: maintenanceEquipment.filter((item) => item.serviceStatus === 'ok').length,
  }
}
