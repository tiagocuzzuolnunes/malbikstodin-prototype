import { useTranslation } from 'react-i18next'
import type { LabourRate } from '../../../data/jobCost'
import { cn } from '../../../lib/utils'
import { JobCostStatusBadge } from './status'
import { jobCostStatusRowTint } from './statusStyles'
import { DataTable } from './DataTable'
import { formatRate, formatRateDate } from './format'

type LabourRatesTableProps = {
  rates: LabourRate[]
  locale: string
}

export function LabourRatesTable({ rates, locale }: LabourRatesTableProps) {
  const { t } = useTranslation()

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {t('jobCost.labourRates.title')}
          </h2>
          <p className="mt-1 text-sm text-foreground-muted">
            {t('jobCost.labourRates.subtitle')}
          </p>
        </div>
        <p className="text-sm text-foreground-muted">
          {t('jobCost.labourRates.count', { count: rates.length })}
        </p>
      </div>

      <DataTable
        minWidthClassName="min-w-[52rem]"
        header={
          <tr className="h-12">
            <th className="w-[24%] px-4 align-middle font-medium">
              {t('jobCost.labourRates.columns.role')}
            </th>
            <th className="w-[16%] px-4 align-middle font-medium">
              {t('jobCost.labourRates.columns.workType')}
            </th>
            <th className="w-[12%] px-4 text-right align-middle font-medium">
              {t('jobCost.labourRates.columns.rate')}
            </th>
            <th className="w-[8%] px-4 align-middle font-medium">
              {t('jobCost.labourRates.columns.unit')}
            </th>
            <th className="w-[14%] px-4 align-middle font-medium">
              {t('jobCost.labourRates.columns.from')}
            </th>
            <th className="w-[12%] px-4 align-middle font-medium">
              {t('jobCost.labourRates.columns.approved')}
            </th>
            <th className="w-[14%] px-4 align-middle font-medium">
              {t('jobCost.labourRates.columns.status')}
            </th>
          </tr>
        }
        body={rates.map((rate) => (
          <tr
            key={rate.id}
            className={cn(
              'h-14 border-t border-border',
              jobCostStatusRowTint[rate.status],
            )}
          >
            <td className="px-4 align-middle font-medium">
              <span className="block truncate">{t(rate.roleKey)}</span>
            </td>
            <td className="px-4 align-middle text-foreground-muted">
              <span className="block truncate">{t(rate.workTypeKey)}</span>
            </td>
            <td className="px-4 text-right align-middle tabular-nums">
              {rate.rateIsk == null ? '—' : formatRate(rate.rateIsk, locale)}
            </td>
            <td className="px-4 align-middle text-foreground-muted">{t(rate.unitKey)}</td>
            <td className="px-4 align-middle tabular-nums text-foreground-muted">
              {rate.effectiveFrom ? formatRateDate(rate.effectiveFrom, locale) : '—'}
            </td>
            <td className="px-4 align-middle">
              {rate.approved
                ? t('jobCost.labourRates.approvedYes')
                : t('jobCost.labourRates.approvedNo')}
            </td>
            <td className="px-4 align-middle">
              <JobCostStatusBadge status={rate.status} />
            </td>
          </tr>
        ))}
        mobile={rates.map((rate) => (
          <article
            key={rate.id}
            className={cn(
              'space-y-3 border-b border-border px-4 py-4 last:border-b-0',
              jobCostStatusRowTint[rate.status],
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-base font-semibold tracking-tight">{t(rate.roleKey)}</h3>
                <p className="mt-1 text-sm text-foreground-muted">{t(rate.workTypeKey)}</p>
              </div>
              <JobCostStatusBadge status={rate.status} />
            </div>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-foreground-muted">
                  {t('jobCost.labourRates.columns.rate')}
                </dt>
                <dd className="mt-0.5 font-medium tabular-nums">
                  {rate.rateIsk == null
                    ? '—'
                    : `${formatRate(rate.rateIsk, locale)} ${t(rate.unitKey)}`}
                </dd>
              </div>
              <div>
                <dt className="text-foreground-muted">
                  {t('jobCost.labourRates.columns.from')}
                </dt>
                <dd className="mt-0.5 font-medium tabular-nums">
                  {rate.effectiveFrom ? formatRateDate(rate.effectiveFrom, locale) : '—'}
                </dd>
              </div>
              <div>
                <dt className="text-foreground-muted">
                  {t('jobCost.labourRates.columns.approved')}
                </dt>
                <dd className="mt-0.5 font-medium">
                  {rate.approved
                    ? t('jobCost.labourRates.approvedYes')
                    : t('jobCost.labourRates.approvedNo')}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      />
    </section>
  )
}
