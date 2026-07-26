import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  formatAppDate,
  formatAppMonthYear,
  getAppWeekdayLabels,
} from '../../lib/formatDate'
import { cn } from '../../lib/utils'
import { scrollOverlayIntoView } from '../../lib/scrollOverlayIntoView'
import { inputVariants, type InputVariantProps } from './inputVariants'
import { Button } from './Button'

export type DatePickerProps = InputVariantProps & {
  id?: string
  value: string
  disabled?: boolean
  required?: boolean
  className?: string
  /** Inclusive lower bound as YYYY-MM-DD */
  minDate?: string
  /** Inclusive upper bound as YYYY-MM-DD */
  maxDate?: string
  onChange: (value: string) => void
}

function parseIsoDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  if (
    Number.isNaN(date.getTime()) ||
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null
  }
  return date
}

function toIsoDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1)
}

function buildCalendarDays(viewMonth: Date) {
  const first = startOfMonth(viewMonth)
  const startOffset = (first.getDay() + 6) % 7 // Monday-first
  const gridStart = new Date(first.getFullYear(), first.getMonth(), 1 - startOffset)

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + index)
    return {
      date,
      iso: toIsoDate(date),
      inMonth: date.getMonth() === viewMonth.getMonth(),
    }
  })
}

function isIsoInRange(iso: string, minDate?: string, maxDate?: string) {
  if (minDate && iso < minDate) return false
  if (maxDate && iso > maxDate) return false
  return true
}

function clampViewMonth(month: Date, minDate?: string, maxDate?: string) {
  let next = startOfMonth(month)
  const min = minDate ? parseIsoDate(minDate) : null
  const max = maxDate ? parseIsoDate(maxDate) : null

  if (min && endOfMonth(next) < min) {
    next = startOfMonth(min)
  }
  if (max && next > max) {
    next = startOfMonth(max)
  }

  return next
}

export function DatePicker({
  id,
  value,
  disabled = false,
  required = false,
  className,
  size = 'lg',
  minDate,
  maxDate,
  onChange,
}: DatePickerProps) {
  const { t, i18n } = useTranslation()
  const language = i18n.resolvedLanguage ?? i18n.language
  const panelId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const selectedDate = parseIsoDate(value)
  const [todayIso] = useState(() => toIsoDate(new Date()))
  const [viewMonth, setViewMonth] = useState(() =>
    clampViewMonth(startOfMonth(parseIsoDate(value) ?? new Date()), minDate, maxDate),
  )

  useEffect(() => {
    setViewMonth((current) => clampViewMonth(current, minDate, maxDate))
  }, [minDate, maxDate])

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  useEffect(() => {
    if (!open || !panelRef.current) return
    scrollOverlayIntoView(panelRef.current)
  }, [open])

  const weekdayLabels = getAppWeekdayLabels(t)
  const monthLabel = formatAppMonthYear(viewMonth, t, language)
  const displayValue = selectedDate ? formatAppDate(selectedDate, t, language) : ''
  const days = useMemo(() => buildCalendarDays(viewMonth), [viewMonth])

  const canGoPrev = useMemo(() => {
    if (!minDate) return true
    const prev = addMonths(viewMonth, -1)
    return endOfMonth(prev) >= (parseIsoDate(minDate) ?? prev)
  }, [viewMonth, minDate])

  const canGoNext = useMemo(() => {
    if (!maxDate) return true
    const next = addMonths(viewMonth, 1)
    return next <= (parseIsoDate(maxDate) ?? next)
  }, [viewMonth, maxDate])

  function selectDay(iso: string) {
    if (!isIsoInRange(iso, minDate, maxDate)) return
    onChange(iso)
    setOpen(false)
  }

  function toggleOpen() {
    if (disabled) return
    if (!open) {
      const selected = parseIsoDate(value)
      setViewMonth(
        clampViewMonth(startOfMonth(selected ?? new Date()), minDate, maxDate),
      )
    }
    setOpen((current) => !current)
  }

  return (
    <div ref={rootRef} className={cn('relative w-full', className)}>
      <button
        id={id}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        aria-required={required || undefined}
        disabled={disabled}
        onClick={toggleOpen}
        className={cn(
          inputVariants({ size }),
          'group flex items-center justify-between gap-3 pr-3 text-left',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          !displayValue && 'text-foreground-muted',
        )}
      >
        <span className="min-w-0 flex-1 truncate">
          {displayValue || t('common.datePlaceholder')}
        </span>
        <span
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-control text-accent transition-colors',
            !disabled &&
              'group-hover:bg-interactive-hover group-focus-visible:bg-interactive-hover',
          )}
        >
          <Calendar className="h-5 w-5 stroke-[2.25]" aria-hidden />
        </span>
      </button>

      {open ? (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-label={t('common.chooseDate')}
          className="absolute bottom-full z-40 mb-2 w-full max-w-[calc(100vw-2rem)] min-w-0 rounded-control border border-border bg-surface p-3 shadow-card sm:min-w-80 sm:p-4 sm:w-88"
        >
          <div className="mb-4 flex items-center justify-between gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="p-2 text-accent hover:bg-interactive-hover disabled:opacity-40"
              aria-label={t('common.previousMonth')}
              disabled={!canGoPrev}
              onClick={() =>
                setViewMonth((current) =>
                  clampViewMonth(addMonths(current, -1), minDate, maxDate),
                )
              }
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <p className="text-lg font-semibold tracking-tight capitalize">{monthLabel}</p>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="p-2 text-accent hover:bg-interactive-hover disabled:opacity-40"
              aria-label={t('common.nextMonth')}
              disabled={!canGoNext}
              onClick={() =>
                setViewMonth((current) =>
                  clampViewMonth(addMonths(current, 1), minDate, maxDate),
                )
              }
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          <div className="mb-2 grid grid-cols-7 gap-1">
            {weekdayLabels.map((label, index) => (
              <span
                key={`${label}-${index}`}
                className="py-1 text-center text-xs font-medium tracking-wide text-foreground-muted uppercase"
              >
                {label}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day) => {
              const isSelected = day.iso === value
              const isToday = day.iso === todayIso
              const isAllowed = isIsoInRange(day.iso, minDate, maxDate)

              return (
                <button
                  key={day.iso}
                  type="button"
                  disabled={!isAllowed}
                  onClick={() => selectDay(day.iso)}
                  className={cn(
                    'flex h-10 items-center justify-center rounded-control text-sm font-medium transition-colors',
                    !isAllowed && 'cursor-not-allowed text-foreground-muted/35',
                    isAllowed && !day.inMonth && 'cursor-pointer text-foreground-muted/50',
                    isAllowed &&
                      day.inMonth &&
                      !isSelected &&
                      'cursor-pointer text-foreground hover:bg-interactive-hover',
                    isToday && isAllowed && !isSelected && 'ring-1 ring-accent/40',
                    isSelected &&
                      isAllowed &&
                      'bg-accent text-accent-foreground hover:bg-accent-hover',
                  )}
                >
                  {day.date.getDate()}
                </button>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}
