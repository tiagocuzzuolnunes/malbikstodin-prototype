import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Inbox } from 'lucide-react'
import { buttonVariants, Card } from '../ui'
import { cn } from '../../lib/utils'
import { getInboxInvoices, invoiceStats } from '../../data/invoices'
import {
  formatDate,
  formatIsk,
  formatQuantity,
  invoiceRowTint,
  invoiceStatusClass,
  StatusBadge,
} from './status'

/** Four key metrics for the mobile 2×2 grid */
const mobileStats = invoiceStats.filter((stat) =>
  ['today', 'discrepancies', 'awaiting', 'missingTrips'].includes(stat.id),
)

export function InvoiceInbox() {
  const { t, i18n } = useTranslation()
  const locale = i18n.resolvedLanguage ?? i18n.language
  const inbox = getInboxInvoices()

  return (
    <>
      {/* Mobile: 2×2 grid of 4 cards */}
      <div className="grid grid-cols-2 gap-3 sm:hidden">
        {mobileStats.map((stat) => (
          <Card key={stat.id} elevated padding="md" className="min-h-0 min-w-0 p-3">
            <p className="text-xs font-medium tracking-wide text-foreground-muted">
              {t(stat.labelKey)}
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-tight tabular-nums">
              {stat.value}
            </p>
          </Card>
        ))}
      </div>

      {/* sm+: full stats row */}
      <div className="hidden gap-4 sm:grid sm:grid-cols-2 xl:grid-cols-5">
        {invoiceStats.map((stat) => (
          <Card key={stat.id} elevated padding="md" className="min-h-0 min-w-0">
            <p className="text-sm font-medium tracking-wide text-foreground-muted">
              {t(stat.labelKey)}
            </p>
            <p className="mt-3 text-4xl font-semibold tracking-tight tabular-nums">
              {stat.value}
            </p>
          </Card>
        ))}
      </div>

      <Card elevated padding="lg" className="min-h-0 min-w-0">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <Inbox className="mt-1 h-6 w-6 shrink-0 text-foreground-muted" aria-hidden />
            <div className="min-w-0">
              <h2 className="text-2xl font-semibold tracking-tight">
                {t('invoices.inbox.title')}
              </h2>
              <p className="mt-1 text-sm text-foreground-muted">
                {t('invoices.inbox.subtitle')}
              </p>
            </div>
          </div>
          <p className="text-sm text-foreground-muted">
            {t('invoices.inbox.count', { count: inbox.length })}
          </p>
        </div>

        <div className="mt-6 min-w-0 overflow-hidden rounded-card border border-border">
          <div className="md:hidden">
            {inbox.map((invoice) => (
              <article
                key={invoice.id}
                className={cn(
                  'space-y-3 border-b border-border px-4 py-4 last:border-b-0',
                  invoiceRowTint[invoice.status],
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-mono text-xs tracking-wide text-foreground-muted">
                      {invoice.serial}
                    </p>
                    <h3 className="mt-1 font-semibold tracking-tight">{invoice.supplier}</h3>
                  </div>
                  <StatusBadge className={invoiceStatusClass[invoice.status]}>
                    {t(`invoices.status.${invoice.status}`)}
                  </StatusBadge>
                </div>
                <p className="text-sm text-foreground-muted">
                  {formatDate(invoice.invoiceDate, locale)} ·{' '}
                  {formatQuantity(invoice.totalQuantity, invoice.unit, locale)} ·{' '}
                  {formatIsk(invoice.amountIsk, locale)}
                </p>
                <InboxAction invoiceId={invoice.id} status={invoice.status} />
              </article>
            ))}
          </div>

          <div className="hidden min-w-0 overflow-x-auto md:block">
            <table className="w-full table-fixed border-collapse text-left text-sm">
              <colgroup>
                <col className="w-[11%]" />
                <col className="w-[16%]" />
                <col className="w-[11%]" />
                <col className="w-[9%]" />
                <col className="w-[11%]" />
                <col className="w-[12%]" />
                <col className="w-[12%]" />
                <col className="w-[18%]" />
              </colgroup>
              <thead>
                <tr className="border-b border-border bg-surface-muted">
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('invoices.columns.serial')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('invoices.columns.supplier')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('invoices.columns.date')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('invoices.columns.lines')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('invoices.columns.quantity')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('invoices.columns.amount')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('invoices.columns.status')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('invoices.columns.action')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {inbox.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className={cn(
                      'border-b border-border last:border-b-0 odd:bg-surface even:bg-surface-muted/40',
                      invoiceRowTint[invoice.status],
                    )}
                  >
                    <td className="px-2 py-3 align-top font-mono text-xs wrap-break-word text-foreground-muted">
                      {invoice.serial}
                    </td>
                    <td className="px-2 py-3 align-top font-medium wrap-break-word">
                      {invoice.supplier}
                    </td>
                    <td className="px-2 py-3 align-top wrap-break-word">
                      {formatDate(invoice.invoiceDate, locale)}
                    </td>
                    <td className="px-2 py-3 align-top tabular-nums">
                      {invoice.lineCount}/{invoice.tripCount}
                    </td>
                    <td className="px-2 py-3 align-top tabular-nums wrap-break-word">
                      {formatQuantity(invoice.totalQuantity, invoice.unit, locale)}
                    </td>
                    <td className="px-2 py-3 align-top tabular-nums wrap-break-word">
                      {formatIsk(invoice.amountIsk, locale)}
                    </td>
                    <td className="px-2 py-3 align-top">
                      <StatusBadge className={invoiceStatusClass[invoice.status]}>
                        {t(`invoices.status.${invoice.status}`)}
                      </StatusBadge>
                    </td>
                    <td className="min-w-0 px-2 py-3 align-top">
                      <InboxAction invoiceId={invoice.id} status={invoice.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </>
  )
}

function InboxAction({
  invoiceId,
  status,
}: {
  invoiceId: string
  status: string
}) {
  const { t } = useTranslation()

  if (status === 'discrepancy') {
    return (
      <Link
        to={`/reikningar/yfirferd?invoice=${invoiceId}`}
        className={cn(
          buttonVariants({ variant: 'alert', size: 'sm' }),
          'h-auto min-h-8 max-w-full whitespace-normal px-2.5 py-1.5 text-left leading-snug',
        )}
      >
        {t('invoices.actions.viewDiscrepancy')}
      </Link>
    )
  }

  if (status === 'awaitingTrips') {
    return (
      <span className="block text-sm wrap-break-word text-foreground-muted">
        {t('invoices.actions.waiting')}
      </span>
    )
  }

  if (status === 'ok' || status === 'approved' || status === 'posted') {
    return (
      <Link
        to={`/reikningar/serfraedingur?invoice=${invoiceId}`}
        className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'max-w-full')}
      >
        {t('invoices.actions.view')}
      </Link>
    )
  }

  return null
}
