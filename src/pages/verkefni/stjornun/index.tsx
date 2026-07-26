import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ShieldCheck } from 'lucide-react'
import { SectionPage } from '../../../components/shared'
import { cn } from '../../../lib/utils'
import { buttonVariants, CardShell } from '../../../components/ui'

export default function StjornunPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      <SectionPage
        titleKey="nav.stjornun"
        descriptionKey="pages.verkefni.stjornun.description"
      />

      <div className="grid gap-6 md:grid-cols-2">
        <CardShell
          title={
            <span className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 shrink-0 text-foreground-muted" aria-hidden />
              {t('nav.adgangsstyring')}
            </span>
          }
          description={t('pages.verkefni.stjornun.accessControlsDescription')}
          footer={
            <Link
              to="/verkefni/stjornun/adgangsstyring"
              className={cn(
                buttonVariants({ variant: 'primary', size: 'lg' }),
                'min-h-12 px-5 text-base',
              )}
            >
              {t('pages.verkefni.openArea')}
            </Link>
          }
        />
      </div>
    </div>
  )
}
