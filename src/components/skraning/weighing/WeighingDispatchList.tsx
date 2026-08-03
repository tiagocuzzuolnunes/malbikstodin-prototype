import { useTranslation } from 'react-i18next'
import { Button, Card } from '../../ui'
import { cn } from '../../../lib/utils'
import {
  weighingDispatchStats,
  weighingRouteStatuses,
  type WeighingDispatchRow,
  type WeighingRouteStatus,
} from '../../../data/weighingDispatch'
import {
  formatWeighingTonnes,
  weighingProductLabel,
  weighingRecipientLabel,
  WeighingStatusBadge,
} from './status'

type WeighingDispatchListProps = {
  locale: string
  filtered: WeighingDispatchRow[]
  statusFilter: 'all' | WeighingRouteStatus
  unroutedCount: number
  onStatusFilterChange: (value: 'all' | WeighingRouteStatus) => void
}

export function WeighingDispatchList({
  locale,
  filtered,
  statusFilter,
  unroutedCount,
  onStatusFilterChange,
}: WeighingDispatchListProps) {
  const { t } = useTranslation()

  const filters: { id: 'all' | WeighingRouteStatus; label: string }[] = [
    { id: 'all', label: t('weighingDispatch.filters.all') },
    ...weighingRouteStatuses.map((status) => ({
      id: status,
      label: t(`weighingDispatch.status.${status}`),
    })),
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {weighingDispatchStats.map((stat) => {
          const value = stat.id === 'unrouted' ? unroutedCount : stat.value

          return (
            <Card key={stat.id} elevated padding="md" className="min-h-0 min-w-0">
              <p className="text-xs font-medium tracking-wide text-foreground-muted sm:text-sm">
                {t(stat.labelKey)}
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-tight tabular-nums sm:mt-3 sm:text-4xl">
                {'unit' in stat && stat.unit
                  ? formatWeighingTonnes(stat.value, locale)
                  : value.toLocaleString(locale)}
              </p>
            </Card>
          )
        })}
      </div>

      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label={t('weighingDispatch.filters.label')}
      >
        {filters.map((item) => {
          const isActive = statusFilter === item.id

          return (
            <Button
              key={item.id}
              type="button"
              size="md"
              variant={isActive ? 'primary' : 'ghost'}
              aria-pressed={isActive}
              className={cn(!isActive && 'text-foreground hover:bg-interactive-hover')}
              onClick={() => onStatusFilterChange(item.id)}
            >
              {item.label}
            </Button>
          )
        })}
      </div>

      <div className="overflow-hidden rounded-card border border-border bg-surface shadow-card">
        <div className="md:hidden">
          {filtered.map((row) => (
            <article
              key={row.id}
              className="space-y-3 border-b border-border px-4 py-4 last:border-b-0"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-mono text-xs font-medium tracking-wide text-foreground-muted">
                    {row.time} · {row.weighingNo}
                  </p>
                  <h3 className="mt-1 text-base font-semibold tracking-tight">
                    {weighingProductLabel(row, t)}
                  </h3>
                  <p className="mt-1 text-sm text-foreground-muted">
                    {t(`weighingDispatch.direction.${row.direction}`)} · {row.vehicle}
                  </p>
                </div>
                <WeighingStatusBadge status={row.status} />
              </div>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-foreground-muted">
                    {t('weighingDispatch.columns.recipient')}
                  </dt>
                  <dd className="mt-0.5">{weighingRecipientLabel(row, t)}</dd>
                </div>
                <div>
                  <dt className="text-foreground-muted">{t('weighingDispatch.columns.net')}</dt>
                  <dd className="mt-0.5 tabular-nums">
                    {formatWeighingTonnes(row.netTonnes, locale)}
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-foreground-muted">
                    {t('weighingDispatch.columns.routedTo')}
                  </dt>
                  <dd className="mt-0.5">{t(row.route.labelKey, row.route.labelParams)}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-6xl border-collapse text-left text-sm">
            <caption className="sr-only">{t('weighingDispatch.caption')}</caption>
            <thead>
              <tr className="border-b border-border bg-surface-muted/60">
                <th className="px-3 py-3 text-xs font-semibold tracking-wide text-foreground-muted uppercase">
                  {t('weighingDispatch.columns.time')}
                </th>
                <th className="px-3 py-3 text-xs font-semibold tracking-wide text-foreground-muted uppercase">
                  {t('weighingDispatch.columns.weighingNo')}
                </th>
                <th className="px-3 py-3 text-xs font-semibold tracking-wide text-foreground-muted uppercase">
                  {t('weighingDispatch.columns.direction')}
                </th>
                <th className="px-3 py-3 text-xs font-semibold tracking-wide text-foreground-muted uppercase">
                  {t('weighingDispatch.columns.vehicle')}
                </th>
                <th className="px-3 py-3 text-xs font-semibold tracking-wide text-foreground-muted uppercase">
                  {t('weighingDispatch.columns.product')}
                </th>
                <th className="px-3 py-3 text-xs font-semibold tracking-wide text-foreground-muted uppercase">
                  {t('weighingDispatch.columns.recipient')}
                </th>
                <th className="px-3 py-3 text-xs font-semibold tracking-wide text-foreground-muted uppercase">
                  {t('weighingDispatch.columns.net')}
                </th>
                <th className="px-3 py-3 text-xs font-semibold tracking-wide text-foreground-muted uppercase">
                  {t('weighingDispatch.columns.routedTo')}
                </th>
                <th className="px-3 py-3 text-xs font-semibold tracking-wide text-foreground-muted uppercase">
                  {t('weighingDispatch.columns.status')}
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-interactive-hover/40">
                  <td className="border-b border-border px-3 py-3 tabular-nums text-foreground-muted">
                    {row.time}
                  </td>
                  <td className="border-b border-border px-3 py-3 font-mono text-xs tracking-wide">
                    {row.weighingNo}
                  </td>
                  <td className="border-b border-border px-3 py-3">
                    {t(`weighingDispatch.direction.${row.direction}`)}
                  </td>
                  <td className="border-b border-border px-3 py-3 font-medium">{row.vehicle}</td>
                  <td className="border-b border-border px-3 py-3">
                    {weighingProductLabel(row, t)}
                  </td>
                  <td className="border-b border-border px-3 py-3 text-foreground-muted">
                    {weighingRecipientLabel(row, t)}
                  </td>
                  <td className="border-b border-border px-3 py-3 tabular-nums">
                    {formatWeighingTonnes(row.netTonnes, locale)}
                  </td>
                  <td className="border-b border-border px-3 py-3">
                    {t(row.route.labelKey, row.route.labelParams)}
                  </td>
                  <td className="border-b border-border px-3 py-3">
                    <WeighingStatusBadge status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
