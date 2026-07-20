import { useTranslation } from 'react-i18next'
import type { Employee } from '../data/employees'
import { Card } from './ui'

type EmployeeCardProps = {
  employee: Employee
}

function formatStartDate(value: string, locale: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export default function EmployeeCard({ employee }: EmployeeCardProps) {
  const { t, i18n } = useTranslation()
  const locale = i18n.resolvedLanguage ?? i18n.language

  return (
    <Card elevated padding="lg" className="flex min-h-56 flex-col justify-between">
      <div className="space-y-3">
        <p className="text-sm font-medium tracking-wide text-foreground-muted uppercase">
          {t(`hr.departments.${employee.department}`)}
        </p>
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold tracking-tight">{employee.name}</h3>
          <p className="text-lg text-foreground-muted">{employee.title}</p>
        </div>
      </div>

      <div className="mt-8 space-y-2 text-base text-foreground-muted">
        <p>
          <span>{t('hr.started')}: </span>
          <time className="text-foreground">{formatStartDate(employee.startedAt, locale)}</time>
        </p>
        <a className="block truncate hover:text-foreground" href={`mailto:${employee.email}`}>
          {employee.email}
        </a>
        <a className="block hover:text-foreground" href={`tel:${employee.phone}`}>
          {employee.phone}
        </a>
      </div>
    </Card>
  )
}
