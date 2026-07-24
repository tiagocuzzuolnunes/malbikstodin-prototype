import { useTranslation } from 'react-i18next'
import { Label, Select } from '../../ui'
import { equipmentItems } from '../../../data/equipment'
import {
  pavingWorkItem,
  underworkItems,
  underworkJobs,
  type UnderworkItem,
  type UnderworkJob,
  type WorkItem,
} from '../../../data/hours'
import {
  fieldLabelClassName,
  fieldListClassName,
  fieldRowClassName,
  textareaClassName,
} from '../hoursStyles'

type JobWorkFormProps = {
  fieldsLocked: boolean
  workItemLocked: boolean
  underworkJob: UnderworkJob | ''
  workItem: WorkItem | ''
  equipmentId: string
  comments: string
  onJobChange: (value: UnderworkJob | '') => void
  onWorkItemChange: (value: WorkItem | '') => void
  onEquipmentChange: (value: string) => void
  onCommentsChange: (value: string) => void
}

export function JobWorkForm({
  fieldsLocked,
  workItemLocked,
  underworkJob,
  workItem,
  equipmentId,
  comments,
  onJobChange,
  onWorkItemChange,
  onEquipmentChange,
  onCommentsChange,
}: JobWorkFormProps) {
  const { t } = useTranslation()

  return (
    <div className={fieldListClassName}>
      <div className={fieldRowClassName}>
        <Label htmlFor="underwork-job" className={fieldLabelClassName}>
          {t('hours.fields.job')}
        </Label>
        <Select
          id="underwork-job"
          value={underworkJob}
          disabled={fieldsLocked}
          required
          placeholder={t('hours.fields.jobPlaceholder')}
          options={underworkJobs.map((value) => ({
            value,
            label: t(`hours.underworkJobs.${value}`),
          }))}
          onChange={(next) => onJobChange(next as UnderworkJob | '')}
        />
      </div>

      <div className={fieldRowClassName}>
        <Label htmlFor="underwork-item" className={fieldLabelClassName}>
          {t('hours.fields.workItem')}
        </Label>
        <Select
          id="underwork-item"
          value={workItem}
          disabled={fieldsLocked || workItemLocked}
          required
          placeholder={t('hours.fields.workItemPlaceholder')}
          options={(workItemLocked ? [pavingWorkItem] : underworkItems).map((value) => ({
            value,
            label: t(`hours.underworkItems.${value}`),
          }))}
          onChange={(next) => {
            if (workItemLocked) return
            onWorkItemChange(next as UnderworkItem | '')
          }}
        />
      </div>

      <div className={fieldRowClassName}>
        <Label htmlFor="underwork-equipment" className={fieldLabelClassName}>
          {t('hours.fields.equipment')}
        </Label>
        <Select
          id="underwork-equipment"
          value={equipmentId}
          disabled={fieldsLocked}
          placeholder={t('hours.fields.equipmentNone')}
          options={equipmentItems.map((item) => ({
            value: item.id,
            label: `${item.name} (${item.plate})`,
          }))}
          onChange={onEquipmentChange}
        />
      </div>

      <div className={fieldRowClassName}>
        <Label
          htmlFor="underwork-comments"
          className={`${fieldLabelClassName} self-start sm:pt-2`}
        >
          {t('hours.fields.comments')}
        </Label>
        <textarea
          id="underwork-comments"
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
