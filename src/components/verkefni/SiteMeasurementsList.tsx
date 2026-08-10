import { useTranslation } from 'react-i18next'
import {
  formatMeasurementQuantity,
  getMeasurementJob,
  getMeasurementType,
  measurementRegistrations,
  type MeasurementRegistrationStatus,
} from '../../data/siteMeasurements'
import { formatAppDate } from '../../lib/formatDate'
import { statusRowBg } from '../../lib/statusRowTint'
import { cn } from '../../lib/utils'
import { Card, StatusDotBadge } from '../ui'

const statusClass: Record<MeasurementRegistrationStatus, string> = {
  sent: 'bg-accent/10 text-accent ring-1 ring-accent/20',
  reviewed: 'bg-success/15 text-success ring-1 ring-success/25',
  needsReview: 'bg-alert/15 text-alert ring-1 ring-alert/25',
  awaitingFix: 'bg-danger/10 text-danger ring-1 ring-danger/20',
}

const statusDotClass: Record<MeasurementRegistrationStatus, string> = {
  sent: 'bg-accent',
  reviewed: 'bg-success',
  needsReview: 'bg-alert',
  awaitingFix: 'bg-danger',
}

const statusRowTint: Record<MeasurementRegistrationStatus, string> = {
  sent: statusRowBg.accent,
  reviewed: statusRowBg.success,
  needsReview: statusRowBg.alert,
  awaitingFix: statusRowBg.danger,
}

function MeasurementStatusBadge({
  status,
}: {
  status: MeasurementRegistrationStatus
}) {
  const { t } = useTranslation()

  return (
    <StatusDotBadge
      label={t(`siteMeasurements.status.${status}`)}
      className={statusClass[status]}
      dotClassName={statusDotClass[status]}
    />
  )
}

export default function SiteMeasurementsList() {
  const { t, i18n } = useTranslation()
  const locale = i18n.resolvedLanguage ?? i18n.language

  return (
    <Card elevated padding="lg" className="min-h-0 w-full min-w-0">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            {t('siteMeasurements.table.title')}
          </h2>
          <p className="mt-1 text-sm text-foreground-muted">
            {t('siteMeasurements.table.subtitle')}
          </p>
        </div>
        <p className="text-sm text-foreground-muted">
          {t('siteMeasurements.table.count', {
            count: measurementRegistrations.length,
          })}
        </p>
      </div>

      <div className="mt-6 min-w-0 overflow-hidden rounded-card border border-border">
        <div className="md:hidden">
          {measurementRegistrations.map((entry) => {
            const job = getMeasurementJob(entry.jobId)
            const type = getMeasurementType(entry.typeId)
            if (!job || !type) return null

            return (
              <article
                key={entry.id}
                className={cn(
                  'space-y-2 border-b border-border px-4 py-4 last:border-b-0',
                  statusRowTint[entry.status],
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-mono text-xs tracking-wide text-foreground-muted">
                      {job.serial}
                    </p>
                    <h3 className="mt-1 font-semibold tracking-tight wrap-break-word">
                      {t(type.labelKey)}
                    </h3>
                  </div>
                  <MeasurementStatusBadge status={entry.status} />
                </div>
                <p className="text-sm font-medium tabular-nums">
                  {formatMeasurementQuantity(entry.quantity, type.unit)}{' '}
                  {t(`siteMeasurements.units.${type.unit}`)}
                </p>
                <p className="text-sm text-foreground-muted">
                  {t(job.clientKey)} · {formatAppDate(entry.recordedAt, t, locale)}
                </p>
                {entry.note ? (
                  <p className="text-sm text-foreground-muted">{entry.note}</p>
                ) : null}
                <p className="text-sm text-foreground-muted">{entry.recordedBy}</p>
              </article>
            )
          })}
        </div>

        <div className="hidden min-w-0 overflow-x-auto md:block">
          <table className="w-full min-w-4xl table-fixed border-collapse text-left text-sm">
            <colgroup>
              <col className="w-[11%]" />
              <col className="w-[18%]" />
              <col className="w-[12%]" />
              <col className="w-[11%]" />
              <col className="w-[14%]" />
              <col className="w-[18%]" />
              <col className="w-[16%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-border bg-surface-muted">
                <th className="px-3 py-3 font-medium text-foreground-muted">
                  {t('siteMeasurements.table.columns.date')}
                </th>
                <th className="px-3 py-3 font-medium text-foreground-muted">
                  {t('siteMeasurements.table.columns.job')}
                </th>
                <th className="px-3 py-3 font-medium text-foreground-muted">
                  {t('siteMeasurements.table.columns.type')}
                </th>
                <th className="px-3 py-3 font-medium text-foreground-muted">
                  {t('siteMeasurements.table.columns.quantity')}
                </th>
                <th className="px-3 py-3 font-medium text-foreground-muted">
                  {t('siteMeasurements.table.columns.status')}
                </th>
                <th className="px-3 py-3 font-medium text-foreground-muted">
                  {t('siteMeasurements.table.columns.note')}
                </th>
                <th className="px-3 py-3 font-medium text-foreground-muted">
                  {t('siteMeasurements.table.columns.recordedBy')}
                </th>
              </tr>
            </thead>
            <tbody>
              {measurementRegistrations.map((entry) => {
                const job = getMeasurementJob(entry.jobId)
                const type = getMeasurementType(entry.typeId)
                if (!job || !type) return null

                return (
                  <tr
                    key={entry.id}
                    className={cn(
                      'border-b border-border last:border-b-0',
                      statusRowTint[entry.status],
                    )}
                  >
                    <td className="px-3 py-3 align-top tabular-nums text-foreground-muted">
                      {formatAppDate(entry.recordedAt, t, locale)}
                    </td>
                    <td className="px-3 py-3 align-top">
                      <p className="font-mono text-xs tracking-wide text-foreground-muted">
                        {job.serial}
                      </p>
                      <p className="mt-0.5 font-medium wrap-break-word">
                        {t(job.clientKey)}
                      </p>
                    </td>
                    <td className="px-3 py-3 align-top wrap-break-word">
                      {t(type.labelKey)}
                    </td>
                    <td className="px-3 py-3 align-top font-medium tabular-nums whitespace-nowrap">
                      {formatMeasurementQuantity(entry.quantity, type.unit)}{' '}
                      <span className="font-normal text-foreground-muted">
                        {t(`siteMeasurements.units.${type.unit}`)}
                      </span>
                    </td>
                    <td className="px-3 py-3 align-top">
                      <MeasurementStatusBadge status={entry.status} />
                    </td>
                    <td className="px-3 py-3 align-top text-foreground-muted wrap-break-word whitespace-normal">
                      {entry.note ?? '—'}
                    </td>
                    <td className="px-3 py-3 align-top wrap-break-word">
                      {entry.recordedBy}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  )
}
