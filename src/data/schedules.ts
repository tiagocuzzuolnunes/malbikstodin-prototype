import type { ProjectAreaId } from '../config/projects'

export type ScheduleBlock = {
  id: string
  startTime: string
  endTime: string
  titleKey: string
  locationKey?: string
}

export type EmployeeDaySchedule = {
  employeeId: string
  blocks: ScheduleBlock[]
}

export type AreaDaySchedule = {
  areaId: ProjectAreaId
  date: string
  employees: EmployeeDaySchedule[]
}

export const areaSchedules: AreaDaySchedule[] = [
  {
    areaId: 'rekstrarsvid',
    date: '2026-07-17',
    employees: [
      {
        employeeId: '5',
        blocks: [
          { id: 'rs1', startTime: '08:00', endTime: '09:30', titleKey: 'morningBriefing', locationKey: 'office' },
          { id: 'rs2', startTime: '09:45', endTime: '12:00', titleKey: 'budgetReview', locationKey: 'financeRoom' },
          { id: 'rs3', startTime: '13:00', endTime: '15:30', titleKey: 'opsCoordination', locationKey: 'opsDesk' },
          { id: 'rs4', startTime: '15:45', endTime: '17:00', titleKey: 'statusReporting', locationKey: 'office' },
        ],
      },
      {
        employeeId: '6',
        blocks: [
          { id: 'rs5', startTime: '08:15', endTime: '10:00', titleKey: 'invoiceProcessing', locationKey: 'financeRoom' },
          { id: 'rs6', startTime: '10:15', endTime: '12:00', titleKey: 'vendorFollowUp', locationKey: 'office' },
          { id: 'rs7', startTime: '13:00', endTime: '16:30', titleKey: 'monthEndPrep', locationKey: 'financeRoom' },
        ],
      },
      {
        employeeId: '2',
        blocks: [
          { id: 'rs8', startTime: '07:45', endTime: '09:00', titleKey: 'siteHandover', locationKey: 'field' },
          { id: 'rs9', startTime: '09:15', endTime: '11:45', titleKey: 'clientCall', locationKey: 'office' },
          { id: 'rs10', startTime: '12:45', endTime: '15:00', titleKey: 'deliveryPlanning', locationKey: 'opsDesk' },
          { id: 'rs11', startTime: '15:15', endTime: '16:45', titleKey: 'teamSync', locationKey: 'office' },
        ],
      },
    ],
  },
  {
    areaId: 'flugusvid',
    date: '2026-07-17',
    employees: [
      {
        employeeId: '1',
        blocks: [
          { id: 'fs1', startTime: '06:30', endTime: '08:00', titleKey: 'airsideBriefing', locationKey: 'airside' },
          { id: 'fs2', startTime: '08:15', endTime: '11:30', titleKey: 'runwayPaving', locationKey: 'runway' },
          { id: 'fs3', startTime: '12:30', endTime: '15:00', titleKey: 'equipmentCheck', locationKey: 'yard' },
          { id: 'fs4', startTime: '15:15', endTime: '17:00', titleKey: 'shiftHandover', locationKey: 'airside' },
        ],
      },
      {
        employeeId: '2',
        blocks: [
          { id: 'fs5', startTime: '07:00', endTime: '09:00', titleKey: 'permitReview', locationKey: 'office' },
          { id: 'fs6', startTime: '09:15', endTime: '12:00', titleKey: 'apronInspection', locationKey: 'apron' },
          { id: 'fs7', startTime: '13:00', endTime: '16:00', titleKey: 'progressReporting', locationKey: 'office' },
        ],
      },
      {
        employeeId: '7',
        blocks: [
          { id: 'fs8', startTime: '08:00', endTime: '10:30', titleKey: 'clientWalkthrough', locationKey: 'apron' },
          { id: 'fs9', startTime: '10:45', endTime: '12:15', titleKey: 'materialOrders', locationKey: 'office' },
          { id: 'fs10', startTime: '13:15', endTime: '15:45', titleKey: 'deliveryWindow', locationKey: 'yard' },
          { id: 'fs11', startTime: '16:00', endTime: '17:00', titleKey: 'dayCloseout', locationKey: 'office' },
        ],
      },
    ],
  },
  {
    areaId: 'esjusvid',
    date: '2026-07-17',
    employees: [
      {
        employeeId: '3',
        blocks: [
          { id: 'es1', startTime: '07:00', endTime: '09:30', titleKey: 'plantStartup', locationKey: 'plant' },
          { id: 'es2', startTime: '09:45', endTime: '12:00', titleKey: 'haulRoadSupport', locationKey: 'quarry' },
          { id: 'es3', startTime: '13:00', endTime: '16:30', titleKey: 'loaderOps', locationKey: 'plant' },
        ],
      },
      {
        employeeId: '4',
        blocks: [
          { id: 'es4', startTime: '08:00', endTime: '10:00', titleKey: 'qualitySampling', locationKey: 'lab' },
          { id: 'es5', startTime: '10:15', endTime: '12:30', titleKey: 'moistureChecks', locationKey: 'plant' },
          { id: 'es6', startTime: '13:30', endTime: '15:30', titleKey: 'docsUpdate', locationKey: 'office' },
          { id: 'es7', startTime: '15:45', endTime: '17:00', titleKey: 'qcSignoff', locationKey: 'lab' },
        ],
      },
      {
        employeeId: '1',
        blocks: [
          { id: 'es8', startTime: '06:45', endTime: '08:15', titleKey: 'crewBriefing', locationKey: 'yard' },
          { id: 'es9', startTime: '08:30', endTime: '11:45', titleKey: 'blastWindowCoord', locationKey: 'quarry' },
          { id: 'es10', startTime: '12:45', endTime: '15:15', titleKey: 'accessRoadCheck', locationKey: 'field' },
          { id: 'es11', startTime: '15:30', endTime: '16:45', titleKey: 'endOfDayReview', locationKey: 'office' },
        ],
      },
    ],
  },
]

export function getScheduleByArea(areaId: ProjectAreaId): AreaDaySchedule | undefined {
  return areaSchedules.find((schedule) => schedule.areaId === areaId)
}

export function getSchedules(areaId?: ProjectAreaId): AreaDaySchedule[] {
  if (!areaId) return areaSchedules
  const schedule = getScheduleByArea(areaId)
  return schedule ? [schedule] : []
}
