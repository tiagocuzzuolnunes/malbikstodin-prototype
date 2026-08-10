export type HatchView = 'register' | 'reports'

export type HatchReportTypeId =
  | 'equipmentBreakdown'
  | 'deviation'
  | 'complaint'
  | 'praise'

export type HatchReportStatus =
  | 'new'
  | 'inProgress'
  | 'awaitingReply'
  | 'closed'

export type HatchReportType = {
  id: HatchReportTypeId
  labelKey: string
}

export type HatchJobOption = {
  id: string
  serial: string
  labelKey: string
}

export type HatchReport = {
  id: string
  serial: string
  typeId: HatchReportTypeId
  jobSerial: string
  reportKey: string
  photoCount: number
  owner: string | null
  status: HatchReportStatus
}

export type HatchStat = {
  id: string
  value: number
  labelKey: string
}

export function parseHatchView(value: string | null): HatchView {
  return value === 'reports' ? 'reports' : 'register'
}

export const hatchReportTypes: HatchReportType[] = [
  {
    id: 'equipmentBreakdown',
    labelKey: 'hatch.types.equipmentBreakdown',
  },
  { id: 'deviation', labelKey: 'hatch.types.deviation' },
  { id: 'complaint', labelKey: 'hatch.types.complaint' },
  { id: 'praise', labelKey: 'hatch.types.praise' },
]

export const hatchJobs: HatchJobOption[] = [
  {
    id: 'hatch-j1',
    serial: '26-0412',
    labelKey: 'hatch.jobs.reykjanesbraut',
  },
  {
    id: 'hatch-j2',
    serial: '26-0388',
    labelKey: 'hatch.jobs.vegagerdin',
  },
  {
    id: 'hatch-j3',
    serial: '26-0401',
    labelKey: 'hatch.jobs.kopavogsbaer',
  },
  {
    id: 'hatch-j4',
    serial: '26-0357',
    labelKey: 'hatch.jobs.hafnarfjordur',
  },
  {
    id: 'hatch-j5',
    serial: '26-0407',
    labelKey: 'hatch.jobs.reykjavik',
  },
]

export const hatchStats: HatchStat[] = [
  { id: 'new', value: 7, labelKey: 'hatch.stats.newUnassigned' },
  { id: 'inProgress', value: 12, labelKey: 'hatch.stats.inProgress' },
  { id: 'closed', value: 41, labelKey: 'hatch.stats.closedInJuly' },
]

export const hatchReports: HatchReport[] = [
  {
    id: 'fr-87',
    serial: 'FR-26-0087',
    typeId: 'equipmentBreakdown',
    jobSerial: '26-0412',
    reportKey: 'hatch.reports.tyreBlown',
    photoCount: 2,
    owner: null,
    status: 'new',
  },
  {
    id: 'fr-85',
    serial: 'FR-26-0085',
    typeId: 'deviation',
    jobSerial: '26-0388',
    reportKey: 'hatch.reports.subBase',
    photoCount: 3,
    owner: 'Ólafur Þór S.',
    status: 'inProgress',
  },
  {
    id: 'fr-81',
    serial: 'FR-26-0081',
    typeId: 'complaint',
    jobSerial: '26-0401',
    reportKey: 'hatch.reports.dust',
    photoCount: 1,
    owner: 'Anna Jónsdóttir',
    status: 'awaitingReply',
  },
  {
    id: 'fr-79',
    serial: 'FR-26-0079',
    typeId: 'praise',
    jobSerial: '26-0357',
    reportKey: 'hatch.reports.manholes',
    photoCount: 1,
    owner: 'Sigurður Á.',
    status: 'closed',
  },
]
