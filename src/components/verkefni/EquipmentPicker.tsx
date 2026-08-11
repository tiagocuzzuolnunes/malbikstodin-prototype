import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  getMaintenanceEquipmentStats,
  maintenanceEquipment,
  type EquipmentServiceStatus,
} from '../../data/equipmentMaintenance'
import { statusRowBg } from '../../lib/statusRowTint'
import { cn } from '../../lib/utils'
import { buttonVariants, Card, StatusDotBadge } from '../ui'
import { SectionPage } from '../shared'

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

const serviceRowTint: Record<EquipmentServiceStatus, string> = {
  overdue: statusRowBg.danger,
  dueSoon: statusRowBg.alert,
  ok: statusRowBg.success,
}

function formatHours(value: number, locale: string, unit: string) {
  return `${new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value)} ${unit}`
}

export default function EquipmentPicker() {
  const { t, i18n } = useTranslation()
  const locale = i18n.resolvedLanguage ?? i18n.language
  const hoursUnit = t('equipmentMaintenance.hoursUnit')
  const stats = getMaintenanceEquipmentStats()

  const statCards = [
    {
      id: 'total',
      labelKey: 'equipmentMaintenance.list.stats.total',
      value: stats.total,
    },
    {
      id: 'overdue',
      labelKey: 'equipmentMaintenance.list.stats.overdue',
      value: stats.overdue,
      tone: 'danger' as const,
    },
    {
      id: 'dueSoon',
      labelKey: 'equipmentMaintenance.list.stats.dueSoon',
      value: stats.dueSoon,
      tone: 'alert' as const,
    },
    {
      id: 'ok',
      labelKey: 'equipmentMaintenance.list.stats.ok',
      value: stats.ok,
      tone: 'success' as const,
    },
  ]

  return (
    <div className="min-w-0 space-y-5 sm:space-y-8">
      <SectionPage
        titleKey="equipmentMaintenance.list.title"
        descriptionKey="equipmentMaintenance.list.subtitle"
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.id} elevated padding="md" className="min-h-0 min-w-0">
            <p className="text-xs font-medium tracking-wide text-foreground-muted sm:text-sm">
              {t(stat.labelKey)}
            </p>
            <p
              className={cn(
                'mt-2 text-2xl font-semibold tracking-tight tabular-nums sm:mt-3 sm:text-4xl',
                stat.tone === 'danger' && 'text-danger',
                stat.tone === 'alert' && 'text-alert',
                stat.tone === 'success' && 'text-success',
              )}
            >
              {stat.value.toLocaleString(locale)}
            </p>
          </Card>
        ))}
      </div>

      <Card elevated padding="lg" className="min-h-0 w-full min-w-0">
        <div className="min-w-0 overflow-hidden rounded-card border border-border">
          <div className="md:hidden">
            {maintenanceEquipment.map((item) => (
              <article
                key={item.id}
                className={cn(
                  'space-y-3 border-b border-border px-4 py-4 last:border-b-0',
                  serviceRowTint[item.serviceStatus],
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-mono text-xs tracking-wide text-foreground-muted">
                      {item.serial}
                    </p>
                    <h3 className="mt-1 font-semibold tracking-tight wrap-break-word">
                      {t(item.nameKey)}
                    </h3>
                  </div>
                  <StatusDotBadge
                    label={t(
                      `equipmentMaintenance.serviceStatus.${item.serviceStatus}`,
                    )}
                    className={serviceStatusClass[item.serviceStatus]}
                    dotClassName={serviceStatusDot[item.serviceStatus]}
                  />
                </div>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-foreground-muted">
                      {t('equipmentMaintenance.list.columns.department')}
                    </dt>
                    <dd className="mt-0.5">{t(item.departmentKey)}</dd>
                  </div>
                  <div>
                    <dt className="text-foreground-muted">
                      {t('equipmentMaintenance.list.columns.meter')}
                    </dt>
                    <dd className="mt-0.5 tabular-nums">
                      {formatHours(item.meterReadingHours, locale, hoursUnit)}
                    </dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-foreground-muted">
                      {t('equipmentMaintenance.list.columns.nextService')}
                    </dt>
                    <dd className="mt-0.5">
                      {t(item.nextServiceLabelKey)}
                      {' · '}
                      {t('equipmentMaintenance.stats.nextServiceValue', {
                        hours: item.nextServiceInHours,
                      })}
                    </dd>
                  </div>
                </dl>
                <Link
                  to={`/verkefni/vidhald/${item.id}`}
                  className={cn(
                    buttonVariants({ variant: 'primary', size: 'md' }),
                    'w-full',
                  )}
                >
                  {t('equipmentMaintenance.list.open')}
                </Link>
              </article>
            ))}
          </div>

          <div className="hidden min-w-0 md:block">
            <table className="w-full table-fixed border-collapse text-left text-sm">
              <colgroup>
                <col className="w-[10%]" />
                <col className="w-[22%]" />
                <col className="w-[14%]" />
                <col className="w-[14%]" />
                <col className="w-[12%]" />
                <col className="w-[16%]" />
                <col className="w-[12%]" />
              </colgroup>
              <thead>
                <tr className="border-b border-border bg-surface-muted">
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('equipmentMaintenance.list.columns.serial')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('equipmentMaintenance.list.columns.name')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('equipmentMaintenance.list.columns.department')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('equipmentMaintenance.list.columns.status')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('equipmentMaintenance.list.columns.meter')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('equipmentMaintenance.list.columns.nextService')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    <span className="sr-only">
                      {t('equipmentMaintenance.list.open')}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {maintenanceEquipment.map((item) => (
                  <tr
                    key={item.id}
                    className={cn(
                      'h-14 border-b border-border last:border-b-0',
                      serviceRowTint[item.serviceStatus],
                    )}
                  >
                    <td className="truncate px-2 align-middle font-mono text-xs tracking-wide text-foreground-muted">
                      {item.serial}
                    </td>
                    <td className="truncate px-2 align-middle font-medium">
                      {t(item.nameKey)}
                    </td>
                    <td className="truncate px-2 align-middle text-foreground-muted">
                      {t(item.departmentKey)}
                    </td>
                    <td className="min-w-0 px-2 align-middle">
                      <StatusDotBadge
                        label={t(
                          `equipmentMaintenance.serviceStatus.${item.serviceStatus}`,
                        )}
                        className={cn(
                          serviceStatusClass[item.serviceStatus],
                          'max-w-none whitespace-nowrap',
                        )}
                        dotClassName={serviceStatusDot[item.serviceStatus]}
                      />
                    </td>
                    <td className="truncate px-2 align-middle tabular-nums">
                      {formatHours(item.meterReadingHours, locale, hoursUnit)}
                    </td>
                    <td className="truncate px-2 align-middle text-foreground-muted">
                      {t(item.nextServiceLabelKey)}
                      {' · '}
                      {t('equipmentMaintenance.stats.nextServiceValue', {
                        hours: item.nextServiceInHours,
                      })}
                    </td>
                    <td className="px-2 align-middle">
                      <Link
                        to={`/verkefni/vidhald/${item.id}`}
                        className={cn(
                          buttonVariants({ variant: 'secondary', size: 'sm' }),
                          'whitespace-nowrap',
                        )}
                      >
                        {t('equipmentMaintenance.list.open')}
                      </Link>
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
