import { useMemo, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { FileSpreadsheet, RefreshCw } from 'lucide-react'
import { WeighingRegistrationForm } from '../../components/skraning'
import { Button, Card, Select } from '../../components/ui'
import { cn } from '../../lib/utils'
import {
  applyManualRoute,
  createWeighingDispatchRows,
  getManualRouteOptions,
  getUnroutedRows,
  getUnroutedSummary,
  weighingDispatchMeta,
  weighingDispatchStats,
  weighingRouteStatuses,
  type WeighingDispatchRow,
  type WeighingRouteStatus,
} from '../../data/weighingDispatch'

type DispatchView = 'register' | 'list'

function ViewSwitch({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: { value: string; content: ReactNode }[]
  onChange: (value: string) => void
}) {
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  )

  return (
    <div
      role="group"
      aria-label={label}
      className="relative inline-grid grid-cols-2 rounded-pill bg-control p-1"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] rounded-pill bg-surface shadow-sm ring-1 ring-border transition-transform duration-300 ease-out"
        style={{ transform: `translateX(${selectedIndex * 100}%)` }}
      />

      {options.map((option) => {
        const active = option.value === value

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={cn(
              'relative z-10 inline-flex h-9 min-w-28 cursor-pointer items-center justify-center rounded-pill px-4 text-sm font-semibold tracking-wide transition-colors duration-200',
              active
                ? 'text-foreground'
                : 'text-foreground-muted hover:bg-interactive-hover hover:text-foreground',
            )}
          >
            {option.content}
          </button>
        )
      })}
    </div>
  )
}

const statusClass: Record<WeighingRouteStatus, string> = {
  routed: 'bg-success/15 text-success ring-1 ring-success/25',
  unrouted: 'bg-danger/10 text-danger ring-1 ring-danger/20',
  needsReview: 'bg-alert/15 text-alert ring-1 ring-alert/25',
  awaitingDocket: 'bg-accent/10 text-accent ring-1 ring-accent/20',
  awaitingInvoice: 'bg-accent/10 text-accent ring-1 ring-accent/20',
  discrepancy: 'bg-alert/15 text-alert ring-1 ring-alert/25',
}

const statusDotClass: Record<WeighingRouteStatus, string> = {
  routed: 'bg-success',
  unrouted: 'bg-danger',
  needsReview: 'bg-alert',
  awaitingDocket: 'bg-accent',
  awaitingInvoice: 'bg-accent',
  discrepancy: 'bg-alert',
}

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(`${value}T12:00:00`))
}

function formatTonnes(value: number, locale: string) {
  return value.toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function StatusBadge({ status }: { status: WeighingRouteStatus }) {
  const { t } = useTranslation()

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-control px-2.5 py-1 text-xs font-semibold tracking-wide',
        statusClass[status],
      )}
    >
      <span
        aria-hidden
        className={cn('h-1.5 w-1.5 shrink-0 rounded-full', statusDotClass[status])}
      />
      {t(`weighingDispatch.status.${status}`)}
    </span>
  )
}

function productLabel(row: WeighingDispatchRow, t: (key: string) => string) {
  return `${row.productCode} — ${t(row.productNameKey)}`
}

function recipientLabel(
  row: WeighingDispatchRow,
  t: (key: string, options?: Record<string, unknown>) => string,
) {
  const params = { ...row.recipientParams }
  if (
    typeof params.place === 'string' &&
    params.place.startsWith('weighingDispatch.')
  ) {
    params.place = t(params.place)
  }
  return t(row.recipientKey, params)
}

