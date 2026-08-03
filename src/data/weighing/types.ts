export const weighingDirections = ['in', 'out'] as const
export type WeighingDirection = (typeof weighingDirections)[number]

export const weighingRouteStatuses = [
  'routed',
  'unrouted',
  'needsReview',
  'awaitingDocket',
  'awaitingInvoice',
  'discrepancy',
] as const
export type WeighingRouteStatus = (typeof weighingRouteStatuses)[number]

export const weighingRouteKinds = [
  'none',
  'tripOnJob',
  'docketToBuyer',
  'purchaseAwaitingInvoice',
  'supplierInvoice',
  'tripJobMissing',
] as const
export type WeighingRouteKind = (typeof weighingRouteKinds)[number]

/** Automatic matching rules (WeighingRouteRules). */
export type WeighingRouteRule = {
  id: string
  nameKey: string
  priority: number
  enabled: boolean
}

/** Delivery note / docket to a buyer (DeliveryNotes). */
export type DeliveryNote = {
  id: string
  number: string
  buyer: string
}

/** Supplier delivery compared to invoice (SupplierDeliveries). */
export type SupplierDelivery = {
  id: string
  supplier: string
  site: string
  docketNumber?: string
  invoicedQuantity?: number
}

/** Where a weighing went and whether it landed (WeighingRoutes). */
export type WeighingRoute = {
  kind: WeighingRouteKind
  /** Display label for the destination (job, trip, docket, invoice…). */
  labelKey: string
  labelParams?: Record<string, string | number>
  deliveryNoteId?: string
  supplierDeliveryId?: string
  tripId?: string
  jobNumber?: string
}

export type WeighingDispatchRow = {
  id: string
  time: string
  weighingNo: string
  direction: WeighingDirection
  vehicle: string
  productCode: string
  productNameKey: string
  /** Job / recipient shown in the table (may be empty or “missing”). */
  recipientKey: string
  recipientParams?: Record<string, string | number>
  netTonnes: number
  route: WeighingRoute
  status: WeighingRouteStatus
  selected?: boolean
}

/** Manual routing choices offered for unrouted weighings. */
export type ManualRouteOption = {
  value: string
  kind: Exclude<WeighingRouteKind, 'none'>
  labelKey: string
  status: WeighingRouteStatus
  labelParams?: Record<string, string | number>
  recipientKey?: string
  recipientParams?: Record<string, string | number>
  tripId?: string
  jobNumber?: string
  deliveryNoteId?: string
  supplierDeliveryId?: string
}

export type WeighbridgeId = 'wb-asphalt-1' | 'wb-asphalt-2' | 'wb-quarry'

export type WeighingProductId = '1204' | '1211' | '3002'

export type WeighingJobId = '26-0412' | '26-0388' | '26-0401'

export type RegisterWeighingInput = {
  scaleId: WeighbridgeId
  direction: WeighingDirection
  equipmentId: string
  vehiclePlate: string
  driverId: string
  productId: WeighingProductId
  jobId: WeighingJobId
  description: string
  netTonnes: number
  grossTonnes: number
}
