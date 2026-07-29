import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionPage } from '../../components/shared'
import { Button, Card } from '../../components/ui'
import { missingTrips } from '../../data/invoices'
import {
  formatDate,
  formatQuantity,
  StatusBadge,
} from '../../components/reikningar'

export default function VantarPage() {
  const { t, i18n } = useTranslation()
  const locale = i18n.resolvedLanguage ?? i18n.language
  const [registered, setRegistered] = useState<string[]>([])

  const open = missingTrips.filter((trip) => !registered.includes(trip.id))

  return (
    <div className="space-y-8">
      <SectionPage titleKey="nav.vantar" descriptionKey="pages.reikningar.missingDescription" />

      <div className="grid gap-4 sm:grid-cols-2">
        <Card elevated padding="md">
          <p className="text-sm font-medium text-foreground-muted">
            {t('invoices.missing.openCount')}
          </p>
          <p className="mt-3 text-4xl font-semibold tabular-nums">{open.length}</p>
        </Card>
        <Card elevated padding="md">
          <p className="text-sm font-medium text-foreground-muted">
            {t('invoices.missing.registeredCount')}
          </p>
          <p className="mt-3 text-4xl font-semibold tabular-nums">{registered.length}</p>
        </Card>
      </div>

      <Card elevated padding="lg" className="min-h-0 min-w-0">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {t('invoices.missing.title')}
          </h2>
          <p className="mt-1 text-sm text-foreground-muted">
            {t('invoices.missing.subtitle')}
          </p>
        </div>

        {open.length === 0 ? (
          <p className="mt-8 text-foreground-muted">{t('invoices.missing.empty')}</p>
        ) : (
          <div className="mt-6 overflow-hidden rounded-card border border-border">
            <div className="md:hidden">
              {open.map((trip) => (
                <article
                  key={trip.id}
                  className="space-y-3 border-b border-border px-4 py-4 last:border-b-0"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-xs text-foreground-muted">{trip.truck}</p>
                      <h3 className="mt-1 font-semibold">{trip.owner}</h3>
                    </div>
                    <StatusBadge className="bg-surface-muted text-foreground-muted">
                      {t(`invoices.missing.source.${trip.source}`)}
                    </StatusBadge>
                  </div>
                  <p className="text-sm text-foreground-muted">
                    {formatDate(trip.date, locale)} {trip.time} ·{' '}
                    {formatQuantity(trip.quantity, trip.unit, locale)}
                  </p>
                  <p className="text-sm">
                    {trip.product} · {trip.jobNumber}
                  </p>
                  <Button
                    variant="primary"
                    size="lg"
                    className="min-h-11 w-full"
                    onClick={() => setRegistered((ids) => [...ids, trip.id])}
                  >
                    {t('invoices.actions.registerTrip')}
                  </Button>
                </article>
              ))}
            </div>

            <div className="hidden min-w-0 md:block">
              <table className="w-full table-fixed border-collapse text-left text-sm">
                <colgroup>
                  <col className="w-[12%]" />
                  <col className="w-[10%]" />
                  <col className="w-[10%]" />
                  <col className="w-[14%]" />
                  <col className="w-[20%]" />
                  <col className="w-[10%]" />
                  <col className="w-[10%]" />
                  <col className="w-[14%]" />
                </colgroup>
                <thead>
                  <tr className="border-b border-border bg-surface-muted">
                    <th className="px-3 py-3 font-medium text-foreground-muted">
                      {t('invoices.columns.date')}
                    </th>
                    <th className="px-3 py-3 font-medium text-foreground-muted">
                      {t('invoices.columns.time')}
                    </th>
                    <th className="px-3 py-3 font-medium text-foreground-muted">
                      {t('invoices.columns.truck')}
                    </th>
                    <th className="px-3 py-3 font-medium text-foreground-muted">
                      {t('invoices.columns.owner')}
                    </th>
                    <th className="px-3 py-3 font-medium text-foreground-muted">
                      {t('invoices.columns.product')}
                    </th>
                    <th className="px-3 py-3 font-medium text-foreground-muted">
                      {t('invoices.columns.job')}
                    </th>
                    <th className="px-3 py-3 font-medium text-foreground-muted">
                      {t('invoices.columns.quantity')}
                    </th>
                    <th className="px-3 py-3 font-medium text-foreground-muted">
                      {t('invoices.columns.action')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {open.map((trip) => (
                    <tr
                      key={trip.id}
                      className="border-b border-border last:border-b-0 odd:bg-surface even:bg-surface-muted/40"
                    >
                      <td className="px-3 py-3 align-top">
                        {formatDate(trip.date, locale)}
                      </td>
                      <td className="px-3 py-3 align-top">{trip.time}</td>
                      <td className="px-3 py-3 align-top font-mono text-xs">{trip.truck}</td>
                      <td className="px-3 py-3 align-top wrap-break-word">{trip.owner}</td>
                      <td className="px-3 py-3 align-top wrap-break-word">
                        {trip.product}
                        <span className="mt-1 block text-xs text-foreground-muted">
                          {t(`invoices.missing.source.${trip.source}`)}
                        </span>
                      </td>
                      <td className="px-3 py-3 align-top font-mono text-xs">
                        {trip.jobNumber}
                      </td>
                      <td className="px-3 py-3 align-top tabular-nums">
                        {formatQuantity(trip.quantity, trip.unit, locale)}
                      </td>
                      <td className="px-3 py-3 align-top">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => setRegistered((ids) => [...ids, trip.id])}
                        >
                          {t('invoices.actions.registerTrip')}
                        </Button>
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
