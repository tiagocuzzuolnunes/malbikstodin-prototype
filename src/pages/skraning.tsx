import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { LucideIcon } from 'lucide-react'
import { Briefcase, Layers, Play, Road, Square, Truck, Wrench } from 'lucide-react'
import SectionPage from '../components/SectionPage'
import { Button, Card, DatePicker, Icon, Input, Label, Select, inputVariants } from '../components/ui'
import { cn } from '../lib/utils'
import { formatAppDate } from '../lib/formatDate'
import { equipmentItems } from '../data/equipment'
import {
  driverJobs,
  driverOrigins,
  driverProducts,
  hourCategories,
  initialHourEntries,
  nextHourSerial,
  type DriverJob,
  type DriverOrigin,
  type DriverProduct,
  type HourCategory,
  type HourEntry,
} from '../data/hours'

const categoryIcons: Record<HourCategory, LucideIcon> = {
  driverRegistration: Truck,
  underwork: Layers,
  paving: Road,
  repairs: Wrench,
  mvProjects: Briefcase,
}

const textareaClassName = cn(
  inputVariants({ size: 'lg' }),
  'h-auto min-h-28 resize-y py-3',
)

const fieldListClassName = 'divide-y divide-foreground/5'
const fieldRowClassName =
  'grid items-center gap-x-6 gap-y-2 py-8 first:pt-2 last:pb-2 sm:grid-cols-[minmax(14rem,20rem)_minmax(0,1fr)]'

const fieldLabelClassName = '!mb-0'

function formatHours(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
  }).format(value)
}

function formatElapsed(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return [hours, minutes, seconds]
    .map((part) => String(part).padStart(2, '0'))
    .join(':')
}

function msToHours(ms: number) {
  return Math.round((ms / 3_600_000) * 100) / 100
}

