import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SectionPage from '../../components/SectionPage'
import EmployeeCard from '../../components/EmployeeCard'
import { Button } from '../../components/ui'
import { cn } from '../../lib/utils'
import { departments, employees, type Department } from '../../data/employees'

type DepartmentFilter = 'all' | Department

export default function MannaudurStarfsfolkPage() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState<DepartmentFilter>('all')

  const filteredEmployees = useMemo(() => {
    if (filter === 'all') return employees
    return employees.filter((employee) => employee.department === filter)
  }, [filter])

  const filters: { id: DepartmentFilter; label: string }[] = [
    { id: 'all', label: t('hr.filters.all') },
    ...departments.map((department) => ({
      id: department,
      label: t(`hr.departments.${department}`),
    })),
  ]

  return (
    <div className="space-y-8">
      <SectionPage
        titleKey="nav.starfsfolk"
        descriptionKey="pages.mannaudur.employeesDescription"
      />

      <div className="flex flex-wrap gap-3" role="group" aria-label={t('hr.filters.label')}>
        {filters.map((item) => {
          const isActive = filter === item.id

          return (
            <Button
              key={item.id}
              type="button"
              size="lg"
              variant={isActive ? 'primary' : 'ghost'}
              aria-pressed={isActive}
              className={cn(
                'min-h-12 px-5 text-base',
                !isActive && 'text-foreground hover:bg-interactive-hover',
              )}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </Button>
          )
        })}
      </div>

      <p className="text-base text-foreground-muted">
        {t('hr.showing', { count: filteredEmployees.length })}
      </p>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filteredEmployees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  )
}
