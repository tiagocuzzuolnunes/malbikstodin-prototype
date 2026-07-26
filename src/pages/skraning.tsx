import { SectionPage } from '../components/shared'
import {
  HoursEntriesTable,
  HoursRegistrationCard,
  useHoursRegistration,
} from '../components/skraning'

export default function SkraningPage() {
  const registration = useHoursRegistration()

  return (
    <div className="space-y-8">
      <SectionPage titleKey="nav.skraning" descriptionKey="pages.skraning.description" />
      <HoursRegistrationCard registration={registration} />
      <HoursEntriesTable entries={registration.entries} />
    </div>
  )
}
