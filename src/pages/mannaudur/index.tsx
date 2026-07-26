import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LayoutDashboard, MessageSquarePlus, Users } from 'lucide-react'
import { SectionPage } from '../../components/shared'
import { cn } from '../../lib/utils'
import { buttonVariants, CardShell } from '../../components/ui'

const hrHubLinks = [
  {
    id: 'starfsfolk',
    to: '/mannaudur/starfsfolk',
    titleKey: 'nav.starfsfolk',
    descriptionKey: 'pages.mannaudur.employeesDescription',
    icon: Users,
  },
  {
    id: 'yfirlit',
    to: '/mannaudur/yfirlit',
    titleKey: 'nav.yfirlit',
    descriptionKey: 'pages.mannaudur.dashboardDescription',
    icon: LayoutDashboard,
  },
  {
    id: 'abendingar',
    to: '/mannaudur/abendingar',
    titleKey: 'nav.abendingar',
    descriptionKey: 'pages.mannaudur.feedbackDescription',
    icon: MessageSquarePlus,
  },
] as const

export default function MannaudurHubPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      <SectionPage titleKey="nav.mannaudur" descriptionKey="pages.mannaudur.description" />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {hrHubLinks.map((item) => {
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
                  {t('pages.mannaudur.openSection')}
                </Link>
              }
            />
          )
        })}
      </div>
    </div>
  )
}
