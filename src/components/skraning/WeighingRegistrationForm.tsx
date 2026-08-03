import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { employees } from '../../data/employees'
import { equipmentItems } from '../../data/equipment'
import {
  createRegisteredWeighing,
  simulateScaleReading,
  weighingDirections,
  weighingJobs,
  weighingProducts,
  type RegisterWeighingInput,
  type WeighbridgeId,
  type WeighingDirection,
  type WeighingDispatchRow,
  type WeighingJobId,
  type WeighingProductId,
} from '../../data/weighingDispatch'
import { cn } from '../../lib/utils'
import { Button, Card, Label, Select } from '../ui'
import {
  fieldLabelClassName,
  fieldListClassName,
  fieldStackClassName,
  textareaClassName,
} from './hoursStyles'

const plantScales = [
  { id: 'wb-asphalt-1' as const, labelKey: 'weighingDispatch.register.scalePill.1' },
  { id: 'wb-asphalt-2' as const, labelKey: 'weighingDispatch.register.scalePill.2' },
]

type WeighingRegistrationFormProps = {
  nextSequence: number
  onRegistered: (row: WeighingDispatchRow) => void
}

function PillSwitch({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: { value: string; content: ReactNode }[]
  onChange: (value: string) => void
}) {
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  )

  return (
    <div
      role="group"
      aria-label={label}
      className="relative inline-grid grid-cols-2 rounded-pill bg-control p-1"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] rounded-pill bg-surface shadow-sm ring-1 ring-border transition-transform duration-300 ease-out"
        style={{ transform: `translateX(${selectedIndex * 100}%)` }}
      />

      {options.map((option) => {
        const active = option.value === value

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={cn(
              'relative z-10 inline-flex h-9 min-w-24 cursor-pointer items-center justify-center rounded-pill px-4 text-sm font-semibold tracking-wide transition-colors duration-200',
              active
                ? 'text-foreground'
                : 'text-foreground-muted hover:bg-interactive-hover hover:text-foreground',
            )}
          >
            {option.content}
          </button>
        )
      })}
    </div>
  )
}

function formatClock(date: Date) {
  return date.toLocaleTimeString('is-IS', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3,
    hour12: false,
  })
}

