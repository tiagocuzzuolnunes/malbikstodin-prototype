import { useMemo, useState, type FormEvent, type KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Send } from 'lucide-react'
import {
  measurementJobs,
  measurementTypes,
  type MeasurementTypeId,
  type MeasurementUnit,
} from '../../data/siteMeasurements'
import { cn } from '../../lib/utils'
import { Button, Card, Input, Label, Select } from '../ui'
import { inputVariants } from '../ui/inputVariants'

/** Canonical quantity string: digits with optional single "." decimal (no grouping). */
function sanitizeQuantity(raw: string, allowDecimals: boolean) {
  if (!allowDecimals) return raw.replace(/\D/g, '')

  let normalized = raw

  // Comma as decimal: "12,5" or trailing "12," — not thousand groups like "1,240".
  if (!normalized.includes('.')) {
    const commaCount = (normalized.match(/,/g) ?? []).length
    if (commaCount === 1) {
      const [left, right = ''] = normalized.split(',')
      if (right.length <= 1) {
        normalized = `${left}.${right}`
      }
    }
  }

  // Remaining commas are thousand separators.
  normalized = normalized.replace(/,/g, '')
  normalized = normalized.replace(/[^\d.]/g, '')

  const firstDot = normalized.indexOf('.')
  if (firstDot === -1) return normalized

  const intPart = normalized.slice(0, firstDot).replace(/\D/g, '')
  const decPart = normalized
    .slice(firstDot + 1)
    .replace(/\D/g, '')
    .slice(0, 1)
  return `${intPart}.${decPart}`
}

function formatQuantity(value: string) {
  if (!value) return ''

  const [intPart = '', decPart] = value.split('.')
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  if (value.includes('.')) {
    return `${grouped}.${decPart ?? ''}`
  }

  return grouped
}

function allowsDecimals(unit: MeasurementUnit | undefined) {
  // Before a type is chosen, allow decimals; pcs strips them on select.
  if (!unit) return true
  return unit === 'm' || unit === 'm2'
}

