import { useTranslation } from 'react-i18next'
import { Copy, Download, Save } from 'lucide-react'
import {
  truckDayPlanMeta,
  truckDayRows,
  truckDaySlots,
  truckDayStats,
  type TruckDayRow,
  type TruckDayRowStatus,
  type TruckDaySlot,
  type TruckDayStat,
} from '../../data/truckDayPlan'
import { statusRowBg } from '../../lib/statusRowTint'
import { cn } from '../../lib/utils'
import { Button, Card, StatusDotBadge } from '../ui'

const rowTint: Record<TruckDayRowStatus, string> = {
  planned: '',
  unassigned: statusRowBg.muted,
  broken: statusRowBg.danger,
}

const statusClass: Record<Exclude<TruckDayRowStatus, 'planned'>, string> = {
  unassigned: 'bg-foreground-muted/10 text-foreground-muted ring-1 ring-border',
  broken: 'bg-danger/10 text-danger ring-1 ring-danger/20',
}

const statusDot: Record<Exclude<TruckDayRowStatus, 'planned'>, string> = {
  unassigned: 'bg-foreground-muted',
  broken: 'bg-danger',
}

function formatTonnes(value: number, locale: string) {
  return `${new Intl.NumberFormat(locale, {
    maximumFractionDigits: 1,
    minimumFractionDigits: value % 1 === 0 ? 1 : 1,
  }).format(value)} t`
}

function formatSigned(value: number, locale: string) {
  const absolute = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 1,
    minimumFractionDigits: Number.isInteger(value) ? 0 : 1,
  }).format(Math.abs(value))
  if (value > 0) return `+${absolute}`
  if (value < 0) return `−${absolute}`
  return absolute
}

function SlotCell({
  slot,
  empty,
}: {
  slot: TruckDaySlot | undefined
  empty: string
}) {
  const { t } = useTranslation()

  if (!slot) {
    return <span className="text-foreground-muted">{empty}</span>
  }

  return (
    <div className="min-w-0 space-y-0.5">
      <p className="truncate font-medium leading-snug">{t(slot.jobKey)}</p>
      <p className="truncate text-xs leading-snug text-foreground-muted">
        {t(slot.detailKey)}
      </p>
    </div>
  )
}

function TotalsCell({
  trips,
  tonnes,
  locale,
  empty,
}: {
  trips: number | null
  tonnes: number | null
  locale: string
  empty: string
}) {
  const { t } = useTranslation()

  if (trips == null || tonnes == null) {
    return <span className="text-foreground-muted">{empty}</span>
  }

  return (
    <div className="min-w-0 space-y-0.5 tabular-nums">
      <p className="font-medium leading-snug">
        {t('truckDayPlan.tripsCount', { count: trips })}
      </p>
      <p className="text-xs leading-snug text-foreground-muted">
        {formatTonnes(tonnes, locale)}
      </p>
    </div>
  )
}

function VarianceCell({
  row,
  locale,
  empty,
}: {
  row: TruckDayRow
  locale: string
  empty: string
}) {
  const { t } = useTranslation()

  if (row.varianceTrips == null) {
    return <span className="text-foreground-muted">{empty}</span>
  }

  if (row.varianceTrips === 0) {
    return <span className="font-medium tabular-nums">0</span>
  }

  return (
    <div className="min-w-0 space-y-0.5 tabular-nums text-danger">
      <p className="font-medium leading-snug">
        {t('truckDayPlan.tripsVariance', {
          value: formatSigned(row.varianceTrips, locale),
        })}
      </p>
      {row.varianceTonnes != null ? (
        <p className="text-xs leading-snug">
          {formatSigned(row.varianceTonnes, locale)} t
        </p>
      ) : null}
    </div>
  )
}

