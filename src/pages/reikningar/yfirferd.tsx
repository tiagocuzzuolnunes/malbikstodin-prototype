import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CheckCircle2, CircleAlert, MessageSquare, XCircle } from 'lucide-react'
import { SectionPage } from '../../components/shared'
import { Button, Card, Input, Label } from '../../components/ui'
import { cn } from '../../lib/utils'
import {
  getInboxInvoices,
  type Invoice,
  type InvoiceLine,
} from '../../data/invoices'
import {
  formatDate,
  formatQuantity,
  invoiceStatusClass,
  StatusBadge,
} from '../../components/reikningar'

function openDiscrepancies(invoice: Invoice) {
  return invoice.lines.filter(
    (line) =>
      line.status !== 'matched' &&
      line.status !== 'approvedManually' &&
      line.status !== 'rejected',
  )
}

export default function YfirferdPage() {
  const { t, i18n } = useTranslation()
  const locale = i18n.resolvedLanguage ?? i18n.language
  const [searchParams] = useSearchParams()
  const focusId = searchParams.get('invoice')

  const reviewQueue = useMemo(() => {
    const all = getInboxInvoices().filter((invoice) => invoice.status === 'discrepancy')
    if (!focusId) return all
    const focused = all.find((invoice) => invoice.id === focusId)
    if (!focused) return all
    return [focused, ...all.filter((invoice) => invoice.id !== focusId)]
  }, [focusId])

  const [activeInvoiceIndex, setActiveInvoiceIndex] = useState(0)
  const [lineIndex, setLineIndex] = useState(0)
  const [resolved, setResolved] = useState<Record<string, 'approved' | 'rejected' | 'noted'>>(
    {},
  )
  const [noteOpen, setNoteOpen] = useState(false)
  const [note, setNote] = useState('')
  const [approvedInvoices, setApprovedInvoices] = useState<string[]>([])

  const activeInvoice = reviewQueue[activeInvoiceIndex]
  const discrepancies = activeInvoice ? openDiscrepancies(activeInvoice) : []
  const pending = discrepancies.filter((line) => !resolved[line.id])
  const currentLine = pending[Math.min(lineIndex, Math.max(pending.length - 1, 0))] as
    | InvoiceLine
    | undefined
  const currentOrdinal = discrepancies.findIndex((line) => line.id === currentLine?.id) + 1

  function resolveLine(action: 'approved' | 'rejected' | 'noted') {
    if (!currentLine || !activeInvoice) return
    setResolved((current) => ({ ...current, [currentLine.id]: action }))
    setNoteOpen(false)
    setNote('')
    setLineIndex(0)

    const remaining = pending.filter((line) => line.id !== currentLine.id)
    if (remaining.length === 0) {
      setApprovedInvoices((ids) => [...ids, activeInvoice.id])
    }
  }

  function goNextInvoice() {
    setActiveInvoiceIndex((index) => Math.min(index + 1, reviewQueue.length - 1))
    setLineIndex(0)
    setNoteOpen(false)
  }

  if (!activeInvoice) {
    return (
      <div className="space-y-8">
        <SectionPage titleKey="nav.yfirferd" descriptionKey="pages.reikningar.reviewDescription" />
        <Card elevated padding="lg" className="text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-success" aria-hidden />
          <h2 className="mt-4 text-2xl font-semibold tracking-tight">
            {t('invoices.review.emptyTitle')}
          </h2>
          <p className="mt-2 text-foreground-muted">{t('invoices.review.emptySubtitle')}</p>
          <Link
            to="/reikningar"
            className="mt-6 inline-flex text-accent hover:underline"
          >
            {t('invoices.review.backToInbox')}
          </Link>
        </Card>
      </div>
    )
  }

  const invoiceDone = approvedInvoices.includes(activeInvoice.id) || pending.length === 0

  return (
      <div className="space-y-5 sm:space-y-8">
      <SectionPage titleKey="nav.yfirferd" descriptionKey="pages.reikningar.reviewDescription" />

      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 [scrollbar-width:none] sm:[scrollbar-width:auto] [&::-webkit-scrollbar]:hidden sm:[&::-webkit-scrollbar]:block">
        {reviewQueue.map((invoice, index) => {
          const isActive = index === activeInvoiceIndex
          const done = approvedInvoices.includes(invoice.id)
          return (
            <button
              key={invoice.id}
              type="button"
              onClick={() => {
                setActiveInvoiceIndex(index)
                setLineIndex(0)
                setNoteOpen(false)
              }}
              className={cn(
                'min-w-[14rem] shrink-0 snap-start rounded-card border px-4 py-3.5 text-left transition-colors sm:min-w-0 sm:py-4',
                isActive
                  ? 'border-accent bg-accent/5 shadow-card'
                  : 'border-border bg-surface hover:bg-interactive-hover',
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-mono text-xs text-foreground-muted">{invoice.serial}</p>
                  <p className="mt-1 font-semibold tracking-tight">{invoice.supplier}</p>
                </div>
                <StatusBadge
                  className={
                    done ? invoiceStatusClass.ok : invoiceStatusClass.discrepancy
                  }
                >
                  {done
                    ? t('invoices.status.ok')
                    : t('invoices.status.discrepancy')}
                </StatusBadge>
              </div>
              <p className="mt-2 text-sm text-foreground-muted">
                {t('invoices.review.taskHint', {
                  count: invoice.discrepancyCount,
                })}
              </p>
            </button>
          )
        })}
      </div>

      {invoiceDone ? (
        <Card elevated padding="lg" className="space-y-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-8 w-8 shrink-0 text-success" aria-hidden />
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                {t('invoices.review.readyTitle')}
              </h2>
              <p className="mt-1 text-foreground-muted">
                {t('invoices.review.readySubtitle', { serial: activeInvoice.serial })}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="success" size="lg" className="min-h-12 px-6 text-base">
              {t('invoices.actions.approveInvoice')}
            </Button>
            {activeInvoiceIndex < reviewQueue.length - 1 ? (
              <Button variant="secondary" size="lg" className="min-h-12 px-6" onClick={goNextInvoice}>
                {t('invoices.review.nextInvoice')}
              </Button>
            ) : (
              <Link
                to="/reikningar"
                className="inline-flex min-h-12 items-center rounded-control border border-border bg-surface-muted px-6 text-base font-medium hover:bg-interactive-hover-strong"
              >
                {t('invoices.review.backToInbox')}
              </Link>
            )}
          </div>
        </Card>
      ) : currentLine ? (
        <Card elevated padding="lg" className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <StatusBadge className="bg-alert/15 text-alert">
              {t('invoices.review.discrepancyCounter', {
                current: currentOrdinal || 1,
                total: discrepancies.length,
              })}
            </StatusBadge>
            <p className="text-sm text-foreground-muted">
              {activeInvoice.serial} · {activeInvoice.supplier}
            </p>
          </div>

          <div className="rounded-card border border-alert/30 bg-alert/5 px-5 py-5">
            <div className="flex items-start gap-3">
              <CircleAlert className="mt-0.5 h-6 w-6 shrink-0 text-alert" aria-hidden />
              <p className="text-lg font-semibold tracking-tight sm:text-xl">
                {t(`invoices.discrepancies.${currentLine.status}`, {
                  invoiceTrips: activeInvoice.lineCount,
                  registeredTrips: activeInvoice.tripCount,
                  invoiceQty: currentLine.quantity,
                  registeredQty: currentLine.note?.match(/[\d.]+/)?.[0] ?? '—',
                  truck: currentLine.truck,
                  product: currentLine.supplierProduct,
                })}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-card border border-border bg-surface-muted/40 px-4 py-4">
              <p className="text-xs font-medium uppercase tracking-wide text-foreground-muted">
                {t('invoices.review.invoiceSide')}
              </p>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-foreground-muted">{t('invoices.columns.truck')}</dt>
                  <dd className="font-medium">{currentLine.truck}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-foreground-muted">{t('invoices.columns.quantity')}</dt>
                  <dd className="font-medium tabular-nums">
                    {formatQuantity(currentLine.quantity, currentLine.unit, locale)}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-foreground-muted">{t('invoices.columns.time')}</dt>
                  <dd className="font-medium">
                    {formatDate(currentLine.date, locale)} {currentLine.time}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-foreground-muted">{t('invoices.columns.product')}</dt>
                  <dd className="max-w-[60%] text-right font-medium">
                    {currentLine.supplierProduct}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="rounded-card border border-border bg-surface-muted/40 px-4 py-4">
              <p className="text-xs font-medium uppercase tracking-wide text-foreground-muted">
                {t('invoices.review.systemSide')}
              </p>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-foreground-muted">{t('invoices.columns.trip')}</dt>
                  <dd className="font-medium">{currentLine.matchedTrip ?? '—'}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-foreground-muted">{t('invoices.columns.driver')}</dt>
                  <dd className="font-medium">{currentLine.driver ?? '—'}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-foreground-muted">{t('invoices.columns.job')}</dt>
                  <dd className="font-medium">{currentLine.jobNumber}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-foreground-muted">{t('invoices.columns.status')}</dt>
                  <dd className="font-medium">
                    {t(`invoices.lineStatus.${currentLine.status}`)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {noteOpen ? (
            <div className="space-y-3">
              <Label htmlFor="discrepancy-note">{t('invoices.review.noteLabel')}</Label>
              <Input
                id="discrepancy-note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder={t('invoices.review.notePlaceholder')}
              />
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="min-h-12 px-6"
                  onClick={() => resolveLine('noted')}
                  disabled={!note.trim()}
                >
                  {t('invoices.actions.saveNote')}
                </Button>
                <Button variant="ghost" size="lg" onClick={() => setNoteOpen(false)}>
                  {t('common.cancel')}
                </Button>
              </div>
            </div>
          ) : (
            <div className="sticky bottom-0 z-10 -mx-4 mt-2 space-y-3 border-t border-border bg-surface px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:static sm:mx-0 sm:mt-0 sm:border-0 sm:bg-transparent sm:p-0">
            <div className="grid gap-3 sm:grid-cols-3">
              <Button
                variant="success"
                size="lg"
                className="min-h-14 px-5 text-base"
                onClick={() => resolveLine('approved')}
              >
                <CheckCircle2 className="h-5 w-5" aria-hidden />
                {t('invoices.actions.okApproveLine')}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="min-h-14 px-5 text-base"
                onClick={() => setNoteOpen(true)}
              >
                <MessageSquare className="h-5 w-5" aria-hidden />
                {t('invoices.actions.addNote')}
              </Button>
              <Button
                variant="danger"
                size="lg"
                className="min-h-14 px-5 text-base"
                onClick={() => resolveLine('rejected')}
              >
                <XCircle className="h-5 w-5" aria-hidden />
                {t('invoices.actions.rejectLine')}
              </Button>
            </div>
            </div>
          )}
        </Card>
      ) : null}
    </div>
  )
}
