import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Bell } from 'lucide-react'
import type { AppNotification } from '../../data/notifications'
import { cn } from '../../lib/utils'
import { Button, Modal } from '../ui'

type NotificationBellProps = {
  compact?: boolean
}

export default function NotificationBell({ compact = false }: NotificationBellProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState<AppNotification[] | null>(null)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    let cancelled = false

    const load = () => {
      void import('../../data/notifications').then((mod) => {
        if (cancelled) return
        setItems(mod.notifications)
        setUnreadCount(mod.notifications.filter((item) => item.unread).length)
      })
    }

    // Keep notifications out of the critical shell graph; load on idle after paint.
    const requestIdle =
      typeof window !== 'undefined' && 'requestIdleCallback' in window
        ? window.requestIdleCallback.bind(window)
        : null

    if (requestIdle) {
      const id = requestIdle(load, { timeout: 2500 })
      return () => {
        cancelled = true
        window.cancelIdleCallback(id)
      }
    }

    const timer = globalThis.setTimeout(load, 1)
    return () => {
      cancelled = true
      globalThis.clearTimeout(timer)
    }
  }, [])

  function handleOpen() {
    setOpen(true)
    if (!items) {
      void import('../../data/notifications').then((mod) => {
        setItems(mod.notifications)
        setUnreadCount(mod.notifications.filter((item) => item.unread).length)
      })
    }
  }

  return (
    <>
      <Button
        variant="muted"
        size="icon"
        onClick={handleOpen}
        aria-label={t('notifications.open')}
        title={t('notifications.open')}
        className={cn(
          'relative transition-all duration-300 ease-out',
          compact
            ? 'p-[calc(0.5rem*var(--shell-scale))]'
            : 'p-[calc(0.75rem*var(--shell-scale))]',
        )}
      >
        <Bell
          className={cn(
            'shrink-0 transition-all duration-300 ease-out',
            compact
              ? 'h-[calc(1.25rem*var(--shell-scale))] w-[calc(1.25rem*var(--shell-scale))]'
              : 'h-[calc(1.5rem*var(--shell-scale))] w-[calc(1.5rem*var(--shell-scale))]',
          )}
        />
        {unreadCount > 0 ? (
          <span className="absolute top-[calc(0.375rem*var(--shell-scale))] right-[calc(0.375rem*var(--shell-scale))] h-[calc(0.625rem*var(--shell-scale))] w-[calc(0.625rem*var(--shell-scale))] rounded-full bg-danger" />
        ) : null}
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={t('notifications.title')}
      >
        {!items ? (
          <p className="text-sm text-foreground-muted">{t('common.loading')}</p>
        ) : (
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item.id}
                className={cn(
                  'rounded-control border border-border p-4',
                  item.unread && 'bg-surface-muted',
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-lg font-semibold tracking-tight">{t(item.titleKey)}</p>
                  {item.unread ? (
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-danger" aria-hidden />
                  ) : null}
                </div>
                <p className="mt-2 text-base text-foreground-muted">{t(item.bodyKey)}</p>
                <p className="mt-3 text-sm text-foreground-muted">{t(item.timeKey)}</p>
              </li>
            ))}
          </ul>
        )}
      </Modal>
    </>
  )
}
