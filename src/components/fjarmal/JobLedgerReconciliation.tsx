import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Download, FileSpreadsheet, Link2 } from 'lucide-react'
import {
  jobLedgerMeta,
  jobLedgerRows,
  jobLedgerStats,
  type JobLedgerStatus,
} from '../../data/jobLedger'
import { statusRowBg } from '../../lib/statusRowTint'
import { cn } from '../../lib/utils'
import { Button, Card, StatusDotBadge } from '../ui'
import { LinkOrphanPostingsModal } from './LinkOrphanPostingsModal'

const statusClass: Record<JobLedgerStatus, string> = {
  difference: 'bg-danger/10 text-danger ring-1 ring-danger/20',
  balanced: 'bg-success/15 text-success ring-1 ring-success/25',
  notRecharged: 'bg-alert/15 text-alert ring-1 ring-alert/25',
  readyToClose: 'bg-accent/10 text-accent ring-1 ring-accent/20',
  noJobNumber: 'bg-danger/10 text-danger ring-1 ring-danger/20',
}

const statusDotClass: Record<JobLedgerStatus, string> = {
  difference: 'bg-danger',
  balanced: 'bg-success',
  notRecharged: 'bg-alert',
  readyToClose: 'bg-accent',
  noJobNumber: 'bg-danger',
}

const statusRowTint: Record<JobLedgerStatus, string> = {
  difference: statusRowBg.danger,
  balanced: statusRowBg.success,
  notRecharged: statusRowBg.alert,
  readyToClose: statusRowBg.accent,
  noJobNumber: statusRowBg.danger,
}

function formatLedgerIsk(amount: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'ISK',
    maximumFractionDigits: 2,
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount)
}

function JobLedgerStatusBadge({ status }: { status: JobLedgerStatus }) {
  const { t } = useTranslation()

  return (
    <StatusDotBadge
      label={t(`jobLedger.status.${status}`)}
      className={statusClass[status]}
      dotClassName={statusDotClass[status]}
    />
  )
}

