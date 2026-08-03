import { useTranslation } from 'react-i18next'
import { Button, Select } from '../../ui'
import {
  getManualRouteOptions,
  type WeighingDispatchRow,
} from '../../../data/weighingDispatch'
import {
  formatWeighingTonnes,
  weighingProductLabel,
} from './status'

type UnroutedRoutingPanelProps = {
  locale: string
  unroutedRows: WeighingDispatchRow[]
  unroutedSummary: { count: number; tonnes: number }
  routeChoices: Record<string, string>
  onRouteChoiceChange: (rowId: string, value: string) => void
  onRoute: (row: WeighingDispatchRow) => void
}

export function UnroutedRoutingPanel({
  locale,
  unroutedRows,
  unroutedSummary,
  routeChoices,
  onRouteChoiceChange,
  onRoute,
}: UnroutedRoutingPanelProps) {
  const { t } = useTranslation()

  return (
    <div className="space-y-4 rounded-card border border-border bg-surface p-4 shadow-card sm:p-5">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">
          {t('weighingDispatch.unroutedTitle')}
        </h2>
        <p className="mt-1 text-sm text-foreground-muted">
          {t('weighingDispatch.unroutedSummary', {
            count: unroutedSummary.count,
            tonnes: formatWeighingTonnes(unroutedSummary.tonnes, locale),
          })}
        </p>
      </div>

      {unroutedRows.length === 0 ? (
        <p className="text-sm text-foreground-muted">{t('weighingDispatch.unroutedEmpty')}</p>
      ) : (
        <ul className="divide-y divide-border rounded-control border border-border">
          {unroutedRows.map((row) => {
            const options = getManualRouteOptions(row.direction)
            const selected = routeChoices[row.id] ?? options[0]?.value ?? ''

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
                    {weighingProductLabel(row, t)}
                  </p>
                  <p className="mt-0.5 text-sm text-foreground-muted">
                    {t(`weighingDispatch.direction.${row.direction}`)} · {row.vehicle} ·{' '}
                    {formatWeighingTonnes(row.netTonnes, locale)} t
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
                    onChange={(value) => onRouteChoiceChange(row.id, value)}
                  />
                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    className="shrink-0"
                    onClick={() => onRoute(row)}
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
  )
}
