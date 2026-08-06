import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SectionPage } from '../../components/shared'
import { Button, Card } from '../../components/ui'
import { cn } from '../../lib/utils'
import { getInvoiceById, invoices } from '../../data/invoices'
import {
  formatDate,
  formatQuantity,
  lineStatusClass,
  StatusBadge,
} from '../../components/reikningar'

export default function SerfraedingurPage() {
  const { t, i18n } = useTranslation()
  const locale = i18n.resolvedLanguage ?? i18n.language
  const [searchParams] = useSearchParams()
  const initialId = searchParams.get('invoice') ?? invoices[0]?.id
  const [selectedId, setSelectedId] = useState(initialId)
  const [discrepanciesOnly, setDiscrepanciesOnly] = useState(false)

  const invoice = getInvoiceById(selectedId) ?? invoices[0]
  const lines = useMemo(() => {
    if (!invoice) return []
    if (!discrepanciesOnly) return invoice.lines
    return invoice.lines.filter(
      (line) => line.status !== 'matched' && line.status !== 'approvedManually',
    )
  }, [invoice, discrepanciesOnly])

  if (!invoice) {
    return (
      <div className="space-y-8">
        <SectionPage
          titleKey="nav.serfraedingur"
          descriptionKey="pages.reikningar.expertDescription"
        />
      </div>
    )
  }

  const summary = [
    {
      id: 'weighings',
      value: invoice.lineCount,
      labelKey: 'invoices.expert.weighings',
    },
    {
      id: 'trips',
      value: invoice.tripCount,
      labelKey: 'invoices.expert.trips',
    },
    {
      id: 'quantity',
      value: formatQuantity(invoice.totalQuantity, invoice.unit, locale),
      labelKey: 'invoices.expert.quantity',
    },
    {
      id: 'discrepancies',
      value: invoice.discrepancyCount,
      labelKey: 'invoices.expert.discrepancies',
    },
  ]

  const canApprove = invoice.discrepancyCount === 0 || invoice.status === 'ok'

  return (
    <div className="space-y-8">
      <SectionPage
        titleKey="nav.serfraedingur"
        descriptionKey="pages.reikningar.expertDescription"
      />

      <Card elevated padding="md" className="min-h-0">
        <div className="flex flex-wrap items-end gap-4">
          <label className="min-w-56 flex-1 space-y-2">
            <span className="text-sm font-medium text-foreground-muted">
              {t('invoices.expert.selectInvoice')}
            </span>
            <select
              value={invoice.id}
              onChange={(event) => setSelectedId(event.target.value)}
              className="h-11 w-full rounded-control border border-border bg-surface px-3 text-sm"
            >
              {invoices.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.serial} — {item.supplier}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 pb-2 text-sm">
            <input
              type="checkbox"
              checked={discrepanciesOnly}
              onChange={(event) => setDiscrepanciesOnly(event.target.checked)}
              className="size-4 rounded border-border"
            />
            {t('invoices.expert.discrepanciesOnly')}
          </label>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summary.map((stat) => (
          <Card key={stat.id} elevated padding="md" className="min-h-0">
            <p className="text-sm font-medium tracking-wide text-foreground-muted">
              {t(stat.labelKey)}
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-tight tabular-nums">
              {stat.value}
            </p>
          </Card>
        ))}
      </div>

      <Card elevated padding="lg" className="min-h-0 min-w-0">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              {invoice.serial} · {invoice.supplier}
            </h2>
            <p className="mt-1 text-sm text-foreground-muted">
              {formatDate(invoice.invoiceDate, locale)} ·{' '}
              {t(`invoices.type.${invoice.type}`)} · {invoice.jobNumbers.join(', ')}
            </p>
          </div>
          <Button
            variant={canApprove ? 'success' : 'secondary'}
            size="lg"
            className="min-h-11 px-5"
            disabled={!canApprove}
          >
            {t('invoices.actions.approveInvoice')}
          </Button>
        </div>

        {invoice.lines.length === 0 ? (
          <p className="mt-8 text-foreground-muted">{t('invoices.expert.noLines')}</p>
        ) : (
          <div className="mt-6 overflow-hidden rounded-card border border-border">
            <div className="md:hidden">
              {lines.map((line) => (
                <article
                  key={line.id}
                  className={cn(
                    'space-y-2 border-b border-border px-4 py-4 last:border-b-0',
                    line.status !== 'matched' && 'bg-alert/5',
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-xs text-foreground-muted">{line.truck}</p>
                      <h3 className="mt-1 font-semibold">
                        {formatQuantity(line.quantity, line.unit, locale)}
                      </h3>
                    </div>
                    <StatusBadge className={lineStatusClass[line.status]}>
                      {t(`invoices.lineStatus.${line.status}`)}
                    </StatusBadge>
                  </div>
                  <p className="text-sm text-foreground-muted">
                    {formatDate(line.date, locale)} {line.time}
                  </p>
                  <p className="text-sm">
                    {line.matchedTrip
                      ? t('invoices.expert.matchedTo', {
                          trip: line.matchedTrip,
                          driver: line.driver,
                          time: line.tripTime,
                        })
                      : t('invoices.expert.noMatch')}
                  </p>
                </article>
              ))}
            </div>

            <div className="hidden min-w-0 overflow-x-auto md:block">
              <table className="w-full min-w-4xl border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-muted">
                    <th className="px-3 py-3 font-medium text-foreground-muted">
                      {t('invoices.columns.date')}
                    </th>
                    <th className="px-3 py-3 font-medium text-foreground-muted">
                      {t('invoices.columns.quantity')}
                    </th>
                    <th className="px-3 py-3 font-medium text-foreground-muted">
                      {t('invoices.columns.truck')}
                    </th>
                    <th className="px-3 py-3 font-medium text-foreground-muted">
                      {t('invoices.columns.product')}
                    </th>
                    <th className="px-3 py-3 font-medium text-foreground-muted">
                      {t('invoices.columns.trip')}
                    </th>
                    <th className="px-3 py-3 font-medium text-foreground-muted">
                      {t('invoices.columns.status')}
                    </th>
                    <th className="px-3 py-3 font-medium text-foreground-muted">
                      {t('invoices.columns.action')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map((line) => (
                    <tr
                      key={line.id}
                      className={cn(
                        'border-b border-border last:border-b-0 odd:bg-surface even:bg-surface-muted/40',
                        line.status !== 'matched' && 'bg-alert/5 even:bg-alert/10',
                      )}
                    >
                      <td className="px-3 py-3 align-top whitespace-nowrap">
                        {formatDate(line.date, locale)}
                        <span className="mt-1 block text-xs text-foreground-muted">
                          {line.time}
                        </span>
                      </td>
                      <td className="px-3 py-3 align-top tabular-nums font-medium">
                        {formatQuantity(line.quantity, line.unit, locale)}
                      </td>
                      <td className="px-3 py-3 align-top font-mono text-xs">{line.truck}</td>
                      <td className="px-3 py-3 align-top wrap-break-word">
                        <span className="font-medium">{line.internalProduct || '—'}</span>
                        <span className="mt-1 block text-xs text-foreground-muted">
                          {line.supplierProduct}
                        </span>
                      </td>
                      <td className="px-3 py-3 align-top wrap-break-word">
                        {line.matchedTrip ? (
                          <>
                            <span className="font-medium">{line.matchedTrip}</span>
                            <span className="mt-1 block text-xs text-foreground-muted">
                              {line.driver} · {line.tripTime}
                            </span>
                          </>
                        ) : (
                          <span className="text-foreground-muted">—</span>
                        )}
                      </td>
                      <td className="px-3 py-3 align-top">
                        <StatusBadge className={lineStatusClass[line.status]}>
                          {t(`invoices.lineStatus.${line.status}`)}
                        </StatusBadge>
                      </td>
                      <td className="px-3 py-3 align-top">
                        {line.status === 'matched' ? (
                          <span className="text-foreground-muted">—</span>
                        ) : (
                          <div className="flex flex-col gap-1">
                            <Button variant="ghost" size="sm">
                              {t('invoices.actions.matchManually')}
                            </Button>
                            <Button variant="ghost" size="sm">
                              {t('invoices.actions.addNote')}
                            </Button>
                            <Button variant="ghost" size="sm">
                              {t('invoices.actions.reject')}
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
