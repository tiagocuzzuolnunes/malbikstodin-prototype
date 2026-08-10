import { useMemo, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Camera, Send } from 'lucide-react'
import {
  hatchJobs,
  hatchReportTypes,
  type HatchReportTypeId,
} from '../../data/hatch'
import { cn } from '../../lib/utils'
import { Button, Card, Label, Select } from '../ui'
import { inputVariants } from '../ui/inputVariants'

const MAX_PHOTOS = 6

export default function HatchForm() {
  const { t } = useTranslation()
  const [photoCount, setPhotoCount] = useState(0)
  const [typeId, setTypeId] = useState<HatchReportTypeId | ''>('')
  const [jobId, setJobId] = useState('')
  const [description, setDescription] = useState('')

  const jobOptions = useMemo(
    () =>
      hatchJobs.map((job) => ({
        value: job.id,
        label: `${job.serial} — ${t(job.labelKey)}`,
      })),
    [t],
  )

  function handleTakePhoto() {
    setPhotoCount((count) => Math.min(count + 1, MAX_PHOTOS))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!typeId || !jobId || !description.trim()) return

    setPhotoCount(0)
    setTypeId('')
    setJobId('')
    setDescription('')
  }

  const canSend = Boolean(typeId && jobId && description.trim())

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 sm:gap-6 lg:grid lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:items-start lg:gap-x-6 lg:gap-y-4 xl:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] xl:gap-x-8 xl:gap-y-6"
    >
      <div className="order-1 flex w-full max-w-md flex-col gap-2 lg:order-0 lg:col-start-1 lg:row-start-1 lg:max-w-none">
        <Label className="mb-0!">{t('hatch.fields.photo')}</Label>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="min-h-12 px-5"
            onClick={handleTakePhoto}
            disabled={photoCount >= MAX_PHOTOS}
          >
            <Camera className="h-5 w-5" aria-hidden />
            {t('hatch.actions.takePhoto')}
          </Button>
          <p className="text-sm font-medium tabular-nums text-foreground-muted">
            {t('hatch.fields.photoCount', { count: photoCount })}
          </p>
        </div>
      </div>

      <Card
        elevated
        padding="md"
        className="order-2 min-w-0 lg:order-0 lg:col-start-2 lg:row-span-3 lg:row-start-1"
      >
        <div className="flex flex-col gap-2">
          <p id="hatch-type-label" className="text-sm font-medium text-foreground">
            {t('hatch.fields.whatIsIt')}
          </p>
          <div
            className="grid grid-cols-2 gap-2 sm:gap-3"
            role="radiogroup"
            aria-labelledby="hatch-type-label"
          >
            {hatchReportTypes.map((type) => {
              const active = typeId === type.id

              return (
                <button
                  key={type.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setTypeId(type.id)}
                  className={cn(
                    'flex min-h-16 cursor-pointer items-center justify-center rounded-control border px-2 py-3 text-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent/40 sm:min-h-20 sm:px-3 sm:py-4',
                    active
                      ? 'border-accent bg-accent text-accent-foreground'
                      : 'border-border bg-surface-muted text-foreground hover:border-foreground/25 hover:bg-interactive-hover',
                  )}
                >
                  <span className="text-sm font-semibold tracking-tight text-balance">
                    {t(type.labelKey)}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </Card>

      <div className="order-3 flex w-full max-w-md flex-col gap-2 lg:order-0 lg:col-start-1 lg:row-start-2 lg:max-w-none">
        <Label htmlFor="hatch-job" className="mb-0!">
          {t('hatch.fields.job')}
        </Label>
        <Select
          id="hatch-job"
          value={jobId}
          required
          placeholder={t('hatch.fields.jobPlaceholder')}
          options={jobOptions}
          onChange={setJobId}
        />
      </div>

      <div className="order-4 flex w-full max-w-md flex-col gap-2 lg:order-0 lg:col-start-1 lg:row-start-3 lg:max-w-none">
        <Label htmlFor="hatch-description" className="mb-0!">
          {t('hatch.fields.description')}
        </Label>
        <textarea
          id="hatch-description"
          rows={4}
          required
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder={t('hatch.fields.descriptionPlaceholder')}
          className={cn(inputVariants({ size: 'lg' }), 'h-auto resize-y py-2.5')}
        />
      </div>

      <div className="order-5 space-y-2 lg:col-span-2 lg:order-0">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full px-5 sm:w-auto sm:px-6"
          disabled={!canSend}
        >
          <Send className="h-5 w-5" aria-hidden />
          {t('hatch.actions.send')}
        </Button>
        <p className="text-sm text-foreground-muted">{t('hatch.hint.foreman')}</p>
      </div>
    </form>
  )
}
