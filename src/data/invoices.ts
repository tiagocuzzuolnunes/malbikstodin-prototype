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

export const invoiceStats = [
  { id: 'today', value: 14, labelKey: 'invoices.stats.today' },
  { id: 'autoApproved', value: 11, labelKey: 'invoices.stats.autoApproved' },
  { id: 'discrepancies', value: 2, labelKey: 'invoices.stats.discrepancies' },
  { id: 'awaiting', value: 1, labelKey: 'invoices.stats.awaiting' },
  { id: 'missingTrips', value: 4, labelKey: 'invoices.stats.missingTrips' },
] as const

const bjorgunLines: InvoiceLine[] = [
  {
    id: 'bl1',
    date: '2026-06-25',
    time: '07:42',
    truck: 'TEU28',
    supplierProduct: '307 – Crushed fines 0-5 mm CE',
    internalProduct: '718 – Álfsnesvík 0-5 Blended',
    quantity: 18.2,
    unit: 't',
    pit: 'Álfsnesvík',
    jobNumber: '2401-12',
    matchedTrip: 'T-4821',
    driver: 'Jónas Halldórsson',
    tripTime: '07:38',
    status: 'matched',
  },
  {
    id: 'bl2',
    date: '2026-06-25',
    time: '09:15',
    truck: 'TEU28',
    supplierProduct: '307 – Crushed fines 0-5 mm CE',
    internalProduct: '718 – Álfsnesvík 0-5 Blended',
    quantity: 17.9,
    unit: 't',
    pit: 'Álfsnesvík',
    jobNumber: '2401-12',
    matchedTrip: 'T-4822',
    driver: 'Jónas Halldórsson',
    tripTime: '09:12',
    status: 'matched',
  },
  {
    id: 'bl3',
    date: '2026-06-25',
    time: '11:03',
    truck: 'TEU28',
    supplierProduct: '307 – Crushed fines 0-5 mm CE',
    internalProduct: '718 – Álfsnesvík 0-5 Blended',
    quantity: 18.05,
    unit: 't',
    pit: 'Álfsnesvík',
    jobNumber: '2401-12',
    matchedTrip: 'T-4823',
    driver: 'Jónas Halldórsson',
    tripTime: '10:58',
    status: 'matched',
  },
  {
    id: 'bl4',
    date: '2026-06-25',
    time: '13:20',
    truck: 'TEU28',
    supplierProduct: '307 – Crushed fines 0-5 mm CE',
    internalProduct: '718 – Álfsnesvík 0-5 Blended',
    quantity: 17.65,
    unit: 't',
    pit: 'Álfsnesvík',
    jobNumber: '2401-12',
    matchedTrip: 'T-4824',
    driver: 'Jónas Halldórsson',
    tripTime: '13:18',
    status: 'matched',
  },
  {
    id: 'bl5',
    date: '2026-06-25',
    time: '15:05',
    truck: 'TEU28',
    supplierProduct: '307 – Crushed fines 0-5 mm CE',
    internalProduct: '718 – Álfsnesvík 0-5 Blended',
    quantity: 17.8,
    unit: 't',
    pit: 'Álfsnesvík',
    jobNumber: '2401-12',
    matchedTrip: 'T-4825',
    driver: 'Jónas Halldórsson',
    tripTime: '15:01',
    status: 'matched',
  },
  {
    id: 'bl6',
    date: '2026-06-25',
    time: '16:48',
    truck: 'TEU28',
    supplierProduct: '307 – Crushed fines 0-5 mm CE',
    internalProduct: '718 – Álfsnesvík 0-5 Blended',
    quantity: 17.85,
    unit: 't',
    pit: 'Álfsnesvík',
    jobNumber: '2401-12',
    matchedTrip: 'T-4826',
    driver: 'Jónas Halldórsson',
    tripTime: '16:44',
    status: 'matched',
  },
]

