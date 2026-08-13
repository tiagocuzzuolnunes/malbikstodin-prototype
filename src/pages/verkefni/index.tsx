import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Briefcase,
  FolderPlus,
  GitBranch,
  Inbox,
  Ruler,
  Truck,
  Wrench,
  Workflow,
} from 'lucide-react'
import { SectionPage } from '../../components/shared'
import { cn } from '../../lib/utils'
import { buttonVariants, CardShell } from '../../components/ui'

const hubLinks = [
  {
    id: 'rekstur',
    to: '/verkefni/rekstur',
    titleKey: 'nav.rekstur',
    descriptionKey: 'pages.verkefni.rekstur.hubDescription',
    icon: Briefcase,
  },
  {
    id: 'ferlar',
    to: '/verkefni/ferlar',
    titleKey: 'nav.ferlar',
    descriptionKey: 'pages.verkefni.ferlar.description',
    icon: GitBranch,
  },
  {
    id: 'verkferill',
    to: '/verkefni/verkferill',
    titleKey: 'nav.verkferill',
    descriptionKey: 'pages.verkefni.verkferill.description',
    icon: Workflow,
  },
  {
    id: 'stadarmaelingar',
    to: '/verkefni/stadarmaelingar',
    titleKey: 'nav.stadarmaelingar',
    descriptionKey: 'pages.verkefni.stadarmaelingar.description',
    icon: Ruler,
  },
  {
    id: 'lugan',
    to: '/verkefni/lugan',
    titleKey: 'nav.lugan',
    descriptionKey: 'pages.verkefni.lugan.description',
    icon: Inbox,
  },
  {
    id: 'vidhald',
    to: '/verkefni/vidhald',
    titleKey: 'nav.vidhald',
    descriptionKey: 'pages.verkefni.vidhald.description',
    icon: Wrench,
  },
  {
    id: 'dagskra-vorubila',
    to: '/verkefni/dagskra-vorubila',
    titleKey: 'nav.dagskraVorubila',
    descriptionKey: 'pages.verkefni.dagskraVorubila.description',
    icon: Truck,
  },
] as const

export default function VerkefniPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      <SectionPage
        titleKey="nav.verkefni"
        descriptionKey="pages.verkefni.description"
        actions={
          <Link
            to="/skraning/nytt-verkefni"
            className={cn(
              buttonVariants({ variant: 'primary', size: 'md' }),
              'min-h-10 px-4',
            )}
          >
            <FolderPlus className="h-4 w-4" aria-hidden />
            {t('nav.nyttVerkefni')}
          </Link>
        }
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
                  {t('pages.verkefni.openArea')}
                </Link>
              }
            />
          )
        })}
      </div>
    </div>
  )
}