function formatStatValue(
  stat: TruckDayStat,
  locale: string,
  translate: (key: string, options?: Record<string, string | number>) => string,
) {
  if (stat.valueKey) return translate(stat.valueKey, stat.valueParams)
  if (stat.value == null) return '—'
  if (stat.format === 'tonnes') return formatTonnes(stat.value, locale)
  return stat.value.toLocaleString(locale)
}

export default function TruckDayPlan() {
  const { t, i18n } = useTranslation()
  const locale = i18n.resolvedLanguage ?? i18n.language
  const empty = '—'

  return (
    <div className="min-w-0 space-y-5 sm:space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-title">
            {t(truckDayPlanMeta.titleKey)}
          </h1>
          <p className="mt-2 text-sm text-foreground-muted sm:text-body">
            {t(truckDayPlanMeta.dateKey)}
            {' · '}
            {t(truckDayPlanMeta.plantKey)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" variant="secondary" size="md">
            <Copy className="h-4 w-4" aria-hidden />
            {t('truckDayPlan.actions.copyYesterday')}
          </Button>
          <Button type="button" variant="secondary" size="md">
            <Download className="h-4 w-4" aria-hidden />
            {t('truckDayPlan.actions.loadActuals')}
          </Button>
          <Button type="button" variant="primary" size="md">
            <Save className="h-4 w-4" aria-hidden />
            {t('truckDayPlan.actions.savePlan')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 min-[560px]:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        {truckDayStats.map((stat) => (
          <Card key={stat.id} elevated padding="md" className="@container min-h-0 min-w-0">
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
              {formatStatValue(stat, locale, (key, options) => t(key, options))}
            </p>
          </Card>
        ))}
      </div>

      <Card elevated padding="lg" className="min-h-0 w-full min-w-0">
        <div className="min-w-0 overflow-hidden rounded-card border border-border">
          <div className="md:hidden">
            {truckDayRows.map((row) => (
              <article
                key={row.id}
                className={cn(
                  'space-y-3 border-b border-border px-4 py-4 last:border-b-0',
                  rowTint[row.status],
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-mono text-xs tracking-wide text-foreground-muted">
                      {row.vehicle}
                    </p>
                    <h3 className="mt-1 font-semibold tracking-tight">
                      {row.driverKey
                        ? t(row.driverKey)
                        : t('truckDayPlan.noDriver')}
                    </h3>
                  </div>
                  {row.status !== 'planned' ? (
                    <StatusDotBadge
                      label={t(`truckDayPlan.rowStatus.${row.status}`)}
                      className={statusClass[row.status]}
                      dotClassName={statusDot[row.status]}
                    />
                  ) : null}
                </div>

                {row.status === 'broken' ? (
                  <div className="space-y-1 text-sm">
                    <p className="font-medium">{t(row.breakdownKey!)}</p>
                    <p className="text-foreground-muted">
                      {t('truckDayPlan.hatchReport', { ref: row.hatchRef })}
                    </p>
                  </div>
                ) : (
                  <>
                    <dl className="grid gap-3 text-sm">
                      {truckDaySlots.map((slotMeta) => (
                        <div key={slotMeta.id}>
                          <dt className="text-xs font-medium tracking-wide text-foreground-muted">
                            {t(slotMeta.labelKey)}
                          </dt>
                          <dd className="mt-1">
                            <SlotCell
                              slot={row.slots[slotMeta.id]}
                              empty={empty}
                            />
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <dl className="grid grid-cols-3 gap-3 border-t border-border pt-3 text-sm">
                      <div>
                        <dt className="text-foreground-muted">
                          {t('truckDayPlan.columns.planned')}
                        </dt>
                        <dd className="mt-1">
                          <TotalsCell
                            trips={row.plannedTrips}
                            tonnes={row.plannedTonnes}
                            locale={locale}
                            empty={empty}
                          />
                        </dd>
                      </div>
                      <div>
                        <dt className="text-foreground-muted">
                          {t('truckDayPlan.columns.actual')}
                        </dt>
                        <dd className="mt-1">
                          <TotalsCell
                            trips={row.actualTrips}
                            tonnes={row.actualTonnes}
                            locale={locale}
                            empty={empty}
                          />
                        </dd>
                      </div>
                      <div>
                        <dt className="text-foreground-muted">
                          {t('truckDayPlan.columns.variance')}
                        </dt>
                        <dd className="mt-1">
                          <VarianceCell
                            row={row}
                            locale={locale}
                            empty={empty}
                          />
                        </dd>
                      </div>
                    </dl>
                  </>
                )}
              </article>
            ))}
          </div>

          <div className="hidden min-w-0 md:block">
            <table className="w-full table-fixed border-collapse text-left text-sm">
              <colgroup>
                <col className="w-[14%]" />
                <col className="w-[14%]" />
                <col className="w-[14%]" />
                <col className="w-[14%]" />
                <col className="w-[14%]" />
                <col className="w-[10%]" />
                <col className="w-[10%]" />
                <col className="w-[10%]" />
              </colgroup>
              <thead>
                <tr className="border-b border-border bg-surface-muted">
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('truckDayPlan.columns.vehicleDriver')}
                  </th>
                  {truckDaySlots.map((slot) => (
                    <th
                      key={slot.id}
                      className="px-2 py-3 font-medium text-foreground-muted"
                    >
                      {t(slot.labelKey)}
                    </th>
                  ))}
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('truckDayPlan.columns.planned')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('truckDayPlan.columns.actual')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('truckDayPlan.columns.variance')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {truckDayRows.map((row) => (
                  <tr
                    key={row.id}
                    className={cn(
                      'border-b border-border last:border-b-0',
                      row.status === 'broken' ? 'h-auto' : 'h-16',
                      rowTint[row.status],
                    )}
                  >
                    <td className="px-2 py-2 align-middle">
                      <p className="truncate font-mono text-xs tracking-wide text-foreground-muted">
                        {row.vehicle}
                      </p>
                      <p className="mt-0.5 truncate font-medium">
                        {row.driverKey
                          ? t(row.driverKey)
                          : t('truckDayPlan.noDriver')}
                      </p>
                      {row.status !== 'planned' ? (
                        <div className="mt-1.5">
                          <StatusDotBadge
                            label={t(`truckDayPlan.rowStatus.${row.status}`)}
                            className={cn(
                              statusClass[row.status],
                              'max-w-none whitespace-nowrap',
                            )}
                            dotClassName={statusDot[row.status]}
                          />
                        </div>
                      ) : null}
                    </td>

                    {row.status === 'broken' ? (
                      <td
                        colSpan={truckDaySlots.length + 3}
                        className="px-2 py-3 align-middle"
                      >
                        <p className="font-medium">{t(row.breakdownKey!)}</p>
                        <p className="mt-1 text-sm text-foreground-muted">
                          {t('truckDayPlan.hatchReport', { ref: row.hatchRef })}
                        </p>
                      </td>
                    ) : (
                      <>
                        {truckDaySlots.map((slotMeta) => (
                          <td key={slotMeta.id} className="truncate px-2 align-middle">
                            <SlotCell
                              slot={row.slots[slotMeta.id]}
                              empty={empty}
                            />
                          </td>
                        ))}
                        <td className="truncate px-2 align-middle">
                          <TotalsCell
                            trips={row.plannedTrips}
                            tonnes={row.plannedTonnes}
                            locale={locale}
                            empty={empty}
                          />
                        </td>
                        <td className="truncate px-2 align-middle">
                          <TotalsCell
                            trips={row.actualTrips}
                            tonnes={row.actualTonnes}
                            locale={locale}
                            empty={empty}
                          />
                        </td>
                        <td className="truncate px-2 align-middle">
                          <VarianceCell
                            row={row}
                            locale={locale}
                            empty={empty}
                          />
                        </td>
                      </>
                    )}
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
