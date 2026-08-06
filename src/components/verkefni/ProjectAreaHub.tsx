import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Archive, CalendarClock, ClipboardList, FileText, Wrench } from 'lucide-react'
import { SectionPage } from '../shared'
import { projectAreas, type ProjectAreaId } from '../../config/projects'
import { cn } from '../../lib/utils'
import { buttonVariants, CardShell } from '../ui'

type ProjectAreaHubProps = {
  areaId: ProjectAreaId
}

export default function ProjectAreaHub({ areaId }: ProjectAreaHubProps) {
  const { t } = useTranslation()
  const area = projectAreas.find((item) => item.id === areaId)

  if (!area) return null

  const options = [
    {
      id: 'worklist',
      to: `${area.to}/worklist`,
      titleKey: 'nav.worklist',
      descriptionKey: 'pages.verkefni.hub.worklistDescription',
      icon: ClipboardList,
    },
    {
      id: 'contracts',
      to: `${area.to}/contracts`,
      titleKey: 'nav.contracts',
      descriptionKey: 'pages.verkefni.hub.contractsDescription',
      icon: FileText,
    },
    {
      id: 'skjalasafn',
      to: `${area.to}/skjalasafn`,
      titleKey: 'nav.skjalasafn',
      descriptionKey: 'pages.verkefni.hub.archiveDescription',
      icon: Archive,
    },
    {
      id: 'dagskra',
      to: `${area.to}/dagskra`,
      titleKey: 'nav.dagskra',
      descriptionKey: 'pages.verkefni.hub.scheduleDescription',
      icon: CalendarClock,
    },
    {
      id: 'taeki',
      to: `${area.to}/taeki`,
      titleKey: 'nav.taeki',
      descriptionKey: 'pages.verkefni.hub.equipmentDescription',
      icon: Wrench,
    },
  ] as const

  return (
    <div className="space-y-8">
      <SectionPage titleKey={area.titleKey} descriptionKey={area.descriptionKey} />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {options.map((option) => {
          const Icon = option.icon

          return (
            <CardShell
              key={option.id}
              interactive
              title={
                <span className="flex items-center gap-3">
                  <Icon className="h-6 w-6 shrink-0 text-foreground-muted" aria-hidden />
                  {t(option.titleKey)}
                </span>
              }
              description={t(option.descriptionKey)}
              footer={
                <Link
                  to={option.to}
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
