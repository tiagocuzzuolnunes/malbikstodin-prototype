import { useTranslation } from 'react-i18next'
import { FileSpreadsheet } from 'lucide-react'
import { SectionPage } from '../../components/shared'
import JobPipeline from '../../components/verkefni/JobPipeline'
import { Button } from '../../components/ui'

export default function VerkferillPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      <SectionPage
        titleKey="nav.verkferill"
        descriptionKey="pages.verkefni.verkferill.description"
        actions={
          <Button type="button" variant="primary" size="md">
            <FileSpreadsheet className="h-4 w-4" aria-hidden />
            {t('jobPipeline.actions.excel')}
          </Button>
        }
      />
      <JobPipeline />
    </div>
  )
}
