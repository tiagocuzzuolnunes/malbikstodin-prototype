export type JobPipelineStageId =
  | 'tender'
  | 'job'
  | 'schedule'
  | 'review'
  | 'invoice'
  | 'close'

export type JobPipelineFlag =
  | 'deadlineMissing'
  | 'onTrack'
  | 'noForeman'
  | 'noScheduleDate'
  | 'unapprovedDays'
  | 'awaitingDocket'
  | 'samplesOutstanding'
  | 'waitingClient'
  | 'rateGap'
  | 'docsMissing'

export type JobPipelineAmountUnit = 'isk' | 'tonnes'

export type JobPipelineJob = {
  id: string
  serial: string
  clientKey: string
  amount: number
  amountUnit: JobPipelineAmountUnit
  daysInStage: number
  flag: JobPipelineFlag
  stageId: JobPipelineStageId
}

export type JobPipelineStage = {
  id: JobPipelineStageId
  labelKey: string
}

export type JobPipelineStat = {
  id: string
  labelKey: string
  value: number
  format: 'count' | 'isk'
}

export const jobPipelineStages: JobPipelineStage[] = [
  { id: 'tender', labelKey: 'jobPipeline.stages.tender' },
  { id: 'job', labelKey: 'jobPipeline.stages.job' },
  { id: 'schedule', labelKey: 'jobPipeline.stages.schedule' },
  { id: 'review', labelKey: 'jobPipeline.stages.review' },
  { id: 'invoice', labelKey: 'jobPipeline.stages.invoice' },
  { id: 'close', labelKey: 'jobPipeline.stages.close' },
]

export const jobPipelineStats: JobPipelineStat[] = [
  {
    id: 'inProgress',
    labelKey: 'jobPipeline.stats.inProgress',
    value: 47,
    format: 'count',
  },
  {
    id: 'stuck',
    labelKey: 'jobPipeline.stats.stuck',
    value: 9,
    format: 'count',
  },
  {
    id: 'pastDeadline',
    labelKey: 'jobPipeline.stats.pastDeadline',
    value: 4,
    format: 'count',
  },
  {
    id: 'readyToInvoice',
    labelKey: 'jobPipeline.stats.readyToInvoice',
    value: 12_480_500,
    format: 'isk',
  },
]