export default function RadstofunVigtanaPage() {
  const { t, i18n } = useTranslation()
  const locale = i18n.resolvedLanguage ?? i18n.language
  const [view, setView] = useState<DispatchView>('register')
  const [rows, setRows] = useState(() => createWeighingDispatchRows())
  const [statusFilter, setStatusFilter] = useState<'all' | WeighingRouteStatus>('all')
  const [routeChoices, setRouteChoices] = useState<Record<string, string>>({})

  const filtered = useMemo(() => {
    if (statusFilter === 'all') return rows
    return rows.filter((row) => row.status === statusFilter)
  }, [rows, statusFilter])

  const unroutedRows = useMemo(() => getUnroutedRows(rows), [rows])
  const unroutedSummary = useMemo(() => getUnroutedSummary(rows), [rows])
  const nextSequence = rows.length + 1

  function handleRegistered(row: WeighingDispatchRow) {
    setRows((current) => [row, ...current])
    setView('list')
  }

  function handleRoute(row: WeighingDispatchRow) {
    const options = getManualRouteOptions(row.direction)
    const choice =
      routeChoices[row.id] ?? options[0]?.value
    const option = options.find((item) => item.value === choice)
    if (!option) return

    setRows((current) =>
      current.map((item) => (item.id === row.id ? applyManualRoute(item, option) : item)),
    )
    setRouteChoices((current) => {
      const next = { ...current }
      delete next[row.id]
      return next
    })
  }

  const filters: { id: 'all' | WeighingRouteStatus; label: string }[] = [
    { id: 'all', label: t('weighingDispatch.filters.all') },
    ...weighingRouteStatuses.map((status) => ({
      id: status,
      label: t(`weighingDispatch.status.${status}`),
    })),
  ]

  return (
    <div className="min-w-0 space-y-5 sm:space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-title">
            {t('nav.radstofunVigtana')}
          </h1>
          <p className="mt-2 text-sm text-foreground-muted sm:text-body">
            {formatDate(weighingDispatchMeta.date, locale)}
            {' · '}
            {t(weighingDispatchMeta.plantKey)}
          </p>
        </div>

        {view === 'list' ? (
          <div className="flex flex-wrap items-center gap-2">
            <Button type="button" variant="secondary" size="md">
              <FileSpreadsheet className="h-4 w-4" aria-hidden />
              {t('weighingDispatch.actions.excel')}
            </Button>
            <Button type="button" variant="primary" size="md">
              <RefreshCw className="h-4 w-4" aria-hidden />
              {t('weighingDispatch.actions.loadData')}
            </Button>
          </div>
        ) : null}
      </div>

      <div className="space-y-4">
        <ViewSwitch
          label={t('weighingDispatch.views.label')}
          value={view}
          options={[
            {
              value: 'register',
              content: t('weighingDispatch.views.register'),
            },
            {
              value: 'list',
              content: t('weighingDispatch.views.list'),
            },
          ]}
          onChange={(next) => setView(next as DispatchView)}
        />

        {view === 'register' ? (
          <WeighingRegistrationForm
            nextSequence={nextSequence}
            onRegistered={handleRegistered}
          />
        ) : (
          <div className="space-y-5 sm:space-y-8">
            <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
              {weighingDispatchStats.map((stat) => {
                const value =
                  stat.id === 'unrouted' ? unroutedSummary.count : stat.value

                return (
                  <Card key={stat.id} elevated padding="md" className="min-h-0 min-w-0">
                    <p className="text-xs font-medium tracking-wide text-foreground-muted sm:text-sm">
                      {t(stat.labelKey)}
                    </p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight tabular-nums sm:mt-3 sm:text-4xl">
                      {'unit' in stat && stat.unit
                        ? formatTonnes(stat.value, locale)
                        : value.toLocaleString(locale)}
                    </p>
                  </Card>
                )
              })}
            </div>

            <section className="space-y-4">
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
                      onClick={() => setStatusFilter(item.id)}
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
                      {productLabel(row, t)}
                    </h3>
                    <p className="mt-1 text-sm text-foreground-muted">
                      {t(`weighingDispatch.direction.${row.direction}`)} · {row.vehicle}
                    </p>
                  </div>
                  <StatusBadge status={row.status} />
                </div>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-foreground-muted">
                      {t('weighingDispatch.columns.recipient')}
                    </dt>
                    <dd className="mt-0.5">
                      {recipientLabel(row, t)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-foreground-muted">{t('weighingDispatch.columns.net')}</dt>
                    <dd className="mt-0.5 tabular-nums">{formatTonnes(row.netTonnes, locale)}</dd>
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
                    <td className="border-b border-border px-3 py-3 font-medium">
                      {row.vehicle}
                    </td>
                    <td className="border-b border-border px-3 py-3">
                      {productLabel(row, t)}
                    </td>
                    <td className="border-b border-border px-3 py-3 text-foreground-muted">
                      {recipientLabel(row, t)}
                    </td>
                    <td className="border-b border-border px-3 py-3 tabular-nums">
                      {formatTonnes(row.netTonnes, locale)}
                    </td>
                    <td className="border-b border-border px-3 py-3">
                      {t(row.route.labelKey, row.route.labelParams)}
                    </td>
                    <td className="border-b border-border px-3 py-3">
                      <StatusBadge status={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4 rounded-card border border-border bg-surface p-4 shadow-card sm:p-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                {t('weighingDispatch.unroutedTitle')}
              </h2>
              <p className="mt-1 text-sm text-foreground-muted">
                {t('weighingDispatch.unroutedSummary', {
                  count: unroutedSummary.count,
                  tonnes: formatTonnes(unroutedSummary.tonnes, locale),
                })}
              </p>
            </div>
          </div>

          {unroutedRows.length === 0 ? (
            <p className="text-sm text-foreground-muted">
              {t('weighingDispatch.unroutedEmpty')}
            </p>
          ) : (
            <ul className="divide-y divide-border rounded-control border border-border">
              {unroutedRows.map((row) => {
                const options = getManualRouteOptions(row.direction)
                const selected =
                  routeChoices[row.id] ?? options[0]?.value ?? ''

                return (
                  <li
                    key={row.id}
                    className="flex flex-col gap-3 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-4"
                  >
                    <div className="min-w-0">
                      <p className="font-mono text-xs font-medium tracking-wide text-foreground-muted">
                        {row.time} · {row.weighingNo}
                      </p>
                      <p className="mt-1 font-medium tracking-tight">
                        {productLabel(row, t)}
                      </p>
                      <p className="mt-0.5 text-sm text-foreground-muted">
                        {t(`weighingDispatch.direction.${row.direction}`)} · {row.vehicle} ·{' '}
                        {formatTonnes(row.netTonnes, locale)} t
                      </p>
                    </div>

                    <div className="flex w-full flex-col gap-2 sm:w-auto sm:min-w-80 sm:flex-row sm:items-center">
                      <Select
                        id={`route-${row.id}`}
                        value={selected}
                        maxVisibleOptions={5}
                        className="min-w-0 flex-1"
                        options={options.map((option) => ({
                          value: option.value,
                          label: t(option.labelKey),
                        }))}
                        onChange={(value) =>
                          setRouteChoices((current) => ({
                            ...current,
                            [row.id]: value,
                          }))
                        }
                      />
                      <Button
                        type="button"
                        variant="primary"
                        size="md"
                        className="shrink-0"
                        onClick={() => handleRoute(row)}
                      >
                        {t('weighingDispatch.actions.route')}
                      </Button>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}
