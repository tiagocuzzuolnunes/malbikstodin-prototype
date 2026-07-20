export const expenseCategories = [
  'materials',
  'fuel',
  'equipment',
  'payroll',
  'subcontractors',
  'other',
] as const

export type ExpenseCategory = (typeof expenseCategories)[number]

export type Expense = {
  id: string
  serial: string
  description: string
  category: ExpenseCategory
  amountIsk: number
  date: string
  submittedBy: string
}

export const initialExpenses: Expense[] = [
  {
    id: 'ex1',
    serial: 'EXP-01',
    description: 'Binder delivery for capital area',
    category: 'materials',
    amountIsk: 4_850_000,
    date: '2026-07-02',
    submittedBy: 'Ásta Ragnarsdóttir',
  },
  {
    id: 'ex2',
    serial: 'EXP-02',
    description: 'Diesel for airside fleet',
    category: 'fuel',
    amountIsk: 1_240_000,
    date: '2026-07-05',
    submittedBy: 'Björn Halldórsson',
  },
  {
    id: 'ex3',
    serial: 'EXP-03',
    description: 'Roller hydraulic service',
    category: 'equipment',
    amountIsk: 680_000,
    date: '2026-07-08',
    submittedBy: 'Ólafur Sigurðsson',
  },
  {
    id: 'ex4',
    serial: 'EXP-04',
    description: 'Season overtime pool',
    category: 'payroll',
    amountIsk: 3_100_000,
    date: '2026-07-10',
    submittedBy: 'Margrét Elíasdóttir',
  },
  {
    id: 'ex5',
    serial: 'EXP-05',
    description: 'Night paving crew subcontract',
    category: 'subcontractors',
    amountIsk: 7_500_000,
    date: '2026-07-12',
    submittedBy: 'Guðrún Pálsdóttir',
  },
  {
    id: 'ex6',
    serial: 'EXP-06',
    description: 'Office supplies and software',
    category: 'other',
    amountIsk: 210_000,
    date: '2026-07-14',
    submittedBy: 'Ásta Ragnarsdóttir',
  },
]

export function nextExpenseSerial(expenses: Expense[]) {
  const next = expenses.length + 1
  return `EXP-${String(next).padStart(2, '0')}`
}