/** Featured + filler jobs — totals match stage counts (47). */
export const jobPipelineJobs: JobPipelineJob[] = [
  // Tender (11)
  {
    id: 'jp-t1',
    serial: '26-0412',
    clientKey: 'jobPipeline.clients.reykjavik',
    amount: 4_850_000,
    amountUnit: 'isk',
    daysInStage: 12,
    flag: 'deadlineMissing',
    stageId: 'tender',
  },
  {
    id: 'jp-t2',
    serial: '26-0455',
    clientKey: 'jobPipeline.clients.gardabaer',
    amount: 1_940_000,
    amountUnit: 'isk',
    daysInStage: 2,
    flag: 'onTrack',
    stageId: 'tender',
  },
  {
    id: 'jp-t3',
    serial: '26-0461',
    clientKey: 'jobPipeline.clients.mosfellsbaer',
    amount: 3_120_000,
    amountUnit: 'isk',
    daysInStage: 5,
    flag: 'waitingClient',
    stageId: 'tender',
  },
  {
    id: 'jp-t4',
    serial: '26-0468',
    clientKey: 'jobPipeline.clients.akureyri',
    amount: 6_400_000,
    amountUnit: 'isk',
    daysInStage: 1,
    flag: 'onTrack',
    stageId: 'tender',
  },
  {
    id: 'jp-t5',
    serial: '26-0472',
    clientKey: 'jobPipeline.clients.seltiarnarnes',
    amount: 980_000,
    amountUnit: 'isk',
    daysInStage: 8,
    flag: 'deadlineMissing',
    stageId: 'tender',
  },
  {
    id: 'jp-t6',
    serial: '26-0475',
    clientKey: 'jobPipeline.clients.alftanes',
    amount: 2_250_000,
    amountUnit: 'isk',
    daysInStage: 3,
    flag: 'onTrack',
    stageId: 'tender',
  },
  {
    id: 'jp-t7',
    serial: '26-0479',
    clientKey: 'jobPipeline.clients.keldnaholt',
    amount: 5_100_000,
    amountUnit: 'isk',
    daysInStage: 6,
    flag: 'waitingClient',
    stageId: 'tender',
  },
  {
    id: 'jp-t8',
    serial: '26-0483',
    clientKey: 'jobPipeline.clients.reykjanesbaer',
    amount: 4_220_000,
    amountUnit: 'isk',
    daysInStage: 4,
    flag: 'onTrack',
    stageId: 'tender',
  },
  {
    id: 'jp-t9',
    serial: '26-0488',
    clientKey: 'jobPipeline.clients.selfoss',
    amount: 1_560_000,
    amountUnit: 'isk',
    daysInStage: 9,
    flag: 'docsMissing',
    stageId: 'tender',
  },
  {
    id: 'jp-t10',
    serial: '26-0491',
    clientKey: 'jobPipeline.clients.borgarbyggd',
    amount: 7_800_000,
    amountUnit: 'isk',
    daysInStage: 2,
    flag: 'onTrack',
    stageId: 'tender',
  },
  {
    id: 'jp-t11',
    serial: '26-0494',
    clientKey: 'jobPipeline.clients.hveragerdi',
    amount: 2_870_000,
    amountUnit: 'isk',
    daysInStage: 7,
    flag: 'waitingClient',
    stageId: 'tender',
  },

  // Job (9)
  {
    id: 'jp-j1',
    serial: '26-0388',
    clientKey: 'jobPipeline.clients.vegagerdin',
    amount: 18_240_000,
    amountUnit: 'isk',
    daysInStage: 5,
    flag: 'noForeman',
    stageId: 'job',
  },
  {
    id: 'jp-j2',
    serial: '26-0392',
    clientKey: 'jobPipeline.clients.istak',
    amount: 8_750_000,
    amountUnit: 'isk',
    daysInStage: 3,
    flag: 'onTrack',
    stageId: 'job',
  },
  {
    id: 'jp-j3',
    serial: '26-0395',
    clientKey: 'jobPipeline.clients.veitur',
    amount: 4_100_000,
    amountUnit: 'isk',
    daysInStage: 11,
    flag: 'rateGap',
    stageId: 'job',
  },
  {
    id: 'jp-j4',
    serial: '26-0399',
    clientKey: 'jobPipeline.clients.hafnarfjordur',
    amount: 6_630_000,
    amountUnit: 'isk',
    daysInStage: 1,
    flag: 'onTrack',
    stageId: 'job',
  },
  {
    id: 'jp-j5',
    serial: '26-0403',
    clientKey: 'jobPipeline.clients.kopavogur',
    amount: 3_450_000,
    amountUnit: 'isk',
    daysInStage: 6,
    flag: 'noForeman',
    stageId: 'job',
  },
  {
    id: 'jp-j6',
    serial: '26-0407',
    clientKey: 'jobPipeline.clients.reykjavik',
    amount: 12_900_000,
    amountUnit: 'isk',
    daysInStage: 4,
    flag: 'onTrack',
    stageId: 'job',
  },
  {
    id: 'jp-j7',
    serial: '26-0410',
    clientKey: 'jobPipeline.clients.gardabaer',
    amount: 2_780_000,
    amountUnit: 'isk',
    daysInStage: 8,
    flag: 'docsMissing',
    stageId: 'job',
  },
  {
    id: 'jp-j8',
    serial: '26-0415',
    clientKey: 'jobPipeline.clients.mosfellsbaer',
    amount: 5_560_000,
    amountUnit: 'isk',
    daysInStage: 2,
    flag: 'onTrack',
    stageId: 'job',
  },
  {
    id: 'jp-j9',
    serial: '26-0418',
    clientKey: 'jobPipeline.clients.akureyri',
    amount: 9_210_000,
    amountUnit: 'isk',
    daysInStage: 15,
    flag: 'rateGap',
    stageId: 'job',
  },

  // Schedule (8)
  {
    id: 'jp-s1',
    serial: '26-0401',
    clientKey: 'jobPipeline.clients.kopavogur',
    amount: 2_310_000,
    amountUnit: 'isk',
    daysInStage: 3,
    flag: 'noScheduleDate',
    stageId: 'schedule',
  },
  {
    id: 'jp-s2',
    serial: '26-0366',
    clientKey: 'jobPipeline.clients.reykjavik',
    amount: 5_440_000,
    amountUnit: 'isk',
    daysInStage: 1,
    flag: 'onTrack',
    stageId: 'schedule',
  },
  {
    id: 'jp-s3',
    serial: '26-0371',
    clientKey: 'jobPipeline.clients.vegagerdin',
    amount: 14_800_000,
    amountUnit: 'isk',
    daysInStage: 10,
    flag: 'noScheduleDate',
    stageId: 'schedule',
  },
  {
    id: 'jp-s4',
    serial: '26-0374',
    clientKey: 'jobPipeline.clients.hafnarfjordur',
    amount: 3_990_000,
    amountUnit: 'isk',
    daysInStage: 4,
    flag: 'onTrack',
    stageId: 'schedule',
  },
  {
    id: 'jp-s5',
    serial: '26-0378',
    clientKey: 'jobPipeline.clients.istak',
    amount: 7_150_000,
    amountUnit: 'isk',
    daysInStage: 6,
    flag: 'waitingClient',
    stageId: 'schedule',
  },
  {
    id: 'jp-s6',
    serial: '26-0381',
    clientKey: 'jobPipeline.clients.veitur',
    amount: 1_870_000,
    amountUnit: 'isk',
    daysInStage: 2,
    flag: 'onTrack',
    stageId: 'schedule',
  },
  {
    id: 'jp-s7',
    serial: '26-0384',
    clientKey: 'jobPipeline.clients.gardabaer',
    amount: 4_530_000,
    amountUnit: 'isk',
    daysInStage: 16,
    flag: 'noScheduleDate',
    stageId: 'schedule',
  },
  {
    id: 'jp-s8',
    serial: '26-0387',
    clientKey: 'jobPipeline.clients.selfoss',
    amount: 2_640_000,
    amountUnit: 'isk',
    daysInStage: 5,
    flag: 'onTrack',
    stageId: 'schedule',
  },

  // Review (7)
  {
    id: 'jp-r1',
    serial: '26-0357',
    clientKey: 'jobPipeline.clients.hafnarfjordur',
    amount: 7412.5,
    amountUnit: 'tonnes',
    daysInStage: 9,
    flag: 'unapprovedDays',
    stageId: 'review',
  },
  {
    id: 'jp-r2',
    serial: '26-0331',
    clientKey: 'jobPipeline.clients.reykjavik',
    amount: 5120,
    amountUnit: 'tonnes',
    daysInStage: 2,
    flag: 'onTrack',
    stageId: 'review',
  },
  {
    id: 'jp-r3',
    serial: '26-0338',
    clientKey: 'jobPipeline.clients.kopavogur',
    amount: 3890.25,
    amountUnit: 'tonnes',
    daysInStage: 7,
    flag: 'unapprovedDays',
    stageId: 'review',
  },
  {
    id: 'jp-r4',
    serial: '26-0342',
    clientKey: 'jobPipeline.clients.vegagerdin',
    amount: 11_240,
    amountUnit: 'tonnes',
    daysInStage: 1,
    flag: 'onTrack',
    stageId: 'review',
  },
  {
    id: 'jp-r5',
    serial: '26-0349',
    clientKey: 'jobPipeline.clients.mosfellsbaer',
    amount: 2650.5,
    amountUnit: 'tonnes',
    daysInStage: 12,
    flag: 'rateGap',
    stageId: 'review',
  },
  {
    id: 'jp-r6',
    serial: '26-0352',
    clientKey: 'jobPipeline.clients.akureyri',
    amount: 4300,
    amountUnit: 'tonnes',
    daysInStage: 3,
    flag: 'onTrack',
    stageId: 'review',
  },
  {
    id: 'jp-r7',
    serial: '26-0355',
    clientKey: 'jobPipeline.clients.seltiarnarnes',
    amount: 1980.75,
    amountUnit: 'tonnes',
    daysInStage: 5,
    flag: 'unapprovedDays',
    stageId: 'review',
  },

  // Invoice (7)
  {
    id: 'jp-i1',
    serial: '26-0344',
    clientKey: 'jobPipeline.clients.istak',
    amount: 9_975_000,
    amountUnit: 'isk',
    daysInStage: 21,
    flag: 'awaitingDocket',
    stageId: 'invoice',
  },
  {
    id: 'jp-i2',
    serial: '26-0312',
    clientKey: 'jobPipeline.clients.reykjavik',
    amount: 3_480_000,
    amountUnit: 'isk',
    daysInStage: 4,
    flag: 'onTrack',
    stageId: 'invoice',
  },
  {
    id: 'jp-i3',
    serial: '26-0318',
    clientKey: 'jobPipeline.clients.veitur',
    amount: 2_150_000,
    amountUnit: 'isk',
    daysInStage: 8,
    flag: 'awaitingDocket',
    stageId: 'invoice',
  },
  {
    id: 'jp-i4',
    serial: '26-0322',
    clientKey: 'jobPipeline.clients.gardabaer',
    amount: 1_720_000,
    amountUnit: 'isk',
    daysInStage: 2,
    flag: 'onTrack',
    stageId: 'invoice',
  },
  {
    id: 'jp-i5',
    serial: '26-0327',
    clientKey: 'jobPipeline.clients.hafnarfjordur',
    amount: 5_640_000,
    amountUnit: 'isk',
    daysInStage: 14,
    flag: 'docsMissing',
    stageId: 'invoice',
  },
  {
    id: 'jp-i6',
    serial: '26-0333',
    clientKey: 'jobPipeline.clients.kopavogur',
    amount: 4_110_000,
    amountUnit: 'isk',
    daysInStage: 6,
    flag: 'onTrack',
    stageId: 'invoice',
  },
  {
    id: 'jp-i7',
    serial: '26-0336',
    clientKey: 'jobPipeline.clients.vegagerdin',
    amount: 8_920_000,
    amountUnit: 'isk',
    daysInStage: 18,
    flag: 'awaitingDocket',
    stageId: 'invoice',
  },

  // Close (5)
  {
    id: 'jp-c1',
    serial: '26-0299',
    clientKey: 'jobPipeline.clients.veitur',
    amount: 3_640_000,
    amountUnit: 'isk',
    daysInStage: 2,
    flag: 'samplesOutstanding',
    stageId: 'close',
  },
  {
    id: 'jp-c2',
    serial: '26-0281',
    clientKey: 'jobPipeline.clients.reykjavik',
    amount: 6_250_000,
    amountUnit: 'isk',
    daysInStage: 1,
    flag: 'onTrack',
    stageId: 'close',
  },
  {
    id: 'jp-c3',
    serial: '26-0288',
    clientKey: 'jobPipeline.clients.istak',
    amount: 11_400_000,
    amountUnit: 'isk',
    daysInStage: 9,
    flag: 'samplesOutstanding',
    stageId: 'close',
  },
  {
    id: 'jp-c4',
    serial: '26-0292',
    clientKey: 'jobPipeline.clients.vegagerdin',
    amount: 15_800_000,
    amountUnit: 'isk',
    daysInStage: 3,
    flag: 'docsMissing',
    stageId: 'close',
  },
  {
    id: 'jp-c5',
    serial: '26-0296',
    clientKey: 'jobPipeline.clients.mosfellsbaer',
    amount: 2_090_000,
    amountUnit: 'isk',
    daysInStage: 4,
    flag: 'onTrack',
    stageId: 'close',
  },
]

export function getJobsByStage(stageId: JobPipelineStageId) {
  return jobPipelineJobs.filter((job) => job.stageId === stageId)
}
