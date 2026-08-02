/** Weighing dispatch — where plant weighings were routed, and whether they landed. */

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

export const weighingDispatchMeta = {
  date: '2026-07-27',
  plantKey: 'weighingDispatch.plant.asphalt',
} as const

export const weighingDispatchStats = [
  { id: 'weighingsToday', value: 142, labelKey: 'weighingDispatch.stats.weighingsToday' },
  { id: 'unrouted', value: 7, labelKey: 'weighingDispatch.stats.unrouted' },
  { id: 'tonnesOut', value: 1284.6, labelKey: 'weighingDispatch.stats.tonnesOut', unit: 't' },
  { id: 'tonnesIn', value: 412.2, labelKey: 'weighingDispatch.stats.tonnesIn', unit: 't' },
] as const

export const weighingRouteRules: WeighingRouteRule[] = [
  {
    id: 'rule-trip-job',
    nameKey: 'weighingDispatch.rules.tripOnJob',
    priority: 1,
    enabled: true,
  },
  {
    id: 'rule-docket-buyer',
    nameKey: 'weighingDispatch.rules.docketToBuyer',
    priority: 2,
    enabled: true,
  },
  {
    id: 'rule-supplier-invoice',
    nameKey: 'weighingDispatch.rules.supplierInvoice',
    priority: 3,
    enabled: true,
  },
]

export const deliveryNotes: DeliveryNote[] = [
  { id: 'dn-1', number: 'DN-88421', buyer: 'Steypustöðin ehf.' },
]

export const supplierDeliveries: SupplierDelivery[] = [
  {
    id: 'sd-1',
    supplier: 'Björgun',
    site: 'Bolaöldur',
    docketNumber: 'SD-12044',
  },
  {
    id: 'sd-2',
    supplier: 'Björgun',
    site: 'Bolaöldur',
    docketNumber: 'SD-12051',
    invoicedQuantity: 31.2,
  },
]

