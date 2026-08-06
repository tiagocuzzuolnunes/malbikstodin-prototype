import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ClipboardCheck,
  ListChecks,
  Search,
  Truck,
} from 'lucide-react'
import { InvoiceInbox } from '../../components/reikningar'
import { SectionPage } from '../../components/shared'
import { buttonVariants, CardShell } from '../../components/ui'
import { cn } from '../../lib/utils'

const invoiceLinks = [
  {
    id: 'yfirferd',
    to: '/fjarmal/yfirferd',
    titleKey: 'nav.yfirferd',
    descriptionKey: 'pages.reikningar.reviewDescription',
    icon: ClipboardCheck,
  },
  {
    id: 'serfraedingur',
    to: '/fjarmal/serfraedingur',
    titleKey: 'nav.serfraedingur',
    descriptionKey: 'pages.reikningar.expertDescription',
    icon: Search,
  },
  {
    id: 'vantar',
    to: '/fjarmal/vantar',
    titleKey: 'nav.vantar',
    descriptionKey: 'pages.reikningar.missingDescription',
    icon: ListChecks,
  },
  {
    id: 'leiga',
    to: '/fjarmal/leiga',
    titleKey: 'nav.leiga',
    descriptionKey: 'pages.reikningar.rentalDescription',
    icon: Truck,
  },
] as const

export default function FjarmalReikningarPage() {
  const { t } = useTranslation()

  return (
    <div className="min-w-0 space-y-5 sm:space-y-8">
      <SectionPage titleKey="nav.reikningar" descriptionKey="pages.reikningar.description" />

      <InvoiceInbox />

      <div>
        <h2 className="text-xl font-semibold tracking-tight">
          {t('invoices.hub.title')}
        </h2>
        <p className="mt-1 text-sm text-foreground-muted">{t('invoices.hub.subtitle')}</p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-2 xl:grid-cols-4">
          {invoiceLinks.map((item) => {
            const Icon = item.icon
            return (
              <CardShell
                key={item.id}
                interactive
                size="compact"
                className="min-h-0"
                title={
                  <span className="flex items-center gap-2 sm:gap-3">
                    <Icon className="h-5 w-5 shrink-0 text-foreground-muted" aria-hidden />
                    <span className="text-base sm:text-lg">{t(item.titleKey)}</span>
                  </span>
                }
                description={
                  <span className="hidden sm:inline">{t(item.descriptionKey)}</span>
                }
                footer={
                  <Link
                    to={item.to}
                    className={cn(
                      buttonVariants({ variant: 'primary', size: 'lg' }),
                      'min-h-11 w-full px-4 sm:w-auto sm:px-5',
                    )}
                  >
                    {t('pages.reikningar.openSection')}
                  </Link>
                }
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
