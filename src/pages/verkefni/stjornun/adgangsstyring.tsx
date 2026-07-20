import SectionPage from '../../../components/SectionPage'
import AccessControlMatrix from '../../../components/AccessControlMatrix'

export default function AdgangsstyringPage() {
  return (
    <div className="space-y-8">
      <SectionPage
        titleKey="nav.adgangsstyring"
        descriptionKey="pages.verkefni.stjornun.accessControlsPageDescription"
      />
      <AccessControlMatrix />
    </div>
  )
}
