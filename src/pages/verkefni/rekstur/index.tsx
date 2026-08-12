import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Archive, CalendarClock, ClipboardList, FileText, Wrench } from 'lucide-react'
import { SectionPage } from '../../../components/shared'
import { cn } from '../../../lib/utils'
import { buttonVariants, CardShell } from '../../../components/ui'

const tools = [
  {
    id: 'worklist',
    to: '/verkefni/worklist',
    titleKey: 'nav.worklist',
    descriptionKey: 'pages.verkefni.hub.worklistDescription',
    icon: ClipboardList,
  },
  {
    id: 'contracts',
    to: '/verkefni/contracts',
    titleKey: 'nav.contracts',
    descriptionKey: 'pages.verkefni.hub.contractsDescription',
    icon: FileText,
  },
  {
    id: 'skjalasafn',
    to: '/verkefni/skjalasafn',
    titleKey: 'nav.skjalasafn',
    descriptionKey: 'pages.verkefni.hub.archiveDescription',
    icon: Archive,
  },
  {
    id: 'dagskra',
    to: '/verkefni/dagskra',
    titleKey: 'nav.dagskra',
    descriptionKey: 'pages.verkefni.hub.scheduleDescription',
    icon: CalendarClock,
  },
  {
    id: 'taeki',
    to: '/verkefni/taeki',
    titleKey: 'nav.taeki',
    descriptionKey: 'pages.verkefni.hub.equipmentDescription',
    icon: Wrench,
  },
] as const

export default function VerkefniReksturPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      <SectionPage
        titleKey="nav.rekstur"
        descriptionKey="pages.verkefni.rekstur.description"
      />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => {
          const Icon = tool.icon

          return (
            <CardShell
              key={tool.id}
              interactive
              title={
                <span className="flex items-center gap-3">
                  <Icon className="h-6 w-6 shrink-0 text-foreground-muted" aria-hidden />
                  {t(tool.titleKey)}
                </span>
              }
              description={t(tool.descriptionKey)}
              footer={
                <Link
                  to={tool.to}
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
