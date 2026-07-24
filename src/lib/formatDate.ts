import type { TFunction } from 'i18next'
import type { SupportedLocale } from '../i18n'

export function resolveAppLocale(language?: string | null): SupportedLocale {
  return language?.toLowerCase().startsWith('is') ? 'is' : 'en'
}

function readStringList(t: TFunction, key: string): string[] {
  const value = t(key, { returnObjects: true })
  return Array.isArray(value) ? value.map(String) : []
}

export function formatAppDate(
  value: string | Date,
  t: TFunction,
  language?: string | null,
) {
  const date =
    value instanceof Date ? value : new Date(`${value}T12:00:00`)
  if (Number.isNaN(date.getTime())) return String(value)

  const locale = resolveAppLocale(language)
  const months = readStringList(t, 'dates.monthsShort')
  const month = months[date.getMonth()] ?? ''
  const day = date.getDate()
  const year = date.getFullYear()

  if (locale === 'is') return `${day}. ${month} ${year}`
  return `${month} ${day}, ${year}`
}

export function formatAppMonthYear(
  date: Date,
  t: TFunction,
  language?: string | null,
) {
  const locale = resolveAppLocale(language)
  const months = readStringList(t, 'dates.monthsLong')
  const month = months[date.getMonth()] ?? ''
  const year = date.getFullYear()

  if (locale === 'is') return `${month} ${year}`
  return `${month} ${year}`
}

export function getAppWeekdayLabels(t: TFunction) {
  return readStringList(t, 'dates.weekdaysShort')
}
