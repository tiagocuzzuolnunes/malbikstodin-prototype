import { Card } from '../ui'
import type { HoursRegistration } from './useHoursRegistration'
import { HoursCategoryPicker } from './HoursCategoryPicker'
import { HoursFormActions } from './HoursFormActions'
import { DriverRegistrationForm } from './forms/DriverRegistrationForm'
import { JobWorkForm } from './forms/JobWorkForm'
import { RepairsForm } from './forms/RepairsForm'
import { MvProjectsForm } from './forms/MvProjectsForm'

type HoursRegistrationCardProps = {
  registration: HoursRegistration
}

export function HoursRegistrationCard({ registration }: HoursRegistrationCardProps) {
  const {
    values,
    fieldsLocked,
    isRunning,
    elapsedMs,
    canStart,
    submittedNotice,
    currentUserName,
    selectCategory,
    handleTimerToggle,
    handleCancel,
    setDate,
    setComments,
    setJob,
    setEquipmentId,
    setOrigin,
    setStartOdometerKm,
    setProduct,
    setUnderworkJob,
    setWorkItem,
    setRepairRoleType,
    setRepairRoleSubtype,
  } = registration

  const { category } = values
  const workItemLocked = category === 'paving'

  return (
    <Card elevated padding="lg" className="min-h-0 w-full">
      <div className="mt-6 space-y-6">
        <HoursCategoryPicker
          category={category}
          disabled={fieldsLocked}
          onSelect={selectCategory}
        />

        {category === 'driverRegistration' ? (
          <DriverRegistrationForm
            fieldsLocked={fieldsLocked}
            isRunning={isRunning}
            elapsedMs={elapsedMs}
            job={values.job}
            equipmentId={values.equipmentId}
            origin={values.origin}
            startOdometerKm={values.startOdometerKm}
            product={values.product}
            comments={values.comments}
            date={values.date}
            onJobChange={setJob}
            onEquipmentChange={setEquipmentId}
            onOriginChange={setOrigin}
            onOdometerChange={setStartOdometerKm}
            onProductChange={setProduct}
            onCommentsChange={setComments}
            onDateChange={setDate}
          />
        ) : category === 'underwork' || category === 'paving' ? (
          <JobWorkForm
            fieldsLocked={fieldsLocked}
            workItemLocked={workItemLocked}
            isRunning={isRunning}
            elapsedMs={elapsedMs}
            underworkJob={values.underworkJob}
            workItem={values.workItem}
            equipmentId={values.equipmentId}
            comments={values.comments}
            onJobChange={setUnderworkJob}
            onWorkItemChange={setWorkItem}
            onEquipmentChange={setEquipmentId}
            onCommentsChange={setComments}
          />
        ) : category === 'repairs' ? (
          <RepairsForm
            fieldsLocked={fieldsLocked}
            isRunning={isRunning}
            elapsedMs={elapsedMs}
            repairRoleType={values.repairRoleType}
            repairRoleSubtype={values.repairRoleSubtype}
            workItem={values.workItem}
            equipmentId={values.equipmentId}
            comments={values.comments}
            onRoleTypeChange={setRepairRoleType}
            onRoleSubtypeChange={setRepairRoleSubtype}
            onEquipmentChange={setEquipmentId}
            onCommentsChange={setComments}
          />
        ) : (
          <MvProjectsForm
            isRunning={isRunning}
            elapsedMs={elapsedMs}
            mvJob={values.mvJob}
            comments={values.comments}
            onCommentsChange={setComments}
          />
        )}

        <HoursFormActions
          isRunning={isRunning}
          canStart={canStart}
          submittedNotice={submittedNotice}
          submittedByName={currentUserName}
          onToggle={handleTimerToggle}
          onCancel={handleCancel}
        />
      </div>
    </Card>
  )
}
