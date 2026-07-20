export const accessLevels = ['full', 'editable', 'viewer', 'forbidden'] as const

export type AccessLevel = (typeof accessLevels)[number]

export const staffCategories = [
  'executiveDirector',
  'divisionManager',
  'departmentManager',
  'employee',
  'fieldStaff',
  'outsideCompany',
] as const

export type StaffCategoryId = (typeof staffCategories)[number]

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

export type AccessMatrix = Record<StaffCategoryId, Record<SystemAreaId, AccessLevel>>

export const defaultAccessMatrix: AccessMatrix = {
  executiveDirector: {
    intranet: 'full',
    news: 'full',
    hr: 'full',
    it: 'full',
    finance: 'full',
    projects: 'full',
    worklist: 'full',
    contracts: 'full',
    events: 'full',
  },
  divisionManager: {
    intranet: 'full',
    news: 'editable',
    hr: 'editable',
    it: 'viewer',
    finance: 'editable',
    projects: 'full',
    worklist: 'full',
    contracts: 'full',
    events: 'editable',
  },
  departmentManager: {
    intranet: 'editable',
    news: 'editable',
    hr: 'viewer',
    it: 'viewer',
    finance: 'viewer',
    projects: 'full',
    worklist: 'full',
    contracts: 'editable',
    events: 'editable',
  },
  employee: {
    intranet: 'viewer',
    news: 'viewer',
    hr: 'viewer',
    it: 'viewer',
    finance: 'forbidden',
    projects: 'viewer',
    worklist: 'editable',
    contracts: 'viewer',
    events: 'viewer',
  },
  fieldStaff: {
    intranet: 'viewer',
    news: 'viewer',
    hr: 'forbidden',
    it: 'forbidden',
    finance: 'forbidden',
    projects: 'viewer',
    worklist: 'editable',
    contracts: 'forbidden',
    events: 'viewer',
  },
  outsideCompany: {
    intranet: 'forbidden',
    news: 'viewer',
    hr: 'forbidden',
    it: 'forbidden',
    finance: 'forbidden',
    projects: 'viewer',
    worklist: 'viewer',
    contracts: 'forbidden',
    events: 'viewer',
  },
}

export function createAccessMatrix(source: AccessMatrix = defaultAccessMatrix): AccessMatrix {
  return staffCategories.reduce((matrix, category) => {
    matrix[category] = { ...source[category] }
    return matrix
  }, {} as AccessMatrix)
}
