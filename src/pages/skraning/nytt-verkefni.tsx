import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionPage } from '../../components/shared'
import { Button, Card, DatePicker, Input, Label, Select } from '../../components/ui'
import { projectAreas, type ProjectAreaId } from '../../config/projects'
import { textareaClassName } from '../../components/skraning/hoursStyles'

export default function SkraningNyttVerkefniPage() {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [jobNumber, setJobNumber] = useState('')
  const [areaId, setAreaId] = useState<ProjectAreaId | ''>('')
  const [startDate, setStartDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [description, setDescription] = useState('')
  const [submittedNotice, setSubmittedNotice] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!name.trim() || !jobNumber.trim() || !areaId || !startDate) return

    setName('')
    setJobNumber('')
    setAreaId('')
    setStartDate(new Date().toISOString().slice(0, 10))
    setDescription('')
    setSubmittedNotice(true)
  }

  return (
    <div className="space-y-8">
      <SectionPage
        titleKey="nav.nyttVerkefni"
        descriptionKey="pages.skraning.createProjectDescription"
      />

      <Card elevated padding="lg" className="mx-auto w-full max-w-2xl min-h-0">
        <h2 className="text-xl font-semibold tracking-tight">
          {t('createProject.formTitle')}
        </h2>
        <p className="mt-1 text-sm text-foreground-muted">
          {t('createProject.formSubtitle')}
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="project-name">{t('createProject.fields.name')}</Label>
            <Input
              id="project-name"
              value={name}
              onChange={(event) => {
                setSubmittedNotice(false)
                setName(event.target.value)
              }}
              placeholder={t('createProject.fields.namePlaceholder')}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-job-number">
              {t('createProject.fields.jobNumber')}
            </Label>
            <Input
              id="project-job-number"
              value={jobNumber}
              onChange={(event) => {
                setSubmittedNotice(false)
                setJobNumber(event.target.value)
              }}
              placeholder={t('createProject.fields.jobNumberPlaceholder')}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-area">{t('createProject.fields.area')}</Label>
            <Select
              id="project-area"
              value={areaId}
              required
              placeholder={t('createProject.fields.areaPlaceholder')}
              options={projectAreas.map((area) => ({
                value: area.id,
                label: t(area.titleKey),
              }))}
              onChange={(value) => {
                setSubmittedNotice(false)
                setAreaId(value as ProjectAreaId | '')
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-start-date">
              {t('createProject.fields.startDate')}
            </Label>
            <DatePicker
              id="project-start-date"
              value={startDate}
              onChange={(value) => {
                setSubmittedNotice(false)
                setStartDate(value)
              }}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-description">
              {t('createProject.fields.description')}
            </Label>
            <textarea
              id="project-description"
              value={description}
              onChange={(event) => {
                setSubmittedNotice(false)
                setDescription(event.target.value)
              }}
              placeholder={t('createProject.fields.descriptionPlaceholder')}
              className={textareaClassName}
              rows={4}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button type="submit" variant="primary" size="lg" className="min-h-11 px-5">
              {t('createProject.submit')}
            </Button>
            {submittedNotice ? (
              <p className="text-sm font-medium text-success">
                {t('createProject.submitted')}
              </p>
            ) : null}
          </div>
        </form>
      </Card>
    </div>
  )
}
