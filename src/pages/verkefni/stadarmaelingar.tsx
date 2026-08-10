import { SectionPage } from '../../components/shared'
import SiteMeasurements from '../../components/verkefni/SiteMeasurements'

export default function StadarmaelingarPage() {
  return (
    <div className="space-y-8">
      <SectionPage
        titleKey="nav.stadarmaelingar"
        descriptionKey="pages.verkefni.stadarmaelingar.description"
      />
      <SiteMeasurements />
    </div>
  )
}
