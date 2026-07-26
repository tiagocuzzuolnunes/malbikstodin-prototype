/** Local calendar date as YYYY-MM-DD (avoids UTC shift from toISOString). */
export function toLocalIsoDate(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const HOURS_DATE_LOOKBACK_DAYS = 14

/**
 * Hours registration dates: current year only, and at most 2 weeks before today.
 */
export function getHoursRegistrationDateBounds(now = new Date()) {
  const year = now.getFullYear()
  const today = new Date(year, now.getMonth(), now.getDate())
  const yearStart = new Date(year, 0, 1)
  const lookback = new Date(year, now.getMonth(), now.getDate() - HOURS_DATE_LOOKBACK_DAYS)
  const minDate = lookback < yearStart ? yearStart : lookback

  return {
    minDate: toLocalIsoDate(minDate),
    maxDate: toLocalIsoDate(today),
  }
}

export function clampHoursRegistrationDate(value: string, now = new Date()) {
  const { minDate, maxDate } = getHoursRegistrationDateBounds(now)
  if (value < minDate) return minDate
  if (value > maxDate) return maxDate
  return value
}

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
