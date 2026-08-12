import type { ProjectAreaId } from '../config/projects'

export const contractStatuses = ['active', 'planned', 'completed', 'expired'] as const
export type ContractStatus = (typeof contractStatuses)[number]

export type Contract = {
  id: string
  serial: string
  name: string
  /** Amount in ISK (minimum 5_000_000) */
  amountIsk: number
  startDate: string
  endDate: string
  status: ContractStatus
  areaId: ProjectAreaId
}

export const contracts: Contract[] = [
  // —— Rekstrarsvið ——
  { id: 'rc1', serial: 'S01-A', name: 'Season operations coordination', amountIsk: 12_500_000, startDate: '2026-03-01', endDate: '2026-09-30', status: 'active', areaId: 'rekstrarsvid' },
  { id: 'rc2', serial: 'S02-B', name: 'Leadership reporting support', amountIsk: 8_200_000, startDate: '2026-05-15', endDate: '2026-11-15', status: 'planned', areaId: 'rekstrarsvid' },
  { id: 'rc3', serial: 'S03', name: 'Capital area delivery oversight', amountIsk: 22_000_000, startDate: '2025-11-01', endDate: '2026-06-30', status: 'active', areaId: 'rekstrarsvid' },
  { id: 'rc4', serial: 'S04-C', name: 'Q3 budget consolidation', amountIsk: 5_500_000, startDate: '2025-01-10', endDate: '2025-12-31', status: 'completed', areaId: 'rekstrarsvid' },
  { id: 'rc5', serial: 'S05-A', name: 'Annual ops review package', amountIsk: 15_750_000, startDate: '2024-06-01', endDate: '2025-05-31', status: 'expired', areaId: 'rekstrarsvid' },
  { id: 'rc6', serial: 'S06-B', name: 'Fleet fuel management framework', amountIsk: 9_800_000, startDate: '2026-01-15', endDate: '2026-12-15', status: 'active', areaId: 'rekstrarsvid' },
  { id: 'rc7', serial: 'S07', name: 'Subcontractor compliance audit', amountIsk: 6_400_000, startDate: '2026-06-01', endDate: '2027-01-31', status: 'planned', areaId: 'rekstrarsvid' },
  { id: 'rc8', serial: 'S08-C', name: 'Shared services IT coordination', amountIsk: 11_200_000, startDate: '2025-08-01', endDate: '2026-07-31', status: 'active', areaId: 'rekstrarsvid' },
  { id: 'rc9', serial: 'S09-A', name: 'Emergency response retainer', amountIsk: 7_100_000, startDate: '2025-03-01', endDate: '2026-02-28', status: 'completed', areaId: 'rekstrarsvid' },
  { id: 'rc10', serial: 'S10-B', name: 'Document control and archiving', amountIsk: 5_250_000, startDate: '2024-04-01', endDate: '2025-03-31', status: 'expired', areaId: 'rekstrarsvid' },
  { id: 'rc11', serial: 'S11', name: 'Seasonal workforce planning desk', amountIsk: 18_600_000, startDate: '2026-02-01', endDate: '2026-10-31', status: 'active', areaId: 'rekstrarsvid' },
  { id: 'rc12', serial: 'S12-A', name: 'Client milestone facilitation', amountIsk: 13_900_000, startDate: '2026-07-01', endDate: '2027-03-31', status: 'planned', areaId: 'rekstrarsvid' },
  { id: 'rc13', serial: 'S13-C', name: 'Insurance brokerage renewal', amountIsk: 8_750_000, startDate: '2025-09-15', endDate: '2026-09-14', status: 'active', areaId: 'rekstrarsvid' },
  { id: 'rc14', serial: 'S14-B', name: 'HSE training programme delivery', amountIsk: 6_900_000, startDate: '2025-02-01', endDate: '2025-12-20', status: 'completed', areaId: 'rekstrarsvid' },
  { id: 'rc15', serial: 'S15', name: 'KPI dashboard development', amountIsk: 10_300_000, startDate: '2024-09-01', endDate: '2025-08-31', status: 'expired', areaId: 'rekstrarsvid' },
  { id: 'rc16', serial: 'S16-A', name: 'Night-work permit coordination', amountIsk: 5_800_000, startDate: '2026-04-15', endDate: '2026-12-31', status: 'active', areaId: 'rekstrarsvid' },
  { id: 'rc17', serial: 'S17-B', name: 'Materials forecast advisory', amountIsk: 14_200_000, startDate: '2026-08-01', endDate: '2027-04-30', status: 'planned', areaId: 'rekstrarsvid' },
  { id: 'rc18', serial: 'S18-C', name: 'Board observer reporting retainer', amountIsk: 7_650_000, startDate: '2025-12-01', endDate: '2026-11-30', status: 'active', areaId: 'rekstrarsvid' },

  // —— Flugusvið ——
  { id: 'fc1', serial: 'V01-B', name: 'Runway section A-12 repair', amountIsk: 48_000_000, startDate: '2026-04-01', endDate: '2026-10-31', status: 'active', areaId: 'flugusvid' },
  { id: 'fc2', serial: 'V02-A', name: 'Apron west resurfacing', amountIsk: 31_200_000, startDate: '2026-07-01', endDate: '2027-01-15', status: 'planned', areaId: 'flugusvid' },
  { id: 'fc3', serial: 'C02', name: 'Taxiway joint maintenance', amountIsk: 19_800_000, startDate: '2025-09-01', endDate: '2026-08-31', status: 'active', areaId: 'flugusvid' },
  { id: 'fc4', serial: 'V03-C', name: 'Night paving window support', amountIsk: 6_750_000, startDate: '2025-02-01', endDate: '2025-11-30', status: 'completed', areaId: 'flugusvid' },
  { id: 'fc5', serial: 'C03', name: 'Airside traffic diversions', amountIsk: 9_100_000, startDate: '2024-03-15', endDate: '2025-03-14', status: 'expired', areaId: 'flugusvid' },
  { id: 'fc6', serial: 'V04', name: 'Apron east binder and surface', amountIsk: 42_500_000, startDate: '2026-05-01', endDate: '2026-11-30', status: 'active', areaId: 'flugusvid' },
  { id: 'fc7', serial: 'V05-B', name: 'Taxiway B wearing course', amountIsk: 24_600_000, startDate: '2026-08-15', endDate: '2027-02-28', status: 'planned', areaId: 'flugusvid' },
  { id: 'fc8', serial: 'C16', name: 'Airside FOD sweep service', amountIsk: 5_400_000, startDate: '2025-10-01', endDate: '2026-09-30', status: 'active', areaId: 'flugusvid' },
  { id: 'fc9', serial: 'V06-A', name: 'Runway shoulder drainage works', amountIsk: 16_800_000, startDate: '2025-04-01', endDate: '2025-12-15', status: 'completed', areaId: 'flugusvid' },
  { id: 'fc10', serial: 'C17', name: 'Temporary fencing and gates', amountIsk: 5_950_000, startDate: '2024-06-01', endDate: '2025-05-31', status: 'expired', areaId: 'flugusvid' },
  { id: 'fc11', serial: 'V07-C', name: 'Milling and recycling package', amountIsk: 28_300_000, startDate: '2026-03-15', endDate: '2026-09-15', status: 'active', areaId: 'flugusvid' },
  { id: 'fc12', serial: 'V08', name: 'Airport ops NOTAM coordination', amountIsk: 7_800_000, startDate: '2026-06-01', endDate: '2026-12-31', status: 'planned', areaId: 'flugusvid' },
  { id: 'fc13', serial: 'C18', name: 'Cold-mix emergency patch stock', amountIsk: 5_150_000, startDate: '2025-07-01', endDate: '2026-06-30', status: 'active', areaId: 'flugusvid' },
  { id: 'fc14', serial: 'V09-B', name: 'Edge light clearance survey', amountIsk: 8_450_000, startDate: '2025-01-15', endDate: '2025-10-31', status: 'completed', areaId: 'flugusvid' },
  { id: 'fc15', serial: 'C19', name: 'Fuel truck access route works', amountIsk: 12_700_000, startDate: '2024-08-01', endDate: '2025-07-31', status: 'expired', areaId: 'flugusvid' },
  { id: 'fc16', serial: 'V10-A', name: 'Paver and roller night hire', amountIsk: 21_900_000, startDate: '2026-04-20', endDate: '2026-10-20', status: 'active', areaId: 'flugusvid' },
  { id: 'fc17', serial: 'V11-C', name: 'Tack coat and joint sealing', amountIsk: 10_600_000, startDate: '2026-09-01', endDate: '2027-03-01', status: 'planned', areaId: 'flugusvid' },
  { id: 'fc18', serial: 'C20', name: 'Daily airside progress reporting', amountIsk: 6_200_000, startDate: '2025-11-01', endDate: '2026-10-31', status: 'active', areaId: 'flugusvid' },

  // —— Esjusvið ——
  { id: 'ec1', serial: 'E01-A', name: 'Esja plant maintenance', amountIsk: 27_400_000, startDate: '2026-02-15', endDate: '2026-12-15', status: 'active', areaId: 'esjusvid' },
  { id: 'ec2', serial: 'E02-B', name: 'Quarry haul road upgrade', amountIsk: 14_600_000, startDate: '2026-08-01', endDate: '2027-02-28', status: 'planned', areaId: 'esjusvid' },
  { id: 'ec3', serial: 'C04', name: 'Local road works Mosfellsbær', amountIsk: 7_250_000, startDate: '2025-05-01', endDate: '2026-04-30', status: 'active', areaId: 'esjusvid' },
  { id: 'ec4', serial: 'E03-A', name: 'Aggregate quality sampling', amountIsk: 11_900_000, startDate: '2024-10-01', endDate: '2025-09-30', status: 'completed', areaId: 'esjusvid' },
  { id: 'ec5', serial: 'C05', name: 'Seasonal plant standby', amountIsk: 5_000_000, startDate: '2024-01-01', endDate: '2024-12-31', status: 'expired', areaId: 'esjusvid' },
  { id: 'ec6', serial: 'E04-C', name: 'Baghouse filter replacement', amountIsk: 9_350_000, startDate: '2026-03-01', endDate: '2026-09-30', status: 'active', areaId: 'esjusvid' },
  { id: 'ec7', serial: 'E05', name: 'Reynivellir loop resurfacing', amountIsk: 33_800_000, startDate: '2026-07-15', endDate: '2027-01-15', status: 'planned', areaId: 'esjusvid' },
  { id: 'ec8', serial: 'C21', name: 'Washed sand stockpile supply', amountIsk: 8_900_000, startDate: '2025-12-01', endDate: '2026-11-30', status: 'active', areaId: 'esjusvid' },
  { id: 'ec9', serial: 'E06-B', name: 'Weighbridge service and calibration', amountIsk: 5_600_000, startDate: '2025-03-01', endDate: '2025-12-31', status: 'completed', areaId: 'esjusvid' },
  { id: 'ec10', serial: 'C22', name: 'Dust suppression spray system', amountIsk: 6_150_000, startDate: '2024-05-01', endDate: '2025-04-30', status: 'expired', areaId: 'esjusvid' },
  { id: 'ec11', serial: 'E07-A', name: 'Cold feed moisture probe upgrade', amountIsk: 12_400_000, startDate: '2026-01-20', endDate: '2026-10-20', status: 'active', areaId: 'esjusvid' },
  { id: 'ec12', serial: 'E08-C', name: 'Kjalarnes access shoulder works', amountIsk: 17_700_000, startDate: '2026-09-01', endDate: '2027-03-31', status: 'planned', areaId: 'esjusvid' },
  { id: 'ec13', serial: 'C23', name: 'Recycled millings blend testing', amountIsk: 5_750_000, startDate: '2025-08-15', endDate: '2026-08-14', status: 'active', areaId: 'esjusvid' },
  { id: 'ec14', serial: 'E09', name: 'Loader hydraulics overhaul', amountIsk: 7_450_000, startDate: '2025-02-15', endDate: '2025-11-15', status: 'completed', areaId: 'esjusvid' },
  { id: 'ec15', serial: 'C24', name: 'Plant access road patching', amountIsk: 5_300_000, startDate: '2024-07-01', endDate: '2025-06-30', status: 'expired', areaId: 'esjusvid' },
  { id: 'ec16', serial: 'E10-B', name: 'Quarry blast window coordination', amountIsk: 19_500_000, startDate: '2026-04-01', endDate: '2026-12-31', status: 'active', areaId: 'esjusvid' },
  { id: 'ec17', serial: 'E11-A', name: 'Haul road passing bay at km 2.4', amountIsk: 11_100_000, startDate: '2026-08-15', endDate: '2027-02-15', status: 'planned', areaId: 'esjusvid' },
  { id: 'ec18', serial: 'C25', name: 'Saturday night binder delivery', amountIsk: 8_050_000, startDate: '2025-10-15', endDate: '2026-10-14', status: 'active', areaId: 'esjusvid' },
]

export function getContractsByArea(areaId?: ProjectAreaId): Contract[] {
  if (!areaId) return contracts
  return contracts.filter((contract) => contract.areaId === areaId)
}
