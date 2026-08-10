import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckCircle2, CircleAlert } from 'lucide-react'
import { SectionPage } from '../../components/shared'
import { Button, Card } from '../../components/ui'
import { cn } from '../../lib/utils'
import { rentalInvoices } from '../../data/invoices'
import {
  formatDate,
  formatIsk,
  invoiceRowTint,
  invoiceStatusClass,
  StatusBadge,
} from '../../components/reikningar'

export default function LeigaPage() {
  const { t, i18n } = useTranslation()
  const locale = i18n.resolvedLanguage ?? i18n.language
  const [selectedId, setSelectedId] = useState(rentalInvoices[0]?.id)
  const invoice = rentalInvoices.find((item) => item.id === selectedId) ?? rentalInvoices[0]

  if (!invoice) {
    return (
      <div className="space-y-8">
        <SectionPage titleKey="nav.leiga" descriptionKey="pages.reikningar.rentalDescription" />
      </div>
    )
  }

  const allMatched = invoice.trucks.every((truck) => truck.status === 'matched')

  return (
    <div className="min-w-0 space-y-5 sm:space-y-8">
      <SectionPage titleKey="nav.leiga" descriptionKey="pages.reikningar.rentalDescription" />

      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 scrollbar-none [&::-webkit-scrollbar]:hidden md:scrollbar-auto md:[&::-webkit-scrollbar]:block">
        {rentalInvoices.map((item) => {
          const active = item.id === invoice.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              className={cn(
                'min-w-60 shrink-0 snap-start rounded-card border px-4 py-3.5 text-left transition-colors md:min-w-0 md:py-4',
                active
                  ? 'border-accent shadow-card ring-1 ring-accent/30'
                  : 'border-border hover:brightness-[0.98]',
                invoiceRowTint[item.status],
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs text-foreground-muted">{item.serial}</p>
                  <p className="mt-1 text-lg font-semibold tracking-tight">{item.contractor}</p>
                </div>
                <StatusBadge className={invoiceStatusClass[item.status]}>
                  {t(`invoices.status.${item.status}`)}
                </StatusBadge>
              </div>
              <p className="mt-2 text-sm text-foreground-muted">
                {formatDate(item.periodStart, locale)} – {formatDate(item.periodEnd, locale)}
              </p>
            </button>
          )
        })}
      </div>

      <Card elevated padding="lg" className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              {invoice.contractor}
            </h2>
            <p className="mt-1 text-sm text-foreground-muted">
              {t('invoices.rental.compareHint')}
            </p>
          </div>
          <Button
            variant={allMatched ? 'success' : 'secondary'}
            size="lg"
            className="min-h-12 px-6 text-base"
            disabled={!allMatched}
          >
            {t('invoices.actions.approveInvoice')}
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-card border border-border bg-surface-muted/40 px-4 py-4">
            <p className="text-sm text-foreground-muted">{t('invoices.rental.expected')}</p>
            <p className="mt-2 text-3xl font-semibold tabular-nums">
              {formatIsk(invoice.expectedAmountIsk, locale)}
            </p>
          </div>
          <div className="rounded-card border border-border bg-surface-muted/40 px-4 py-4">
            <p className="text-sm text-foreground-muted">{t('invoices.rental.invoiced')}</p>
            <p className="mt-2 text-3xl font-semibold tabular-nums">
              {formatIsk(invoice.invoiceAmountIsk, locale)}
            </p>
          </div>
        </div>

        <ul className="space-y-4">
          {invoice.trucks.map((truck) => {
            const matched = truck.status === 'matched'
            return (
              <li
                key={truck.id}
                className={cn(
                  'rounded-card border px-4 py-5 sm:px-6',
                  matched ? 'border-success/30 bg-success/5' : 'border-alert/30 bg-alert/5',
                )}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {matched ? (
                      <CheckCircle2 className="mt-1 h-6 w-6 text-success" aria-hidden />
                    ) : (
                      <CircleAlert className="mt-1 h-6 w-6 text-alert" aria-hidden />
                    )}
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight">{truck.truck}</h3>
                      <p className="mt-1 text-sm text-foreground-muted">{truck.date}</p>
                    </div>
                  </div>
                  <StatusBadge
                    className={matched ? 'bg-success/10 text-success' : 'bg-alert/15 text-alert'}
                  >
                    {t(`invoices.rental.truckStatus.${truck.status}`)}
                  </StatusBadge>
                </div>

                <p className="mt-4 text-base font-medium sm:text-lg">
                  {matched
                    ? t('invoices.rental.matchedMessage', {
                        hours: truck.invoiceHours,
                      })
                    : t('invoices.rental.mismatchMessage', {
                        invoiceHours: truck.invoiceHours,
                        registeredHours: truck.registeredHours,
                      })}
                </p>

                <dl className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div>
                    <dt className="text-xs text-foreground-muted">
                      {t('invoices.rental.invoiceHours')}
                    </dt>
                    <dd className="mt-1 text-lg font-semibold tabular-nums">
                      {truck.invoiceHours}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-foreground-muted">
                      {t('invoices.rental.registeredHours')}
                    </dt>
                    <dd className="mt-1 text-lg font-semibold tabular-nums">
                      {truck.registeredHours}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-foreground-muted">
                      {t('invoices.rental.rate')}
                    </dt>
                    <dd className="mt-1 text-lg font-semibold tabular-nums">
                      {formatIsk(truck.rateIsk, locale)}
                    </dd>
                  </div>
                </dl>

                {!matched ? (
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button variant="success" size="lg" className="min-h-11">
                      {t('invoices.actions.okApproveLine')}
                    </Button>
                    <Button variant="secondary" size="lg" className="min-h-11">
                      {t('invoices.actions.addNote')}
                    </Button>
                  </div>
                ) : null}
              </li>
            )
          })}
        </ul>
      </Card>
    </div>
  )
}
