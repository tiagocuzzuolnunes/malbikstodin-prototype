import { useTranslation } from 'react-i18next'
import { Label, Select } from '../../ui'
import { mvProjectJob } from '../../../data/hours'
import {
  fieldLabelClassName,
  fieldListClassName,
  fieldRowClassName,
  textareaClassName,
} from '../hoursStyles'

type MvProjectsFormProps = {
  mvJob: typeof mvProjectJob | ''
  comments: string
  onCommentsChange: (value: string) => void
}

export function MvProjectsForm({
  mvJob,
  comments,
  onCommentsChange,
}: MvProjectsFormProps) {
  const { t } = useTranslation()

  return (
    <div className={fieldListClassName}>
      <div className={fieldRowClassName}>
        <Label htmlFor="mv-job" className={fieldLabelClassName}>
          {t('hours.fields.job')}
        </Label>
        <Select
          id="mv-job"
          value={mvJob}
          disabled
          required
          placeholder={t('hours.fields.jobPlaceholder')}
          options={[mvProjectJob].map((value) => ({
            value,
            label: t(`hours.mvProjectJobs.${value}`),
          }))}
          onChange={() => undefined}
        />
      </div>

      <div className={fieldRowClassName}>
        <Label htmlFor="mv-comments" className={`${fieldLabelClassName} self-start sm:pt-2`}>
          {t('hours.fields.comments')}
        </Label>
        <textarea
          id="mv-comments"
          value={comments}
          onChange={(event) => onCommentsChange(event.target.value)}
          placeholder={t('hours.fields.commentsPlaceholder')}
          className={textareaClassName}
          rows={4}
        />
      </div>
    </div>
  )
}
