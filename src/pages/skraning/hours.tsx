import { SectionPage } from '../../components/shared'
import {
  HoursEntriesTable,
  HoursRegistrationCard,
  useHoursRegistration,
} from '../../components/skraning'

export default function SkraningHoursPage() {
  const registration = useHoursRegistration()

  return (
    <div className="space-y-8">
      <SectionPage titleKey="nav.hours" descriptionKey="pages.skraning.hoursDescription" />
      <HoursRegistrationCard registration={registration} />
      <HoursEntriesTable entries={registration.entries} />
    </div>
  )
}