export const weighingDispatchRows: WeighingDispatchRow[] = [
  {
    id: 'w1',
    time: '07:42',
    weighingNo: 'V-26-18431',
    direction: 'out',
    vehicle: 'MU-471',
    productCode: '1204',
    productNameKey: 'weighingDispatch.products.asphaltY16',
    recipientKey: 'weighingDispatch.recipient.none',
    netTonnes: 18.4,
    route: {
      kind: 'none',
      labelKey: 'weighingDispatch.route.noRouteFound',
    },
    status: 'unrouted',
  },
  {
    id: 'w2',
    time: '07:55',
    weighingNo: 'V-26-18432',
    direction: 'out',
    vehicle: 'JR-T50',
    productCode: '1204',
    productNameKey: 'weighingDispatch.products.asphaltY16',
    recipientKey: 'weighingDispatch.recipient.job',
    recipientParams: { job: '26-0412', place: 'Hringbraut, south lane' },
    netTonnes: 17.9,
    route: {
      kind: 'tripOnJob',
      labelKey: 'weighingDispatch.route.tripOnJob',
      labelParams: { trip: '91 204' },
      tripId: '91-204',
      jobNumber: '26-0412',
    },
    status: 'routed',
  },
  {
    id: 'w3',
    time: '08:14',
    weighingNo: 'V-26-18435',
    direction: 'out',
    vehicle: 'XA-902',
    productCode: '1211',
    productNameKey: 'weighingDispatch.products.binderCourseTh11',
    recipientKey: 'weighingDispatch.recipient.buyer',
    recipientParams: { buyer: 'Steypustöðin ehf.' },
    netTonnes: 22.1,
    route: {
      kind: 'docketToBuyer',
      labelKey: 'weighingDispatch.route.docketToBuyer',
      deliveryNoteId: 'dn-1',
    },
    status: 'awaitingDocket',
  },
  {
    id: 'w4',
    time: '08:31',
    weighingNo: 'V-26-18439',
    direction: 'in',
    vehicle: 'BS-118',
    productCode: '3002',
    productNameKey: 'weighingDispatch.products.gravel016',
    recipientKey: 'weighingDispatch.recipient.supplierSite',
    recipientParams: { site: 'Bolaöldur', supplier: 'Björgun' },
    netTonnes: 31.6,
    route: {
      kind: 'purchaseAwaitingInvoice',
      labelKey: 'weighingDispatch.route.purchaseAwaitingInvoice',
      supplierDeliveryId: 'sd-1',
    },
    status: 'awaitingInvoice',
  },
  {
    id: 'w5',
    time: '09:02',
    weighingNo: 'V-26-18444',
    direction: 'in',
    vehicle: 'BS-118',
    productCode: '3002',
    productNameKey: 'weighingDispatch.products.gravel016',
    recipientKey: 'weighingDispatch.recipient.supplierSite',
    recipientParams: { site: 'Bolaöldur', supplier: 'Björgun' },
    netTonnes: 29.8,
    route: {
      kind: 'supplierInvoice',
      labelKey: 'weighingDispatch.route.supplierInvoice',
      labelParams: { tonnes: 31.2 },
      supplierDeliveryId: 'sd-2',
    },
    status: 'discrepancy',
  },
  {
    id: 'w6',
    time: '09:20',
    weighingNo: 'V-26-18448',
    direction: 'out',
    vehicle: 'MU-471',
    productCode: '1204',
    productNameKey: 'weighingDispatch.products.asphaltY16',
    recipientKey: 'weighingDispatch.recipient.jobMissing',
    netTonnes: 18.2,
    route: {
      kind: 'tripJobMissing',
      labelKey: 'weighingDispatch.route.tripJobMissing',
      tripId: '91-211',
    },
    status: 'needsReview',
  },
  {
    id: 'w7',
    time: '09:38',
    weighingNo: 'V-26-18452',
    direction: 'out',
    vehicle: 'JR-T50',
    productCode: '1204',
    productNameKey: 'weighingDispatch.products.asphaltY16',
    recipientKey: 'weighingDispatch.recipient.none',
    netTonnes: 19.1,
    route: {
      kind: 'none',
      labelKey: 'weighingDispatch.route.noRouteFound',
    },
    status: 'unrouted',
  },
  {
    id: 'w8',
    time: '10:05',
    weighingNo: 'V-26-18455',
    direction: 'out',
    vehicle: 'XA-902',
    productCode: '1211',
    productNameKey: 'weighingDispatch.products.binderCourseTh11',
    recipientKey: 'weighingDispatch.recipient.none',
    netTonnes: 21.4,
    route: {
      kind: 'none',
      labelKey: 'weighingDispatch.route.noRouteFound',
    },
    status: 'unrouted',
  },
  {
    id: 'w9',
    time: '10:22',
    weighingNo: 'V-26-18458',
    direction: 'in',
    vehicle: 'BS-118',
    productCode: '3002',
    productNameKey: 'weighingDispatch.products.gravel016',
    recipientKey: 'weighingDispatch.recipient.none',
    netTonnes: 28.6,
    route: {
      kind: 'none',
      labelKey: 'weighingDispatch.route.noRouteFound',
    },
    status: 'unrouted',
  },
  {
    id: 'w10',
    time: '10:41',
    weighingNo: 'V-26-18461',
    direction: 'out',
    vehicle: 'MU-471',
    productCode: '1204',
    productNameKey: 'weighingDispatch.products.asphaltY16',
    recipientKey: 'weighingDispatch.recipient.none',
    netTonnes: 17.8,
    route: {
      kind: 'none',
      labelKey: 'weighingDispatch.route.noRouteFound',
    },
    status: 'unrouted',
  },
  {
    id: 'w11',
    time: '11:03',
    weighingNo: 'V-26-18464',
    direction: 'out',
    vehicle: 'JR-T50',
    productCode: '1211',
    productNameKey: 'weighingDispatch.products.binderCourseTh11',
    recipientKey: 'weighingDispatch.recipient.none',
    netTonnes: 20.3,
    route: {
      kind: 'none',
      labelKey: 'weighingDispatch.route.noRouteFound',
    },
    status: 'unrouted',
  },
  {
    id: 'w12',
    time: '11:28',
    weighingNo: 'V-26-18467',
    direction: 'in',
    vehicle: 'BS-220',
    productCode: '3002',
    productNameKey: 'weighingDispatch.products.gravel016',
    recipientKey: 'weighingDispatch.recipient.none',
    netTonnes: 30.2,
    route: {
      kind: 'none',
      labelKey: 'weighingDispatch.route.noRouteFound',
    },
    status: 'unrouted',
  },
]

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

