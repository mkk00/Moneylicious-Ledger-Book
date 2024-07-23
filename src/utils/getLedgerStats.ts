import { LedgerProps } from '@/interface/LedgerProps'

export interface MonthlyDataProps {
  income: number
  expense: number
}

export const parseAmount = (amount: string): number => {
  return parseInt(amount.replace(/,/g, ''), 10)
}

export const getUniqueYears = (data: LedgerProps[] | null) => {
  const years = data?.map(entry => entry.created_at_year)
  return Array.from(new Set(years))
}

export const displayAmount = (item: MonthlyDataProps, type: string) => {
  if (type === 'expense' && item.expense !== 0) {
    return item.expense.toLocaleString()
  }
  if (type === 'income' && item.income !== 0) {
    return item.income.toLocaleString()
  }
  return null
}

// 월별 총 수입/지출 금액
export const getMonthlyTrend = (
  ledgerData: LedgerProps[] | null,
  year: number
) => {
  const initialData: MonthlyDataProps[] = []

  for (let month = 0; month < 12; month++) {
    initialData[month] = { income: 0, expense: 0 }
  }

  return (
    ledgerData?.reduce((acc, entry) => {
      if (entry.created_at_year !== year) return acc
      const monthKey = entry.created_at_month

      if (!acc[monthKey]) {
        acc[monthKey] = { income: 0, expense: 0 }
      }

      if (entry.type === '수입') {
        acc[monthKey].income += parseAmount(entry.amount)
      } else {
        acc[monthKey].expense += parseAmount(entry.amount)
      }
      return acc
    }, initialData) || initialData
  )
}

export const findMaxAmount = (
  monthlyData: MonthlyDataProps[]
): MonthlyDataProps => {
  const incomes = Object.values(monthlyData).map(data => data.income)
  const expenses = Object.values(monthlyData).map(data => data.expense)

  const maxIncome = Math.max(...incomes)
  const maxExpense = Math.max(...expenses)

  return { income: maxIncome, expense: maxExpense }
}

export const getMaxAmountRatio = (
  amoutType: keyof MonthlyDataProps,
  monthlyData: MonthlyDataProps,
  maxAmount: MonthlyDataProps
) => {
  return `${(monthlyData[amoutType] / maxAmount[amoutType]) * 100}%`
}