export default function JobLedgerReconciliation() {
  const { t, i18n } = useTranslation()
  const locale = i18n.resolvedLanguage ?? i18n.language
  const [linkModalOpen, setLinkModalOpen] = useState(false)

  function formatAmount(value: number | null | undefined) {
    if (value == null) return '—'
    return formatLedgerIsk(value, locale)
  }

  return (
    <div className="min-w-0 space-y-5 sm:space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-title">
            {t('jobLedger.title')}
          </h1>
          <p className="mt-2 text-sm text-foreground-muted sm:text-body">
            {t(jobLedgerMeta.periodKey)}
            {' · '}
            {t('jobLedger.openJobs', { count: jobLedgerMeta.openJobs })}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" variant="secondary" size="md">
            <Download className="h-4 w-4" aria-hidden />
            {t('jobLedger.actions.importDk')}
          </Button>
          <Button type="button" variant="primary" size="md">
            <FileSpreadsheet className="h-4 w-4" aria-hidden />
            {t('jobLedger.actions.excel')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 min-[560px]:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        {jobLedgerStats.map((stat) => (
          <Card
            key={stat.id}
            elevated
            padding="md"
            className={cn(
              '@container min-h-0 min-w-0',
              stat.id === 'noJobNumber' && 'min-[560px]:max-xl:col-span-2',
            )}
          >
            <p className="truncate text-xs font-medium tracking-wide text-foreground-muted sm:text-sm">
              {t(stat.labelKey)}
            </p>
            <p
              className={cn(
                'mt-2 whitespace-nowrap font-semibold tracking-tight tabular-nums sm:mt-3',
                'text-[clamp(1.125rem,calc(0.55rem+5.5cqi),1.875rem)]',
                stat.tone === 'danger' && 'text-danger',
                stat.tone === 'alert' && 'text-alert',
              )}
            >
              {stat.valueKey
                ? t(stat.valueKey, {
                    ...stat.valueParams,
                    amount: formatLedgerIsk(
                      Number(stat.valueParams?.amount ?? 0),
                      locale,
                    ),
                  })
                : stat.id === 'openJobs'
                  ? (stat.value ?? 0).toLocaleString(locale)
                  : formatAmount(stat.value)}
            </p>
          </Card>
        ))}
      </div>

      <Card
        elevated
        padding="md"
        className="border-danger/25 bg-danger/5"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-relaxed text-balance sm:text-base">
            {t('jobLedger.alert.noJobNumber', {
              count: 17,
              amount: formatLedgerIsk(2418650, locale),
            })}
          </p>
          <Button
            type="button"
            variant="alert"
            size="md"
            className="shrink-0"
            onClick={() => setLinkModalOpen(true)}
          >
            <Link2 className="h-4 w-4" aria-hidden />
            {t('jobLedger.actions.linkToJobs')}
          </Button>
        </div>
      </Card>

      <LinkOrphanPostingsModal
        open={linkModalOpen}
        onClose={() => setLinkModalOpen(false)}
      />

      <Card elevated padding="lg" className="min-h-0 w-full min-w-0">
        <div className="min-w-0 overflow-hidden rounded-card border border-border">
          <div className="md:hidden">
            {jobLedgerRows.map((row) => (
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
                      {row.jobSerial ?? t('jobLedger.missingJob')}
                    </p>
                    <h3 className="mt-1 font-semibold tracking-tight wrap-break-word">
                      {t(row.jobKey)}
                    </h3>
                  </div>
                  <JobLedgerStatusBadge status={row.status} />
                </div>
                <p className="text-sm text-foreground-muted">{t(row.departmentKey)}</p>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-foreground-muted">
                      {t('jobLedger.columns.costDk')}
                    </dt>
                    <dd className="mt-0.5 font-medium tabular-nums">
                      {formatAmount(row.costDk)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-foreground-muted">
                      {t('jobLedger.columns.costBik')}
                    </dt>
                    <dd className="mt-0.5 font-medium tabular-nums">
                      {formatAmount(row.costBik)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-foreground-muted">
                      {t('jobLedger.columns.difference')}
                    </dt>
                    <dd className="mt-0.5 tabular-nums">{formatAmount(row.difference)}</dd>
                  </div>
                  <div>
                    <dt className="text-foreground-muted">
                      {t('jobLedger.columns.notRecharged')}
                    </dt>
                    <dd className="mt-0.5 tabular-nums">
                      {formatAmount(row.notRecharged)}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          <div className="hidden min-w-0 md:block">
            <table className="w-full table-fixed border-collapse text-left text-sm">
              <colgroup>
                <col className="w-[9%]" />
                <col className="w-[20%]" />
                <col className="w-[12%]" />
                <col className="w-[12%]" />
                <col className="w-[12%]" />
                <col className="w-[11%]" />
                <col className="w-[11%]" />
                <col className="w-[13%]" />
              </colgroup>
              <thead>
                <tr className="border-b border-border bg-surface-muted">
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('jobLedger.columns.jobNo')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('jobLedger.columns.job')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('jobLedger.columns.department')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('jobLedger.columns.costDk')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('jobLedger.columns.costBik')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('jobLedger.columns.difference')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('jobLedger.columns.notRecharged')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('jobLedger.columns.status')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {jobLedgerRows.map((row) => (
                  <tr
                    key={row.id}
                    className={cn(
                      'h-14 border-b border-border last:border-b-0',
                      statusRowTint[row.status],
                    )}
                  >
                    <td className="truncate px-2 align-middle font-mono text-xs tracking-wide text-foreground-muted">
                      {row.jobSerial ?? t('jobLedger.missingJob')}
                    </td>
                    <td className="truncate px-2 align-middle font-medium">
                      {t(row.jobKey)}
                    </td>
                    <td className="truncate px-2 align-middle text-foreground-muted">
                      {t(row.departmentKey)}
                    </td>
                    <td className="truncate px-2 align-middle tabular-nums">
                      {formatAmount(row.costDk)}
                    </td>
                    <td className="truncate px-2 align-middle tabular-nums">
                      {formatAmount(row.costBik)}
                    </td>
                    <td className="truncate px-2 align-middle tabular-nums">
                      {formatAmount(row.difference)}
                    </td>
                    <td className="truncate px-2 align-middle tabular-nums">
                      {formatAmount(row.notRecharged)}
                    </td>
                    <td className="min-w-0 truncate px-2 align-middle">
                      <JobLedgerStatusBadge status={row.status} />
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
