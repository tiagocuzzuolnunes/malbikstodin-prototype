import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { ProjectAreaId } from '../../config/projects'
import { employees } from '../../data/employees'
import {
  getEquipmentByArea,
  getTruckStats,
  type EquipmentItem,
  type EquipmentStatus,
} from '../../data/equipment'
import { cn } from '../../lib/utils'
import { Card } from '../ui'

type EquipmentListProps = {
  areaId: ProjectAreaId
}

const statusClass: Record<EquipmentStatus, string> = {
  available: 'bg-success/10 text-success',
  onHold: 'bg-alert/15 text-alert',
  broken: 'bg-danger/10 text-danger',
}

function employeeName(employeeId: string | null) {
  if (!employeeId) return '—'
  return employees.find((employee) => employee.id === employeeId)?.name ?? '—'
}

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${value}T12:00:00`))
}

function Badge({
  className,
  children,
}: {
  className: string
  children: string
}) {
  return (
    <span
      className={cn(
        'inline-flex max-w-full items-center rounded-control px-2 py-0.5 text-xs font-medium tracking-wide wrap-break-word whitespace-normal',
        className,
      )}
    >
      {children}
    </span>
  )
}

function MobileRow({
  item,
  locale,
}: {
  item: EquipmentItem
  locale: string
}) {
  const { t } = useTranslation()

  return (
    <article className="space-y-3 border-b border-border px-4 py-4 last:border-b-0">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-xs font-medium tracking-wide text-foreground-muted">
            {item.serial}
          </p>
          <h3 className="mt-1 text-base font-semibold tracking-tight wrap-break-word">
            {item.name}
          </h3>
        </div>
        <Badge className={statusClass[item.status]}>
          {t(`equipment.status.${item.status}`)}
        </Badge>
      </div>

      <dl className="grid grid-cols-2 gap-x-3 gap-y-3 text-sm">
        <div className="min-w-0">
          <dt className="text-foreground-muted">{t('equipment.columns.plate')}</dt>
          <dd className="mt-0.5 font-mono text-xs tracking-wide">{item.plate}</dd>
        </div>
        <div className="min-w-0">
          <dt className="text-foreground-muted">{t('equipment.columns.lastService')}</dt>
          <dd className="mt-0.5">{formatDate(item.lastServiceAt, locale)}</dd>
        </div>
        <div className="min-w-0 col-span-2">
          <dt className="text-foreground-muted">{t('equipment.columns.assignedTo')}</dt>
          <dd className="mt-0.5 wrap-break-word">{employeeName(item.assignedEmployeeId)}</dd>
        </div>
      </dl>
    </article>
  )
}

export default function EquipmentList({ areaId }: EquipmentListProps) {
  const { t, i18n } = useTranslation()
  const trucks = useMemo(() => getEquipmentByArea(areaId), [areaId])
  const stats = useMemo(() => getTruckStats(trucks), [trucks])

  const summaryCards = [
    { id: 'total', value: stats.total, labelKey: 'equipment.stats.total' },
    { id: 'available', value: stats.available, labelKey: 'equipment.stats.available' },
    { id: 'onHold', value: stats.onHold, labelKey: 'equipment.stats.onHold' },
    { id: 'broken', value: stats.broken, labelKey: 'equipment.stats.broken' },
  ] as const

  return (
    <section className="space-y-6" aria-labelledby="equipment-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="equipment-heading" className="text-2xl font-semibold tracking-tight">
            {t('equipment.title')}
          </h2>
          <p className="mt-1 text-sm text-foreground-muted">{t('equipment.subtitle')}</p>
        </div>
        <p className="text-sm text-foreground-muted">
          {t('equipment.count', { count: trucks.length })}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <Card key={card.id} elevated padding="md" className="min-h-0">
            <p className="text-sm font-medium tracking-wide text-foreground-muted">
              {t(card.labelKey)}
            </p>
            <p className="mt-3 text-4xl font-semibold tracking-tight tabular-nums">
              {card.value}
            </p>
          </Card>
        ))}
      </div>

      <div className="overflow-hidden rounded-card border border-border bg-surface shadow-card">
        <div className="md:hidden">
          {trucks.map((item) => (
            <MobileRow key={item.id} item={item} locale={i18n.language} />
          ))}
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full min-w-3xl table-fixed border-collapse text-left text-sm">
            <colgroup>
              <col className="w-[12%]" />
              <col className="w-[28%]" />
              <col className="w-[12%]" />
              <col className="w-[14%]" />
              <col className="w-[20%]" />
              <col className="w-[14%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-border bg-surface-muted">
                <th className="px-3 py-3 font-medium text-foreground-muted">
                  {t('equipment.columns.serial')}
                </th>
                <th className="px-3 py-3 font-medium text-foreground-muted">
                  {t('equipment.columns.name')}
                </th>
                <th className="px-3 py-3 font-medium text-foreground-muted">
                  {t('equipment.columns.plate')}
                </th>
                <th className="px-3 py-3 font-medium text-foreground-muted">
                  {t('equipment.columns.status')}
                </th>
                <th className="px-3 py-3 font-medium text-foreground-muted">
                  {t('equipment.columns.assignedTo')}
                </th>
                <th className="px-3 py-3 font-medium text-foreground-muted">
                  {t('equipment.columns.lastService')}
                </th>
              </tr>
            </thead>
            <tbody>
              {trucks.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-border last:border-b-0 odd:bg-surface even:bg-surface-muted/40"
                >
                  <td className="px-3 py-3 align-top font-mono text-xs tracking-wide text-foreground-muted">
                    {item.serial}
                  </td>
                  <td className="px-3 py-3 align-top font-medium wrap-break-word whitespace-normal">
                    {item.name}
                  </td>
                  <td className="px-3 py-3 align-top font-mono text-xs tracking-wide">
                    {item.plate}
                  </td>
                  <td className="px-3 py-3 align-top">
                    <Badge className={statusClass[item.status]}>
                      {t(`equipment.status.${item.status}`)}
                    </Badge>
                  </td>
                  <td className="px-3 py-3 align-top wrap-break-word whitespace-normal">
                    {employeeName(item.assignedEmployeeId)}
                  </td>
                  <td className="px-3 py-3 align-top whitespace-normal">
                    {formatDate(item.lastServiceAt, i18n.language)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
