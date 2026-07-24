import type { TFunction } from 'i18next'
import { equipmentItems } from '../../data/equipment'
import {
  mvProjectJob,
  nextHourSerial,
  repairsWorkItem,
  type DriverJob,
  type DriverOrigin,
  type DriverProduct,
  type HourCategory,
  type HourEntry,
  type RepairRoleSubtype,
  type RepairRoleType,
  type UnderworkJob,
  type WorkItem,
} from '../../data/hours'

export type HoursFormValues = {
  category: HourCategory
  date: string
  description: string
  comments: string
  job: DriverJob | ''
  equipmentId: string
  origin: DriverOrigin | ''
  startOdometerKm: string
  product: DriverProduct | ''
  underworkJob: UnderworkJob | ''
  workItem: WorkItem | ''
  repairRoleType: RepairRoleType | ''
  repairRoleSubtype: RepairRoleSubtype | ''
  mvJob: typeof mvProjectJob | ''
}

export function canStartHours(values: HoursFormValues) {
  const { category, date } = values
  if (!date) return false

  if (category === 'driverRegistration') {
    if (!values.job || !values.equipmentId || !values.origin || !values.product) return false
    const parsedOdometer = Number(values.startOdometerKm.replace(/\s/g, ''))
    return Number.isFinite(parsedOdometer) && parsedOdometer >= 0
  }

  if (category === 'underwork' || category === 'paving') {
    return Boolean(values.underworkJob && values.workItem)
  }

  if (category === 'repairs') {
    return Boolean(
      values.repairRoleType &&
        values.repairRoleSubtype &&
        values.workItem &&
        values.equipmentId,
    )
  }

  if (category === 'mvProjects') {
    return values.mvJob === mvProjectJob
  }

  return values.description.trim().length > 0
}

export function buildHourEntry(
  values: HoursFormValues,
  workedHours: number,
  entries: HourEntry[],
  currentUserName: string,
  t: TFunction,
): HourEntry | null {
  const { category } = values
  if (workedHours <= 0) return null

  const serial = nextHourSerial(entries)
  const comments = values.comments.trim()

  if (category === 'driverRegistration') {
    if (!values.job || !values.equipmentId || !values.origin || !values.product) return null

    const parsedOdometer = Number(values.startOdometerKm.replace(/\s/g, ''))
    if (!Number.isFinite(parsedOdometer) || parsedOdometer < 0) return null

    const equipment = equipmentItems.find((item) => item.id === values.equipmentId)
    return {
      id: serial,
      serial,
      description: `${t(`hours.driverJobs.${values.job}`)} · ${equipment?.name ?? values.equipmentId}`,
      category,
      hours: workedHours,
      date: values.date,
      submittedBy: currentUserName,
      driverDetails: {
        job: values.job,
        equipmentId: values.equipmentId,
        origin: values.origin,
        startOdometerKm: Math.round(parsedOdometer),
        product: values.product,
        comments,
      },
    }
  }

  if (category === 'underwork' || category === 'paving') {
    if (!values.underworkJob || !values.workItem) return null

    const equipment = values.equipmentId
      ? equipmentItems.find((item) => item.id === values.equipmentId)
      : null

    return {
      id: serial,
      serial,
      description: `${t(`hours.underworkJobs.${values.underworkJob}`)} · ${t(`hours.underworkItems.${values.workItem}`)}`,
      category,
      hours: workedHours,
      date: values.date,
      submittedBy: currentUserName,
      underworkDetails: {
        job: values.underworkJob,
        workItem: values.workItem,
        equipmentId: equipment?.id ?? null,
        comments,
      },
    }
  }

  if (category === 'repairs') {
    if (
      !values.repairRoleType ||
      !values.repairRoleSubtype ||
      !values.equipmentId ||
      values.workItem !== repairsWorkItem
    ) {
      return null
    }

    const equipment = equipmentItems.find((item) => item.id === values.equipmentId)
    return {
      id: serial,
      serial,
      description: `${t(`hours.repairRoleTypes.${values.repairRoleType}`)} · ${equipment?.name ?? values.equipmentId}`,
      category,
      hours: workedHours,
      date: values.date,
      submittedBy: currentUserName,
      repairDetails: {
        roleType: values.repairRoleType,
        roleSubtype: values.repairRoleSubtype,
        workItem: repairsWorkItem,
        equipmentId: values.equipmentId,
        comments,
      },
    }
  }

  if (category === 'mvProjects') {
    if (values.mvJob !== mvProjectJob) return null

    return {
      id: serial,
      serial,
      description: t(`hours.mvProjectJobs.${values.mvJob}`),
      category,
      hours: workedHours,
      date: values.date,
      submittedBy: currentUserName,
      mvProjectDetails: {
        job: mvProjectJob,
        comments,
      },
    }
  }

  const trimmedDescription = values.description.trim()
  if (!trimmedDescription) return null

  return {
    id: serial,
    serial,
    description: trimmedDescription,
    category,
    hours: workedHours,
    date: values.date,
    submittedBy: currentUserName,
  }
}
