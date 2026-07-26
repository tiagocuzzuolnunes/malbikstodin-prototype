import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  initialHourEntries,
  mvProjectJob,
  pavingWorkItem,
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
import { buildHourEntry, canStartHours, type HoursFormValues } from './buildHourEntry'
import {
  clampHoursRegistrationDate,
  getHoursRegistrationDateBounds,
  toLocalIsoDate,
} from './hoursUtils'
import { useHoursTimer } from './useHoursTimer'

const defaultCategory: HourCategory = 'driverRegistration'

export function useHoursRegistration() {
  const { t } = useTranslation()
  const currentUserName = t('home.userName')
  const timer = useHoursTimer()

  const [entries, setEntries] = useState<HourEntry[]>(initialHourEntries)
  const [submittedNotice, setSubmittedNotice] = useState(false)

  const [category, setCategory] = useState<HourCategory>(defaultCategory)
  const [date, setDate] = useState(() => toLocalIsoDate())
  const dateBounds = getHoursRegistrationDateBounds()
  const [description, setDescription] = useState('')
  const [comments, setComments] = useState('')
  const [job, setJob] = useState<DriverJob | ''>('')
  const [equipmentId, setEquipmentId] = useState('')
  const [origin, setOrigin] = useState<DriverOrigin | ''>('')
  const [startOdometerKm, setStartOdometerKm] = useState('0')
  const [product, setProduct] = useState<DriverProduct | ''>('')
  const [underworkJob, setUnderworkJob] = useState<UnderworkJob | ''>('')
  const [workItem, setWorkItem] = useState<WorkItem | ''>('')
  const [repairRoleType, setRepairRoleType] = useState<RepairRoleType | ''>('')
  const [repairRoleSubtype, setRepairRoleSubtype] = useState<RepairRoleSubtype | ''>('')
  const [mvJob, setMvJob] = useState<typeof mvProjectJob | ''>('')

  const values: HoursFormValues = {
    category,
    date,
    description,
    comments,
    job,
    equipmentId,
    origin,
    startOdometerKm,
    product,
    underworkJob,
    workItem,
    repairRoleType,
    repairRoleSubtype,
    mvJob,
  }

  function touch() {
    setSubmittedNotice(false)
  }

  function resetDriverFields() {
    setJob('')
    setEquipmentId('')
    setOrigin('')
    setStartOdometerKm('0')
    setProduct('')
    setComments('')
  }

  function resetUnderworkFields() {
    setUnderworkJob('')
    setWorkItem('')
    setEquipmentId('')
    setComments('')
  }

  function resetRepairFields() {
    setRepairRoleType('')
    setRepairRoleSubtype('')
    setWorkItem('')
    setEquipmentId('')
    setComments('')
  }

  function resetMvProjectFields() {
    setMvJob('')
    setComments('')
  }

  function clearCategoryFields(next: HourCategory) {
    if (next === 'driverRegistration') {
      resetUnderworkFields()
      resetRepairFields()
      resetMvProjectFields()
      setDescription('')
      return
    }

    if (next === 'underwork') {
      resetDriverFields()
      resetRepairFields()
      resetMvProjectFields()
      setDescription('')
      setWorkItem('')
      return
    }

    if (next === 'paving') {
      resetDriverFields()
      resetRepairFields()
      resetMvProjectFields()
      setDescription('')
      setUnderworkJob('')
      setEquipmentId('')
      setComments('')
      setWorkItem(pavingWorkItem)
      return
    }

    if (next === 'repairs') {
      resetDriverFields()
      resetUnderworkFields()
      resetMvProjectFields()
      setDescription('')
      setRepairRoleType('')
      setRepairRoleSubtype('')
      setEquipmentId('')
      setComments('')
      setWorkItem(repairsWorkItem)
      return
    }

    if (next === 'mvProjects') {
      resetDriverFields()
      resetUnderworkFields()
      resetRepairFields()
      setDescription('')
      setComments('')
      setMvJob(mvProjectJob)
      return
    }

    resetDriverFields()
    resetUnderworkFields()
    resetRepairFields()
    resetMvProjectFields()
  }

  function selectCategory(next: HourCategory) {
    if (timer.fieldsLocked || next === category) return
    touch()
    setCategory(next)
    clearCategoryFields(next)
  }

  function resetToDefaultCategory() {
    resetDriverFields()
    resetUnderworkFields()
    resetRepairFields()
    resetMvProjectFields()
    setDescription('')
    setCategory(defaultCategory)
  }

  function saveEntry(workedHours: number) {
    const nextEntry = buildHourEntry(values, workedHours, entries, currentUserName, t)
    if (!nextEntry) return

    setEntries((current) => [nextEntry, ...current])
    resetToDefaultCategory()
    setSubmittedNotice(true)
    timer.reset()
  }

  function handleTimerToggle() {
    touch()

    if (!timer.isRunning) {
      if (!canStartHours(values)) return
      timer.start()
      return
    }

    const workedHours = timer.finishHours()
    if (workedHours <= 0) {
      timer.reset()
      return
    }

    saveEntry(workedHours)
  }

  function handleCancel() {
    touch()
    if (timer.isRunning) {
      timer.reset()
      return
    }
    resetToDefaultCategory()
  }

  return {
    entries,
    submittedNotice,
    values,
    dateBounds,
    currentUserName,
    isRunning: timer.isRunning,
    elapsedMs: timer.elapsedMs,
    fieldsLocked: timer.fieldsLocked,
    canStart: canStartHours(values),
    selectCategory,
    handleTimerToggle,
    handleCancel,
    setDate: (next: string) => {
      touch()
      setDate(clampHoursRegistrationDate(next))
    },
    setDescription: (next: string) => {
      touch()
      setDescription(next)
    },
    setComments: (next: string) => {
      touch()
      setComments(next)
    },
    setJob: (next: DriverJob | '') => {
      touch()
      setJob(next)
    },
    setEquipmentId: (next: string) => {
      touch()
      setEquipmentId(next)
    },
    setOrigin: (next: DriverOrigin | '') => {
      touch()
      setOrigin(next)
    },
    setStartOdometerKm: (next: string) => {
      touch()
      setStartOdometerKm(next)
    },
    setProduct: (next: DriverProduct | '') => {
      touch()
      setProduct(next)
    },
    setUnderworkJob: (next: UnderworkJob | '') => {
      touch()
      setUnderworkJob(next)
    },
    setWorkItem: (next: WorkItem | '') => {
      touch()
      setWorkItem(next)
    },
    setRepairRoleType: (next: RepairRoleType | '') => {
      touch()
      setRepairRoleType(next)
    },
    setRepairRoleSubtype: (next: RepairRoleSubtype | '') => {
      touch()
      setRepairRoleSubtype(next)
    },
  }
}

export type HoursRegistration = ReturnType<typeof useHoursRegistration>