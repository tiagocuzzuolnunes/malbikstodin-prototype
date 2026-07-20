import SectionPage from '../../components/SectionPage'
import ProcessTimelines from '../../components/ProcessTimelines'

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
