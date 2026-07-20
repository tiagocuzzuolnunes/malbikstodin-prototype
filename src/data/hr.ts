export const hrStats = [
  {
    id: 'working',
    value: 56,
    labelKey: 'hr.stats.working',
    to: '/mannaudur/leyfi',
    openHintKey: 'hr.licenses.openHint',
  },
  { id: 'newHires', value: 4, labelKey: 'hr.stats.newHires' },
  { id: 'vacancies', value: 3, labelKey: 'hr.stats.vacancies' },
  {
    id: 'inTraining',
    value: 8,
    labelKey: 'hr.stats.inTraining',
    to: '/mannaudur/thjalfun',
    openHintKey: 'hr.training.openHint',
  },
] as const

export type DepartmentId = 'flugusvid' | 'esjusvid' | 'fjarmal' | 'sala' | 'taekni'

export type NewHire = {
  id: string
  name: string
  title: string
  department: DepartmentId
  startedAt: string
}

export const newHires: NewHire[] = [
  {
    id: 'nh1',
    name: 'Þóra Lind Einarsdóttir',
    title: 'HR Specialist',
    department: 'fjarmal',
    startedAt: '2026-02-03',
  },
  {
    id: 'nh2',
    name: 'Andri Már Stefánsson',
    title: 'Machine Operator',
    department: 'flugusvid',
    startedAt: '2026-03-17',
  },
  {
    id: 'nh3',
    name: 'Elín Rós Gísladóttir',
    title: 'Quality Technician',
    department: 'esjusvid',
    startedAt: '2026-05-04',
  },
  {
    id: 'nh4',
    name: 'Davíð Logi Bjarnason',
    title: 'IT Support',
    department: 'taekni',
    startedAt: '2026-06-16',
  },
]

export type EmployeeInTraining = {
  id: string
  name: string
  title: string
  department: DepartmentId
  courseKey: string
}

export const employeesInTraining: EmployeeInTraining[] = [
  {
    id: 'tr1',
    name: 'Jón Gunnarsson',
    title: 'Verkstjóri',
    department: 'flugusvid',
    courseKey: 'airsideSafety',
  },
  {
    id: 'tr2',
    name: 'Sigríður Jónsdóttir',
    title: 'Gæðastjóri',
    department: 'esjusvid',
    courseKey: 'qualitySystems',
  },
  {
    id: 'tr3',
    name: 'Ásta Ragnarsdóttir',
    title: 'Bókari',
    department: 'fjarmal',
    courseKey: 'financeCompliance',
  },
  {
    id: 'tr4',
    name: 'Katrín Björnsdóttir',
    title: 'Hugbúnaðarverkfræðingur',
    department: 'taekni',
    courseKey: 'cyberSecurity',
  },
  {
    id: 'tr5',
    name: 'Helga Magnúsdóttir',
    title: 'Sölufulltrúi',
    department: 'sala',
    courseKey: 'clientSafety',
  },
  {
    id: 'tr6',
    name: 'Einar Þórsson',
    title: 'Vélamaður',
    department: 'esjusvid',
    courseKey: 'equipmentHandling',
  },
  {
    id: 'tr7',
    name: 'Arnar Freyr Jóhannsson',
    title: 'Vinnuvélamaður',
    department: 'flugusvid',
    courseKey: 'airsideSafety',
  },
  {
    id: 'tr8',
    name: 'Ólafur Sigurðsson',
    title: 'Kerfisstjóri',
    department: 'taekni',
    courseKey: 'cyberSecurity',
  },
]

export type HrEvent = {
  id: string
  titleKey: string
  date: string
  time?: string
}

export const hrEvents: HrEvent[] = [
  { id: 'he1', titleKey: 'onboardingKickoff', date: '2026-07-21', time: '09:00' },
  { id: 'he2', titleKey: 'safetyTraining', date: '2026-07-24', time: '13:00' },
  { id: 'he3', titleKey: 'performanceReviews', date: '2026-07-28', time: '10:00' },
  { id: 'he4', titleKey: 'benefitsInfoSession', date: '2026-08-05', time: '11:30' },
  { id: 'he5', titleKey: 'leadershipWorkshop', date: '2026-08-12', time: '09:30' },
]

export const certificationStatuses = ['onCourse', 'valid', 'expired'] as const
export type CertificationStatus = (typeof certificationStatuses)[number]

export type Certification = {
  id: string
  nameKey: string
  department: DepartmentId
  issuedAt: string
  status: CertificationStatus
}

export const certifications: Certification[] = [
  { id: 'c1', nameKey: 'airsideSafety', department: 'flugusvid', issuedAt: '2026-04-12', status: 'onCourse' },
  { id: 'c2', nameKey: 'heavyEquipment', department: 'esjusvid', issuedAt: '2025-09-03', status: 'valid' },
  { id: 'c3', nameKey: 'firstAid', department: 'flugusvid', issuedAt: '2023-11-18', status: 'expired' },
  { id: 'c4', nameKey: 'isoQuality', department: 'esjusvid', issuedAt: '2026-01-22', status: 'valid' },
  { id: 'c5', nameKey: 'cyberBasics', department: 'taekni', issuedAt: '2026-05-08', status: 'onCourse' },
  { id: 'c6', nameKey: 'financeEthics', department: 'fjarmal', issuedAt: '2024-06-14', status: 'valid' },
  { id: 'c7', nameKey: 'salesCompliance', department: 'sala', issuedAt: '2022-08-30', status: 'expired' },
  { id: 'c8', nameKey: 'plantSafety', department: 'esjusvid', issuedAt: '2026-03-01', status: 'onCourse' },
]

export type UpcomingCourse = {
  id: string
  titleKey: string
  date: string
  time?: string
}

export const upcomingCourses: UpcomingCourse[] = [
  { id: 'uc1', titleKey: 'airsideRefresh', date: '2026-07-22', time: '08:30' },
  { id: 'uc2', titleKey: 'qualityWorkshop', date: '2026-07-25', time: '10:00' },
  { id: 'uc3', titleKey: 'cyberDrill', date: '2026-07-29', time: '14:00' },
  { id: 'uc4', titleKey: 'leadershipBasics', date: '2026-08-04', time: '09:00' },
  { id: 'uc5', titleKey: 'firstAidRenewal', date: '2026-08-11', time: '13:30' },
]

export type DepartmentCourseProgress = {
  department: DepartmentId
  progress: number
}

export const departmentCourseProgress: DepartmentCourseProgress[] = [
  { department: 'flugusvid', progress: 78 },
  { department: 'esjusvid', progress: 64 },
  { department: 'fjarmal', progress: 91 },
  { department: 'sala', progress: 52 },
  { department: 'taekni', progress: 85 },
]