export function getManualRouteOptions(
  direction: WeighingDirection,
): ManualRouteOption[] {
  if (direction === 'in') {
    return [
      {
        value: 'purchase',
        kind: 'purchaseAwaitingInvoice',
        labelKey: 'weighingDispatch.routeOptions.purchase',
        status: 'awaitingInvoice',
        recipientKey: 'weighingDispatch.recipient.supplierSite',
        recipientParams: { site: 'Bolaöldur', supplier: 'Björgun' },
        supplierDeliveryId: 'sd-1',
      },
      {
        value: 'supplier-invoice',
        kind: 'supplierInvoice',
        labelKey: 'weighingDispatch.routeOptions.supplierInvoice',
        status: 'discrepancy',
        labelParams: { tonnes: 31.2 },
        recipientKey: 'weighingDispatch.recipient.supplierSite',
        recipientParams: { site: 'Bolaöldur', supplier: 'Björgun' },
        supplierDeliveryId: 'sd-2',
      },
    ]
  }

  return [
    {
      value: 'trip',
      kind: 'tripOnJob',
      labelKey: 'weighingDispatch.routeOptions.tripOnJob',
      status: 'routed',
      labelParams: { trip: '91 220' },
      recipientKey: 'weighingDispatch.recipient.job',
      recipientParams: { job: '26-0412', place: 'Hringbraut, south lane' },
      tripId: '91-220',
      jobNumber: '26-0412',
    },
    {
      value: 'docket',
      kind: 'docketToBuyer',
      labelKey: 'weighingDispatch.routeOptions.docketToBuyer',
      status: 'awaitingDocket',
      recipientKey: 'weighingDispatch.recipient.buyer',
      recipientParams: { buyer: 'Steypustöðin ehf.' },
      deliveryNoteId: 'dn-1',
    },
  ]
}

export function applyManualRoute(
  row: WeighingDispatchRow,
  option: ManualRouteOption,
): WeighingDispatchRow {
  return {
    ...row,
    recipientKey: option.recipientKey ?? row.recipientKey,
    recipientParams: option.recipientParams
      ? { ...option.recipientParams }
      : row.recipientParams,
    route: {
      kind: option.kind,
      labelKey:
        option.kind === 'tripOnJob'
          ? 'weighingDispatch.route.tripOnJob'
          : option.kind === 'docketToBuyer'
            ? 'weighingDispatch.route.docketToBuyer'
            : option.kind === 'purchaseAwaitingInvoice'
              ? 'weighingDispatch.route.purchaseAwaitingInvoice'
              : option.kind === 'supplierInvoice'
                ? 'weighingDispatch.route.supplierInvoice'
                : 'weighingDispatch.route.tripJobMissing',
      labelParams: option.labelParams ? { ...option.labelParams } : undefined,
      tripId: option.tripId,
      jobNumber: option.jobNumber,
      deliveryNoteId: option.deliveryNoteId,
      supplierDeliveryId: option.supplierDeliveryId,
    },
    status: option.status,
  }
}

