import type { JobCostRateStatus } from '../../../data/jobCost'

export const jobCostStatusClass: Record<JobCostRateStatus, string> = {
  confirmed: 'bg-success/15 text-success ring-1 ring-success/25',
  changedSince: 'bg-alert/15 text-alert ring-1 ring-alert/25',
  noRate: 'bg-danger/10 text-danger ring-1 ring-danger/20',
  noLabourRate: 'bg-danger/10 text-danger ring-1 ring-danger/20',
  notApproved: 'bg-surface-muted text-foreground-muted ring-1 ring-border',
}

export const jobCostStatusDotClass: Record<JobCostRateStatus, string> = {
  confirmed: 'bg-success',
  changedSince: 'bg-alert',
  noRate: 'bg-danger',
  noLabourRate: 'bg-danger',
  notApproved: 'bg-foreground-muted',
}
