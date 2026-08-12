import { useEffect, useId, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronDown, X } from 'lucide-react'
import { navItems, type NavItem } from '../../config/navigation'
import { prefetchRoute } from '../../lib/prefetchRoute'
import { cn } from '../../lib/utils'
import { Button, Icon } from '../ui'

type MobileNavDrawerProps = {
  open: boolean
  onClose: () => void
}

function getActiveNavTo(pathname: string) {
  if (pathname === '/') return '/'

  const match = navItems
    .filter((item) => item.to !== '/' && pathname.startsWith(item.to))
    .sort((a, b) => b.to.length - a.to.length)[0]

  return match?.to ?? null
}

function isChildActive(pathname: string, childTo: string) {
  return pathname === childTo || pathname.startsWith(`${childTo}/`)
}

type MobileNavGroupProps = {
  item: NavItem
  pathname: string
  drawerOpen: boolean
  expanded: boolean
  onToggle: () => void
  onNavigate: () => void
}

function MobileNavGroup({
  item,
  pathname,
  drawerOpen,
  expanded,
  onToggle,
  onNavigate,
}: MobileNavGroupProps) {
  const { t } = useTranslation()
  const label = t(item.labelKey)
  const children = item.children
  const hasChildren = Boolean(children?.length)
  const activeTo = getActiveNavTo(pathname)
  const isCurrent = item.to === activeTo

  return (
    <div className="relative">
      <div className="flex items-center gap-1">
        <NavLink
          to={item.to}
          end={item.to === '/'}
          onClick={onNavigate}
          onFocus={() => prefetchRoute(item.to)}
          tabIndex={drawerOpen ? 0 : -1}
          className={cn(
            'flex min-w-0 flex-1 cursor-pointer items-center gap-3 rounded-control px-3 py-3 text-base whitespace-nowrap transition-colors',
            isCurrent
              ? 'bg-foreground/10 font-bold text-foreground'
              : 'font-medium text-foreground-muted hover:bg-foreground/5 hover:text-foreground',
          )}
        >
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center">
            <Icon icon={item.icon} size="md" aria-hidden />
          </span>
          <span className="truncate">{label}</span>
        </NavLink>

        {hasChildren ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0 p-2"
            aria-expanded={expanded}
            aria-label={
              expanded
                ? t('sidebar.collapseSubnav', { section: label })
                : t('sidebar.expandSubnav', { section: label })
            }
            tabIndex={drawerOpen ? 0 : -1}
            onClick={onToggle}
          >
            <ChevronDown
              className={cn(
                'h-5 w-5 transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                expanded && 'rotate-180',
              )}
              aria-hidden
            />
          </Button>
        ) : null}
      </div>

      {hasChildren ? (
        <div
          className={cn(
            'grid transition-[grid-template-rows] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
            expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
          aria-hidden={!expanded}
        >
          <div className="min-h-0 overflow-hidden">
            <ul
              className={cn(
                'flex flex-col gap-0.5 py-1 pl-5 pr-1 transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                expanded
                  ? 'translate-y-0 opacity-100'
                  : 'pointer-events-none -translate-y-1 opacity-0',
              )}
            >
              {children!.map((child) => {
                const childLabel = t(child.labelKey)
                const childCurrent = isChildActive(pathname, child.to)

                return (
                  <li key={child.to}>
                    <NavLink
                      to={child.to}
                      onClick={onNavigate}
                      onFocus={() => prefetchRoute(child.to)}
                      tabIndex={drawerOpen && expanded ? 0 : -1}
                      className={cn(
                        'block truncate rounded-control px-3 py-2.5 text-sm transition-colors',
                        childCurrent
                          ? 'bg-foreground/10 font-semibold text-foreground'
                          : 'font-medium text-foreground-muted hover:bg-foreground/5 hover:text-foreground',
                      )}
                    >
                      {childLabel}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default function MobileNavDrawer({ open, onClose }: MobileNavDrawerProps) {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const [expandedTo, setExpandedTo] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return

    const active = getActiveNavTo(pathname)
    const activeItem = navItems.find((item) => item.to === active)
    setExpandedTo(activeItem?.children?.length ? active : null)
  }, [open, pathname])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    panelRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  return (
    <div
      className={cn(
        'fixed inset-0 z-110 md:hidden',
        open ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        className={cn(
          'absolute inset-0 bg-foreground/40 transition-opacity duration-300 ease-out',
          open ? 'opacity-100' : 'opacity-0',
        )}
        aria-label={t('common.close')}
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal={open}
        aria-labelledby={titleId}
        tabIndex={-1}
        inert={open ? undefined : true}
        className={cn(
          'relative z-10 flex h-full w-full max-w-80 flex-col border-r border-border bg-surface shadow-card outline-none transition-transform duration-300 ease-out will-change-transform',
          'pt-[env(safe-area-inset-top)] pl-[env(safe-area-inset-left)] pb-[env(safe-area-inset-bottom)]',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 id={titleId} className="text-lg font-semibold tracking-tight">
            {t('brand.header')}
          </h2>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="p-2"
            onClick={onClose}
            aria-label={t('common.close')}
            tabIndex={open ? 0 : -1}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav
          className="flex flex-1 flex-col gap-1 overflow-y-auto p-3"
          aria-label={t('common.mainNav')}
        >
          {navItems.map((item) => (
            <MobileNavGroup
              key={item.to}
              item={item}
              pathname={pathname}
              drawerOpen={open}
              expanded={expandedTo === item.to}
              onToggle={() => {
                setExpandedTo((current) => (current === item.to ? null : item.to))
              }}
              onNavigate={onClose}
            />
          ))}
        </nav>
      </div>
    </div>
  )
}
