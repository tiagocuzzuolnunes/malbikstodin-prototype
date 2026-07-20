export const workProcesses = [
  {
    id: 'accidentReporting',
    stepKeys: ['secure', 'report', 'notify', 'investigate', 'close'],
  },
  {
    id: 'projectQualityControl',
    stepKeys: ['plan', 'inspect', 'document', 'approve'],
  },
  {
    id: 'deviceSecurityCheck',
    stepKeys: ['inventory', 'verify', 'remediate'],
  },
] as const

export type WorkProcessId = (typeof workProcesses)[number]['id']
