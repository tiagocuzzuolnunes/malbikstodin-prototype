import { useTranslation } from 'react-i18next'
import { FileSpreadsheet } from 'lucide-react'
import {
  ownershipMeta,
  ownershipRows,
  ownershipStats,
  type OwnershipStatus,
} from '../../data/dataOwnership'
import { statusRowBg } from '../../lib/statusRowTint'
import { cn } from '../../lib/utils'
import { Button, Card, StatusDotBadge } from '../ui'

const statusClass: Record<OwnershipStatus, string> = {
  decided: 'bg-success/15 text-success ring-1 ring-success/25',
  needsDecision: 'bg-alert/15 text-alert ring-1 ring-alert/25',
  conflict: 'bg-danger/10 text-danger ring-1 ring-danger/20',
  doubleEntry: 'bg-danger/10 text-danger ring-1 ring-danger/20',
  beingBuilt: 'bg-accent/10 text-accent ring-1 ring-accent/20',
}

const statusDotClass: Record<OwnershipStatus, string> = {
  decided: 'bg-success',
  needsDecision: 'bg-alert',
  conflict: 'bg-danger',
  doubleEntry: 'bg-danger',
  beingBuilt: 'bg-accent',
}

const statusRowTint: Record<OwnershipStatus, string> = {
  decided: statusRowBg.success,
  needsDecision: statusRowBg.alert,
  conflict: statusRowBg.danger,
  doubleEntry: statusRowBg.danger,
  beingBuilt: statusRowBg.accent,
}

function OwnershipStatusBadge({ status }: { status: OwnershipStatus }) {
  const { t } = useTranslation()

  return (
    <StatusDotBadge
      label={t(`dataOwnership.status.${status}`)}
      className={statusClass[status]}
      dotClassName={statusDotClass[status]}
    />
  )
}

function cellValue(value: string | null) {
  return value ?? '—'
}

export default function DataOwnership() {
  const { t } = useTranslation()

  return (
    <div className="min-w-0 space-y-5 sm:space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0 max-w-3xl">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-title">
            {t('dataOwnership.title')}
          </h1>
          <p className="mt-2 text-sm text-foreground-muted sm:text-body">
            {t(ownershipMeta.subtitleKey)}
          </p>
        </div>

        <Button type="button" variant="secondary" size="md">
          <FileSpreadsheet className="h-4 w-4" aria-hidden />
          {t('dataOwnership.actions.excel')}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {ownershipStats.map((stat) => (
          <Card key={stat.id} elevated padding="md" className="min-h-0 min-w-0">
            <p className="text-xs font-medium tracking-wide text-foreground-muted sm:text-sm">
              {t(stat.labelKey)}
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-tight tabular-nums sm:mt-3 sm:text-4xl">
              {stat.value.toLocaleString()}
              {stat.percent != null ? (
                <span className="ml-2 text-base font-medium text-foreground-muted sm:text-lg">
                  {stat.percent}%
                </span>
              ) : null}
            </p>
          </Card>
        ))}
      </div>

      <Card elevated padding="lg" className="min-h-0 w-full min-w-0">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              {t('dataOwnership.tableTitle')}
            </h2>
            <p className="mt-1 text-sm text-foreground-muted">
              {t('dataOwnership.tableSubtitle')}
            </p>
          </div>
        </div>

        <div className="mt-6 min-w-0 overflow-hidden rounded-card border border-border">
          <div className="md:hidden">
            {ownershipRows.map((row) => (
              <article
                key={row.id}
                className={cn(
                  'space-y-2 border-b border-border px-4 py-4 last:border-b-0',
                  statusRowTint[row.status],
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-semibold tracking-tight wrap-break-word">
                      {t(row.objectKey)}
                    </h3>
                    <p className="mt-1 text-sm text-foreground-muted">
                      {t(row.areaKey)}
                    </p>
                  </div>
                  <OwnershipStatusBadge status={row.status} />
                </div>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-foreground-muted">
                      {t('dataOwnership.columns.owner')}
                    </dt>
                    <dd className="mt-0.5">{cellValue(row.owner)}</dd>
                  </div>
                  <div>
                    <dt className="text-foreground-muted">
                      {t('dataOwnership.columns.displayedIn')}
                    </dt>
                    <dd className="mt-0.5">{cellValue(row.displayedIn)}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-foreground-muted">
                      {t('dataOwnership.columns.sync')}
                    </dt>
                    <dd className="mt-0.5">
                      {row.syncKey ? t(row.syncKey) : '—'}
                    </dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-foreground-muted">
                      {t('dataOwnership.columns.responsible')}
                    </dt>
                    <dd className="mt-0.5">{row.responsible}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          <div className="hidden min-w-0 md:block">
            <table className="w-full table-fixed border-collapse text-left text-sm">
              <colgroup>
                <col className="w-[18%]" />
                <col className="w-[14%]" />
                <col className="w-[10%]" />
                <col className="w-[12%]" />
                <col className="w-[18%]" />
                <col className="w-[14%]" />
                <col className="w-[14%]" />
              </colgroup>
              <thead>
                <tr className="border-b border-border bg-surface-muted">
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('dataOwnership.columns.object')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('dataOwnership.columns.area')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('dataOwnership.columns.owner')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('dataOwnership.columns.displayedIn')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('dataOwnership.columns.sync')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('dataOwnership.columns.responsible')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('dataOwnership.columns.status')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {ownershipRows.map((row) => (
                  <tr
                    key={row.id}
                    className={cn(
                      'h-14 border-b border-border last:border-b-0',
                      statusRowTint[row.status],
                    )}
                  >
                    <td className="truncate px-2 align-middle font-medium">
                      {t(row.objectKey)}
                    </td>
                    <td className="truncate px-2 align-middle text-foreground-muted">
                      {t(row.areaKey)}
                    </td>
                    <td className="truncate px-2 align-middle">
                      {cellValue(row.owner)}
                    </td>
                    <td className="truncate px-2 align-middle">
                      {cellValue(row.displayedIn)}
                    </td>
                    <td className="truncate px-2 align-middle text-foreground-muted">
                      {row.syncKey ? t(row.syncKey) : '—'}
                    </td>
                    <td className="truncate px-2 align-middle">{row.responsible}</td>
                    <td className="min-w-0 truncate px-2 align-middle">
                      <OwnershipStatusBadge status={row.status} />
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
