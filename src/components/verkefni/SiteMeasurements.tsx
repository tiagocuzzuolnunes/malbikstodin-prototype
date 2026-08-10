import { useMemo, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Send } from 'lucide-react'
import {
  measurementJobs,
  measurementTypes,
  type MeasurementTypeId,
} from '../../data/siteMeasurements'
import { cn } from '../../lib/utils'
import { Button, Card, Input, Label, Select } from '../ui'
import { inputVariants } from '../ui/inputVariants'

export default function SiteMeasurements() {
  const { t } = useTranslation()
  const [jobId, setJobId] = useState('')
  const [typeId, setTypeId] = useState<MeasurementTypeId | ''>('')
  const [quantity, setQuantity] = useState('')
  const [note, setNote] = useState('')

  const selectedType = measurementTypes.find((type) => type.id === typeId)

  const jobOptions = useMemo(
    () =>
      measurementJobs.map((job) => ({
        value: job.id,
        label: `${job.serial} · ${t(job.clientKey)}`,
      })),
    [t],
  )

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!jobId || !typeId || !quantity.trim()) return

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
                  onClick={() => setTypeId(type.id)}
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
          {selectedType
            ? ` (${t(`siteMeasurements.units.${selectedType.unit}`)})`
            : ''}
        </Label>
        <Input
          id="site-measurement-quantity"
          type="number"
          inputMode="decimal"
          min="0"
          step="any"
          required
          placeholder={t('siteMeasurements.fields.quantityPlaceholder')}
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
        />
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
          disabled={!jobId || !typeId || !quantity.trim()}
        >
          <Send className="h-5 w-5" aria-hidden />
          {t('siteMeasurements.actions.send')}
        </Button>
      </div>
    </form>
  )
}
