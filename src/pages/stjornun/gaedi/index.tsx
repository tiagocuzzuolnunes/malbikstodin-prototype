import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FlaskConical } from 'lucide-react'
import { SectionPage } from '../../../components/shared'
import { buttonVariants, CardShell } from '../../../components/ui'
import { cn } from '../../../lib/utils'

const qualityLinks = [
  {
    id: 'rannsoknarskra',
    to: '/stjornun/gaedi/rannsoknarskra',
    titleKey: 'nav.rannsoknarskra',
    descriptionKey: 'pages.stjornun.labRegisterDescription',
    icon: FlaskConical,
  },
] as const

export default function GaediPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      <SectionPage
        titleKey="nav.gaedi"
        descriptionKey="pages.stjornun.qualityDescription"
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {qualityLinks.map((item) => {
          const Icon = item.icon

          return (
            <CardShell
              key={item.id}
              interactive
              title={
                <span className="flex items-center gap-3">
                  <Icon className="h-6 w-6 shrink-0 text-foreground-muted" aria-hidden />
                  {t(item.titleKey)}
                </span>
              }
              description={t(item.descriptionKey)}
              footer={
                <Link
                  to={item.to}
                  className={cn(
                    buttonVariants({ variant: 'primary', size: 'lg' }),
                    'min-h-12 px-5 text-base',
                  )}
                >
                  {t('pages.stjornun.openSection')}
                </Link>
              }
            />
          )
        })}
      </div>
    </div>
  )
}
