import { useTranslation } from 'react-i18next'
import type { JobCostRateStatus } from '../../../data/jobCost'
import { StatusDotBadge } from '../../ui'
import { jobCostStatusClass, jobCostStatusDotClass } from './statusStyles'

export function JobCostStatusBadge({ status }: { status: JobCostRateStatus }) {
  const { t } = useTranslation()

  return (
    <StatusDotBadge
      label={t(`jobCost.status.${status}`)}
      className={jobCostStatusClass[status]}
      dotClassName={jobCostStatusDotClass[status]}
    />
  )
}
