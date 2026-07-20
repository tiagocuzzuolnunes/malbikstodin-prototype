import type { ProjectAreaId } from '../config/projects'

export const equipmentStatuses = ['available', 'onHold', 'broken'] as const
export type EquipmentStatus = (typeof equipmentStatuses)[number]

export type EquipmentItem = {
  id: string
  serial: string
  name: string
  plate: string
  status: EquipmentStatus
  assignedEmployeeId: string | null
  lastServiceAt: string
  areaId: ProjectAreaId
}

export const equipmentItems: EquipmentItem[] = [
  // —— Rekstrarsvið ——
  { id: 'eq-r1', serial: 'TR-R01', name: 'Ops coordination truck', plate: 'MB-101', status: 'available', assignedEmployeeId: null, lastServiceAt: '2026-05-12', areaId: 'rekstrarsvid' },
  { id: 'eq-r2', serial: 'TR-R02', name: 'Crew transport truck', plate: 'MB-118', status: 'onHold', assignedEmployeeId: '2', lastServiceAt: '2026-04-03', areaId: 'rekstrarsvid' },
  { id: 'eq-r3', serial: 'TR-R03', name: 'Materials support truck', plate: 'MB-204', status: 'available', assignedEmployeeId: null, lastServiceAt: '2026-06-20', areaId: 'rekstrarsvid' },
  { id: 'eq-r4', serial: 'TR-R04', name: 'Night-shift logistics truck', plate: 'MB-221', status: 'broken', assignedEmployeeId: null, lastServiceAt: '2026-03-18', areaId: 'rekstrarsvid' },
  { id: 'eq-r5', serial: 'TR-R05', name: 'Spare asphalt truck', plate: 'MB-309', status: 'available', assignedEmployeeId: '5', lastServiceAt: '2026-06-01', areaId: 'rekstrarsvid' },
  { id: 'eq-r6', serial: 'TR-R06', name: 'Backup dump truck', plate: 'MB-334', status: 'onHold', assignedEmployeeId: null, lastServiceAt: '2025-12-09', areaId: 'rekstrarsvid' },
  { id: 'eq-r7', serial: 'TR-R07', name: 'Emergency response truck', plate: 'MB-401', status: 'available', assignedEmployeeId: null, lastServiceAt: '2026-07-02', areaId: 'rekstrarsvid' },
  { id: 'eq-r8', serial: 'TR-R08', name: 'Workshop recovery truck', plate: 'MB-418', status: 'broken', assignedEmployeeId: '1', lastServiceAt: '2026-01-22', areaId: 'rekstrarsvid' },

  // —— Flugusvið ——
  { id: 'eq-f1', serial: 'TR-F01', name: 'Airside haul truck', plate: 'AF-112', status: 'available', assignedEmployeeId: null, lastServiceAt: '2026-06-15', areaId: 'flugusvid' },
  { id: 'eq-f2', serial: 'TR-F02', name: 'Apron supply truck', plate: 'AF-130', status: 'onHold', assignedEmployeeId: '1', lastServiceAt: '2026-05-28', areaId: 'flugusvid' },
  { id: 'eq-f3', serial: 'TR-F03', name: 'Runway support truck', plate: 'AF-145', status: 'available', assignedEmployeeId: null, lastServiceAt: '2026-04-22', areaId: 'flugusvid' },
  { id: 'eq-f4', serial: 'TR-F04', name: 'Material haul truck T-9', plate: 'AF-208', status: 'broken', assignedEmployeeId: '2', lastServiceAt: '2026-07-01', areaId: 'flugusvid' },
  { id: 'eq-f5', serial: 'TR-F05', name: 'Night paving logistics truck', plate: 'AF-219', status: 'available', assignedEmployeeId: '11', lastServiceAt: '2026-03-30', areaId: 'flugusvid' },
  { id: 'eq-f6', serial: 'TR-F06', name: 'Taxiway dump truck', plate: 'AF-276', status: 'onHold', assignedEmployeeId: null, lastServiceAt: '2025-11-14', areaId: 'flugusvid' },
  { id: 'eq-f7', serial: 'TR-F07', name: 'Fuel transfer truck', plate: 'AF-301', status: 'available', assignedEmployeeId: null, lastServiceAt: '2026-06-08', areaId: 'flugusvid' },
  { id: 'eq-f8', serial: 'TR-F08', name: 'FOD sweep support truck', plate: 'AF-318', status: 'broken', assignedEmployeeId: null, lastServiceAt: '2026-02-10', areaId: 'flugusvid' },

  // —— Esjusvið ——
  { id: 'eq-e1', serial: 'TR-E01', name: 'Quarry haul truck', plate: 'ES-101', status: 'available', assignedEmployeeId: '3', lastServiceAt: '2026-06-08', areaId: 'esjusvid' },
  { id: 'eq-e2', serial: 'TR-E02', name: 'Plant feed truck', plate: 'ES-124', status: 'onHold', assignedEmployeeId: null, lastServiceAt: '2026-05-19', areaId: 'esjusvid' },
  { id: 'eq-e3', serial: 'TR-E03', name: 'Aggregate dump truck', plate: 'ES-156', status: 'available', assignedEmployeeId: null, lastServiceAt: '2026-04-11', areaId: 'esjusvid' },
  { id: 'eq-e4', serial: 'TR-E04', name: 'Millings transport truck', plate: 'ES-188', status: 'broken', assignedEmployeeId: '4', lastServiceAt: '2026-07-05', areaId: 'esjusvid' },
  { id: 'eq-e5', serial: 'TR-E05', name: 'Field delivery truck', plate: 'ES-210', status: 'available', assignedEmployeeId: null, lastServiceAt: '2026-02-27', areaId: 'esjusvid' },
  { id: 'eq-e6', serial: 'TR-E06', name: 'Weighbridge backup truck', plate: 'ES-233', status: 'onHold', assignedEmployeeId: null, lastServiceAt: '2025-10-02', areaId: 'esjusvid' },
  { id: 'eq-e7', serial: 'TR-E07', name: 'Blast window support truck', plate: 'ES-255', status: 'available', assignedEmployeeId: '3', lastServiceAt: '2026-06-28', areaId: 'esjusvid' },
  { id: 'eq-e8', serial: 'TR-E08', name: 'Plant spare dump truck', plate: 'ES-278', status: 'broken', assignedEmployeeId: null, lastServiceAt: '2026-01-15', areaId: 'esjusvid' },
]

export function getEquipmentByArea(areaId: ProjectAreaId): EquipmentItem[] {
  return equipmentItems.filter((item) => item.areaId === areaId)
}

export function getTruckStats(items: EquipmentItem[]) {
  return {
    total: items.length,
    available: items.filter((item) => item.status === 'available').length,
    onHold: items.filter((item) => item.status === 'onHold').length,
    broken: items.filter((item) => item.status === 'broken').length,
  }
}
