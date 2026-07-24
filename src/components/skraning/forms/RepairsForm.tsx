import { useTranslation } from 'react-i18next'
import { Label, Select } from '../../ui'
import { equipmentItems } from '../../../data/equipment'
import {
  repairRoleSubtypes,
  repairRoleTypes,
  repairSubtypeByType,
  repairsWorkItem,
  type RepairRoleSubtype,
  type RepairRoleType,
  type WorkItem,
} from '../../../data/hours'
import {
  fieldLabelClassName,
  fieldListClassName,
  fieldRowClassName,
  textareaClassName,
} from '../hoursStyles'

type RepairsFormProps = {
  fieldsLocked: boolean
  repairRoleType: RepairRoleType | ''
  repairRoleSubtype: RepairRoleSubtype | ''
  workItem: WorkItem | ''
  equipmentId: string
  comments: string
  onRoleTypeChange: (value: RepairRoleType | '') => void
  onRoleSubtypeChange: (value: RepairRoleSubtype | '') => void
  onEquipmentChange: (value: string) => void
  onCommentsChange: (value: string) => void
}

export function RepairsForm({
  fieldsLocked,
  repairRoleType,
  repairRoleSubtype,
  workItem,
  equipmentId,
  comments,
  onRoleTypeChange,
  onRoleSubtypeChange,
  onEquipmentChange,
  onCommentsChange,
}: RepairsFormProps) {
  const { t } = useTranslation()

  return (
    <div className={fieldListClassName}>
      <div className={fieldRowClassName}>
        <Label htmlFor="repair-role-type" className={fieldLabelClassName}>
          {t('hours.fields.roleType')}
        </Label>
        <Select
          id="repair-role-type"
          value={repairRoleType}
          disabled={fieldsLocked}
          required
          placeholder={t('hours.fields.roleTypePlaceholder')}
          options={repairRoleTypes.map((value) => ({
            value,
            label: t(`hours.repairRoleTypes.${value}`),
          }))}
          onChange={(next) => {
            const typed = next as RepairRoleType | ''
            onRoleTypeChange(typed)
            onRoleSubtypeChange(typed ? repairSubtypeByType[typed] : '')
          }}
        />
      </div>

      <div className={fieldRowClassName}>
        <Label htmlFor="repair-role-subtype" className={fieldLabelClassName}>
          {t('hours.fields.roleSubtype')}
        </Label>
        <Select
          id="repair-role-subtype"
          value={repairRoleSubtype}
          disabled
          required
          placeholder={t('hours.fields.roleSubtypePlaceholder')}
          options={(repairRoleSubtype ? [repairRoleSubtype] : repairRoleSubtypes).map(
            (value) => ({
              value,
              label: t(`hours.repairRoleSubtypes.${value}`),
            }),
          )}
          onChange={() => undefined}
        />
      </div>

      <div className={fieldRowClassName}>
        <Label htmlFor="repair-work-item" className={fieldLabelClassName}>
          {t('hours.fields.workItem')}
        </Label>
        <Select
          id="repair-work-item"
          value={workItem}
          disabled
          required
          placeholder={t('hours.fields.workItemPlaceholder')}
          options={[repairsWorkItem].map((value) => ({
            value,
            label: t(`hours.underworkItems.${value}`),
          }))}
          onChange={() => undefined}
        />
      </div>

      <div className={fieldRowClassName}>
        <Label htmlFor="repair-equipment" className={fieldLabelClassName}>
          {t('hours.fields.equipmentName')}
        </Label>
        <Select
          id="repair-equipment"
          value={equipmentId}
          disabled={fieldsLocked}
          required
          placeholder={t('hours.fields.equipmentPlaceholder')}
          options={equipmentItems.map((item) => ({
            value: item.id,
            label: `${item.serial} · ${item.name}`,
          }))}
          onChange={onEquipmentChange}
        />
      </div>

      <div className={fieldRowClassName}>
        <Label htmlFor="repair-comments" className={`${fieldLabelClassName} self-start sm:pt-2`}>
          {t('hours.fields.comments')}
        </Label>
        <textarea
          id="repair-comments"
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
