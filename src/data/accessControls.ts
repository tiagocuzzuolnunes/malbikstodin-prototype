export const systemAreas = [
  'intranet',
  'news',
  'hr',
  'it',
  'finance',
  'projects',
  'worklist',
  'contracts',
  'events',
] as const

export type SystemAreaId = (typeof systemAreas)[number]

export const accessModeStatuses = ['active', 'inactive'] as const
export type AccessModeStatus = (typeof accessModeStatuses)[number]

export type AccessMode = {
  id: string
  name: string
  /** Whether this mode can access each system area. */
  access: Record<SystemAreaId, boolean>
}

export type EmployeeAccessAssignment = Record<string, string>

function access(
  values: Partial<Record<SystemAreaId, boolean>> & { default?: boolean } = {},
): Record<SystemAreaId, boolean> {
  const fallback = values.default ?? false
  return systemAreas.reduce(
    (row, area) => {
      row[area] = values[area] ?? fallback
      return row
    },
    {} as Record<SystemAreaId, boolean>,
  )
}

export const defaultAccessModes: AccessMode[] = [
  {
    id: 'full-access',
    name: 'Full access',
    access: access({ default: true }),
  },
  {
    id: 'manager',
    name: 'Manager',
    access: access({
      default: true,
      it: false,
    }),
  },
  {
    id: 'employee',
    name: 'Employee',
    access: access({
      intranet: true,
      news: true,
      hr: true,
      it: true,
      finance: false,
      projects: true,
      worklist: true,
      contracts: true,
      events: true,
    }),
  },
  {
    id: 'field-staff',
    name: 'Field staff',
    access: access({
      intranet: true,
      news: true,
      hr: false,
      it: false,
      finance: false,
      projects: true,
      worklist: true,
      contracts: false,
      events: true,
    }),
  },
  {
    id: 'external',
    name: 'External',
    access: access({
      intranet: false,
      news: true,
      hr: false,
      it: false,
      finance: false,
      projects: true,
      worklist: true,
      contracts: false,
      events: true,
    }),
  },
]

/** Sensible starter assignments by employee id (mock). */
export const defaultEmployeeAccess: EmployeeAccessAssignment = {
  '1': 'manager',
  '2': 'manager',
  '3': 'field-staff',
  '4': 'employee',
  '5': 'full-access',
  '6': 'employee',
  '7': 'manager',
  '8': 'employee',
  '9': 'full-access',
  '10': 'employee',
  '11': 'field-staff',
  '12': 'manager',
}

export function createAccessModes(source: AccessMode[] = defaultAccessModes): AccessMode[] {
  return source.map((mode) => ({
    ...mode,
    access: { ...mode.access },
  }))
}

export function createEmployeeAccess(
  source: EmployeeAccessAssignment = defaultEmployeeAccess,
): EmployeeAccessAssignment {
  return { ...source }
}

export function createBlankAccessMode(name = '', id?: string): AccessMode {
  return {
    id: id ?? `mode-${Date.now()}`,
    name,
    access: access({ default: false }),
  }
}

export function countEmployeesForMode(
  modeId: string,
  assignments: EmployeeAccessAssignment,
) {
  return Object.values(assignments).filter((assigned) => assigned === modeId).length
}

export function hasAnySystemArea(accessMap: Record<SystemAreaId, boolean>) {
  return systemAreas.some((area) => accessMap[area])
}

/** Active only when the level unlocks at least one area and is assigned to at least one user. */
export function resolveAccessModeStatus(
  mode: Pick<AccessMode, 'id' | 'access'>,
  assignments: EmployeeAccessAssignment,
): AccessModeStatus {
  const hasAreas = hasAnySystemArea(mode.access)
  const hasUsers = countEmployeesForMode(mode.id, assignments) > 0
  return hasAreas && hasUsers ? 'active' : 'inactive'
}
