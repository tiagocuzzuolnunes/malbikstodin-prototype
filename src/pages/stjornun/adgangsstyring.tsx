import { SectionPage } from '../../components/shared'
import AccessControlMatrix from '../../components/verkefni/AccessControlMatrix'

export default function AdgangsstyringPage() {
  return (
    <div className="space-y-8">
      <SectionPage
        titleKey="nav.adgangsstyring"
        descriptionKey="pages.stjornun.accessControlsPageDescription"
      />
      <AccessControlMatrix />
    </div>
  )
}
