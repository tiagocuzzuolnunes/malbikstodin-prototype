import { useTranslation } from 'react-i18next'
import { Gauge, Wrench, CircleDollarSign } from 'lucide-react'
import {
  type EquipmentHistoryType,
  type EquipmentMaintenanceMachine,
  type EquipmentServiceStatus,
} from '../../data/equipmentMaintenance'
import { statusRowBg } from '../../lib/statusRowTint'
import { cn } from '../../lib/utils'
import { Button, Card, StatusDotBadge } from '../ui'

const serviceStatusClass: Record<EquipmentServiceStatus, string> = {
  overdue: 'bg-danger/10 text-danger ring-1 ring-danger/20',
  dueSoon: 'bg-alert/15 text-alert ring-1 ring-alert/25',
  ok: 'bg-success/15 text-success ring-1 ring-success/25',
}

const serviceStatusDot: Record<EquipmentServiceStatus, string> = {
  overdue: 'bg-danger',
  dueSoon: 'bg-alert',
  ok: 'bg-success',
}

const historyTypeClass: Record<EquipmentHistoryType, string> = {
  repair: 'bg-danger/10 text-danger ring-1 ring-danger/20',
  runningHours: 'bg-accent/10 text-accent ring-1 ring-accent/20',
  cost: 'bg-alert/15 text-alert ring-1 ring-alert/25',
  service: 'bg-success/15 text-success ring-1 ring-success/25',
}

const historyTypeDot: Record<EquipmentHistoryType, string> = {
  repair: 'bg-danger',
  runningHours: 'bg-accent',
  cost: 'bg-alert',
  service: 'bg-success',
}

const historyRowTint: Record<EquipmentHistoryType, string> = {
  repair: statusRowBg.danger,
  runningHours: statusRowBg.accent,
  cost: statusRowBg.alert,
  service: statusRowBg.success,
}

function formatIsk(amount: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'ISK',
    maximumFractionDigits: 2,
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount)
}

function formatHours(value: number, locale: string, unit: string) {
  return `${new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value)} ${unit}`
}

function formatShortDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
  }).format(new Date(`${value}T12:00:00`))
}

function HistoryTypeBadge({ type }: { type: EquipmentHistoryType }) {
  const { t } = useTranslation()

  return (
    <StatusDotBadge
      label={t(`equipmentMaintenance.types.${type}`)}
      className={cn(historyTypeClass[type], 'max-w-none whitespace-nowrap')}
      dotClassName={historyTypeDot[type]}
    />
  )
}

