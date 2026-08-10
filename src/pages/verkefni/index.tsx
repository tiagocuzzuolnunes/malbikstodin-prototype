import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { GitBranch, Ruler, Workflow } from 'lucide-react'
import { SectionPage } from '../../components/shared'
import { projectAreas } from '../../config/projects'
import { cn } from '../../lib/utils'
import { buttonVariants, CardShell } from '../../components/ui'

export default function VerkefniPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-8">
      <SectionPage titleKey="nav.verkefni" descriptionKey="pages.verkefni.description" />

      <div className="grid gap-6 md:grid-cols-3">
        {projectAreas.map((area) => (
          <CardShell
            key={area.id}
            interactive
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
        <CardShell
          interactive
          title={
            <span className="flex items-center gap-3">
              <GitBranch className="h-6 w-6 shrink-0 text-foreground-muted" aria-hidden />
              {t('nav.ferlar')}
            </span>
          }
          description={t('pages.verkefni.ferlar.description')}
          footer={
            <Link
              to="/verkefni/ferlar"
              className={cn(
                buttonVariants({ variant: 'primary', size: 'lg' }),
                'min-h-12 px-5 text-base',
              )}
            >
              {t('pages.verkefni.openArea')}
            </Link>
          }
        />
        <CardShell
          interactive
          title={
            <span className="flex items-center gap-3">
              <Workflow className="h-6 w-6 shrink-0 text-foreground-muted" aria-hidden />
              {t('nav.verkferill')}
            </span>
          }
          description={t('pages.verkefni.verkferill.description')}
          footer={
            <Link
              to="/verkefni/verkferill"
              className={cn(
                buttonVariants({ variant: 'primary', size: 'lg' }),
                'min-h-12 px-5 text-base',
              )}
            >
              {t('pages.verkefni.openArea')}
            </Link>
          }
        />
        <CardShell
          interactive
          title={
            <span className="flex items-center gap-3">
              <Ruler className="h-6 w-6 shrink-0 text-foreground-muted" aria-hidden />
              {t('nav.stadarmaelingar')}
            </span>
          }
          description={t('pages.verkefni.stadarmaelingar.description')}
          footer={
            <Link
              to="/verkefni/stadarmaelingar"
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
