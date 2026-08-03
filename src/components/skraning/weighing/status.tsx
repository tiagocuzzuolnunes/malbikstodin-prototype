import { useTranslation } from 'react-i18next'
import { StatusDotBadge } from '../../ui'
import type { WeighingRouteStatus } from '../../../data/weighingDispatch'

export const weighingStatusClass: Record<WeighingRouteStatus, string> = {
  routed: 'bg-success/15 text-success ring-1 ring-success/25',
  unrouted: 'bg-danger/10 text-danger ring-1 ring-danger/20',
  needsReview: 'bg-alert/15 text-alert ring-1 ring-alert/25',
  awaitingDocket: 'bg-accent/10 text-accent ring-1 ring-accent/20',
  awaitingInvoice: 'bg-accent/10 text-accent ring-1 ring-accent/20',
  discrepancy: 'bg-alert/15 text-alert ring-1 ring-alert/25',
}

export const weighingStatusDotClass: Record<WeighingRouteStatus, string> = {
  routed: 'bg-success',
  unrouted: 'bg-danger',
  needsReview: 'bg-alert',
  awaitingDocket: 'bg-accent',
  awaitingInvoice: 'bg-accent',
  discrepancy: 'bg-alert',
}

export function WeighingStatusBadge({ status }: { status: WeighingRouteStatus }) {
  const { t } = useTranslation()

  return (
    <StatusDotBadge
      label={t(`weighingDispatch.status.${status}`)}
      className={weighingStatusClass[status]}
      dotClassName={weighingStatusDotClass[status]}
    />
  )
}

export function formatWeighingDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(`${value}T12:00:00`))
}

export function formatWeighingTonnes(value: number, locale: string) {
  return value.toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function weighingProductLabel(
  row: { productCode: string; productNameKey: string },
  t: (key: string) => string,
) {
  return `${row.productCode} — ${t(row.productNameKey)}`
}

export function weighingRecipientLabel(
  row: {
    recipientKey: string
    recipientParams?: Record<string, string | number>
  },
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
