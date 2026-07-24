export function formatHours(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatElapsed(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return [hours, minutes, seconds]
    .map((part) => String(part).padStart(2, '0'))
    .join(':')
}

export function msToHours(ms: number) {
  return Math.round((ms / 3_600_000) * 100) / 100
}
