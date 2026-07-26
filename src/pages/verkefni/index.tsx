import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { GitBranch, Settings2 } from 'lucide-react'
import { SectionPage } from '../../components/shared'
import { projectAreas } from '../../config/projects'
import { cn } from '../../lib/utils'
import { buttonVariants, CardShell } from '../../components/ui'

export default function VerkefniPage() {
  const { t } = useTranslation()

  const secondaryLinks = [
    {
      id: 'ferlar',
      to: '/verkefni/ferlar',
      titleKey: 'nav.ferlar',
      descriptionKey: 'pages.verkefni.ferlar.description',
      icon: GitBranch,
    },
    {
      id: 'stjornun',
      to: '/verkefni/stjornun',
      titleKey: 'nav.stjornun',
      descriptionKey: 'pages.verkefni.stjornun.description',
      icon: Settings2,
    },
  ] as const

  return (
    <div className="space-y-8">
      <SectionPage titleKey="nav.verkefni" descriptionKey="pages.verkefni.description" />

      <div className="grid gap-6 md:grid-cols-3">
        {projectAreas.map((area) => (
          <CardShell
            key={area.id}
            title={t(area.titleKey)}
            description={t(area.descriptionKey)}
            footer={
              <Link
                to={area.to}
                className={cn(
                  buttonVariants({ variant: 'primary', size: 'lg' }),
                  'min-h-12 px-5 text-base',
                )}
              >
                {t('pages.verkefni.openArea')}
              </Link>
            }
          />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {secondaryLinks.map((item) => {
          const Icon = item.icon

          return (
            <CardShell
              key={item.id}
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
                  {t('pages.verkefni.openArea')}
                </Link>
              }
            />
          )
        })}
      </div>

      <div className="flex justify-end">
        <Link
          to="/verkefni/events"
          className={cn(buttonVariants({ variant: 'ghost', size: 'md' }), 'text-sm')}
        >
          {t('home.events.viewAll')}
        </Link>
      </div>
    </div>
  )
}
