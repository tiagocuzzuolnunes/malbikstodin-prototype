import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CheckCircle2 } from 'lucide-react'
import { SectionPage } from '../../components/shared'
import { Card } from '../../components/ui'
import { getInboxInvoices } from '../../data/invoices'
import { ReviewWorkspace } from '../../components/reikningar'

export default function YfirferdPage() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const focusId = searchParams.get('invoice')

  const reviewQueue = useMemo(() => {
    const all = getInboxInvoices().filter((invoice) => invoice.status === 'discrepancy')
    if (!focusId) return all
    const focused = all.find((invoice) => invoice.id === focusId)
    if (!focused) return all
    return [focused, ...all.filter((invoice) => invoice.id !== focusId)]
  }, [focusId])

  if (reviewQueue.length === 0) {
    return (
      <div className="space-y-8">
        <SectionPage titleKey="nav.yfirferd" descriptionKey="pages.reikningar.reviewDescription" />
        <Card elevated padding="lg" className="text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-success" aria-hidden />
          <h2 className="mt-4 text-2xl font-semibold tracking-tight">
            {t('invoices.review.emptyTitle')}
          </h2>
          <p className="mt-2 text-foreground-muted">{t('invoices.review.emptySubtitle')}</p>
          <Link
            to="/fjarmal/reikningar"
            className="mt-6 inline-flex text-accent hover:underline"
          >
            {t('invoices.review.backToInbox')}
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-5 sm:space-y-8">
      <SectionPage titleKey="nav.yfirferd" descriptionKey="pages.reikningar.reviewDescription" />
      <ReviewWorkspace reviewQueue={reviewQueue} />
    </div>
  )
}
