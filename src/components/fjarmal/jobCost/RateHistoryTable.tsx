import { useTranslation } from 'react-i18next'
import type { RateHistoryEntry } from '../../../data/jobCost'
import { DataTable } from './DataTable'
import { formatRate, formatRateDate } from './format'

type RateHistoryTableProps = {
  entries: RateHistoryEntry[]
  locale: string
}

export function RateHistoryTable({ entries, locale }: RateHistoryTableProps) {
  const { t } = useTranslation()

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs font-medium tracking-wide text-foreground-muted">
            RateHistory
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">
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
        body={entries.map((entry) => (
          <tr
            key={entry.id}
            className="h-14 border-t border-border odd:bg-surface even:bg-surface-muted/40"
          >
            <td className="px-4 align-middle font-medium">
              {t(`jobCost.categories.${entry.category}`)}
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
        ))}
        mobile={entries.map((entry) => (
          <article
            key={entry.id}
            className="space-y-3 border-b border-border px-4 py-4 last:border-b-0"
          >
            <div>
              <p className="text-xs font-medium tracking-wide text-foreground-muted uppercase">
                {t(`jobCost.categories.${entry.category}`)}
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
        ))}
      />
    </section>
  )
}
