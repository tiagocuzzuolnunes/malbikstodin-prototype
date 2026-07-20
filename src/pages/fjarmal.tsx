import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import SectionPage from '../components/SectionPage'
import { Button, Card, Input, Label, inputVariants } from '../components/ui'
import { cn } from '../lib/utils'
import {
  expenseCategories,
  initialExpenses,
  nextExpenseSerial,
  type Expense,
  type ExpenseCategory,
} from '../data/expenses'

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${value}T12:00:00`))
}

function formatIsk(amount: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'ISK',
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function FjarmalPage() {
  const { t, i18n } = useTranslation()
  const locale = i18n.resolvedLanguage ?? i18n.language
  const currentUserName = t('home.userName')

  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<ExpenseCategory>('materials')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [submittedNotice, setSubmittedNotice] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedDescription = description.trim()
    const parsedAmount = Number(amount.replace(/\s/g, ''))
    if (!trimmedDescription || !Number.isFinite(parsedAmount) || parsedAmount <= 0) return

    const nextExpense: Expense = {
      id: `ex-${Date.now()}`,
      serial: nextExpenseSerial(expenses),
      description: trimmedDescription,
      category,
      amountIsk: Math.round(parsedAmount),
      date,
      submittedBy: currentUserName,
    }

    setExpenses((current) => [nextExpense, ...current])
    setDescription('')
    setCategory('materials')
    setAmount('')
    setDate(new Date().toISOString().slice(0, 10))
    setSubmittedNotice(true)
  }

  return (
    <div className="space-y-8">
      <SectionPage titleKey="nav.fjarmal" descriptionKey="pages.fjarmal.description" />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
        <Card elevated padding="lg" className="min-h-0 xl:max-w-80">
          <h2 className="text-xl font-semibold tracking-tight">
            {t('finance.formTitle')}
          </h2>
          <p className="mt-1 text-sm text-foreground-muted">{t('finance.formSubtitle')}</p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="expense-description">{t('finance.fields.description')}</Label>
              <Input
                id="expense-description"
                value={description}
                onChange={(event) => {
                  setSubmittedNotice(false)
                  setDescription(event.target.value)
                }}
                placeholder={t('finance.fields.descriptionPlaceholder')}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expense-category">{t('finance.fields.category')}</Label>
              <select
                id="expense-category"
                value={category}
                onChange={(event) => setCategory(event.target.value as ExpenseCategory)}
                className={cn(inputVariants({ size: 'md' }), 'cursor-pointer')}
              >
                {expenseCategories.map((value) => (
                  <option key={value} value={value}>
                    {t(`finance.categories.${value}`)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expense-amount">{t('finance.fields.amount')}</Label>
              <Input
                id="expense-amount"
                type="number"
                min="1"
                step="1"
                inputMode="numeric"
                value={amount}
                onChange={(event) => {
                  setSubmittedNotice(false)
                  setAmount(event.target.value)
                }}
                placeholder={t('finance.fields.amountPlaceholder')}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expense-date">{t('finance.fields.date')}</Label>
              <Input
                id="expense-date"
                type="date"
                value={date}
                onChange={(event) => {
                  setSubmittedNotice(false)
                  setDate(event.target.value)
                }}
                required
              />
            </div>

            <p className="text-sm text-foreground-muted">
              {t('finance.fields.submittedBy', { name: currentUserName })}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button type="submit" variant="primary" size="lg" className="min-h-11 px-5">
                {t('finance.submit')}
              </Button>
              {submittedNotice ? (
                <p className="text-sm text-foreground-muted" role="status">
                  {t('finance.submitted')}
                </p>
              ) : null}
            </div>
          </form>
        </Card>

        <Card elevated padding="lg" className="min-h-0 min-w-0">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                {t('finance.tableTitle')}
              </h2>
              <p className="mt-1 text-sm text-foreground-muted">{t('finance.tableSubtitle')}</p>
            </div>
            <p className="text-sm text-foreground-muted">
              {t('finance.count', { count: expenses.length })}
            </p>
          </div>

          <div className="mt-6 min-w-0 overflow-hidden rounded-card border border-border">
            <div className="md:hidden">
              {expenses.map((expense) => (
                <article
                  key={expense.id}
                  className="space-y-2 border-b border-border px-4 py-4 last:border-b-0"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-mono text-xs tracking-wide text-foreground-muted">
                        {expense.serial}
                      </p>
                      <h3 className="mt-1 font-semibold tracking-tight break-words">
                        {expense.description}
                      </h3>
                    </div>
                    <p className="shrink-0 font-medium tabular-nums">
                      {formatIsk(expense.amountIsk, locale)}
                    </p>
                  </div>
                  <p className="text-sm text-foreground-muted">
                    {t(`finance.categories.${expense.category}`)} ·{' '}
                    {formatDate(expense.date, locale)}
                  </p>
                  <p className="text-sm text-foreground-muted">{expense.submittedBy}</p>
                </article>
              ))}
            </div>

            <div className="hidden min-w-0 md:block">
              <table className="w-full table-fixed border-collapse text-left text-sm">
                <colgroup>
                  <col className="w-[10%]" />
                  <col className="w-[28%]" />
                  <col className="w-[16%]" />
                  <col className="w-[16%]" />
                  <col className="w-[14%]" />
                  <col className="w-[16%]" />
                </colgroup>
                <thead>
                  <tr className="border-b border-border bg-surface-muted">
                    <th className="px-2 py-3 font-medium text-foreground-muted">
                      {t('finance.columns.serial')}
                    </th>
                    <th className="px-2 py-3 font-medium text-foreground-muted">
                      {t('finance.columns.description')}
                    </th>
                    <th className="px-2 py-3 font-medium text-foreground-muted">
                      {t('finance.columns.category')}
                    </th>
                    <th className="px-2 py-3 font-medium text-foreground-muted">
                      {t('finance.columns.amount')}
                    </th>
                    <th className="px-2 py-3 font-medium text-foreground-muted">
                      {t('finance.columns.date')}
                    </th>
                    <th className="px-2 py-3 font-medium text-foreground-muted">
                      {t('finance.columns.submittedBy')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense) => (
                    <tr
                      key={expense.id}
                      className="border-b border-border last:border-b-0 odd:bg-surface even:bg-surface-muted/40"
                    >
                      <td className="px-2 py-3 align-top font-mono text-xs tracking-wide text-foreground-muted">
                        {expense.serial}
                      </td>
                      <td className="px-2 py-3 align-top font-medium break-words whitespace-normal">
                        {expense.description}
                      </td>
                      <td className="px-2 py-3 align-top break-words whitespace-normal">
                        {t(`finance.categories.${expense.category}`)}
                      </td>
                      <td className="px-2 py-3 align-top tabular-nums break-words whitespace-normal">
                        {formatIsk(expense.amountIsk, locale)}
                      </td>
                      <td className="px-2 py-3 align-top break-words whitespace-normal">
                        {formatDate(expense.date, locale)}
                      </td>
                      <td className="px-2 py-3 align-top break-words whitespace-normal">
                        {expense.submittedBy}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
