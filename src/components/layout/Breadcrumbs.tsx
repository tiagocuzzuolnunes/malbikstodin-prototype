import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { getBreadcrumbKeys } from '../../config/navigation'
import { cn } from '../../lib/utils'
import { buttonVariants } from '../ui'

export default function Breadcrumbs() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const crumbs = getBreadcrumbKeys(pathname)
  const parent = crumbs.length > 1 ? crumbs[crumbs.length - 2] : null

  return (
    <div className="mb-4 flex items-center gap-3">
      {parent ? (
        <Link
          to={parent.to}
          aria-label={t('common.back')}
          title={t('common.back')}
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'icon' }),
            'shrink-0 p-2 text-foreground-muted hover:text-foreground',
          )}
        >
          <ArrowLeft className="h-5 w-5" aria-hidden />
        </Link>
      ) : null}

      <nav aria-label={t('common.breadcrumb')} className="min-w-0">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-foreground-muted">
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1
            const label = t(crumb.labelKey)

            return (
              <li key={crumb.to} className="flex items-center gap-1">
                {index > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden />}
                {isLast ? (
                  <span className="font-medium text-foreground" aria-current="page">
                    {label}
                  </span>
                ) : (
                  <Link to={crumb.to} className="hover:text-foreground">
                    {label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </div>
  )
}
