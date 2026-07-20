import type { DepartmentId } from './hr'

export const licenseStatuses = ['valid', 'expiringSoon', 'expired'] as const
export type LicenseStatus = (typeof licenseStatuses)[number]

export const licenseOverviewStats = [
  { id: 'employees', value: 56, labelKey: 'hr.licenses.stats.employees' },
  { id: 'active', value: 41, labelKey: 'hr.licenses.stats.active' },
  { id: 'expiring', value: 9, labelKey: 'hr.licenses.stats.expiring' },
  { id: 'expired', value: 6, labelKey: 'hr.licenses.stats.expired' },
] as const

export type EmployeeLicense = {
  id: string
  serial: string
  employeeName: string
  department: DepartmentId
  typeKey: string
  issuedAt: string
  expiresAt: string
  status: LicenseStatus
}

export const employeeLicenses: EmployeeLicense[] = [
  {
    id: 'l1',
    serial: 'LIC-01',
    employeeName: 'Jón Gunnarsson',
    department: 'flugusvid',
    typeKey: 'airsideAccess',
    issuedAt: '2024-03-01',
    expiresAt: '2027-03-01',
    status: 'valid',
  },
  {
    id: 'l2',
    serial: 'LIC-02',
    employeeName: 'Einar Þórsson',
    department: 'esjusvid',
    typeKey: 'heavyMachinery',
    issuedAt: '2023-06-15',
    expiresAt: '2026-08-15',
    status: 'expiringSoon',
  },
  {
    id: 'l3',
    serial: 'LIC-03',
    employeeName: 'Guðrún Pálsdóttir',
    department: 'flugusvid',
    typeKey: 'siteSupervisor',
    issuedAt: '2025-01-10',
    expiresAt: '2028-01-10',
    status: 'valid',
  },
  {
    id: 'l4',
    serial: 'LIC-04',
    employeeName: 'Sigríður Jónsdóttir',
    department: 'esjusvid',
    typeKey: 'qualityInspector',
    issuedAt: '2022-09-20',
    expiresAt: '2025-09-20',
    status: 'expired',
  },
  {
    id: 'l5',
    serial: 'LIC-05',
    employeeName: 'Arnar Freyr Jóhannsson',
    department: 'flugusvid',
    typeKey: 'heavyMachinery',
    issuedAt: '2024-11-01',
    expiresAt: '2026-09-01',
    status: 'expiringSoon',
  },
  {
    id: 'l6',
    serial: 'LIC-06',
    employeeName: 'Ólafur Sigurðsson',
    department: 'taekni',
    typeKey: 'itAdmin',
    issuedAt: '2025-04-12',
    expiresAt: '2027-04-12',
    status: 'valid',
  },
  {
    id: 'l7',
    serial: 'LIC-07',
    employeeName: 'Helga Magnúsdóttir',
    department: 'sala',
    typeKey: 'clientSiteAccess',
    issuedAt: '2021-05-03',
    expiresAt: '2024-05-03',
    status: 'expired',
  },
  {
    id: 'l8',
    serial: 'LIC-08',
    employeeName: 'Björn Halldórsson',
    department: 'fjarmal',
    typeKey: 'financeSigning',
    issuedAt: '2024-08-18',
    expiresAt: '2027-08-18',
    status: 'valid',
  },
]
