import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { SectionPage } from '../../components/shared'
import HatchForm from '../../components/verkefni/HatchForm'
import HatchReports from '../../components/verkefni/HatchReports'
import { PillSwitch } from '../../components/ui'
import { parseHatchView, type HatchView } from '../../data/hatch'

export default function LuganPage() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const view = parseHatchView(searchParams.get('view'))

  function setView(next: HatchView) {
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
        titleKey="nav.lugan"
        descriptionKey="pages.verkefni.lugan.description"
      />

      <div className="space-y-4 sm:space-y-6">
        <PillSwitch
          label={t('hatch.views.label')}
          value={view}
          options={[
            { value: 'register', content: t('hatch.views.register') },
            { value: 'reports', content: t('hatch.views.reports') },
          ]}
          onChange={(next) => setView(next as HatchView)}
        />

        {view === 'register' ? <HatchForm /> : <HatchReports />}
      </div>
    </div>
  )
}
