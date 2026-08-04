import { SectionPage } from '../../components/shared'
import { JobCostAnalysis } from '../../components/fjarmal/JobCostAnalysis'

export default function KostnadargreiningPage() {
  return (
    <div className="space-y-8">
      <SectionPage
        titleKey="nav.kostnadargreining"
        descriptionKey="pages.fjarmal.costAnalysisDescription"
      />
      <JobCostAnalysis />
    </div>
  )
}
