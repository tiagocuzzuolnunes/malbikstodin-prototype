import type {
  JobCostAnalysis,
  LabourRate,
  ProjectCostSnapshot,
  RateHistoryEntry,
} from './types'

export function lineAmountIsk(rateIsk: number | null, quantity: number) {
  if (rateIsk == null) return 0
  return Math.round(quantity * rateIsk)
}

/** Seed job matching the Kostnaðargreining verks prototype sheet. */
export const jobCostAnalysis: JobCostAnalysis = {
  id: 'job-26-0412',
  jobCode: '26-0412',
  jobNameKey: 'jobCost.jobs.reykjanesbraut',
  clientKey: 'jobCost.clients.vegagerdin',
  startedAt: '2026-01-15',
  tenderAmountIsk: 14_850_000,
  actualCostIsk: 12_418_640,
  unconfirmedRateLines: 37,
  totalRateLines: 214,
  lines: [
    {
      id: 'line-labour-1',
      category: 'labour',
      itemKey: 'jobCost.items.workersDayRate',
      rateRefId: 'labour-workers-day',
      workTypeKey: 'jobCost.workTypes.paving',
      quantity: 642.5,
      unitKey: 'jobCost.units.h',
      rateIsk: 6200,
      rateDate: null,
      status: 'noLabourRate',
    },
    {
      id: 'line-equipment-1',
      category: 'equipment',
      itemKey: 'jobCost.items.mu471',
      rateRefId: 'rate-mu471',
      workTypeKey: 'jobCost.workTypes.paving',
      quantity: 118,
      unitKey: 'jobCost.units.h',
      rateIsk: 14_800,
      rateDate: '2026-01-01',
      status: 'confirmed',
    },
    {
      id: 'line-equipment-2',
      category: 'equipment',
      itemKey: 'jobCost.items.tf812',
      rateRefId: 'rate-tf812',
      workTypeKey: 'jobCost.workTypes.paving',
      quantity: 46.5,
      unitKey: 'jobCost.units.h',
      rateIsk: 12_400,
      rateDate: '2026-04-01',
      status: 'changedSince',
    },
    {
      id: 'line-materials-1',
      category: 'materials',
      itemKey: 'jobCost.items.asphaltY16',
      rateRefId: 'rate-asphalt-y16',
      workTypeKey: 'jobCost.workTypes.paving',
      quantity: 1482.4,
      unitKey: 'jobCost.units.t',
      rateIsk: 4180,
      rateDate: '2026-01-01',
      status: 'confirmed',
    },
    {
      id: 'line-materials-2',
      category: 'materials',
      itemKey: 'jobCost.items.gravel016',
      rateRefId: 'rate-gravel-016',
      workTypeKey: 'jobCost.workTypes.groundwork',
      quantity: 212.8,
      unitKey: 'jobCost.units.t',
      rateIsk: null,
      rateDate: null,
      status: 'noRate',
    },
    {
      id: 'line-haulage-1',
      category: 'haulage',
      itemKey: 'jobCost.items.kmTrucks',
      rateRefId: 'rate-km-trucks',
      workTypeKey: 'jobCost.workTypes.paving',
      quantity: 1240,
      unitKey: 'jobCost.units.km',
      rateIsk: 340,
      rateDate: '2026-01-01',
      status: 'confirmed',
    },
  ],
}

