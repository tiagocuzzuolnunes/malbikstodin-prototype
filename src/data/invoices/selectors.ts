import type { InvoiceStatus } from './types'
import { invoices } from './seed'

export function getInvoiceById(id: string) {
  return invoices.find((invoice) => invoice.id === id)
}

export function getInboxInvoices() {
  return [...invoices].sort((a, b) => {
    const order: Record<InvoiceStatus, number> = {
      discrepancy: 0,
      awaitingTrips: 1,
      matching: 2,
      ok: 3,
      approved: 4,
      posted: 5,
    }
    return order[a.status] - order[b.status]
  })
}
