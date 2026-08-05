import { useTranslation } from 'react-i18next'
import type { ProjectCostSnapshot } from '../../../data/jobCost'
import { DataTable } from './DataTable'
import { formatDateTime, formatIsk, formatPct } from './format'
import { cn } from '../../../lib/utils'

type SnapshotsTableProps = {
  snapshots: ProjectCostSnapshot[]
  locale: string
}

export function SnapshotsTable({ snapshots, locale }: SnapshotsTableProps) {
  const { t } = useTranslation()

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {t('jobCost.snapshots.title')}
          </h2>
          <p className="mt-1 text-sm text-foreground-muted">{t('jobCost.snapshots.subtitle')}</p>
        </div>
        <p className="text-sm text-foreground-muted">
          {t('jobCost.snapshots.count', { count: snapshots.length })}
        </p>
      </div>

      {snapshots.length === 0 ? (
        <div className="rounded-card border border-border bg-surface px-4 py-8 text-center text-sm text-foreground-muted shadow-card">
          {t('jobCost.snapshots.empty')}
        </div>
      ) : (
        <DataTable
          minWidthClassName="min-w-[60rem]"
          header={
            <tr className="h-12">
              <th className="w-[18%] px-4 align-middle font-medium">
                {t('jobCost.snapshots.columns.frozenAt')}
              </th>
              <th className="w-[16%] px-4 align-middle font-medium">
                {t('jobCost.snapshots.columns.frozenBy')}
              </th>
              <th className="w-[14%] px-4 text-right align-middle font-medium">
                {t('jobCost.snapshots.columns.tender')}
              </th>
              <th className="w-[14%] px-4 text-right align-middle font-medium">
                {t('jobCost.snapshots.columns.actual')}
              </th>
              <th className="w-[14%] px-4 text-right align-middle font-medium">
                {t('jobCost.snapshots.columns.variance')}
              </th>
              <th className="w-[12%] px-4 align-middle font-medium">
                {t('jobCost.snapshots.columns.unconfirmed')}
              </th>
              <th className="w-[12%] px-4 align-middle font-medium">
                {t('jobCost.snapshots.columns.note')}
              </th>
            </tr>
          }
          body={snapshots.map((snapshot) => {
            const variancePct =
              snapshot.tenderAmountIsk === 0
                ? 0
                : (snapshot.varianceIsk / snapshot.tenderAmountIsk) * 100
            const positive = snapshot.varianceIsk >= 0

            return (
              <tr
                key={snapshot.id}
                className="h-14 border-t border-border odd:bg-surface even:bg-surface-muted/40"
              >
                <td className="px-4 align-middle tabular-nums text-foreground-muted">
                  {formatDateTime(snapshot.frozenAt, locale)}
                </td>
                <td className="px-4 align-middle">
                  <span className="block truncate">{t(snapshot.frozenByKey)}</span>
                </td>
                <td className="px-4 text-right align-middle tabular-nums">
                  {formatIsk(snapshot.tenderAmountIsk, locale)}
                </td>
                <td className="px-4 text-right align-middle tabular-nums">
                  {formatIsk(snapshot.actualCostIsk, locale)}
                </td>
                <td
                  className={cn(
                    'px-4 text-right align-middle font-medium tabular-nums',
                    positive ? 'text-success' : 'text-danger',
                  )}
                >
                  <span className="block truncate">
                    {formatIsk(snapshot.varianceIsk, locale)}{' '}
                    <span className="text-xs font-medium">
                      ({formatPct(Math.abs(variancePct), locale)}%)
                    </span>
                  </span>
                </td>
                <td className="px-4 align-middle tabular-nums text-foreground-muted">
                  {snapshot.unconfirmedRateLines}/{snapshot.totalRateLines}
                </td>
                <td className="px-4 align-middle text-foreground-muted">
                  <span className="block truncate">{t(snapshot.noteKey)}</span>
                </td>
              </tr>
            )
          })}
          mobile={snapshots.map((snapshot) => {
            const variancePct =
              snapshot.tenderAmountIsk === 0
                ? 0
                : (snapshot.varianceIsk / snapshot.tenderAmountIsk) * 100
            const positive = snapshot.varianceIsk >= 0

            return (
              <article
                key={snapshot.id}
                className="space-y-3 border-b border-border px-4 py-4 last:border-b-0"
              >
                <div>
                  <p className="font-mono text-xs text-foreground-muted">
                    {formatDateTime(snapshot.frozenAt, locale)}
                  </p>
                  <h3 className="mt-1 text-base font-semibold tracking-tight">
                    {t(snapshot.noteKey)}
                  </h3>
                  <p className="mt-1 text-sm text-foreground-muted">{t(snapshot.frozenByKey)}</p>
                </div>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-foreground-muted">
                      {t('jobCost.snapshots.columns.tender')}
                    </dt>
                    <dd className="mt-0.5 font-medium tabular-nums">
                      {formatIsk(snapshot.tenderAmountIsk, locale)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-foreground-muted">
                      {t('jobCost.snapshots.columns.actual')}
                    </dt>
                    <dd className="mt-0.5 font-medium tabular-nums">
                      {formatIsk(snapshot.actualCostIsk, locale)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-foreground-muted">
                      {t('jobCost.snapshots.columns.variance')}
                    </dt>
                    <dd
                      className={cn(
                        'mt-0.5 font-medium tabular-nums',
                        positive ? 'text-success' : 'text-danger',
                      )}
                    >
                      {formatIsk(snapshot.varianceIsk, locale)} (
                      {formatPct(Math.abs(variancePct), locale)}%)
                    </dd>
                  </div>
                  <div>
                    <dt className="text-foreground-muted">
                      {t('jobCost.snapshots.columns.unconfirmed')}
                    </dt>
                    <dd className="mt-0.5 font-medium tabular-nums">
                      {snapshot.unconfirmedRateLines}/{snapshot.totalRateLines}
                    </dd>
                  </div>
                </dl>
              </article>
            )
          })}
        />
      )}
    </section>
  )
}
