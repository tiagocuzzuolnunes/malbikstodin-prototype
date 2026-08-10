/** Soft row/card fills aligned with status badge tones across the app. */
export const statusRowBg = {
  success: 'bg-success/10',
  alert: 'bg-alert/10',
  danger: 'bg-danger/10',
  accent: 'bg-accent/10',
  muted: 'bg-surface-muted',
} as const

export type StatusRowTone = keyof typeof statusRowBg
