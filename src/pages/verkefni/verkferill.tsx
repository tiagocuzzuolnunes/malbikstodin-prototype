import { SectionPage } from '../../components/shared'
import JobPipeline from '../../components/verkefni/JobPipeline'

export default function VerkferillPage() {
  return (
    <div className="space-y-8">
      <SectionPage
        titleKey="nav.verkferill"
        descriptionKey="pages.verkefni.verkferill.description"
      />
      <JobPipeline />
    </div>
  )
}
