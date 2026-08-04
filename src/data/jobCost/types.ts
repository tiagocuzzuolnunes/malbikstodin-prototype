export const jobCostCategories = [
  'labour',
  'equipment',
  'materials',
  'haulage',
] as const

export type JobCostCategory = (typeof jobCostCategories)[number]

export const jobCostRateStatuses = [
  'confirmed',
  'changedSince',
  'noRate',
  'noLabourRate',
  'notApproved',
] as const

export type JobCostRateStatus = (typeof jobCostRateStatuses)[number]

export type JobCostLine = {
  id: string
  category: JobCostCategory
  itemKey: string
  /** Links to RateHistory.itemId or LabourRates.id */
  rateRefId: string | null
  workTypeKey: string
  quantity: number
  unitKey: string
  /** Null when no rate is available */
  rateIsk: number | null
  rateDate: string | null
  status: JobCostRateStatus
}

export type JobCostAnalysis = {
  id: string
  jobCode: string
  jobNameKey: string
  clientKey: string
  /** Job start — used to detect rates changed since work began */
  startedAt: string
  tenderAmountIsk: number
  /** Full-job actual cost (sample lines below are representative). */
  actualCostIsk: number
  unconfirmedRateLines: number
  totalRateLines: number
  lines: JobCostLine[]
}

/** Historical rate versions — makes past cost reproducible. */
export type RateHistoryEntry = {
  id: string
  itemId: string
  itemKey: string
  category: Exclude<JobCostCategory, 'labour'>
  rateIsk: number
  effectiveFrom: string
  /** Null means this version is still current */
  effectiveTo: string | null
  changedByKey: string
}

/** Wage rates — dedicated home for labour pricing. */
export type LabourRate = {
  id: string
  roleKey: string
  workTypeKey: string
  rateIsk: number | null
  unitKey: string
  effectiveFrom: string | null
  approved: boolean
  status: Extract<JobCostRateStatus, 'confirmed' | 'notApproved' | 'noLabourRate'>
}

/** Frozen cost sheet captured while the job is still running. */
export type ProjectCostSnapshot = {
  id: string
  jobId: string
  frozenAt: string
  frozenByKey: string
  tenderAmountIsk: number
  actualCostIsk: number
  varianceIsk: number
  unconfirmedRateLines: number
  totalRateLines: number
  noteKey: string
}
