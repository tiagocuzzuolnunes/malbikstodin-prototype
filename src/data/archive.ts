import type { ProjectAreaId } from '../config/projects'

export const documentTypes = ['word', 'excel', 'pdf'] as const
export type DocumentType = (typeof documentTypes)[number]

export const archiveStatuses = ['denied', 'inReview', 'approved'] as const
export type ArchiveStatus = (typeof archiveStatuses)[number]

export type ArchiveDocument = {
  id: string
  serial: string
  name: string
  date: string
  insertedByEmployeeId: string
  type: DocumentType
  status: ArchiveStatus
  areaId: ProjectAreaId
}

export const archiveDocuments: ArchiveDocument[] = [
  // —— Rekstrarsvið ——
  { id: 'ra1', serial: 'A-R01', name: 'Season operations briefing', date: '2026-03-12', insertedByEmployeeId: '2', type: 'pdf', status: 'approved', areaId: 'rekstrarsvid' },
  { id: 'ra2', serial: 'A-R02', name: 'Q3 budget draft workbook', date: '2026-05-20', insertedByEmployeeId: '5', type: 'excel', status: 'inReview', areaId: 'rekstrarsvid' },
  { id: 'ra3', serial: 'A-R03', name: 'HSE incident summary letter', date: '2026-04-08', insertedByEmployeeId: '1', type: 'word', status: 'approved', areaId: 'rekstrarsvid' },
  { id: 'ra4', serial: 'A-R04', name: 'Client milestone checklist', date: '2026-06-02', insertedByEmployeeId: '3', type: 'excel', status: 'denied', areaId: 'rekstrarsvid' },
  { id: 'ra5', serial: 'A-R05', name: 'Night-work permit template', date: '2026-02-18', insertedByEmployeeId: '4', type: 'word', status: 'inReview', areaId: 'rekstrarsvid' },
  { id: 'ra6', serial: 'A-R06', name: 'Insurance renewal pack', date: '2026-01-30', insertedByEmployeeId: '5', type: 'pdf', status: 'approved', areaId: 'rekstrarsvid' },

  // —— Flugusvið ——
  { id: 'fa1', serial: 'A-F01', name: 'Runway A-12 paving method', date: '2026-04-05', insertedByEmployeeId: '1', type: 'pdf', status: 'approved', areaId: 'flugusvid' },
  { id: 'fa2', serial: 'A-F02', name: 'Apron west quantities sheet', date: '2026-05-14', insertedByEmployeeId: '2', type: 'excel', status: 'inReview', areaId: 'flugusvid' },
  { id: 'fa3', serial: 'A-F03', name: 'Airside NOTAM coordination note', date: '2026-03-22', insertedByEmployeeId: '3', type: 'word', status: 'approved', areaId: 'flugusvid' },
  { id: 'fa4', serial: 'A-F04', name: 'Night paving window report', date: '2026-06-10', insertedByEmployeeId: '1', type: 'pdf', status: 'denied', areaId: 'flugusvid' },
  { id: 'fa5', serial: 'A-F05', name: 'Taxiway joint inspection log', date: '2026-02-27', insertedByEmployeeId: '4', type: 'excel', status: 'inReview', areaId: 'flugusvid' },
  { id: 'fa6', serial: 'A-F06', name: 'FOD sweep procedure', date: '2026-01-16', insertedByEmployeeId: '2', type: 'word', status: 'approved', areaId: 'flugusvid' },

  // —— Esjusvið ——
  { id: 'ea1', serial: 'A-E01', name: 'Plant maintenance schedule', date: '2026-02-20', insertedByEmployeeId: '3', type: 'excel', status: 'approved', areaId: 'esjusvid' },
  { id: 'ea2', serial: 'A-E02', name: 'Aggregate sampling report', date: '2026-04-11', insertedByEmployeeId: '4', type: 'pdf', status: 'inReview', areaId: 'esjusvid' },
  { id: 'ea3', serial: 'A-E03', name: 'Quarry haul road memo', date: '2026-05-03', insertedByEmployeeId: '1', type: 'word', status: 'approved', areaId: 'esjusvid' },
  { id: 'ea4', serial: 'A-E04', name: 'Baghouse filter change record', date: '2026-03-28', insertedByEmployeeId: '5', type: 'pdf', status: 'denied', areaId: 'esjusvid' },
  { id: 'ea5', serial: 'A-E05', name: 'Moisture probe calibration sheet', date: '2026-06-01', insertedByEmployeeId: '2', type: 'excel', status: 'inReview', areaId: 'esjusvid' },
  { id: 'ea6', serial: 'A-E06', name: 'Blast window coordination letter', date: '2026-01-22', insertedByEmployeeId: '3', type: 'word', status: 'approved', areaId: 'esjusvid' },
]

export function getArchiveByArea(areaId?: ProjectAreaId): ArchiveDocument[] {
  if (!areaId) return archiveDocuments
  return archiveDocuments.filter((document) => document.areaId === areaId)
}
