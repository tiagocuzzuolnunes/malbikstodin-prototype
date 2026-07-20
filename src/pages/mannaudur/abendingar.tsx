import { useMemo, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import SectionPage from '../../components/SectionPage'
import { Button, Card, Input, Label, inputVariants } from '../../components/ui'
import { cn } from '../../lib/utils'
import {
  feedbackStatuses,
  feedbackTypes,
  initialFeedbackItems,
  type FeedbackItem,
  type FeedbackType,
} from '../../data/feedback'

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${value}T12:00:00`))
}

function FeedbackCard({
  item,
  locale,
}: {
  item: FeedbackItem
  locale: string
}) {
  const { t } = useTranslation()

  return (
    <article className="rounded-control border border-border bg-surface px-3 py-3 shadow-card">
      <p className="text-xs font-medium tracking-wide text-foreground-muted uppercase">
        {t(`hr.feedback.types.${item.type}`)}
      </p>
      <h3 className="mt-1 text-sm font-semibold tracking-tight">{item.title}</h3>
      <p className="mt-2 text-sm text-foreground-muted">{item.description}</p>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-foreground-muted">
        <span>
          {item.authorName ?? t('hr.feedback.anonymous')}
        </span>
        <time>{formatDate(item.createdAt, locale)}</time>
      </div>
    </article>
  )
}

export default function MannaudurAbendingarPage() {
  const { t, i18n } = useTranslation()
  const locale = i18n.resolvedLanguage ?? i18n.language

  const [items, setItems] = useState<FeedbackItem[]>(initialFeedbackItems)
  const [type, setType] = useState<FeedbackType>('suggestion')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [showAsAuthor, setShowAsAuthor] = useState(true)
  const [submittedNotice, setSubmittedNotice] = useState(false)
  const currentUserName = t('home.userName')

  const stats = useMemo(() => {
    const total = items.length
    const inReview = items.filter((item) => item.status === 'inReview').length
    const approved = items.filter((item) => item.status === 'approved').length
    return { total, inReview, approved }
  }, [items])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedTitle = title.trim()
    const trimmedDescription = description.trim()
    if (!trimmedTitle || !trimmedDescription) return

    const nextItem: FeedbackItem = {
      id: `fb-${Date.now()}`,
      type,
      title: trimmedTitle,
      description: trimmedDescription,
      authorName: showAsAuthor ? currentUserName : null,
      createdAt: new Date().toISOString().slice(0, 10),
      status: 'new',
    }

    setItems((current) => [nextItem, ...current])
    setTitle('')
    setDescription('')
    setShowAsAuthor(true)
    setType('suggestion')
    setSubmittedNotice(true)
  }

  return (
    <div className="space-y-8">
      <SectionPage
        titleKey="nav.abendingar"
        descriptionKey="pages.mannaudur.feedbackDescription"
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
        <div className="space-y-6">
          <Card elevated padding="lg" className="min-h-0">
            <h2 className="text-xl font-semibold tracking-tight">
              {t('hr.feedback.formTitle')}
            </h2>
            <p className="mt-1 text-sm text-foreground-muted">
              {t('hr.feedback.formSubtitle')}
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="feedback-type">{t('hr.feedback.fields.type')}</Label>
                <select
                  id="feedback-type"
                  value={type}
                  onChange={(event) => setType(event.target.value as FeedbackType)}
                  className={cn(inputVariants({ size: 'md' }), 'cursor-pointer')}
                >
                  {feedbackTypes.map((value) => (
                    <option key={value} value={value}>
                      {t(`hr.feedback.types.${value}`)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback-title">{t('hr.feedback.fields.title')}</Label>
                <Input
                  id="feedback-title"
                  value={title}
                  onChange={(event) => {
                    setSubmittedNotice(false)
                    setTitle(event.target.value)
                  }}
                  placeholder={t('hr.feedback.fields.titlePlaceholder')}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback-description">
                  {t('hr.feedback.fields.description')}
                </Label>
                <textarea
                  id="feedback-description"
                  value={description}
                  onChange={(event) => {
                    setSubmittedNotice(false)
                    setDescription(event.target.value)
                  }}
                  placeholder={t('hr.feedback.fields.descriptionPlaceholder')}
                  required
                  rows={5}
                  className={cn(
                    inputVariants({ size: 'md' }),
                    'h-auto min-h-28 resize-y py-2.5',
                  )}
                />
              </div>

              <fieldset className="space-y-3">
                <legend className="text-label font-medium text-foreground">
                  {t('hr.feedback.fields.authorChoice')}
                </legend>

                <label className="flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="author-mode"
                    checked={showAsAuthor}
                    onChange={() => setShowAsAuthor(true)}
                    className="accent-accent"
                  />
                  {t('hr.feedback.fields.showAuthor')}
                </label>

                <label className="flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="author-mode"
                    checked={!showAsAuthor}
                    onChange={() => setShowAsAuthor(false)}
                    className="accent-accent"
                  />
                  {t('hr.feedback.fields.anonymous')}
                </label>

                {showAsAuthor ? (
                  <p className="text-sm text-foreground-muted">
                    {t('hr.feedback.fields.detectedAuthor', { name: currentUserName })}
                  </p>
                ) : null}
              </fieldset>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button type="submit" variant="primary" size="lg" className="min-h-11 px-5">
                  {t('hr.feedback.submit')}
                </Button>
                {submittedNotice ? (
                  <p className="text-sm text-foreground-muted" role="status">
                    {t('hr.feedback.submitted')}
                  </p>
                ) : null}
              </div>
            </form>
          </Card>

          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            <Card elevated padding="md" className="min-h-0">
              <p className="text-sm font-medium tracking-wide text-foreground-muted">
                {t('hr.feedback.stats.total')}
              </p>
              <p className="mt-2 text-3xl font-semibold tracking-tight tabular-nums">
                {stats.total}
              </p>
            </Card>
            <Card elevated padding="md" className="min-h-0">
              <p className="text-sm font-medium tracking-wide text-foreground-muted">
                {t('hr.feedback.stats.inReview')}
              </p>
              <p className="mt-2 text-3xl font-semibold tracking-tight tabular-nums">
                {stats.inReview}
              </p>
            </Card>
            <Card elevated padding="md" className="min-h-0">
              <p className="text-sm font-medium tracking-wide text-foreground-muted">
                {t('hr.feedback.stats.approved')}
              </p>
              <p className="mt-2 text-3xl font-semibold tracking-tight tabular-nums">
                {stats.approved}
              </p>
            </Card>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="grid min-w-4xl grid-cols-4 gap-4">
            {feedbackStatuses.map((status) => {
              const columnItems = items.filter((item) => item.status === status)

              return (
                <section
                  key={status}
                  className="rounded-card border border-border bg-surface-muted/40 p-3"
                  aria-labelledby={`feedback-column-${status}`}
                >
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <h2
                      id={`feedback-column-${status}`}
                      className="text-sm font-semibold tracking-tight"
                    >
                      {t(`hr.feedback.columns.${status}`)}
                    </h2>
                    <span className="text-xs font-medium tabular-nums text-foreground-muted">
                      {columnItems.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {columnItems.map((item) => (
                      <FeedbackCard key={item.id} item={item} locale={locale} />
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
