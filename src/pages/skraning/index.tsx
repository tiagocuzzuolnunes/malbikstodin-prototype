import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Clock3, Scale } from 'lucide-react'
import { SectionPage } from '../../components/shared'
import { cn } from '../../lib/utils'
import { buttonVariants, CardShell } from '../../components/ui'

const registrationHubLinks = [
  {
    id: 'hours',
    to: '/skraning/hours',
    titleKey: 'nav.hours',
    descriptionKey: 'pages.skraning.hoursDescription',
    icon: Clock3,
  },
  {
    id: 'radstofun-vigtana',
    to: '/skraning/radstofun-vigtana',
    titleKey: 'nav.radstofunVigtana',
    descriptionKey: 'pages.skraning.dispatchDescription',
    icon: Scale,
  },
] as const

export default function SkraningHubPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      <SectionPage titleKey="nav.skraning" descriptionKey="pages.skraning.description" />

      <div className="grid gap-6 md:grid-cols-2">
        {registrationHubLinks.map((item) => {
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
                  {t('pages.skraning.openSection')}
                </Link>
              }
            />
          )
        })}
      </div>
    </div>
  )
}
