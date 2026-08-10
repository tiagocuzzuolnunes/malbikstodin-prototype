import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Calculator, FileText, Receipt } from 'lucide-react'
import { SectionPage } from '../../components/shared'
import { buttonVariants, CardShell } from '../../components/ui'
import { cn } from '../../lib/utils'

const hubLinks = [
  {
    id: 'utgjold',
    to: '/fjarmal/utgjold',
    titleKey: 'nav.utgjold',
    descriptionKey: 'pages.fjarmal.registerDescription',
    icon: Receipt,
  },
  {
    id: 'kostnadargreining',
    to: '/fjarmal/kostnadargreining',
    titleKey: 'nav.kostnadargreining',
    descriptionKey: 'pages.fjarmal.costAnalysisDescription',
    icon: Calculator,
  },
  {
    id: 'reikningar',
    to: '/fjarmal/reikningar',
    titleKey: 'nav.reikningar',
    descriptionKey: 'pages.reikningar.description',
    icon: FileText,
  },
] as const

export default function FjarmalPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      <SectionPage titleKey="nav.fjarmal" descriptionKey="pages.fjarmal.description" />

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
                  {t('pages.fjarmal.openSection')}
                </Link>
              }
            />
          )
        })}
      </div>
    </div>
  )
}
