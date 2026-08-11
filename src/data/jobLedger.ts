export type JobLedgerStatus =
  | 'difference'
  | 'balanced'
  | 'notRecharged'
  | 'readyToClose'
  | 'noJobNumber'

export type JobLedgerStat = {
  id: string
  labelKey: string
  /** Primary display value; use valueKey for i18n interpolation when set. */
  value?: number
  valueKey?: string
  valueParams?: Record<string, string | number>
  tone?: 'danger' | 'alert' | 'default'
}

export type JobLedgerRow = {
  id: string
  jobSerial: string | null
  jobKey: string
  departmentKey: string
  costDk: number | null
  costBik: number | null
  difference: number | null
  notRecharged: number | null
  status: JobLedgerStatus
}

export type OrphanPosting = {
  id: string
  postingNo: string
  descriptionKey: string
  amountIsk: number
}

export type LinkableJob = {
  id: string
  serial: string
  jobKey: string
}

export const jobLedgerMeta = {
  periodKey: 'jobLedger.period.july2026',
  openJobs: 48,
} as const

export const jobLedgerStats: JobLedgerStat[] = [
  {
    id: 'openJobs',
    value: 48,
    labelKey: 'jobLedger.stats.openJobs',
  },
  {
    id: 'noJobNumber',
    labelKey: 'jobLedger.stats.noJobNumber',
    valueKey: 'jobLedger.stats.noJobNumberValue',
    valueParams: { lines: 17, amount: 2418650 },
    tone: 'danger',
  },
  {
    id: 'notRecharged',
    value: 6742300,
    labelKey: 'jobLedger.stats.notRecharged',
    tone: 'alert',
  },
  {
    id: 'difference',
    value: -184412.5,
    labelKey: 'jobLedger.stats.dkBikDifference',
    tone: 'danger',
  },
]

export const linkableJobs: LinkableJob[] = [
  {
    id: 'job-hringbraut',
    serial: '26-0412',
    jobKey: 'jobLedger.jobs.hringbraut',
  },
  {
    id: 'job-reykjanesbraut',
    serial: '26-0388',
    jobKey: 'jobLedger.jobs.reykjanesbraut',
  },
  {
    id: 'job-milling',
    serial: '26-0401',
    jobKey: 'jobLedger.jobs.millingKopavogur',
  },
  {
    id: 'job-groundwork',
    serial: '26-0357',
    jobKey: 'jobLedger.jobs.groundworkHafnarfjordur',
  },
]

export const orphanPostings: OrphanPosting[] = [
  {
    id: 'op-1',
    postingNo: '118432',
    descriptionKey: 'jobLedger.orphans.spareParts',
    amountIsk: 184320,
  },
  {
    id: 'op-2',
    postingNo: '118501',
    descriptionKey: 'jobLedger.orphans.fuelDepot',
    amountIsk: 412800,
  },
  {
    id: 'op-3',
    postingNo: '118612',
    descriptionKey: 'jobLedger.orphans.hiredPlant',
    amountIsk: 678400,
  },
  {
    id: 'op-4',
    postingNo: '118704',
    descriptionKey: 'jobLedger.orphans.labFees',
    amountIsk: 96450,
  },
  {
    id: 'op-5',
    postingNo: '118790',
    descriptionKey: 'jobLedger.orphans.bitumenAdj',
    amountIsk: 524300,
  },
  {
    id: 'op-6',
    postingNo: '118855',
    descriptionKey: 'jobLedger.orphans.transport',
    amountIsk: 522380,
  },
]

export const jobLedgerRows: JobLedgerRow[] = [
  {
    id: 'jl-1',
    jobSerial: '26-0412',
    jobKey: 'jobLedger.jobs.hringbraut',
    departmentKey: 'jobLedger.departments.paving',
    costDk: 1284300,
    costBik: 1311712.5,
    difference: -27412.5,
    notRecharged: 96400,
    status: 'difference',
  },
  {
    id: 'jl-2',
    jobSerial: '26-0388',
    jobKey: 'jobLedger.jobs.reykjanesbraut',
    departmentKey: 'jobLedger.departments.paving',
    costDk: 8140200,
    costBik: 8140200,
    difference: 0,
    notRecharged: 0,
    status: 'balanced',
  },
  {
    id: 'jl-3',
    jobSerial: '26-0401',
    jobKey: 'jobLedger.jobs.millingKopavogur',
    departmentKey: 'jobLedger.departments.asphalt',
    costDk: 2104000,
    costBik: 2104000,
    difference: 0,
    notRecharged: 418900,
    status: 'notRecharged',
  },
  {
    id: 'jl-4',
    jobSerial: '26-0357',
    jobKey: 'jobLedger.jobs.groundworkHafnarfjordur',
    departmentKey: 'jobLedger.departments.groundwork',
    costDk: 4412800,
    costBik: 4412800,
    difference: 0,
    notRecharged: 0,
    status: 'readyToClose',
  },
  {
    id: 'jl-5',
    jobSerial: null,
    jobKey: 'jobLedger.jobs.missingPosting',
    departmentKey: 'jobLedger.departments.paving',
    costDk: 184320,
    costBik: null,
    difference: null,
    notRecharged: null,
    status: 'noJobNumber',
  },
]
