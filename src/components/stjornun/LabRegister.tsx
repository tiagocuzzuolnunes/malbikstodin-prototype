import { useTranslation } from 'react-i18next'
import { FlaskConical, Plus } from 'lucide-react'
import {
  labRegisterMeta,
  labRegisterStats,
  labTestRows,
  type LabTestStatus,
} from '../../data/labRegister'
import { statusRowBg } from '../../lib/statusRowTint'
import { cn } from '../../lib/utils'
import { Button, Card, StatusDotBadge } from '../ui'

const statusClass: Record<LabTestStatus, string> = {
  pass: 'bg-success/15 text-success ring-1 ring-success/25',
  borderline: 'bg-alert/15 text-alert ring-1 ring-alert/25',
  fail: 'bg-danger/10 text-danger ring-1 ring-danger/20',
  awaitingResult: 'bg-accent/10 text-accent ring-1 ring-accent/20',
  noBatch: 'bg-surface-muted text-foreground-muted ring-1 ring-border',
}

const statusDotClass: Record<LabTestStatus, string> = {
  pass: 'bg-success',
  borderline: 'bg-alert',
  fail: 'bg-danger',
  awaitingResult: 'bg-accent',
  noBatch: 'bg-foreground-muted',
}

const statusRowTint: Record<LabTestStatus, string> = {
  pass: statusRowBg.success,
  borderline: statusRowBg.alert,
  fail: statusRowBg.danger,
  awaitingResult: statusRowBg.accent,
  noBatch: statusRowBg.muted,
}

function formatLabDate(value: string) {
  const date = new Date(`${value}T12:00:00`)
  if (Number.isNaN(date.getTime())) return value
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${day}.${month}.`
}

function LabStatusBadge({ status }: { status: LabTestStatus }) {
  const { t } = useTranslation()

  if (status === 'noBatch') return null

  return (
    <StatusDotBadge
      label={t(`labRegister.status.${status}`)}
      className={statusClass[status]}
      dotClassName={statusDotClass[status]}
    />
  )
}

export default function LabRegister() {
  const { t } = useTranslation()

  function jobLabel(row: (typeof labTestRows)[number]) {
    if (row.jobSerial) {
      return `${row.jobSerial} · ${t(row.jobLabelKey)}`
    }
    return t(row.jobLabelKey, { weighing: 'V-26-18402' })
  }

  return (
    <div className="min-w-0 space-y-5 sm:space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-title">
            {t('labRegister.title')}
          </h1>
          <p className="mt-2 text-sm text-foreground-muted sm:text-body">
            {t(labRegisterMeta.monthKey)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" variant="secondary" size="md">
            <Plus className="h-4 w-4" aria-hidden />
            {t('labRegister.actions.newBatch')}
          </Button>
          <Button type="button" variant="primary" size="md">
            <FlaskConical className="h-4 w-4" aria-hidden />
            {t('labRegister.actions.recordTest')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {labRegisterStats.map((stat) => (
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
            {labTestRows.map((row) => (
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
                      {row.batch ?? t('labRegister.noBatch')}
                    </p>
                    <h3 className="mt-1 font-semibold tracking-tight wrap-break-word">
                      {t(row.testTypeKey)}
                    </h3>
                  </div>
                  <LabStatusBadge status={row.status} />
                </div>
                <p className="text-sm text-foreground-muted">
                  {formatLabDate(row.date)} · {jobLabel(row)}
                </p>
                <p className="text-sm">
                  {t(row.productKey)}
                  {row.result || row.spec ? (
                    <span className="text-foreground-muted">
                      {' · '}
                      {row.result ?? '—'}
                      {row.spec ? ` · ${row.spec}` : ''}
                    </span>
                  ) : null}
                </p>
              </article>
            ))}
          </div>

          <div className="hidden min-w-0 overflow-x-auto md:block">
            <table className="w-full min-w-5xl table-fixed border-collapse text-left text-sm">
              <colgroup>
                <col className="w-[14%]" />
                <col className="w-[8%]" />
                <col className="w-[18%]" />
                <col className="w-[12%]" />
                <col className="w-[14%]" />
                <col className="w-[10%]" />
                <col className="w-[12%]" />
                <col className="w-[12%]" />
              </colgroup>
              <thead>
                <tr className="border-b border-border bg-surface-muted">
                  <th className="px-3 py-3 font-medium text-foreground-muted">
                    {t('labRegister.columns.batch')}
                  </th>
                  <th className="px-3 py-3 font-medium text-foreground-muted">
                    {t('labRegister.columns.date')}
                  </th>
                  <th className="px-3 py-3 font-medium text-foreground-muted">
                    {t('labRegister.columns.job')}
                  </th>
                  <th className="px-3 py-3 font-medium text-foreground-muted">
                    {t('labRegister.columns.product')}
                  </th>
                  <th className="px-3 py-3 font-medium text-foreground-muted">
                    {t('labRegister.columns.testType')}
                  </th>
                  <th className="px-3 py-3 font-medium text-foreground-muted">
                    {t('labRegister.columns.result')}
                  </th>
                  <th className="px-3 py-3 font-medium text-foreground-muted">
                    {t('labRegister.columns.spec')}
                  </th>
                  <th className="px-3 py-3 font-medium text-foreground-muted">
                    {t('labRegister.columns.status')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {labTestRows.map((row) => (
                  <tr
                    key={row.id}
                    className={cn(
                      'h-14 border-b border-border last:border-b-0',
                      statusRowTint[row.status],
                    )}
                  >
                    <td className="truncate px-3 align-middle font-mono text-xs tracking-wide text-foreground-muted">
                      {row.batch ?? t('labRegister.noBatch')}
                    </td>
                    <td className="truncate px-3 align-middle tabular-nums text-foreground-muted">
                      {formatLabDate(row.date)}
                    </td>
                    <td className="truncate px-3 align-middle font-medium">
                      {jobLabel(row)}
                    </td>
                    <td className="truncate px-3 align-middle">{t(row.productKey)}</td>
                    <td className="truncate px-3 align-middle">{t(row.testTypeKey)}</td>
                    <td className="truncate px-3 align-middle tabular-nums">
                      {row.result ?? '—'}
                    </td>
                    <td className="truncate px-3 align-middle tabular-nums text-foreground-muted">
                      {row.spec ?? '—'}
                    </td>
                    <td className="min-w-0 px-3 align-middle">
                      <LabStatusBadge status={row.status} />
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