export const invoices: Invoice[] = [
  {
    id: 'inv-ok-1',
    serial: 'W4027091',
    supplier: 'Björgun-Sement',
    vendorNumber: 'V-1042',
    type: 'supplier',
    invoiceDate: '2026-06-25',
    receivedAt: '2026-06-26',
    status: 'posted',
    lineCount: 6,
    tripCount: 6,
    totalQuantity: 107.45,
    unit: 't',
    discrepancyCount: 0,
    amountIsk: 1_826_650,
    jobNumbers: ['2401-12'],
    lines: bjorgunLines,
  },
  {
    id: 'inv-disc-1',
    serial: 'W4027104',
    supplier: 'Björgun-Sement',
    vendorNumber: 'V-1042',
    type: 'supplier',
    invoiceDate: '2026-07-24',
    receivedAt: '2026-07-25',
    status: 'discrepancy',
    lineCount: 6,
    tripCount: 5,
    totalQuantity: 108.2,
    unit: 't',
    discrepancyCount: 1,
    amountIsk: 1_839_400,
    jobNumbers: ['2401-12'],
    discrepancyMessageKey: 'weighingWithoutTrip',
    lines: [
      ...bjorgunLines.slice(0, 5).map((line, index) => ({
        ...line,
        id: `d1-${index}`,
        date: '2026-07-24',
      })),
      {
        id: 'd1-orphan',
        date: '2026-07-24',
        time: '17:12',
        truck: 'TEU28',
        supplierProduct: '307 – Crushed fines 0-5 mm CE',
        internalProduct: '718 – Álfsnesvík 0-5 Blended',
        quantity: 18.1,
        unit: 't',
        pit: 'Álfsnesvík',
        jobNumber: '2401-12',
        status: 'weighingWithoutTrip',
      },
    ],
  },
  {
    id: 'inv-disc-2',
    serial: 'INV-88421',
    supplier: 'Námur ehf.',
    vendorNumber: 'V-1188',
    type: 'supplier',
    invoiceDate: '2026-07-23',
    receivedAt: '2026-07-24',
    status: 'discrepancy',
    lineCount: 4,
    tripCount: 4,
    totalQuantity: 72.4,
    unit: 't',
    discrepancyCount: 2,
    amountIsk: 986_000,
    jobNumbers: ['2403-08'],
    discrepancyMessageKey: 'quantityMismatch',
    lines: [
      {
        id: 'n1',
        date: '2026-07-23',
        time: '08:10',
        truck: 'KB-441',
        supplierProduct: '112 – Base course 0-32',
        internalProduct: '612 – Base 0-32',
        quantity: 19.2,
        unit: 't',
        pit: 'Hólmsheiði',
        jobNumber: '2403-08',
        matchedTrip: 'T-4910',
        driver: 'Árni Þórsson',
        tripTime: '08:05',
        status: 'matched',
      },
      {
        id: 'n2',
        date: '2026-07-23',
        time: '10:40',
        truck: 'KB-441',
        supplierProduct: '112 – Base course 0-32',
        internalProduct: '612 – Base 0-32',
        quantity: 18.8,
        unit: 't',
        pit: 'Hólmsheiði',
        jobNumber: '2403-08',
        matchedTrip: 'T-4911',
        driver: 'Árni Þórsson',
        tripTime: '10:38',
        status: 'quantityMismatch',
        note: 'Trip registered 17.1 t',
      },
      {
        id: 'n3',
        date: '2026-07-23',
        time: '13:15',
        truck: 'KB-441',
        supplierProduct: '440 – Unknown grit',
        internalProduct: '',
        quantity: 16.5,
        unit: 't',
        pit: 'Hólmsheiði',
        jobNumber: '2403-08',
        status: 'unknownProduct',
      },
      {
        id: 'n4',
        date: '2026-07-23',
        time: '15:50',
        truck: 'KB-441',
        supplierProduct: '112 – Base course 0-32',
        internalProduct: '612 – Base 0-32',
        quantity: 17.9,
        unit: 't',
        pit: 'Hólmsheiði',
        jobNumber: '2403-08',
        matchedTrip: 'T-4912',
        driver: 'Árni Þórsson',
        tripTime: '15:44',
        status: 'matched',
      },
    ],
  },
  {
    id: 'inv-await-1',
    serial: 'W4027110',
    supplier: 'Björgun-Sement',
    vendorNumber: 'V-1042',
    type: 'supplier',
    invoiceDate: '2026-07-27',
    receivedAt: '2026-07-27',
    status: 'awaitingTrips',
    lineCount: 5,
    tripCount: 5,
    totalQuantity: 89.3,
    unit: 't',
    discrepancyCount: 0,
    amountIsk: 1_518_100,
    jobNumbers: ['2401-14'],
    lines: [],
  },
  {
    id: 'inv-ok-2',
    serial: 'INV-88390',
    supplier: 'Malbik hf.',
    vendorNumber: 'V-0901',
    type: 'supplier',
    invoiceDate: '2026-07-22',
    receivedAt: '2026-07-23',
    status: 'posted',
    lineCount: 8,
    tripCount: 8,
    totalQuantity: 144.0,
    unit: 't',
    discrepancyCount: 0,
    amountIsk: 2_448_000,
    jobNumbers: ['2402-03'],
    lines: [],
  },
  {
    id: 'inv-ok-3',
    serial: 'W4027088',
    supplier: 'Björgun-Sement',
    vendorNumber: 'V-1042',
    type: 'supplier',
    invoiceDate: '2026-07-21',
    receivedAt: '2026-07-22',
    status: 'approved',
    lineCount: 3,
    tripCount: 3,
    totalQuantity: 52.1,
    unit: 't',
    discrepancyCount: 0,
    amountIsk: 885_700,
    jobNumbers: ['2401-12'],
    lines: [],
  },
]