export default function SkraningPage() {
  const { t, i18n } = useTranslation()
  const locale = i18n.resolvedLanguage ?? i18n.language
  const currentUserName = t('home.userName')

  const [entries, setEntries] = useState<HourEntry[]>(initialHourEntries)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<HourCategory | null>(null)
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [submittedNotice, setSubmittedNotice] = useState(false)

  const [job, setJob] = useState<DriverJob | ''>('')
  const [equipmentId, setEquipmentId] = useState('')
  const [origin, setOrigin] = useState<DriverOrigin | ''>('')
  const [startOdometerKm, setStartOdometerKm] = useState('0')
  const [product, setProduct] = useState<DriverProduct | ''>('')
  const [comments, setComments] = useState('')

  const [runId, setRunId] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [elapsedMs, setElapsedMs] = useState(0)

  const isDriverRegistration = category === 'driverRegistration'
  const fieldsLocked = isRunning

  useEffect(() => {
    if (!isRunning) return

    const startedAt = Date.now()
    const id = window.setInterval(() => {
      setElapsedMs(Date.now() - startedAt)
    }, 1000)

    return () => window.clearInterval(id)
  }, [isRunning, runId])

  function resetDriverFields() {
    setJob('')
    setEquipmentId('')
    setOrigin('')
    setStartOdometerKm('0')
    setProduct('')
    setComments('')
  }

  function resetTimer() {
    setIsRunning(false)
    setElapsedMs(0)
  }

  function canStart() {
    if (!category || !date) return false

    if (category === 'driverRegistration') {
      if (!job || !equipmentId || !origin || !product) return false
      const parsedOdometer = Number(startOdometerKm.replace(/\s/g, ''))
      return Number.isFinite(parsedOdometer) && parsedOdometer >= 0
    }

    return description.trim().length > 0
  }

  function saveEntry(workedHours: number) {
    if (!category || workedHours <= 0) return

    const serial = nextHourSerial(entries)

    if (category === 'driverRegistration') {
      if (!job || !equipmentId || !origin || !product) return

      const parsedOdometer = Number(startOdometerKm.replace(/\s/g, ''))
      if (!Number.isFinite(parsedOdometer) || parsedOdometer < 0) return

      const equipment = equipmentItems.find((item) => item.id === equipmentId)
      const nextEntry: HourEntry = {
        id: serial,
        serial,
        description: `${t(`hours.driverJobs.${job}`)} · ${equipment?.name ?? equipmentId}`,
        category,
        hours: workedHours,
        date,
        submittedBy: currentUserName,
        driverDetails: {
          job,
          equipmentId,
          origin,
          startOdometerKm: Math.round(parsedOdometer),
          product,
          comments: comments.trim(),
        },
      }

      setEntries((current) => [nextEntry, ...current])
      resetDriverFields()
      setCategory(null)
      setSubmittedNotice(true)
      resetTimer()
      return
    }

    const trimmedDescription = description.trim()
    if (!trimmedDescription) return

    const nextEntry: HourEntry = {
      id: serial,
      serial,
      description: trimmedDescription,
      category,
      hours: workedHours,
      date,
      submittedBy: currentUserName,
    }

    setEntries((current) => [nextEntry, ...current])
    setDescription('')
    setCategory(null)
    setSubmittedNotice(true)
    resetTimer()
  }

  function handleTimerToggle() {
    setSubmittedNotice(false)

    if (!isRunning) {
      if (!canStart()) return
      setElapsedMs(0)
      setIsRunning(true)
      setRunId((id) => id + 1)
      return
    }

    const workedHours = msToHours(elapsedMs)
    if (workedHours <= 0) {
      resetTimer()
      return
    }

    saveEntry(workedHours)
  }

  const timerField = (
    <div className={fieldRowClassName}>
      <Label className={fieldLabelClassName}>{t('hours.timer.label')}</Label>
      <div className="flex flex-wrap items-center gap-4">
        <p
          className={cn(
            'min-w-40 font-semibold tracking-tight tabular-nums text-3xl',
            isRunning ? 'text-accent' : 'text-foreground-muted',
          )}
          aria-live="polite"
        >
          {formatElapsed(elapsedMs)}
        </p>
        {isRunning ? (
          <p className="text-base text-foreground-muted">{t('hours.timer.running')}</p>
        ) : null}
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      <SectionPage titleKey="nav.skraning" descriptionKey="pages.skraning.description" />

      <Card elevated padding="lg" className="min-h-0 w-full">
        <div className="mt-6 space-y-6">
          <div className="mb-12 flex flex-col">
            <div
              className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5"
              role="group"
              aria-labelledby="hours-category-label"
            >
              {hourCategories.map((value) => {
                const isActive = category === value

                return (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={isActive}
                    disabled={fieldsLocked}
                    onClick={() => {
                      if (fieldsLocked) return
                      setSubmittedNotice(false)
                      setCategory(value)
                      if (value !== 'driverRegistration') resetDriverFields()
                    }}
                    className={cn(
                      'flex min-h-40 cursor-pointer flex-col items-center justify-center gap-4 rounded-control border px-5 py-8 text-center text-xl font-semibold tracking-tight transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:cursor-not-allowed disabled:opacity-50',
                      isActive
                        ? 'border-accent bg-accent text-accent-foreground'
                        : 'border-border bg-surface-muted text-foreground hover:border-foreground/25 hover:bg-interactive-hover',
                    )}
                  >
                    <Icon icon={categoryIcons[value]} size="xl" aria-hidden />
                    <span className="text-balance leading-tight">
                      {t(`hours.categories.${value}`)}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {isDriverRegistration ? (
            <div className={fieldListClassName}>
              <div className={fieldRowClassName}>
                <Label htmlFor="driver-job" className={fieldLabelClassName}>
                  {t('hours.fields.job')}
                </Label>
                <Select
                  id="driver-job"
                  value={job}
                  disabled={fieldsLocked}
                  required
                  placeholder={t('hours.fields.jobPlaceholder')}
                  options={driverJobs.map((value) => ({
                    value,
                    label: t(`hours.driverJobs.${value}`),
                  }))}
                  onChange={(next) => {
                    setSubmittedNotice(false)
                    setJob(next as DriverJob | '')
                  }}
                />
              </div>

              <div className={fieldRowClassName}>
                <Label htmlFor="driver-equipment" className={fieldLabelClassName}>
                  {t('hours.fields.equipment')}
                </Label>
                <Select
                  id="driver-equipment"
                  value={equipmentId}
                  disabled={fieldsLocked}
                  required
                  placeholder={t('hours.fields.equipmentPlaceholder')}
                  options={equipmentItems.map((item) => ({
                    value: item.id,
                    label: `${item.name} (${item.plate})`,
                  }))}
                  onChange={(next) => {
                    setSubmittedNotice(false)
                    setEquipmentId(next)
                  }}
                />
              </div>

              <div className={fieldRowClassName}>
                <Label htmlFor="driver-origin" className={fieldLabelClassName}>
                  {t('hours.fields.origin')}
                </Label>
                <Select
                  id="driver-origin"
                  value={origin}
                  disabled={fieldsLocked}
                  required
                  placeholder={t('hours.fields.originPlaceholder')}
                  options={driverOrigins.map((value) => ({
                    value,
                    label: t(`hours.driverOrigins.${value}`),
                  }))}
                  onChange={(next) => {
                    setSubmittedNotice(false)
                    setOrigin(next as DriverOrigin | '')
                  }}
                />
              </div>

              <div className={fieldRowClassName}>
                <Label htmlFor="driver-odometer" className={fieldLabelClassName}>
                  {t('hours.fields.startOdometer')}
                </Label>
                <Input
                  id="driver-odometer"
                  type="number"
                  min="0"
                  step="1"
                  inputMode="numeric"
                  value={startOdometerKm}
                  disabled={fieldsLocked}
                  onChange={(event) => {
                    setSubmittedNotice(false)
                    setStartOdometerKm(event.target.value)
                  }}
                  required
                />
              </div>

              <div className={fieldRowClassName}>
                <Label htmlFor="driver-product" className={fieldLabelClassName}>
                  {t('hours.fields.product')}
                </Label>
                <Select
                  id="driver-product"
                  value={product}
                  disabled={fieldsLocked}
                  required
                  placeholder={t('hours.fields.productPlaceholder')}
                  options={driverProducts.map((value) => ({
                    value,
                    label: t(`hours.driverProducts.${value}`),
                  }))}
                  onChange={(next) => {
                    setSubmittedNotice(false)
                    setProduct(next as DriverProduct | '')
                  }}
                />
              </div>

              <div className={fieldRowClassName}>
                <Label
                  htmlFor="driver-comments"
                  className={`${fieldLabelClassName} self-start sm:pt-3`}
                >
                  {t('hours.fields.comments')}
                </Label>
                <textarea
                  id="driver-comments"
                  value={comments}
                  onChange={(event) => {
                    setSubmittedNotice(false)
                    setComments(event.target.value)
                  }}
                  placeholder={t('hours.fields.commentsPlaceholder')}
                  className={textareaClassName}
                  rows={4}
                />
              </div>

              <div className={fieldRowClassName}>
                <Label htmlFor="hours-date" className={fieldLabelClassName}>
                  {t('hours.fields.date')}
                </Label>
                <DatePicker
                  id="hours-date"
                  value={date}
                  disabled={fieldsLocked}
                  required
                  onChange={(next) => {
                    setSubmittedNotice(false)
                    setDate(next)
                  }}
                />
              </div>

              {timerField}
            </div>
          ) : (
            <div className={fieldListClassName}>
              <div className={fieldRowClassName}>
                <Label htmlFor="hours-description" className={fieldLabelClassName}>
                  {t('hours.fields.description')}
                </Label>
                <Input
                  id="hours-description"
                  value={description}
                  onChange={(event) => {
                    setSubmittedNotice(false)
                    setDescription(event.target.value)
                  }}
                  placeholder={t('hours.fields.descriptionPlaceholder')}
                  required={Boolean(category)}
                  disabled={!category || fieldsLocked}
                />
              </div>

              <div className={fieldRowClassName}>
                <Label htmlFor="hours-date" className={fieldLabelClassName}>
                  {t('hours.fields.date')}
                </Label>
                <DatePicker
                  id="hours-date"
                  value={date}
                  required={Boolean(category)}
                  disabled={!category || fieldsLocked}
                  onChange={(next) => {
                    setSubmittedNotice(false)
                    setDate(next)
                  }}
                />
              </div>

              {timerField}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm text-foreground-muted">
              {t('hours.fields.submittedBy', { name: currentUserName })}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant={isRunning ? 'danger' : 'primary'}
              size="lg"
              className="min-h-14 px-6 text-lg"
              disabled={!isRunning && !canStart()}
              onClick={handleTimerToggle}
            >
              <Icon icon={isRunning ? Square : Play} size="sm" aria-hidden />
              {isRunning ? t('hours.timer.finish') : t('hours.timer.start')}
            </Button>
            {submittedNotice ? (
              <p className="text-sm text-foreground-muted" role="status">
                {t('hours.submitted')}
              </p>
            ) : null}
          </div>
        </div>
      </Card>

      <Card elevated padding="lg" className="min-h-0 w-full min-w-0">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">{t('hours.tableTitle')}</h2>
            <p className="mt-1 text-sm text-foreground-muted">{t('hours.tableSubtitle')}</p>
          </div>
          <p className="text-sm text-foreground-muted">
            {t('hours.count', { count: entries.length })}
          </p>
        </div>

        <div className="mt-6 min-w-0 overflow-hidden rounded-card border border-border">
          <div className="md:hidden">
            {entries.map((entry) => (
              <article
                key={entry.id}
                className="space-y-2 border-b border-border px-4 py-4 last:border-b-0"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-mono text-xs tracking-wide text-foreground-muted">
                      {entry.serial}
                    </p>
                    <h3 className="mt-1 font-semibold tracking-tight wrap-break-word">
                      {entry.description}
                    </h3>
                  </div>
                  <p className="shrink-0 font-medium tabular-nums">
                    {t('hours.hoursValue', { value: formatHours(entry.hours, locale) })}
                  </p>
                </div>
                <p className="text-sm text-foreground-muted">
                  {t(`hours.categories.${entry.category}`)} ·{' '}
                  {formatAppDate(entry.date, t, locale)}
                </p>
                <p className="text-sm text-foreground-muted">{entry.submittedBy}</p>
              </article>
            ))}
          </div>

          <div className="hidden min-w-0 md:block">
            <table className="w-full table-fixed border-collapse text-left text-sm">
              <colgroup>
                <col className="w-[10%]" />
                <col className="w-[28%]" />
                <col className="w-[18%]" />
                <col className="w-[12%]" />
                <col className="w-[14%]" />
                <col className="w-[18%]" />
              </colgroup>
              <thead>
                <tr className="border-b border-border bg-surface-muted">
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('hours.columns.serial')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('hours.columns.description')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('hours.columns.category')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('hours.columns.hours')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('hours.columns.date')}
                  </th>
                  <th className="px-2 py-3 font-medium text-foreground-muted">
                    {t('hours.columns.submittedBy')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr
                    key={entry.id}
                    className="border-b border-border last:border-b-0 odd:bg-surface even:bg-surface-muted/40"
                  >
                    <td className="px-2 py-3 align-top font-mono text-xs tracking-wide text-foreground-muted">
                      {entry.serial}
                    </td>
                    <td className="px-2 py-3 align-top font-medium wrap-break-word whitespace-normal">
                      {entry.description}
                    </td>
                    <td className="px-2 py-3 align-top wrap-break-word whitespace-normal">
                      {t(`hours.categories.${entry.category}`)}
                    </td>
                    <td className="px-2 py-3 align-top tabular-nums wrap-break-word whitespace-normal">
                      {formatHours(entry.hours, locale)}
                    </td>
                    <td className="px-2 py-3 align-top wrap-break-word whitespace-normal">
                      {formatAppDate(entry.date, t, locale)}
                    </td>
                    <td className="px-2 py-3 align-top wrap-break-word whitespace-normal">
                      {entry.submittedBy}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  )
}
