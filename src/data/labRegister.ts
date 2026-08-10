export type LabTestStatus =
  | 'pass'
  | 'borderline'
  | 'fail'
  | 'awaitingResult'
  | 'noBatch'

export type LabRegisterStat = {
  id: string
  value: number
  labelKey: string
}

export type LabTestRow = {
  id: string
  batch: string | null
  date: string
  jobSerial: string | null
  jobLabelKey: string
  productKey: string
  testTypeKey: string
  result: string | null
  spec: string | null
  status: LabTestStatus
}

export const labRegisterMeta = {
  monthKey: 'labRegister.month.july2026',
} as const

export const labRegisterStats: LabRegisterStat[] = [
  { id: 'tests', value: 148, labelKey: 'labRegister.stats.testsThisMonth' },
  { id: 'awaiting', value: 12, labelKey: 'labRegister.stats.awaitingResult' },
  { id: 'failing', value: 3, labelKey: 'labRegister.stats.failingSpec' },
  { id: 'noBatch', value: 7, labelKey: 'labRegister.stats.samplesNoBatch' },
]

export const labTestRows: LabTestRow[] = [
  {
    id: 'lab-1',
    batch: 'L-26-0731-02',
    date: '2026-07-31',
    jobSerial: '26-0412',
    jobLabelKey: 'labRegister.jobs.reykjanesbraut',
    productKey: 'labRegister.products.y16Wearing',
    testTypeKey: 'labRegister.tests.binderContent',
    result: '5.42 %',
    spec: '5.20–5.80 %',
    status: 'pass',
  },
  {
    id: 'lab-2',
    batch: 'L-26-0731-02',
    date: '2026-07-31',
    jobSerial: '26-0412',
    jobLabelKey: 'labRegister.jobs.reykjanesbraut',
    productKey: 'labRegister.products.y16Wearing',
    testTypeKey: 'labRegister.tests.airVoids',
    result: '6.80 %',
    spec: '3.00–7.00 %',
    status: 'borderline',
  },
  {
    id: 'lab-3',
    batch: 'L-26-0730-01',
    date: '2026-07-30',
    jobSerial: '26-0388',
    jobLabelKey: 'labRegister.jobs.vegagerdin',
    productKey: 'labRegister.products.th11Binder',
    testTypeKey: 'labRegister.tests.grading8mm',
    result: '41.2 %',
    spec: '45.0–60.0 %',
    status: 'fail',
  },
  {
    id: 'lab-4',
    batch: 'L-26-0731-03',
    date: '2026-07-31',
    jobSerial: '26-0401',
    jobLabelKey: 'labRegister.jobs.kopavogsbaer',
    productKey: 'labRegister.products.y16Wearing',
    testTypeKey: 'labRegister.tests.coreCompaction',
    result: null,
    spec: '≥ 97.0 %',
    status: 'awaitingResult',
  },
  {
    id: 'lab-5',
    batch: null,
    date: '2026-07-29',
    jobSerial: null,
    jobLabelKey: 'labRegister.jobs.weighingSample',
    productKey: 'labRegister.products.y16Wearing',
    testTypeKey: 'labRegister.tests.notRecorded',
    result: null,
    spec: null,
    status: 'noBatch',
  },
]
