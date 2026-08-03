import type {
  DeliveryNote,
  SupplierDelivery,
  WeighingDispatchRow,
  WeighingRouteRule,
} from './types'

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
