import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  linkableJobs,
  orphanPostings,
} from '../../data/jobLedger'
import { Button, Label, Modal, Select } from '../ui'

function formatLedgerIsk(amount: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'ISK',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function LinkOrphanPostingsModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  if (!open) return null

  return <LinkOrphanPostingsModalForm onClose={onClose} />
}

function LinkOrphanPostingsModalForm({ onClose }: { onClose: () => void }) {
  const { t, i18n } = useTranslation()
  const locale = i18n.resolvedLanguage ?? i18n.language
  const [links, setLinks] = useState<Record<string, string>>(() =>
    Object.fromEntries(orphanPostings.map((posting) => [posting.id, ''])),
  )

  const linkedCount = Object.values(links).filter(Boolean).length
  const jobOptions = linkableJobs.map((job) => ({
    value: job.id,
    label: `${job.serial} · ${t(job.jobKey)}`,
  }))

  function setJob(postingId: string, jobId: string) {
    setLinks((current) => ({ ...current, [postingId]: jobId }))
  }

  return (
    <Modal
      open
      onClose={onClose}
      title={t('jobLedger.linkModal.title')}
      className="max-w-2xl"
      footer={
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-foreground-muted">
            {t('jobLedger.linkModal.readyCount', { count: linkedCount })}
          </p>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" size="md" onClick={onClose}>
              {t('common.cancel')}
            </Button>
            <Button
              type="button"
              variant="primary"
              size="md"
              disabled={linkedCount === 0}
              onClick={onClose}
            >
              {t('jobLedger.linkModal.confirm', { count: linkedCount })}
            </Button>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-5">
        <p className="text-sm text-foreground-muted sm:text-base">
          {t('jobLedger.linkModal.subtitle', {
            count: orphanPostings.length,
            amount: formatLedgerIsk(
              orphanPostings.reduce((sum, posting) => sum + posting.amountIsk, 0),
              locale,
            ),
          })}
        </p>

        <ul className="divide-y divide-border overflow-hidden rounded-card border border-border">
          {orphanPostings.map((posting) => (
            <li
              key={posting.id}
              className="space-y-3 bg-surface px-4 py-4 sm:px-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-mono text-xs tracking-wide text-foreground-muted">
                    {t('jobLedger.linkModal.postingNo', {
                      number: posting.postingNo,
                    })}
                  </p>
                  <p className="mt-1 font-medium tracking-tight">
                    {t(posting.descriptionKey)}
                  </p>
                </div>
                <p className="shrink-0 font-semibold tabular-nums">
                  {formatLedgerIsk(posting.amountIsk, locale)}
                </p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor={`link-job-${posting.id}`}>
                  {t('jobLedger.linkModal.jobLabel')}
                </Label>
                <Select
                  id={`link-job-${posting.id}`}
                  value={links[posting.id] ?? ''}
                  placeholder={t('jobLedger.linkModal.selectJob')}
                  options={jobOptions}
                  maxVisibleOptions={5}
                  onChange={(value) => setJob(posting.id, value)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  )
}
