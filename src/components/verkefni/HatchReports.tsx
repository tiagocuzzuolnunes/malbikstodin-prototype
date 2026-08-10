import { useTranslation } from 'react-i18next'
import {
  hatchReports,
  hatchStats,
  type HatchReportStatus,
} from '../../data/hatch'
import { statusRowBg } from '../../lib/statusRowTint'
import { cn } from '../../lib/utils'
import { Card, StatusDotBadge } from '../ui'

const statusClass: Record<HatchReportStatus, string> = {
  new: 'bg-accent/10 text-accent ring-1 ring-accent/20',
  inProgress: 'bg-alert/15 text-alert ring-1 ring-alert/25',
  awaitingReply: 'bg-alert/15 text-alert ring-1 ring-alert/25',
  closed: 'bg-success/15 text-success ring-1 ring-success/25',
}

const statusDotClass: Record<HatchReportStatus, string> = {
  new: 'bg-accent',
  inProgress: 'bg-alert',
  awaitingReply: 'bg-alert',
  closed: 'bg-success',
}

const statusRowTint: Record<HatchReportStatus, string> = {
  new: statusRowBg.accent,
  inProgress: statusRowBg.alert,
  awaitingReply: statusRowBg.alert,
  closed: statusRowBg.success,
}

function HatchStatusBadge({ status }: { status: HatchReportStatus }) {
  const { t } = useTranslation()

  return (
    <StatusDotBadge
      label={t(`hatch.status.${status}`)}
      className={statusClass[status]}
      dotClassName={statusDotClass[status]}
    />
  )
}

export default function HatchReports() {
  const { t } = useTranslation()

  return (
    <div className="min-w-0 space-y-5 sm:space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            {t('hatch.reportsTitle')}
          </h2>
          <p className="mt-1 text-sm text-foreground-muted">
            {t('hatch.reportsFilter')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3">
        {hatchStats.map((stat) => (
          <Card key={stat.id} elevated padding="md" className="min-h-0 min-w-0">
            <p className="text-xs font-medium tracking-wide text-foreground-muted sm:text-sm">
              {t(stat.labelKey)}
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-tight tabular-nums sm:mt-3 sm:text-4xl">
              {stat.value.toLocaleString()}
            </p>
          </Card>
        ))}
      </div>

      <Card elevated padding="lg" className="min-h-0 w-full min-w-0">
        <div className="min-w-0 overflow-hidden rounded-card border border-border">
          <div className="md:hidden">
            {hatchReports.map((row) => (
              <article
                key={row.id}
                className={cn(
                  'space-y-2 border-b border-border px-4 py-4 last:border-b-0',
                  statusRowTint[row.status],
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-mono text-xs tracking-wide text-foreground-muted">
                      {row.serial}
                    </p>
                    <h3 className="mt-1 font-semibold tracking-tight wrap-break-word">
                      {t(`hatch.types.${row.typeId}`)}
                    </h3>
                  </div>
                  <HatchStatusBadge status={row.status} />
                </div>
                <p className="text-sm text-foreground-muted">
                  {row.jobSerial} · {t('hatch.columns.photos')}: {row.photoCount}
                </p>
                <p className="text-sm wrap-break-word">{t(row.reportKey)}</p>
                <p className="text-sm text-foreground-muted">
                  {row.owner ?? '—'}
                </p>
              </article>
            ))}
          </div>

          <div className="hidden min-w-0 overflow-x-auto md:block">
            <table className="w-full min-w-5xl table-fixed border-collapse text-left text-sm">
              <colgroup>
                <col className="w-[12%]" />
                <col className="w-[14%]" />
                <col className="w-[10%]" />
                <col className="w-[28%]" />
                <col className="w-[8%]" />
                <col className="w-[14%]" />
                <col className="w-[14%]" />
              </colgroup>
              <thead>
                <tr className="border-b border-border bg-surface-muted">
                  <th className="px-3 py-3 font-medium text-foreground-muted">
                    {t('hatch.columns.number')}
                  </th>
                  <th className="px-3 py-3 font-medium text-foreground-muted">
                    {t('hatch.columns.type')}
                  </th>
                  <th className="px-3 py-3 font-medium text-foreground-muted">
                    {t('hatch.columns.job')}
                  </th>
                  <th className="px-3 py-3 font-medium text-foreground-muted">
                    {t('hatch.columns.report')}
                  </th>
                  <th className="px-3 py-3 font-medium text-foreground-muted">
                    {t('hatch.columns.photos')}
                  </th>
                  <th className="px-3 py-3 font-medium text-foreground-muted">
                    {t('hatch.columns.owner')}
                  </th>
                  <th className="px-3 py-3 font-medium text-foreground-muted">
                    {t('hatch.columns.status')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {hatchReports.map((row) => (
                  <tr
                    key={row.id}
                    className={cn(
                      'h-14 border-b border-border last:border-b-0',
                      statusRowTint[row.status],
                    )}
                  >
                    <td className="truncate px-3 align-middle font-mono text-xs tracking-wide text-foreground-muted">
                      {row.serial}
                    </td>
                    <td className="truncate px-3 align-middle">
                      {t(`hatch.types.${row.typeId}`)}
                    </td>
                    <td className="truncate px-3 align-middle tabular-nums">
                      {row.jobSerial}
                    </td>
                    <td className="truncate px-3 align-middle">{t(row.reportKey)}</td>
                    <td className="truncate px-3 align-middle tabular-nums">
                      {row.photoCount}
                    </td>
                    <td className="truncate px-3 align-middle">
                      {row.owner ?? '—'}
                    </td>
                    <td className="min-w-0 px-3 align-middle">
                      <HatchStatusBadge status={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  )
}
