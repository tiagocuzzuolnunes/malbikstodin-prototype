import type { ProjectAreaId } from '../config/projects'

export const taskPriorities = ['high', 'medium', 'low'] as const
export type TaskPriority = (typeof taskPriorities)[number]

export const taskStatuses = ['inCourse', 'planned', 'finished', 'delayed'] as const
export type TaskStatus = (typeof taskStatuses)[number]

export type Task = {
  id: string
  serial: string
  title: string
  employeeId: string
  projectName: string
  priority: TaskPriority
  status: TaskStatus
  dueDate: string
  areaId: ProjectAreaId
}

export const tasks: Task[] = [
  // —— Rekstrarsvið ——
  { id: 'r1', serial: 'R01-A', title: 'Confirm weekly production windows', employeeId: '5', projectName: 'Season plan 2026', priority: 'high', status: 'inCourse', dueDate: '2026-07-18', areaId: 'rekstrarsvid' },
  { id: 'r2', serial: 'R02-B', title: 'Publish crew rotation for next week', employeeId: '12', projectName: 'Season plan 2026', priority: 'medium', status: 'planned', dueDate: '2026-07-25', areaId: 'rekstrarsvid' },
  { id: 'r3', serial: 'R03-C', title: 'Prepare client milestone pack', employeeId: '7', projectName: 'Client delivery review', priority: 'high', status: 'delayed', dueDate: '2026-07-12', areaId: 'rekstrarsvid' },
  { id: 'r4', serial: 'R04-A', title: 'Collect department budget figures', employeeId: '6', projectName: 'Q3 budget close', priority: 'medium', status: 'inCourse', dueDate: '2026-07-22', areaId: 'rekstrarsvid' },
  { id: 'r5', serial: 'R05-B', title: 'Close June operations report', employeeId: '9', projectName: 'Ops coordination', priority: 'low', status: 'finished', dueDate: '2026-07-08', areaId: 'rekstrarsvid' },
  { id: 'r6', serial: 'R06-C', title: 'Schedule August leadership review', employeeId: '5', projectName: 'Ops coordination', priority: 'low', status: 'planned', dueDate: '2026-08-01', areaId: 'rekstrarsvid' },
  { id: 'r7', serial: 'R07-A', title: 'Align asphalt volume forecast with sales', employeeId: '7', projectName: 'Season plan 2026', priority: 'high', status: 'inCourse', dueDate: '2026-07-19', areaId: 'rekstrarsvid' },
  { id: 'r8', serial: 'R08-B', title: 'Update contingency plan for weather delays', employeeId: '5', projectName: 'Season plan 2026', priority: 'medium', status: 'planned', dueDate: '2026-07-28', areaId: 'rekstrarsvid' },
  { id: 'r9', serial: 'R09', title: 'Review subcontractor insurance certificates', employeeId: '12', projectName: 'Compliance pack', priority: 'high', status: 'delayed', dueDate: '2026-07-14', areaId: 'rekstrarsvid' },
  { id: 'r10', serial: 'R10-C', title: 'Approve overtime request for night shifts', employeeId: '12', projectName: 'Ops coordination', priority: 'medium', status: 'inCourse', dueDate: '2026-07-17', areaId: 'rekstrarsvid' },
  { id: 'r11', serial: 'R11-A', title: 'Draft Q3 KPI dashboard for leadership', employeeId: '6', projectName: 'Q3 budget close', priority: 'medium', status: 'planned', dueDate: '2026-08-05', areaId: 'rekstrarsvid' },
  { id: 'r12', serial: 'R12-B', title: 'Confirm fuel surcharge pass-through rates', employeeId: '6', projectName: 'Q3 budget close', priority: 'low', status: 'finished', dueDate: '2026-07-06', areaId: 'rekstrarsvid' },
  { id: 'r13', serial: 'R13', title: 'Coordinate plant downtime with logistics', employeeId: '5', projectName: 'Plant sync', priority: 'high', status: 'inCourse', dueDate: '2026-07-21', areaId: 'rekstrarsvid' },
  { id: 'r14', serial: 'R14-A', title: 'Send weekly status mail to board observers', employeeId: '7', projectName: 'Client delivery review', priority: 'low', status: 'planned', dueDate: '2026-07-26', areaId: 'rekstrarsvid' },
  { id: 'r15', serial: 'R15-C', title: 'Validate material stock against open jobs', employeeId: '9', projectName: 'Inventory sync', priority: 'medium', status: 'delayed', dueDate: '2026-07-13', areaId: 'rekstrarsvid' },
  { id: 'r16', serial: 'R16-B', title: 'Book autumn safety audit slot', employeeId: '12', projectName: 'Compliance pack', priority: 'medium', status: 'planned', dueDate: '2026-08-12', areaId: 'rekstrarsvid' },
  { id: 'r17', serial: 'R17-A', title: 'Reconcile June invoice disputes', employeeId: '6', projectName: 'Q3 budget close', priority: 'high', status: 'inCourse', dueDate: '2026-07-20', areaId: 'rekstrarsvid' },
  { id: 'r18', serial: 'R18', title: 'Map peak-week trucking capacity', employeeId: '5', projectName: 'Season plan 2026', priority: 'high', status: 'planned', dueDate: '2026-07-29', areaId: 'rekstrarsvid' },
  { id: 'r19', serial: 'R19-C', title: 'Close out May corrective actions', employeeId: '9', projectName: 'Compliance pack', priority: 'low', status: 'finished', dueDate: '2026-07-02', areaId: 'rekstrarsvid' },
  { id: 'r20', serial: 'R20-A', title: 'Prepare handoff notes for vacation coverage', employeeId: '12', projectName: 'Ops coordination', priority: 'medium', status: 'inCourse', dueDate: '2026-07-24', areaId: 'rekstrarsvid' },
  { id: 'r21', serial: 'R21-B', title: 'Review night-work noise permits', employeeId: '5', projectName: 'Compliance pack', priority: 'high', status: 'delayed', dueDate: '2026-07-11', areaId: 'rekstrarsvid' },
  { id: 'r22', serial: 'R22', title: 'Update shared project calendar for August', employeeId: '7', projectName: 'Ops coordination', priority: 'low', status: 'planned', dueDate: '2026-08-03', areaId: 'rekstrarsvid' },
  { id: 'r23', serial: 'R23-C', title: 'Confirm binder supplier lead times', employeeId: '9', projectName: 'Inventory sync', priority: 'medium', status: 'inCourse', dueDate: '2026-07-23', areaId: 'rekstrarsvid' },
  { id: 'r24', serial: 'R24-A', title: 'Archive completed spring work packages', employeeId: '5', projectName: 'Plant sync', priority: 'low', status: 'finished', dueDate: '2026-07-04', areaId: 'rekstrarsvid' },

  // —— Flugusvið ——
  { id: 'f1', serial: 'V01-B', title: 'Mill runway section A-12', employeeId: '1', projectName: 'Runway repair', priority: 'high', status: 'inCourse', dueDate: '2026-07-16', areaId: 'flugusvid' },
  { id: 'f2', serial: 'V02-A', title: 'Coordinate night paving window', employeeId: '2', projectName: 'Runway repair', priority: 'high', status: 'planned', dueDate: '2026-07-20', areaId: 'flugusvid' },
  { id: 'f3', serial: 'C02', title: 'Lay binder course on apron west', employeeId: '11', projectName: 'Apron resurfacing', priority: 'medium', status: 'inCourse', dueDate: '2026-07-24', areaId: 'flugusvid' },
  { id: 'f4', serial: 'V03-C', title: 'Order aggregate for apron east', employeeId: '2', projectName: 'Apron resurfacing', priority: 'medium', status: 'delayed', dueDate: '2026-07-10', areaId: 'flugusvid' },
  { id: 'f5', serial: 'C03', title: 'Patch taxiway joint failures', employeeId: '1', projectName: 'Taxiway patching', priority: 'low', status: 'finished', dueDate: '2026-07-05', areaId: 'flugusvid' },
  { id: 'f6', serial: 'V04-A', title: 'Mark temporary traffic diversions', employeeId: '11', projectName: 'Taxiway patching', priority: 'low', status: 'planned', dueDate: '2026-07-30', areaId: 'flugusvid' },
  { id: 'f7', serial: 'V05-B', title: 'Survey runway edge lights clearance', employeeId: '2', projectName: 'Runway repair', priority: 'high', status: 'inCourse', dueDate: '2026-07-18', areaId: 'flugusvid' },
  { id: 'f8', serial: 'C06', title: 'Stage rollers for overnight shift', employeeId: '11', projectName: 'Runway repair', priority: 'medium', status: 'planned', dueDate: '2026-07-19', areaId: 'flugusvid' },
  { id: 'f9', serial: 'V06-A', title: 'Test mix design for apron binder', employeeId: '1', projectName: 'Apron resurfacing', priority: 'high', status: 'delayed', dueDate: '2026-07-13', areaId: 'flugusvid' },
  { id: 'f10', serial: 'V07-C', title: 'Clean catch basins before milling', employeeId: '11', projectName: 'Runway repair', priority: 'medium', status: 'finished', dueDate: '2026-07-07', areaId: 'flugusvid' },
  { id: 'f11', serial: 'C07', title: 'Confirm airport ops NOTAM window', employeeId: '2', projectName: 'Airside coordination', priority: 'high', status: 'inCourse', dueDate: '2026-07-17', areaId: 'flugusvid' },
  { id: 'f12', serial: 'V08-B', title: 'Install temporary fencing at gate 4', employeeId: '1', projectName: 'Airside coordination', priority: 'medium', status: 'planned', dueDate: '2026-07-27', areaId: 'flugusvid' },
  { id: 'f13', serial: 'V09-A', title: 'Compact surface course on taxiway B', employeeId: '11', projectName: 'Taxiway patching', priority: 'high', status: 'inCourse', dueDate: '2026-07-22', areaId: 'flugusvid' },
  { id: 'f14', serial: 'C08', title: 'Photograph pre-work pavement condition', employeeId: '2', projectName: 'Apron resurfacing', priority: 'low', status: 'finished', dueDate: '2026-07-03', areaId: 'flugusvid' },
  { id: 'f15', serial: 'V10', title: 'Calibrate paver screed height', employeeId: '1', projectName: 'Runway repair', priority: 'medium', status: 'planned', dueDate: '2026-07-25', areaId: 'flugusvid' },
  { id: 'f16', serial: 'V11-C', title: 'Haul millings to recycling stockpile', employeeId: '11', projectName: 'Runway repair', priority: 'low', status: 'inCourse', dueDate: '2026-07-21', areaId: 'flugusvid' },
  { id: 'f17', serial: 'C09', title: 'Seal joints after overnight cool-down', employeeId: '1', projectName: 'Taxiway patching', priority: 'medium', status: 'delayed', dueDate: '2026-07-15', areaId: 'flugusvid' },
  { id: 'f18', serial: 'V12-A', title: 'Brief night crew on FOD procedures', employeeId: '2', projectName: 'Airside coordination', priority: 'high', status: 'planned', dueDate: '2026-07-23', areaId: 'flugusvid' },
  { id: 'f19', serial: 'V13-B', title: 'Inspect shoulder drainage after rain', employeeId: '11', projectName: 'Apron resurfacing', priority: 'medium', status: 'inCourse', dueDate: '2026-07-26', areaId: 'flugusvid' },
  { id: 'f20', serial: 'C10', title: 'Order cold-mix for emergency patches', employeeId: '1', projectName: 'Taxiway patching', priority: 'low', status: 'finished', dueDate: '2026-07-01', areaId: 'flugusvid' },
  { id: 'f21', serial: 'V14', title: 'Coordinate fuel truck access route', employeeId: '2', projectName: 'Airside coordination', priority: 'high', status: 'delayed', dueDate: '2026-07-12', areaId: 'flugusvid' },
  { id: 'f22', serial: 'V15-A', title: 'Verify tack coat application rate', employeeId: '11', projectName: 'Apron resurfacing', priority: 'medium', status: 'planned', dueDate: '2026-07-29', areaId: 'flugusvid' },
  { id: 'f23', serial: 'C11', title: 'Sweep work zone before handback', employeeId: '1', projectName: 'Runway repair', priority: 'low', status: 'planned', dueDate: '2026-08-02', areaId: 'flugusvid' },
  { id: 'f24', serial: 'V16-C', title: 'Submit daily airside progress log', employeeId: '2', projectName: 'Airside coordination', priority: 'low', status: 'inCourse', dueDate: '2026-07-18', areaId: 'flugusvid' },

  // —— Esjusvið ——
  { id: 'e1', serial: 'E01-A', title: 'Inspect Esja dryer and burner', employeeId: '3', projectName: 'Esja plant upkeep', priority: 'high', status: 'inCourse', dueDate: '2026-07-17', areaId: 'esjusvid' },
  { id: 'e2', serial: 'E02-B', title: 'Schedule plant maintenance window', employeeId: '4', projectName: 'Esja plant upkeep', priority: 'high', status: 'planned', dueDate: '2026-07-21', areaId: 'esjusvid' },
  { id: 'e3', serial: 'C04', title: 'Rebuild haul road soft spots', employeeId: '3', projectName: 'Quarry haul route', priority: 'medium', status: 'delayed', dueDate: '2026-07-11', areaId: 'esjusvid' },
  { id: 'e4', serial: 'E03-A', title: 'Quality sample quarry mix batch', employeeId: '4', projectName: 'Quarry haul route', priority: 'medium', status: 'inCourse', dueDate: '2026-07-23', areaId: 'esjusvid' },
  { id: 'e5', serial: 'E04-C', title: 'Complete Mosfellsbær patching', employeeId: '3', projectName: 'Local road works', priority: 'low', status: 'finished', dueDate: '2026-07-03', areaId: 'esjusvid' },
  { id: 'e6', serial: 'C05', title: 'Plan August local road sequence', employeeId: '4', projectName: 'Local road works', priority: 'low', status: 'planned', dueDate: '2026-08-05', areaId: 'esjusvid' },
  { id: 'e7', serial: 'E05-B', title: 'Replace worn baghouse filters', employeeId: '3', projectName: 'Esja plant upkeep', priority: 'high', status: 'inCourse', dueDate: '2026-07-19', areaId: 'esjusvid' },
  { id: 'e8', serial: 'E06', title: 'Calibrate weighbridge after service', employeeId: '4', projectName: 'Esja plant upkeep', priority: 'medium', status: 'planned', dueDate: '2026-07-28', areaId: 'esjusvid' },
  { id: 'e9', serial: 'E07-A', title: 'Clear drainage ditches on haul road', employeeId: '3', projectName: 'Quarry haul route', priority: 'medium', status: 'inCourse', dueDate: '2026-07-22', areaId: 'esjusvid' },
  { id: 'e10', serial: 'C12', title: 'Stockpile washed sand for binder mixes', employeeId: '4', projectName: 'Aggregate prep', priority: 'high', status: 'delayed', dueDate: '2026-07-14', areaId: 'esjusvid' },
  { id: 'e11', serial: 'E08-C', title: 'Screen oversized rock from feed', employeeId: '3', projectName: 'Aggregate prep', priority: 'medium', status: 'finished', dueDate: '2026-07-06', areaId: 'esjusvid' },
  { id: 'e12', serial: 'E09-B', title: 'Lay wearing course on Reynivellir loop', employeeId: '4', projectName: 'Local road works', priority: 'high', status: 'inCourse', dueDate: '2026-07-25', areaId: 'esjusvid' },
  { id: 'e13', serial: 'E10', title: 'Service loader hydraulics before peak week', employeeId: '3', projectName: 'Esja plant upkeep', priority: 'high', status: 'planned', dueDate: '2026-07-27', areaId: 'esjusvid' },
  { id: 'e14', serial: 'C13', title: 'Update dust suppression spray schedule', employeeId: '4', projectName: 'Quarry haul route', priority: 'low', status: 'planned', dueDate: '2026-08-01', areaId: 'esjusvid' },
  { id: 'e15', serial: 'E11-A', title: 'Lab test recycled millings blend', employeeId: '4', projectName: 'Aggregate prep', priority: 'medium', status: 'inCourse', dueDate: '2026-07-20', areaId: 'esjusvid' },
  { id: 'e16', serial: 'E12-B', title: 'Grade shoulder on Kjalarnes access', employeeId: '3', projectName: 'Local road works', priority: 'medium', status: 'delayed', dueDate: '2026-07-15', areaId: 'esjusvid' },
  { id: 'e17', serial: 'E13-C', title: 'Inspect silo level sensors', employeeId: '3', projectName: 'Esja plant upkeep', priority: 'low', status: 'finished', dueDate: '2026-07-02', areaId: 'esjusvid' },
  { id: 'e18', serial: 'C14', title: 'Coordinate quarry blast window with plant', employeeId: '4', projectName: 'Quarry haul route', priority: 'high', status: 'planned', dueDate: '2026-07-30', areaId: 'esjusvid' },
  { id: 'e19', serial: 'E14-A', title: 'Patch potholes on plant access road', employeeId: '3', projectName: 'Local road works', priority: 'medium', status: 'inCourse', dueDate: '2026-07-24', areaId: 'esjusvid' },
  { id: 'e20', serial: 'E15', title: 'Order burner spare nozzles', employeeId: '4', projectName: 'Esja plant upkeep', priority: 'low', status: 'planned', dueDate: '2026-08-04', areaId: 'esjusvid' },
  { id: 'e21', serial: 'E16-B', title: 'Verify moisture probes on cold feed', employeeId: '3', projectName: 'Esja plant upkeep', priority: 'medium', status: 'inCourse', dueDate: '2026-07-18', areaId: 'esjusvid' },
  { id: 'e22', serial: 'C15', title: 'Widen passing bay at km 2.4', employeeId: '4', projectName: 'Quarry haul route', priority: 'high', status: 'delayed', dueDate: '2026-07-12', areaId: 'esjusvid' },
  { id: 'e23', serial: 'E17-C', title: 'Deliver binder to Saturday night job', employeeId: '3', projectName: 'Aggregate prep', priority: 'high', status: 'planned', dueDate: '2026-07-26', areaId: 'esjusvid' },
  { id: 'e24', serial: 'E18-A', title: 'Close weekly plant production log', employeeId: '4', projectName: 'Esja plant upkeep', priority: 'low', status: 'inCourse', dueDate: '2026-07-19', areaId: 'esjusvid' },
]

export function getTasksByArea(areaId?: ProjectAreaId): Task[] {
  if (!areaId) return tasks
  return tasks.filter((task) => task.areaId === areaId)
}