export function getUnroutedSummary(rows: WeighingDispatchRow[] = weighingDispatchRows) {
  const unrouted = rows.filter((row) => row.status === 'unrouted')
  const tonnes = unrouted.reduce((sum, row) => sum + row.netTonnes, 0)
  return { count: unrouted.length, tonnes }
}

export function getUnroutedRows(rows: WeighingDispatchRow[] = weighingDispatchRows) {
  return rows.filter((row) => row.status === 'unrouted')
}

export function createWeighingDispatchRows(
  source: WeighingDispatchRow[] = weighingDispatchRows,
): WeighingDispatchRow[] {
  return source.map((row) => ({
    ...row,
    route: { ...row.route, labelParams: row.route.labelParams ? { ...row.route.labelParams } : undefined },
    recipientParams: row.recipientParams ? { ...row.recipientParams } : undefined,
  }))
}

/** Weighbridge scales available for registration. */
export const weighbridges = [
  { id: 'wb-asphalt-1', labelKey: 'weighingDispatch.scales.asphalt1' },
  { id: 'wb-asphalt-2', labelKey: 'weighingDispatch.scales.asphalt2' },
  { id: 'wb-quarry', labelKey: 'weighingDispatch.scales.quarry' },
] as const

export type WeighbridgeId = (typeof weighbridges)[number]['id']

export const weighingProducts = [
  { id: '1204', code: '1204', nameKey: 'weighingDispatch.products.asphaltY16' },
  { id: '1211', code: '1211', nameKey: 'weighingDispatch.products.binderCourseTh11' },
  { id: '3002', code: '3002', nameKey: 'weighingDispatch.products.gravel016' },
] as const

export type WeighingProductId = (typeof weighingProducts)[number]['id']

export const weighingJobs = [
  {
    id: '26-0412',
    number: '26-0412',
    placeKey: 'weighingDispatch.jobs.hringbraut',
  },
  {
    id: '26-0388',
    number: '26-0388',
    placeKey: 'weighingDispatch.jobs.kaltakot',
  },
  {
    id: '26-0401',
    number: '26-0401',
    placeKey: 'weighingDispatch.jobs.plantYard',
  },
] as const

export type WeighingJobId = (typeof weighingJobs)[number]['id']

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

/** Simulated live scale reading once a weighbridge is selected. */
export function simulateScaleReading(scaleId: WeighbridgeId | '') {
  if (!scaleId) {
    return { netTonnes: 0, grossTonnes: 0 }
  }

  const seed = scaleId.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
  const net = 16 + (seed % 120) / 10
  const tare = 12 + (seed % 40) / 10
  return {
    netTonnes: Math.round(net * 100) / 100,
    grossTonnes: Math.round((net + tare) * 100) / 100,
  }
}

export function createRegisteredWeighing(
  input: RegisterWeighingInput,
  sequence: number,
): WeighingDispatchRow {
  const product = weighingProducts.find((item) => item.id === input.productId)
  const job = weighingJobs.find((item) => item.id === input.jobId)
  const now = new Date()
  const time = now.toLocaleTimeString('is-IS', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  const weighingNo = `V-26-${String(18500 + sequence).padStart(5, '0')}`

  return {
    id: `w-reg-${Date.now()}-${sequence}`,
    time,
    weighingNo,
    direction: input.direction,
    vehicle: input.vehiclePlate,
    productCode: product?.code ?? input.productId,
    productNameKey: product?.nameKey ?? 'weighingDispatch.products.asphaltY16',
    recipientKey: job
      ? 'weighingDispatch.recipient.job'
      : 'weighingDispatch.recipient.none',
    recipientParams: job
      ? { job: job.number, place: job.placeKey }
      : undefined,
    netTonnes: input.netTonnes,
    route: {
      kind: 'none',
      labelKey: 'weighingDispatch.route.noRouteFound',
    },
    status: 'unrouted',
  }
}
