import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  jobCostCategories,
  type JobCostCategory,
  type RateHistoryEntry,
} from '../../../data/jobCost'
import { cn } from '../../../lib/utils'
import { DataTable } from './DataTable'
import { formatRate, formatRateDate } from './format'

type RateHistoryTableProps = {
  entries: RateHistoryEntry[]
  locale: string
}

function groupByCategory(entries: RateHistoryEntry[]) {
  const groups = new Map<JobCostCategory, RateHistoryEntry[]>()
  for (const category of jobCostCategories) {
    groups.set(category, [])
  }
  for (const entry of entries) {
    groups.get(entry.category)?.push(entry)
  }
  return groups
}

export function RateHistoryTable({ entries, locale }: RateHistoryTableProps) {
  const { t } = useTranslation()
  const grouped = useMemo(() => groupByCategory(entries), [entries])

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {t('jobCost.rateHistory.title')}
          </h2>
          <p className="mt-1 text-sm text-foreground-muted">
            {t('jobCost.rateHistory.subtitle')}
          </p>
        </div>
        <p className="text-sm text-foreground-muted">
          {t('jobCost.rateHistory.count', { count: entries.length })}
        </p>
      </div>

      <DataTable
        minWidthClassName="min-w-[52rem]"
        header={
          <tr className="h-12">
            <th className="w-[14%] px-4 align-middle font-medium">
              {t('jobCost.rateHistory.columns.category')}
            </th>
            <th className="w-[26%] px-4 align-middle font-medium">
              {t('jobCost.rateHistory.columns.item')}
            </th>
            <th className="w-[12%] px-4 text-right align-middle font-medium">
              {t('jobCost.rateHistory.columns.rate')}
            </th>
            <th className="w-[14%] px-4 align-middle font-medium">
              {t('jobCost.rateHistory.columns.from')}
            </th>
            <th className="w-[14%] px-4 align-middle font-medium">
              {t('jobCost.rateHistory.columns.to')}
            </th>
            <th className="w-[20%] px-4 align-middle font-medium">
              {t('jobCost.rateHistory.columns.changedBy')}
            </th>
          </tr>
        }
        body={jobCostCategories.map((category, categoryIndex) => {
          const categoryEntries = grouped.get(category) ?? []
          if (categoryEntries.length === 0) return null

          const categoryTone =
            categoryIndex % 2 === 0 ? 'bg-surface' : 'bg-surface-muted/40'

          return categoryEntries.map((entry, index) => (
            <tr
              key={entry.id}
              className={cn('h-14 border-t border-border', categoryTone)}
            >
              <td className="px-4 align-middle font-medium">
                {index === 0 ? t(`jobCost.categories.${category}`) : null}
              </td>
              <td className="px-4 align-middle font-medium">
                <span className="block truncate">{t(entry.itemKey)}</span>
              </td>
              <td className="px-4 text-right align-middle tabular-nums">
                {formatRate(entry.rateIsk, locale)}
              </td>
              <td className="px-4 align-middle tabular-nums text-foreground-muted">
                {formatRateDate(entry.effectiveFrom, locale)}
              </td>
              <td className="px-4 align-middle tabular-nums text-foreground-muted">
                {entry.effectiveTo
                  ? formatRateDate(entry.effectiveTo, locale)
                  : t('jobCost.rateHistory.current')}
              </td>
              <td className="px-4 align-middle text-foreground-muted">
                <span className="block truncate">{t(entry.changedByKey)}</span>
              </td>
            </tr>
          ))
        })}
        mobile={jobCostCategories.map((category, categoryIndex) => {
          const categoryEntries = grouped.get(category) ?? []
          if (categoryEntries.length === 0) return null

          const categoryTone =
            categoryIndex % 2 === 0 ? 'bg-surface' : 'bg-surface-muted/40'

          return categoryEntries.map((entry) => (
            <article
              key={entry.id}
              className={cn(
                'space-y-3 border-b border-border px-4 py-4 last:border-b-0',
                categoryTone,
              )}
            >
              <div>
                <p className="text-xs font-medium tracking-wide text-foreground-muted uppercase">
                  {t(`jobCost.categories.${category}`)}
                </p>
                <h3 className="mt-1 text-base font-semibold tracking-tight">
                  {t(entry.itemKey)}
                </h3>
              </div>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-foreground-muted">
                    {t('jobCost.rateHistory.columns.rate')}
                  </dt>
                  <dd className="mt-0.5 font-medium tabular-nums">
                    {formatRate(entry.rateIsk, locale)}
                  </dd>
                </div>
                <div>
                  <dt className="text-foreground-muted">
                    {t('jobCost.rateHistory.columns.changedBy')}
                  </dt>
                  <dd className="mt-0.5 font-medium">{t(entry.changedByKey)}</dd>
                </div>
                <div>
                  <dt className="text-foreground-muted">
                    {t('jobCost.rateHistory.columns.from')}
                  </dt>
                  <dd className="mt-0.5 font-medium tabular-nums">
                    {formatRateDate(entry.effectiveFrom, locale)}
                  </dd>
                </div>
                <div>
                  <dt className="text-foreground-muted">
                    {t('jobCost.rateHistory.columns.to')}
                  </dt>
                  <dd className="mt-0.5 font-medium tabular-nums">
                    {entry.effectiveTo
                      ? formatRateDate(entry.effectiveTo, locale)
                      : t('jobCost.rateHistory.current')}
                  </dd>
                </div>
              </dl>
            </article>
          ))
        })}
      />
    </section>
  )
}