function formatTonnes(value: number, locale: string) {
  return value.toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function WeighingRegistrationForm({
  nextSequence,
  onRegistered,
}: WeighingRegistrationFormProps) {
  const { t, i18n } = useTranslation()
  const locale = i18n.resolvedLanguage ?? i18n.language

  const [scaleId, setScaleId] = useState<WeighbridgeId>('wb-asphalt-1')
  const [direction, setDirection] = useState<WeighingDirection>('out')
  const [equipmentId, setEquipmentId] = useState('')
  const [driverId, setDriverId] = useState('')
  const [productId, setProductId] = useState<WeighingProductId | ''>('')
  const [jobId, setJobId] = useState<WeighingJobId | ''>('')
  const [description, setDescription] = useState('')
  const [lastUpdate, setLastUpdate] = useState(() => new Date())
  const [submittedNotice, setSubmittedNotice] = useState(false)

  const reading = useMemo(() => simulateScaleReading(scaleId), [scaleId])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setLastUpdate(new Date())
    }, 2500)

    return () => window.clearInterval(timer)
  }, [scaleId])

  const canSubmit =
    !!equipmentId && !!productId && !!jobId && reading.netTonnes > 0

  function resetForm() {
    setScaleId('wb-asphalt-1')
    setDirection('out')
    setEquipmentId('')
    setDriverId('')
    setProductId('')
    setJobId('')
    setDescription('')
    setLastUpdate(new Date())
  }

  function handleScaleChange(next: WeighbridgeId) {
    setScaleId(next)
    setLastUpdate(new Date())
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!canSubmit || !productId || !jobId) return

    const equipment = equipmentItems.find((item) => item.id === equipmentId)
    if (!equipment) return

    const input: RegisterWeighingInput = {
      scaleId,
      direction,
      equipmentId,
      vehiclePlate: equipment.plate,
      driverId,
      productId,
      jobId,
      description: description.trim(),
      netTonnes: reading.netTonnes,
      grossTonnes: reading.grossTonnes,
    }

    onRegistered(createRegisteredWeighing(input, nextSequence))
    resetForm()
    setSubmittedNotice(true)
  }

  return (
    <Card elevated padding="lg" className="min-h-0 w-full">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <PillSwitch
          label={t('weighingDispatch.register.fields.scale')}
          value={scaleId}
          options={plantScales.map((scale) => ({
            value: scale.id,
            content: t(scale.labelKey),
          }))}
          onChange={(next) => handleScaleChange(next as WeighbridgeId)}
        />
        <PillSwitch
          label={t('weighingDispatch.register.fields.direction')}
          value={direction}
          options={weighingDirections.map((value) => ({
            value,
            content: t(`weighingDispatch.direction.${value}`),
          }))}
          onChange={(next) => setDirection(next as WeighingDirection)}
        />
      </div>

      <form className="mt-2 space-y-2" onSubmit={handleSubmit}>
        <div className={fieldListClassName}>
          <div className="space-y-3 py-4 first:pt-1 sm:py-5">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="space-y-1">
                <span className={fieldLabelClassName}>
                  {t('weighingDispatch.register.fields.net')}
                </span>
                <p className="text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
                  {formatTonnes(reading.netTonnes, locale)}{' '}
                  <span className="text-lg font-medium text-foreground-muted sm:text-xl">
                    {t('weighingDispatch.register.tonnes')}
                  </span>
                </p>
              </div>
              <div className="space-y-1">
                <span className={fieldLabelClassName}>
                  {t('weighingDispatch.register.fields.gross')}
                </span>
                <p className="text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
                  {formatTonnes(reading.grossTonnes, locale)}{' '}
                  <span className="text-lg font-medium text-foreground-muted sm:text-xl">
                    {t('weighingDispatch.register.tonnes')}
                  </span>
                </p>
              </div>
            </div>
            <p className="text-xs text-foreground-muted sm:text-sm">
              {t('weighingDispatch.register.autoStop')}
              {' · '}
              {t('weighingDispatch.register.lastUpdate', {
                time: formatClock(lastUpdate),
              })}
            </p>
          </div>

          <div className="grid gap-4 py-4 sm:grid-cols-2 sm:gap-6 sm:py-5">
            <div className={fieldStackClassName}>
              <Label htmlFor="weighing-equipment" className={fieldLabelClassName}>
                {t('weighingDispatch.register.fields.equipment')} *
              </Label>
              <Select
                id="weighing-equipment"
                value={equipmentId}
                required
                maxVisibleOptions={6}
                placeholder={t('weighingDispatch.register.placeholders.equipment')}
                options={equipmentItems.map((item) => ({
                  value: item.id,
                  label: `${item.plate} — ${item.name}`,
                }))}
                onChange={setEquipmentId}
              />
            </div>
            <div className={fieldStackClassName}>
              <Label htmlFor="weighing-driver" className={fieldLabelClassName}>
                {t('weighingDispatch.register.fields.driver')}
              </Label>
              <Select
                id="weighing-driver"
                value={driverId}
                maxVisibleOptions={6}
                placeholder={t('weighingDispatch.register.placeholders.driver')}
                options={employees.map((employee) => ({
                  value: employee.id,
                  label: employee.name,
                }))}
                onChange={setDriverId}
              />
            </div>
          </div>

          <div className="grid gap-4 py-4 sm:grid-cols-2 sm:gap-6 sm:py-5">
            <div className={fieldStackClassName}>
              <Label htmlFor="weighing-product" className={fieldLabelClassName}>
                {t('weighingDispatch.register.fields.product')} *
              </Label>
              <Select
                id="weighing-product"
                value={productId}
                required
                placeholder={t('weighingDispatch.register.placeholders.product')}
                options={weighingProducts.map((product) => ({
                  value: product.id,
                  label: `${product.code} — ${t(product.nameKey)}`,
                }))}
                onChange={(next) => setProductId(next as WeighingProductId | '')}
              />
            </div>
            <div className={fieldStackClassName}>
              <Label htmlFor="weighing-job" className={fieldLabelClassName}>
                {t('weighingDispatch.register.fields.job')} *
              </Label>
              <Select
                id="weighing-job"
                value={jobId}
                required
                placeholder={t('weighingDispatch.register.placeholders.job')}
                options={weighingJobs.map((job) => ({
                  value: job.id,
                  label: `${job.number} — ${t(job.placeKey)}`,
                }))}
                onChange={(next) => setJobId(next as WeighingJobId | '')}
              />
            </div>
          </div>

          <div className={cn(fieldStackClassName, 'py-4 first:pt-1 last:pb-1 sm:py-5')}>
            <Label htmlFor="weighing-description" className={fieldLabelClassName}>
              {t('weighingDispatch.register.fields.description')}
            </Label>
            <textarea
              id="weighing-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder={t('weighingDispatch.register.placeholders.description')}
              className={textareaClassName}
              rows={3}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          {submittedNotice ? (
            <p className="text-sm text-success" role="status">
              {t('weighingDispatch.register.submitted')}
            </p>
          ) : (
            <span />
          )}
          <Button type="submit" variant="primary" size="lg" disabled={!canSubmit}>
            {t('weighingDispatch.register.submit')}
          </Button>
        </div>
      </form>
    </Card>
  )
}
