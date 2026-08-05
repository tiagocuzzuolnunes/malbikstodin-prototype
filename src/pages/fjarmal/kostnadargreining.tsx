import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionPage } from '../../components/shared'
import { JobCostAnalysis } from '../../components/fjarmal/JobCostAnalysis'
import { JobCostPipeline } from '../../components/fjarmal/JobCostPipeline'
import { PillSwitch } from '../../components/ui'

type JobCostMode = 'analysis' | 'pipeline'

export default function KostnadargreiningPage() {
  const { t } = useTranslation()
  const [mode, setMode] = useState<JobCostMode>('analysis')

  return (
    <div className="space-y-8">
      <SectionPage
        titleKey="nav.kostnadargreining"
        descriptionKey="pages.fjarmal.costAnalysisDescription"
      />

      <PillSwitch
        label={t('jobCost.modes.label')}
        value={mode}
        optionMinWidthClassName="min-w-36"
        options={[
          { value: 'analysis', content: t('jobCost.modes.analysis') },
          { value: 'pipeline', content: t('jobCost.modes.pipeline') },
        ]}
        onChange={(next) => setMode(next as JobCostMode)}
      />

      {mode === 'analysis' ? <JobCostAnalysis /> : <JobCostPipeline />}
    </div>
  )
}