export default function EquipmentMaintenance({
  machine,
}: {
  machine: EquipmentMaintenanceMachine
}) {
  const { t, i18n } = useTranslation()
  const locale = i18n.resolvedLanguage ?? i18n.language
  const hoursUnit = t('equipmentMaintenance.hoursUnit')

  function formatStat(stat: EquipmentMaintenanceMachine['stats'][number]) {
    if (stat.valueKey) {
      return t(stat.valueKey, stat.valueParams)
    }
    if (stat.value == null) return '—'
    if (stat.format === 'isk') return formatIsk(stat.value, locale)
    if (stat.format === 'hours') return formatHours(stat.value, locale, hoursUnit)
    if (stat.format === 'iskPerHour') {
      return t('equipmentMaintenance.stats.iskPerHourValue', {
        amount: formatIsk(stat.value, locale),
      })
    }
    return String(stat.value)
  }

  return (
    <div className="min-w-0 space-y-5 sm:space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0 max-w-3xl">
          <p className="font-mono text-xs font-medium tracking-wide text-foreground-muted sm:text-sm">
            {machine.serial}
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-title">
            {t(machine.nameKey)}
          </h1>
          <p className="mt-2 text-sm text-foreground-muted sm:text-body">
            {t(machine.ownerKey)}
            {' · '}
            {t(machine.departmentKey)}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <StatusDotBadge
              label={t(`equipmentMaintenance.serviceStatus.${machine.serviceStatus}`)}
              className={serviceStatusClass[machine.serviceStatus]}
              dotClassName={serviceStatusDot[machine.serviceStatus]}
            />
            <p className="text-sm text-foreground-muted">
              {t('equipmentMaintenance.meterReading', {
                hours: formatHours(machine.meterReadingHours, locale, hoursUnit),
              })}
              {' · '}
              {t('equipmentMaintenance.yesterday', {
                location: t(machine.yesterdayLocationKey),
              })}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" variant="secondary" size="md">
            <Wrench className="h-4 w-4" aria-hidden />
            {t('equipmentMaintenance.actions.logService')}
          </Button>
          <Button type="button" variant="secondary" size="md">
            <Gauge className="h-4 w-4" aria-hidden />
            {t('equipmentMaintenance.actions.logMeter')}
          </Button>
          <Button type="button" variant="primary" size="md">
            <CircleDollarSign className="h-4 w-4" aria-hidden />
            {t('equipmentMaintenance.actions.logCost')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 min-[560px]:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        {machine.stats.map((stat) => (
          <Card key={stat.id} elevated padding="md" className="@container min-h-0 min-w-0">
            <p className="truncate text-xs font-medium tracking-wide text-foreground-muted sm:text-sm">
              {stat.id === 'nextService'
                ? t('equipmentMaintenance.stats.nextServiceLabel', {
                    service: t(stat.labelKey),
                  })
                : t(stat.labelKey)}
            </p>
            <p
              className={cn(
                'mt-2 whitespace-nowrap font-semibold tracking-tight tabular-nums sm:mt-3',
                'text-[clamp(1.125rem,calc(0.55rem+5.5cqi),1.875rem)]',
                stat.id === 'nextService' &&
                  machine.serviceStatus === 'overdue' &&
                  'text-danger',
              )}
            >
              {formatStat(stat)}
            </p>
          </Card>
        ))}
      </div>

      <Card elevated padding="lg" className="min-h-0 w-full min-w-0">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              {t('equipmentMaintenance.historyTitle')}
            </h2>
            <p className="mt-1 text-sm text-foreground-muted">
              {t('equipmentMaintenance.historySubtitle')}
            </p>
          </div>
        </div>

        <div className="mt-6 min-w-0 overflow-hidden rounded-card border border-border">
          <div className="md:hidden">
            {machine.history.map((row) => (
              <article
                key={row.id}
                className={cn(
                  'space-y-2 border-b border-border px-4 py-4 last:border-b-0',
                  historyRowTint[row.type],
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-medium tracking-wide text-foreground-muted">
                      {formatShortDate(row.date, locale)}
                    </p>
                    <h3 className="mt-1 font-semibold tracking-tight wrap-break-word">
                      {t(row.descriptionKey)}
                    </h3>
                  </div>
                  <HistoryTypeBadge type={row.type} />
                </div>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-foreground-muted">
                      {t('equipmentMaintenance.columns.job')}
                    </dt>
                    <dd className="mt-0.5">
                      {row.jobKey ? t(row.jobKey) : '—'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-foreground-muted">
                      {t('equipmentMaintenance.columns.worker')}
                    </dt>
                    <dd className="mt-0.5">
                      {row.workerKey ? t(row.workerKey) : '—'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-foreground-muted">
                      {t('equipmentMaintenance.columns.hours')}
                    </dt>
                    <dd className="mt-0.5 tabular-nums">
                      {row.hours == null
                        ? '—'
                        : formatHours(row.hours, locale, hoursUnit)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-foreground-muted">
                      {t('equipmentMaintenance.columns.cost')}
                    </dt>
                    <dd className="mt-0.5 tabular-nums">
                      {row.costIsk == null ? '—' : formatIsk(row.costIsk, locale)}
                    </dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-foreground-muted">
                      {t('equipmentMaintenance.columns.source')}
                    </dt>
                    <dd className="mt-0.5">{t(row.sourceKey)}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          <div className="hidden min-w-0 md:block">
            <table className="w-full table-fixed border-collapse text-left text-sm">
              <colgroup>
                <col className="w-[7%]" />
                <col className="w-[15%]" />
                <col className="w-[17%]" />
                <col className="w-[13%]" />
                <col className="w-[13%]" />
                <col className="w-[8%]" />
                <col className="w-[12%]" />
                <col className="w-[15%]" />
              </colgroup>
              <thead>
                <tr className="border-b border-border bg-surface-muted">
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('equipmentMaintenance.columns.date')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('equipmentMaintenance.columns.type')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('equipmentMaintenance.columns.description')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('equipmentMaintenance.columns.job')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('equipmentMaintenance.columns.worker')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('equipmentMaintenance.columns.hours')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('equipmentMaintenance.columns.cost')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('equipmentMaintenance.columns.source')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {machine.history.map((row) => (
                  <tr
                    key={row.id}
                    className={cn(
                      'h-14 border-b border-border last:border-b-0',
                      historyRowTint[row.type],
                    )}
                  >
                    <td className="truncate px-2 align-middle tabular-nums text-foreground-muted">
                      {formatShortDate(row.date, locale)}
                    </td>
                    <td className="px-2 align-middle">
                      <HistoryTypeBadge type={row.type} />
                    </td>
                    <td className="truncate px-2 align-middle font-medium">
                      {t(row.descriptionKey)}
                    </td>
                    <td className="truncate px-2 align-middle text-foreground-muted">
                      {row.jobKey ? t(row.jobKey) : '—'}
                    </td>
                    <td className="truncate px-2 align-middle text-foreground-muted">
                      {row.workerKey ? t(row.workerKey) : '—'}
                    </td>
                    <td className="truncate px-2 align-middle tabular-nums">
                      {row.hours == null
                        ? '—'
                        : formatHours(row.hours, locale, hoursUnit)}
                    </td>
                    <td className="truncate px-2 align-middle tabular-nums">
                      {row.costIsk == null ? '—' : formatIsk(row.costIsk, locale)}
                    </td>
                    <td className="truncate px-2 align-middle text-foreground-muted">
                      {t(row.sourceKey)}
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