export const missingTrips: MissingTrip[] = [
  {
    id: 'mt1',
    date: '2026-07-27',
    time: '09:22',
    truck: 'RX-102',
    owner: 'Flutningar ehf.',
    product: '718 – Álfsnesvík 0-5 Blended',
    jobNumber: '2401-14',
    quantity: 17.4,
    unit: 't',
    source: 'ownScale',
  },
  {
    id: 'mt2',
    date: '2026-07-27',
    time: '11:05',
    truck: 'RX-102',
    owner: 'Flutningar ehf.',
    product: '718 – Álfsnesvík 0-5 Blended',
    jobNumber: '2401-14',
    quantity: 18.1,
    unit: 't',
    source: 'ownScale',
  },
  {
    id: 'mt3',
    date: '2026-07-26',
    time: '14:40',
    truck: 'HV-55',
    owner: 'Vesturflutningar',
    product: '612 – Base 0-32',
    jobNumber: '2403-08',
    quantity: 16.8,
    unit: 't',
    source: 'supplierInvoice',
  },
  {
    id: 'mt4',
    date: '2026-07-25',
    time: '08:55',
    truck: 'HV-55',
    owner: 'Vesturflutningar',
    product: '612 – Base 0-32',
    jobNumber: '2403-08',
    quantity: 17.2,
    unit: 't',
    source: 'supplierInvoice',
  },
]

export const rentalInvoices: RentalInvoice[] = [
  {
    id: 'rent-1',
    serial: 'R-2026-441',
    contractor: 'Flutningar ehf.',
    periodStart: '2026-07-01',
    periodEnd: '2026-07-15',
    status: 'discrepancy',
    expectedAmountIsk: 1_160_000,
    invoiceAmountIsk: 1_200_000,
    trucks: [
      {
        id: 'rt1',
        truck: 'RX-102',
        date: '2026-07-01 – 2026-07-15',
        invoiceHours: 60,
        registeredHours: 58,
        rateIsk: 10_000,
        status: 'discrepancy',
      },
      {
        id: 'rt2',
        truck: 'RX-108',
        date: '2026-07-01 – 2026-07-15',
        invoiceHours: 56,
        registeredHours: 56,
        rateIsk: 10_000,
        status: 'matched',
      },
    ],
  },
  {
    id: 'rent-2',
    serial: 'R-2026-438',
    contractor: 'Vesturflutningar',
    periodStart: '2026-07-01',
    periodEnd: '2026-07-15',
    status: 'ok',
    expectedAmountIsk: 840_000,
    invoiceAmountIsk: 840_000,
    trucks: [
      {
        id: 'rt3',
        truck: 'HV-55',
        date: '2026-07-01 – 2026-07-15',
        invoiceHours: 42,
        registeredHours: 42,
        rateIsk: 10_000,
        status: 'matched',
      },
      {
        id: 'rt4',
        truck: 'HV-61',
        date: '2026-07-01 – 2026-07-15',
        invoiceHours: 42,
        registeredHours: 42,
        rateIsk: 10_000,
        status: 'matched',
      },
    ],
  },
]

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
