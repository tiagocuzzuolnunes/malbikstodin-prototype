import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  jobCostCategories,
  lineAmountIsk,
  type JobCostCategory,
  type JobCostLine,
} from '../../../data/jobCost'
import { cn } from '../../../lib/utils'
import { DataTable } from './DataTable'
import { formatIsk, formatQty, formatRate, formatRateDate } from './format'
import { JobCostStatusBadge } from './status'
import { jobCostStatusRowTint } from './statusStyles'

function groupLinesByCategory(lines: JobCostLine[]) {
  const groups = new Map<JobCostCategory, JobCostLine[]>()
  for (const category of jobCostCategories) {
    groups.set(category, [])
  }
  for (const line of lines) {
    groups.get(line.category)?.push(line)
  }
  return groups
}

function LineMobileCard({
  line,
  locale,
}: {
  line: JobCostLine
  locale: string
}) {
  const { t } = useTranslation()
  const amount = lineAmountIsk(line.rateIsk, line.quantity)

  return (
    <article
      className={cn(
        'space-y-3 border-b border-border px-4 py-4 last:border-b-0',
        jobCostStatusRowTint[line.status],
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium tracking-wide text-foreground-muted uppercase">
            {t(`jobCost.categories.${line.category}`)}
          </p>
          <h3 className="mt-1 text-base font-semibold tracking-tight wrap-break-word">
            {t(line.itemKey)}
          </h3>
          <p className="mt-1 text-sm text-foreground-muted">{t(line.workTypeKey)}</p>
        </div>
        <JobCostStatusBadge status={line.status} />
      </div>

      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-foreground-muted">{t('jobCost.columns.qty')}</dt>
          <dd className="mt-0.5 font-medium tabular-nums">
            {formatQty(line.quantity, locale)} {t(line.unitKey)}
          </dd>
        </div>
        <div>
          <dt className="text-foreground-muted">{t('jobCost.columns.rate')}</dt>
          <dd className="mt-0.5 font-medium tabular-nums">
            {line.rateIsk == null ? '—' : formatRate(line.rateIsk, locale)}
          </dd>
        </div>
        <div>
          <dt className="text-foreground-muted">{t('jobCost.columns.amount')}</dt>
          <dd className="mt-0.5 font-medium tabular-nums">{formatIsk(amount, locale)}</dd>
        </div>
        <div>
          <dt className="text-foreground-muted">{t('jobCost.columns.rateDate')}</dt>
          <dd className="mt-0.5 font-medium tabular-nums">
            {line.rateDate ? formatRateDate(line.rateDate, locale) : '—'}
          </dd>
        </div>
      </dl>
    </article>
  )
}

type CostLinesTableProps = {
  lines: JobCostLine[]
  actualCostIsk: number
  locale: string
}

export function CostLinesTable({ lines, actualCostIsk, locale }: CostLinesTableProps) {
  const { t } = useTranslation()
  const grouped = useMemo(() => groupLinesByCategory(lines), [lines])

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{t('jobCost.tableTitle')}</h2>
          <p className="mt-1 text-sm text-foreground-muted">{t('jobCost.tableSubtitle')}</p>
        </div>
        <p className="text-sm text-foreground-muted">
          {t('jobCost.lineCount', { count: lines.length })}
        </p>
      </div>

      <DataTable
        minWidthClassName="min-w-[64rem]"
        header={
          <tr className="h-12">
            <th className="w-[12%] px-4 align-middle font-medium">
              {t('jobCost.columns.category')}
            </th>
            <th className="w-[22%] px-4 align-middle font-medium">
              {t('jobCost.columns.item')}
            </th>
            <th className="w-[12%] px-4 align-middle font-medium">
              {t('jobCost.columns.workType')}
            </th>
            <th className="w-[8%] px-4 text-right align-middle font-medium">
              {t('jobCost.columns.qty')}
            </th>
            <th className="w-[6%] px-4 align-middle font-medium">
              {t('jobCost.columns.unit')}
            </th>
            <th className="w-[10%] px-4 text-right align-middle font-medium">
              {t('jobCost.columns.rate')}
            </th>
            <th className="w-[12%] px-4 text-right align-middle font-medium">
              {t('jobCost.columns.amount')}
            </th>
            <th className="w-[10%] px-4 align-middle font-medium">
              {t('jobCost.columns.rateDate')}
            </th>
            <th className="w-[14%] px-4 align-middle font-medium">
              {t('jobCost.columns.status')}
            </th>
          </tr>
        }
        body={jobCostCategories.map((category) => {
          const categoryLines = grouped.get(category) ?? []
          if (categoryLines.length === 0) return null

          return categoryLines.map((line, index) => (
            <tr
              key={line.id}
              className={cn(
                'h-14 border-t border-border',
                jobCostStatusRowTint[line.status],
              )}
            >
              <td className="px-4 align-middle font-medium">
                {index === 0 ? t(`jobCost.categories.${category}`) : null}
              </td>
              <td className="px-4 align-middle font-medium">
                <span className="block truncate">{t(line.itemKey)}</span>
              </td>
              <td className="px-4 align-middle text-foreground-muted">
                <span className="block truncate">{t(line.workTypeKey)}</span>
              </td>
              <td className="px-4 align-middle text-right tabular-nums">
                {formatQty(line.quantity, locale)}
              </td>
              <td className="px-4 align-middle text-foreground-muted">{t(line.unitKey)}</td>
              <td className="px-4 align-middle text-right tabular-nums">
                {line.rateIsk == null ? '—' : formatRate(line.rateIsk, locale)}
              </td>
              <td className="px-4 align-middle text-right font-medium tabular-nums">
                {formatIsk(lineAmountIsk(line.rateIsk, line.quantity), locale)}
              </td>
              <td className="px-4 align-middle tabular-nums text-foreground-muted">
                {line.rateDate ? formatRateDate(line.rateDate, locale) : '—'}
              </td>
              <td className="px-4 align-middle">
                <JobCostStatusBadge status={line.status} />
              </td>
            </tr>
          ))
        })}
        footer={
          <tr className="h-14 border-t border-border bg-surface-muted">
            <td colSpan={6} className="px-4 align-middle font-semibold tracking-tight">
              {t('jobCost.totalActual')}
            </td>
            <td className="px-4 text-right align-middle font-semibold tabular-nums">
              {formatIsk(actualCostIsk, locale)}
            </td>
            <td colSpan={2} />
          </tr>
        }
        mobile={
          <>
            {jobCostCategories.map((category) => {
              const categoryLines = grouped.get(category) ?? []
              if (categoryLines.length === 0) return null

              return categoryLines.map((line) => (
                <LineMobileCard key={line.id} line={line} locale={locale} />
              ))
            })}
            <div className="flex items-center justify-between gap-3 bg-surface-muted px-4 py-4">
              <p className="font-semibold tracking-tight">{t('jobCost.totalActual')}</p>
              <p className="font-semibold tabular-nums">{formatIsk(actualCostIsk, locale)}</p>
            </div>
          </>
        }
      />
    </section>
  )
}
