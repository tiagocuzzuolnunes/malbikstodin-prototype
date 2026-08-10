import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { SectionPage } from '../../components/shared'
import SiteMeasurements from '../../components/verkefni/SiteMeasurements'
import SiteMeasurementsList from '../../components/verkefni/SiteMeasurementsList'
import { PillSwitch } from '../../components/ui'
import {
  parseSiteMeasurementsView,
  type SiteMeasurementsView,
} from '../../data/siteMeasurements'

export default function StadarmaelingarPage() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const view = parseSiteMeasurementsView(searchParams.get('view'))

  function setView(next: SiteMeasurementsView) {
    setSearchParams(
      (prev) => {
        const nextParams = new URLSearchParams(prev)
        if (next === 'register') nextParams.delete('view')
        else nextParams.set('view', next)
        return nextParams
      },
      { replace: true },
    )
  }

  return (
    <div className="space-y-8">
      <SectionPage
        titleKey="nav.stadarmaelingar"
        descriptionKey="pages.verkefni.stadarmaelingar.description"
      />

      <div className="space-y-4 sm:space-y-6">
        <PillSwitch
          label={t('siteMeasurements.views.label')}
          value={view}
          options={[
            {
              value: 'register',
              content: t('siteMeasurements.views.register'),
            },
            {
              value: 'measurements',
              content: t('siteMeasurements.views.measurements'),
            },
          ]}
          onChange={(next) => setView(next as SiteMeasurementsView)}
        />

        {view === 'register' ? <SiteMeasurements /> : <SiteMeasurementsList />}
      </div>
    </div>
  )
}