export const rateHistory: RateHistoryEntry[] = [
  {
    id: 'rh-mu471-1',
    itemId: 'rate-mu471',
    itemKey: 'jobCost.items.mu471',
    category: 'equipment',
    rateIsk: 14_200,
    effectiveFrom: '2025-01-01',
    effectiveTo: '2025-12-31',
    changedByKey: 'jobCost.people.financeLead',
  },
  {
    id: 'rh-mu471-2',
    itemId: 'rate-mu471',
    itemKey: 'jobCost.items.mu471',
    category: 'equipment',
    rateIsk: 14_800,
    effectiveFrom: '2026-01-01',
    effectiveTo: null,
    changedByKey: 'jobCost.people.financeLead',
  },
  {
    id: 'rh-tf812-1',
    itemId: 'rate-tf812',
    itemKey: 'jobCost.items.tf812',
    category: 'equipment',
    rateIsk: 11_100,
    effectiveFrom: '2025-06-01',
    effectiveTo: '2026-03-31',
    changedByKey: 'jobCost.people.plantManager',
  },
  {
    id: 'rh-tf812-2',
    itemId: 'rate-tf812',
    itemKey: 'jobCost.items.tf812',
    category: 'equipment',
    rateIsk: 12_400,
    effectiveFrom: '2026-04-01',
    effectiveTo: null,
    changedByKey: 'jobCost.people.plantManager',
  },
  {
    id: 'rh-asphalt-1',
    itemId: 'rate-asphalt-y16',
    itemKey: 'jobCost.items.asphaltY16',
    category: 'materials',
    rateIsk: 3_950,
    effectiveFrom: '2025-03-01',
    effectiveTo: '2025-12-31',
    changedByKey: 'jobCost.people.procurement',
  },
  {
    id: 'rh-asphalt-2',
    itemId: 'rate-asphalt-y16',
    itemKey: 'jobCost.items.asphaltY16',
    category: 'materials',
    rateIsk: 4_180,
    effectiveFrom: '2026-01-01',
    effectiveTo: null,
    changedByKey: 'jobCost.people.procurement',
  },
  {
    id: 'rh-gravel-1',
    itemId: 'rate-gravel-016',
    itemKey: 'jobCost.items.gravel016',
    category: 'materials',
    rateIsk: 1_850,
    effectiveFrom: '2025-01-01',
    effectiveTo: '2025-11-30',
    changedByKey: 'jobCost.people.procurement',
  },
  {
    id: 'rh-km-1',
    itemId: 'rate-km-trucks',
    itemKey: 'jobCost.items.kmTrucks',
    category: 'haulage',
    rateIsk: 320,
    effectiveFrom: '2025-01-01',
    effectiveTo: '2025-12-31',
    changedByKey: 'jobCost.people.logistics',
  },
  {
    id: 'rh-km-2',
    itemId: 'rate-km-trucks',
    itemKey: 'jobCost.items.kmTrucks',
    category: 'haulage',
    rateIsk: 340,
    effectiveFrom: '2026-01-01',
    effectiveTo: null,
    changedByKey: 'jobCost.people.logistics',
  },
]

export const labourRates: LabourRate[] = [
  {
    id: 'labour-workers-day',
    roleKey: 'jobCost.labourRoles.workersDay',
    workTypeKey: 'jobCost.workTypes.paving',
    rateIsk: 6200,
    unitKey: 'jobCost.units.h',
    effectiveFrom: null,
    approved: false,
    status: 'noLabourRate',
  },
  {
    id: 'labour-foreman',
    roleKey: 'jobCost.labourRoles.foreman',
    workTypeKey: 'jobCost.workTypes.paving',
    rateIsk: 8_900,
    unitKey: 'jobCost.units.h',
    effectiveFrom: '2026-01-01',
    approved: true,
    status: 'confirmed',
  },
  {
    id: 'labour-machine-op',
    roleKey: 'jobCost.labourRoles.machineOperator',
    workTypeKey: 'jobCost.workTypes.paving',
    rateIsk: 7_450,
    unitKey: 'jobCost.units.h',
    effectiveFrom: '2026-01-01',
    approved: true,
    status: 'confirmed',
  },
  {
    id: 'labour-groundwork',
    roleKey: 'jobCost.labourRoles.groundCrew',
    workTypeKey: 'jobCost.workTypes.groundwork',
    rateIsk: 5_800,
    unitKey: 'jobCost.units.h',
    effectiveFrom: '2026-02-01',
    approved: false,
    status: 'notApproved',
  },
]

export const initialProjectCostSnapshots: ProjectCostSnapshot[] = [
  {
    id: 'snap-26-0412-1',
    jobId: 'job-26-0412',
    frozenAt: '2026-03-01T09:30:00',
    frozenByKey: 'jobCost.people.projectController',
    tenderAmountIsk: 14_850_000,
    actualCostIsk: 9_842_100,
    varianceIsk: 5_007_900,
    unconfirmedRateLines: 52,
    totalRateLines: 214,
    noteKey: 'jobCost.snapshotNotes.marchCheckpoint',
  },
]

export function getRateHistoryForItem(itemId: string) {
  return rateHistory
    .filter((entry) => entry.itemId === itemId)
    .sort((a, b) => b.effectiveFrom.localeCompare(a.effectiveFrom))
}

export function getCurrentRateHistory(itemId: string) {
  return rateHistory.find((entry) => entry.itemId === itemId && entry.effectiveTo == null) ?? null
}

export function getLabourRateById(id: string) {
  return labourRates.find((rate) => rate.id === id) ?? null
}

export function createSnapshotId(existing: ProjectCostSnapshot[]) {
  return `snap-${jobCostAnalysis.jobCode}-${existing.length + 1}`
}
