/** Invoice verification mock data — mirrors the Invoice Verification spec v3.0 */

export type InvoiceStatus =
  | 'ok'
  | 'discrepancy'
  | 'awaitingTrips'
  | 'matching'
  | 'approved'
  | 'posted'

export type InvoiceType = 'supplier' | 'rental'

export type LineStatus =
  | 'matched'
  | 'weighingWithoutTrip'
  | 'tripWithoutWeighing'
  | 'quantityMismatch'
  | 'unknownProduct'
  | 'wrongJob'
  | 'awaitingApproval'
  | 'approvedManually'
  | 'rejected'

export type QuantityUnit = 't' | 'm3'

export type InvoiceLine = {
  id: string
  date: string
  time: string
  truck: string
  supplierProduct: string
  internalProduct: string
  quantity: number
  unit: QuantityUnit
  pit: string
  jobNumber: string
  matchedTrip?: string
  driver?: string
  tripTime?: string
  status: LineStatus
  note?: string
}

export type Invoice = {
  id: string
  serial: string
  supplier: string
  vendorNumber: string
  type: InvoiceType
  invoiceDate: string
  receivedAt: string
  status: InvoiceStatus
  lineCount: number
  tripCount: number
  totalQuantity: number
  unit: QuantityUnit
  discrepancyCount: number
  amountIsk: number
  jobNumbers: string[]
  lines: InvoiceLine[]
  discrepancyMessageKey?: string
}

export type MissingTrip = {
  id: string
  date: string
  time: string
  truck: string
  owner: string
  product: string
  jobNumber: string
  quantity: number
  unit: QuantityUnit
  source: 'ownScale' | 'supplierInvoice'
}

export type RentalTruckLine = {
  id: string
  truck: string
  date: string
  invoiceHours: number
  registeredHours: number
  rateIsk: number
  status: 'matched' | 'discrepancy'
}

export type RentalInvoice = {
  id: string
  serial: string
  contractor: string
  periodStart: string
  periodEnd: string
  status: InvoiceStatus
  trucks: RentalTruckLine[]
  expectedAmountIsk: number
  invoiceAmountIsk: number
}
