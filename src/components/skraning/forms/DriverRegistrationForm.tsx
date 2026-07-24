import { useTranslation } from 'react-i18next'
import { DatePicker, Input, Label, Select } from '../../ui'
import { equipmentItems } from '../../../data/equipment'
import {
  driverJobs,
  driverOrigins,
  driverProducts,
  type DriverJob,
  type DriverOrigin,
  type DriverProduct,
} from '../../../data/hours'
import {
  fieldLabelClassName,
  fieldListClassName,
  fieldRowClassName,
  textareaClassName,
} from '../hoursStyles'
import { HoursTimerField } from '../HoursTimerField'

type DriverRegistrationFormProps = {
  fieldsLocked: boolean
  isRunning: boolean
  elapsedMs: number
  job: DriverJob | ''
  equipmentId: string
  origin: DriverOrigin | ''
  startOdometerKm: string
  product: DriverProduct | ''
  comments: string
  date: string
  onJobChange: (value: DriverJob | '') => void
  onEquipmentChange: (value: string) => void
  onOriginChange: (value: DriverOrigin | '') => void
  onOdometerChange: (value: string) => void
  onProductChange: (value: DriverProduct | '') => void
  onCommentsChange: (value: string) => void
  onDateChange: (value: string) => void
}

export function DriverRegistrationForm({
  fieldsLocked,
  isRunning,
  elapsedMs,
  job,
  equipmentId,
  origin,
  startOdometerKm,
  product,
  comments,
  date,
  onJobChange,
  onEquipmentChange,
  onOriginChange,
  onOdometerChange,
  onProductChange,
  onCommentsChange,
  onDateChange,
}: DriverRegistrationFormProps) {
  const { t } = useTranslation()

  return (
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
          onChange={(next) => onJobChange(next as DriverJob | '')}
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
          onChange={onEquipmentChange}
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
          onChange={(next) => onOriginChange(next as DriverOrigin | '')}
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
          onChange={(event) => onOdometerChange(event.target.value)}
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
          onChange={(next) => onProductChange(next as DriverProduct | '')}
        />
      </div>

      <div className={fieldRowClassName}>
        <Label htmlFor="driver-comments" className={`${fieldLabelClassName} self-start sm:pt-3`}>
          {t('hours.fields.comments')}
        </Label>
        <textarea
          id="driver-comments"
          value={comments}
          onChange={(event) => onCommentsChange(event.target.value)}
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
          onChange={onDateChange}
        />
      </div>

      <HoursTimerField isRunning={isRunning} elapsedMs={elapsedMs} />
    </div>
  )
}
