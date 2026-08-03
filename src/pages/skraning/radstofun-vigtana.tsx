import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FileSpreadsheet, RefreshCw } from 'lucide-react'
import {
  UnroutedRoutingPanel,
  WeighingDispatchList,
  WeighingRegistrationForm,
  formatWeighingDate,
} from '../../components/skraning'
import { Button, PillSwitch } from '../../components/ui'
import {
  applyManualRoute,
  createWeighingDispatchRows,
  getManualRouteOptions,
  getUnroutedRows,
  getUnroutedSummary,
  weighingDispatchMeta,
  type WeighingDispatchRow,
  type WeighingRouteStatus,
} from '../../data/weighingDispatch'

type DispatchView = 'register' | 'list'

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
    const choice = routeChoices[row.id] ?? options[0]?.value
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

  return (
    <div className="min-w-0 space-y-5 sm:space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-title">
            {t('nav.radstofunVigtana')}
          </h1>
          <p className="mt-2 text-sm text-foreground-muted sm:text-body">
            {formatWeighingDate(weighingDispatchMeta.date, locale)}
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
        <PillSwitch
          label={t('weighingDispatch.views.label')}
          value={view}
          options={[
            { value: 'register', content: t('weighingDispatch.views.register') },
            { value: 'list', content: t('weighingDispatch.views.list') },
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
            <WeighingDispatchList
              locale={locale}
              filtered={filtered}
              statusFilter={statusFilter}
              unroutedCount={unroutedSummary.count}
              onStatusFilterChange={setStatusFilter}
            />
            <UnroutedRoutingPanel
              locale={locale}
              unroutedRows={unroutedRows}
              unroutedSummary={unroutedSummary}
              routeChoices={routeChoices}
              onRouteChoiceChange={(rowId, value) =>
                setRouteChoices((current) => ({ ...current, [rowId]: value }))
              }
              onRoute={handleRoute}
            />
          </div>
        )}
      </div>
    </div>
  )
}
