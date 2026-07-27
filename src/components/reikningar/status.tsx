import { cn } from '../../lib/utils'
import type { InvoiceStatus, LineStatus } from '../../data/invoices'

export function StatusBadge({
  className,
  children,
}: {
  className: string
  children: string
}) {
  return (
    <span
      className={cn(
        'inline-flex max-w-full items-center rounded-control px-2 py-0.5 text-xs font-medium tracking-wide',
        className,
      )}
    >
      {children}
    </span>
  )
}

export const invoiceStatusClass: Record<InvoiceStatus, string> = {
  ok: 'bg-success/10 text-success',
  approved: 'bg-success/10 text-success',
  posted: 'bg-success/10 text-success',
  discrepancy: 'bg-alert/15 text-alert',
  awaitingTrips: 'bg-surface-muted text-foreground-muted',
  matching: 'bg-accent/10 text-accent',
}

export const invoiceRowTint: Record<InvoiceStatus, string> = {
  ok: 'border-l-4 border-l-success',
  approved: 'border-l-4 border-l-success',
  posted: 'border-l-4 border-l-success',
  discrepancy: 'border-l-4 border-l-alert',
  awaitingTrips: 'border-l-4 border-l-foreground-muted/40',
  matching: 'border-l-4 border-l-accent',
}

export const lineStatusClass: Record<LineStatus, string> = {
  matched: 'bg-success/10 text-success',
  approvedManually: 'bg-success/10 text-success',
  weighingWithoutTrip: 'bg-alert/15 text-alert',
  tripWithoutWeighing: 'bg-alert/15 text-alert',
  quantityMismatch: 'bg-alert/15 text-alert',
  unknownProduct: 'bg-danger/10 text-danger',
  wrongJob: 'bg-danger/10 text-danger',
  awaitingApproval: 'bg-surface-muted text-foreground-muted',
  rejected: 'bg-danger/10 text-danger',
}

export function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${value}T12:00:00`))
}

export function formatIsk(amount: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'ISK',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatQuantity(quantity: number, unit: string, locale: string) {
  const formatted = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
  }).format(quantity)
  return `${formatted} ${unit === 'm3' ? 'm³' : unit}`
}
