import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BadgeCheck, Scale, ShieldCheck, Users } from 'lucide-react'
import { SectionPage } from '../../components/shared'
import { cn } from '../../lib/utils'
import { buttonVariants, CardShell } from '../../components/ui'

const hubLinks = [
  {
    id: 'starfsfolk',
    to: '/stjornun/starfsfolk',
    titleKey: 'nav.starfsfolk',
    descriptionKey: 'pages.stjornun.employeesDescription',
    icon: Users,
  },
  {
    id: 'adgangsstyring',
    to: '/stjornun/adgangsstyring',
    titleKey: 'nav.adgangsstyring',
    descriptionKey: 'pages.stjornun.accessControlsDescription',
    icon: ShieldCheck,
  },
  {
    id: 'gaedi',
    to: '/stjornun/gaedi',
    titleKey: 'nav.gaedi',
    descriptionKey: 'pages.stjornun.qualityHubDescription',
    icon: BadgeCheck,
  },
  {
    id: 'eignarhald',
    to: '/stjornun/eignarhald',
    titleKey: 'nav.eignarhald',
    descriptionKey: 'pages.stjornun.ownershipDescription',
    icon: Scale,
  },
] as const

export default function StjornunPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      <SectionPage
        titleKey="nav.stjornun"
        descriptionKey="pages.stjornun.description"
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {hubLinks.map((item) => {
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
