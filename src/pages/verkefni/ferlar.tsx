import { SectionPage } from '../../components/shared'
import ProcessTimelines from '../../components/verkefni/ProcessTimelines'
export default function FerlarPage() {
  return (
    <div className="space-y-8">
      <SectionPage
        titleKey="nav.ferlar"
        descriptionKey="pages.verkefni.ferlar.description"
      />
      <ProcessTimelines />
    </div>
  )
}