export default function SiteMeasurements() {
  const { t } = useTranslation()
  const [jobId, setJobId] = useState('')
  const [typeId, setTypeId] = useState<MeasurementTypeId | ''>('')
  const [quantity, setQuantity] = useState('')
  const [note, setNote] = useState('')

  const selectedType = measurementTypes.find((type) => type.id === typeId)
  const allowDecimals = allowsDecimals(selectedType?.unit)
  const unitLabel = selectedType
    ? t(`siteMeasurements.units.${selectedType.unit}`)
    : null

  const jobOptions = useMemo(
    () =>
      measurementJobs.map((job) => ({
        value: job.id,
        label: `${job.serial} · ${t(job.clientKey)}`,
      })),
    [t],
  )

  function handleTypeSelect(nextTypeId: MeasurementTypeId) {
    setTypeId(nextTypeId)
    const nextType = measurementTypes.find((type) => type.id === nextTypeId)
    if (!allowsDecimals(nextType?.unit) && quantity.includes('.')) {
      setQuantity(quantity.split('.')[0] ?? '')
    }
  }

  function handleQuantityChange(raw: string) {
    setQuantity(sanitizeQuantity(raw, allowDecimals))
  }

  function handleQuantityKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.ctrlKey || event.metaKey || event.altKey) return

    const allowedKeys = [
      'Backspace',
      'Delete',
      'Tab',
      'Escape',
      'Enter',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Home',
      'End',
    ]
    if (allowedKeys.includes(event.key)) return

    if (/^\d$/.test(event.key)) return

    // Accept "." or "," as decimal; store as ".".
    if (
      allowDecimals &&
      (event.key === '.' || event.key === ',') &&
      !quantity.includes('.')
    ) {
      event.preventDefault()
      setQuantity(`${quantity}.`)
      return
    }

    event.preventDefault()
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!jobId || !typeId || !quantity || quantity === '.') return

    setJobId('')
    setTypeId('')
    setQuantity('')
    setNote('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 sm:gap-6 lg:grid lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:items-start lg:gap-x-6 lg:gap-y-4 xl:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] xl:gap-x-8 xl:gap-y-6"
    >
      <div className="order-1 flex w-full max-w-md flex-col gap-2 lg:order-0 lg:col-start-1 lg:row-start-1 lg:max-w-none">
        <Label htmlFor="site-measurement-job" className="mb-0!">
          {t('siteMeasurements.fields.job')}
        </Label>
        <Select
          id="site-measurement-job"
          value={jobId}
          required
          placeholder={t('siteMeasurements.fields.jobPlaceholder')}
          options={jobOptions}
          onChange={setJobId}
        />
      </div>

      <Card
        elevated
        padding="md"
        className="order-2 min-w-0 lg:order-0 lg:col-start-2 lg:row-span-3 lg:row-start-1"
      >
        <div className="flex flex-col gap-2">
          <p id="site-measurement-type-label" className="text-sm font-medium text-foreground">
            {t('siteMeasurements.fields.measured')}
          </p>
          <div
            className="grid grid-cols-2 gap-2 sm:gap-3"
            role="radiogroup"
            aria-labelledby="site-measurement-type-label"
          >
            {measurementTypes.map((type) => {
              const active = typeId === type.id

              return (
                <button
                  key={type.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => handleTypeSelect(type.id)}
                  className={cn(
                    'flex cursor-pointer flex-col items-center justify-center gap-1 rounded-control border px-2 py-3 text-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent/40 sm:px-3 sm:py-4',
                    active
                      ? 'border-accent bg-accent text-accent-foreground'
                      : 'border-border bg-surface-muted text-foreground hover:border-foreground/25 hover:bg-interactive-hover',
                  )}
                >
                  <span className="text-sm font-semibold tracking-tight text-balance">
                    {t(type.labelKey)}
                  </span>
                  <span
                    className={cn(
                      'text-xs font-medium',
                      active ? 'text-accent-foreground/85' : 'text-foreground-muted',
                    )}
                  >
                    ({t(`siteMeasurements.units.${type.unit}`)})
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </Card>

      <div className="order-3 flex w-full max-w-md flex-col gap-2 lg:order-0 lg:col-start-1 lg:row-start-2 lg:max-w-none">
        <Label htmlFor="site-measurement-quantity" className="mb-0!">
          {t('siteMeasurements.fields.quantity')}
        </Label>
        <div className="relative">
          <Input
            id="site-measurement-quantity"
            type="text"
            inputMode={allowDecimals ? 'decimal' : 'numeric'}
            pattern={allowDecimals ? '[0-9.,]*' : '[0-9,]*'}
            required
            disabled={!typeId}
            placeholder={t('siteMeasurements.fields.quantityPlaceholder')}
            value={formatQuantity(quantity)}
            onChange={(event) => handleQuantityChange(event.target.value)}
            onKeyDown={handleQuantityKeyDown}
            className={cn(
              'h-14 text-2xl font-semibold tracking-tight tabular-nums',
              unitLabel ? 'pr-14' : undefined,
            )}
          />
          {unitLabel ? (
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-base font-semibold text-foreground-muted">
              {unitLabel}
            </span>
          ) : null}
        </div>
      </div>

      <div className="order-4 flex w-full max-w-md flex-col gap-2 lg:order-0 lg:col-start-1 lg:row-start-3 lg:max-w-none">
        <Label htmlFor="site-measurement-note" className="mb-0!">
          {t('siteMeasurements.fields.note')}
          <span className="ml-1 font-normal text-foreground-muted">
            ({t('siteMeasurements.fields.optional')})
          </span>
        </Label>
        <textarea
          id="site-measurement-note"
          rows={3}
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder={t('siteMeasurements.fields.notePlaceholder')}
          className={cn(inputVariants({ size: 'lg' }), 'h-auto resize-y py-2.5')}
        />
      </div>

      <div className="order-5 lg:col-span-2 lg:order-0">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full px-5 sm:w-auto sm:px-6"
          disabled={!jobId || !typeId || !quantity || quantity === '.'}
        >
          <Send className="h-5 w-5" aria-hidden />
          {t('siteMeasurements.actions.send')}
        </Button>
      </div>
    </form>
  )
}
