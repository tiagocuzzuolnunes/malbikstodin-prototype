export type TruckDaySlotId = 'slot07010' | 'slot10013' | 'slot13016' | 'slot16019'

export type TruckDaySlot = {
  id: TruckDaySlotId
  /** Job or destination line. */
  jobKey: string
  /** Material / quarry / trip count line. */
  detailKey: string
}

export type TruckDayRowStatus = 'planned' | 'unassigned' | 'broken'

export type TruckDayRow = {
  id: string
  vehicle: string
  driverKey: string | null
  status: TruckDayRowStatus
  slots: Partial<Record<TruckDaySlotId, TruckDaySlot>>
  plannedTrips: number | null
  plannedTonnes: number | null
  actualTrips: number | null
  actualTonnes: number | null
  /** Trip variance; null when not comparable. */
  varianceTrips: number | null
  varianceTonnes: number | null
  breakdownKey?: string
  hatchRef?: string
}

export type TruckDayStat = {
  id: string
  labelKey: string
  value?: number
  valueKey?: string
  valueParams?: Record<string, string | number>
  format: 'text' | 'number' | 'tonnes'
  tone?: 'danger' | 'alert' | 'default'
}

export const truckDaySlots: { id: TruckDaySlotId; labelKey: string }[] = [
  { id: 'slot07010', labelKey: 'truckDayPlan.slots.slot07010' },
  { id: 'slot10013', labelKey: 'truckDayPlan.slots.slot10013' },
  { id: 'slot13016', labelKey: 'truckDayPlan.slots.slot13016' },
  { id: 'slot16019', labelKey: 'truckDayPlan.slots.slot16019' },
]

export const truckDayPlanMeta = {
  titleKey: 'truckDayPlan.title',
  dateKey: 'truckDayPlan.date.monday2707',
  plantKey: 'truckDayPlan.plant.asphalt',
  trucksPlanned: 14,
  trucksTotal: 19,
  plannedTrips: 86,
  plannedTonnes: 1240.5,
  varianceTrucks: 3,
} as const

export const truckDayStats: TruckDayStat[] = [
  {
    id: 'trucksPlanned',
    labelKey: 'truckDayPlan.stats.trucksPlanned',
    valueKey: 'truckDayPlan.stats.trucksPlannedValue',
    valueParams: {
      planned: truckDayPlanMeta.trucksPlanned,
      total: truckDayPlanMeta.trucksTotal,
    },
    format: 'text',
  },
  {
    id: 'plannedTrips',
    labelKey: 'truckDayPlan.stats.plannedTrips',
    value: truckDayPlanMeta.plannedTrips,
    format: 'number',
  },
  {
    id: 'plannedTonnes',
    labelKey: 'truckDayPlan.stats.plannedTonnes',
    value: truckDayPlanMeta.plannedTonnes,
    format: 'tonnes',
  },
  {
    id: 'variance',
    labelKey: 'truckDayPlan.stats.variance',
    valueKey: 'truckDayPlan.stats.varianceValue',
    valueParams: { count: truckDayPlanMeta.varianceTrucks },
    format: 'text',
    tone: 'danger',
  },
]

export const truckDayRows: TruckDayRow[] = [
  {
    id: 'td-jr-t50',
    vehicle: 'JR-T50',
    driverKey: 'truckDayPlan.drivers.gudmundur',
    status: 'planned',
    slots: {
      slot07010: {
        id: 'slot07010',
        jobKey: 'truckDayPlan.jobs.hringbraut',
        detailKey: 'truckDayPlan.details.y16x4',
      },
      slot10013: {
        id: 'slot10013',
        jobKey: 'truckDayPlan.jobs.hringbraut',
        detailKey: 'truckDayPlan.details.y16x3',
      },
      slot13016: {
        id: 'slot13016',
        jobKey: 'truckDayPlan.jobs.reykjanesbraut',
        detailKey: 'truckDayPlan.details.th11x3',
      },
      slot16019: {
        id: 'slot16019',
        jobKey: 'truckDayPlan.jobs.rawToPlant',
        detailKey: 'truckDayPlan.details.gravelBolaoldurx2',
      },
    },
    plannedTrips: 12,
    plannedTonnes: 168,
    actualTrips: 12,
    actualTonnes: 169.4,
    varianceTrips: 0,
    varianceTonnes: 1.4,
  },
  {
    id: 'td-mu-471',
    vehicle: 'MU-471',
    driverKey: 'truckDayPlan.drivers.sigurdur',
    status: 'planned',
    slots: {
      slot07010: {
        id: 'slot07010',
        jobKey: 'truckDayPlan.jobs.hringbraut',
        detailKey: 'truckDayPlan.details.y16x4',
      },
      slot10013: {
        id: 'slot10013',
        jobKey: 'truckDayPlan.jobs.hringbraut',
        detailKey: 'truckDayPlan.details.y16x4',
      },
      slot13016: {
        id: 'slot13016',
        jobKey: 'truckDayPlan.jobs.hringbraut',
        detailKey: 'truckDayPlan.details.y16x3',
      },
    },
    plannedTrips: 11,
    plannedTonnes: 154,
    actualTrips: 8,
    actualTonnes: 112.3,
    varianceTrips: -3,
    varianceTonnes: -41.7,
  },
  {
    id: 'td-xa-902',
    vehicle: 'XA-902',
    driverKey: null,
    status: 'unassigned',
    slots: {},
    plannedTrips: null,
    plannedTonnes: null,
    actualTrips: null,
    actualTonnes: null,
    varianceTrips: null,
    varianceTonnes: null,
  },
  {
    id: 'td-bs-118',
    vehicle: 'BS-118',
    driverKey: 'truckDayPlan.drivers.kristjan',
    status: 'broken',
    slots: {},
    plannedTrips: null,
    plannedTonnes: null,
    actualTrips: null,
    actualTonnes: null,
    varianceTrips: null,
    varianceTonnes: null,
    breakdownKey: 'truckDayPlan.breakdown.awaitingPart',
    hatchRef: 'FR-26-0087',
  },
]
