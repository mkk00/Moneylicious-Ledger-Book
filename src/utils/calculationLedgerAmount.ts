import { LedgerProps } from '@/interface/LedgerProps'
import {
  AmountDataProps,
  MonthlyMaxExpenseProps,
  CategoryExpenseProps
} from '@/interface/DashBoardProps'
import { getYearlyTrend } from './getLedgerTrends'

/**
 * 월별 최대 금액
 *
 * @description 월별 수입지출 총 금액 배열 데이터에서
 * @description 수입지출 금액을 분리해서 별도의 배열로 저장합니다.
 */
export const findMaxAmount = (
  monthlyData: AmountDataProps[]
): AmountDataProps => {
  const incomes = Object.values(monthlyData).map(data => data.income)
  const expenses = Object.values(monthlyData).map(data => data.expense)

  const maxIncome = Math.max(...incomes)
  const maxExpense = Math.max(...expenses)

  return { income: maxIncome, expense: maxExpense }
}

/**
 * 월별 최대 금액 비율
 *
 * @description 해당 월이 월별 최대 금액의 몇 퍼센트에 해당되는지
 * @description 비율로 표시하고 '%' 를 붙여 리턴합니다.
 */

export const getMaxAmountRatio = (
  amoutType: keyof AmountDataProps,
  monthlyData: AmountDataProps,
  maxAmount: AmountDataProps
) => {
  return `${(monthlyData[amoutType] / maxAmount[amoutType]) * 100}%`
}

/**
 * 카테고리별 및 월별 최대 지출 금액
 */
export const calculateExpenses = (filteredData: LedgerProps[]) => {
  return filteredData?.reduce(
    (acc, item) => {
      const month = item.created_at_month
      const amount = Number(item.amount.replace(/,/g, ''))

      acc.monthly[month] = (acc.monthly[month] || 0) + amount
      acc.category[item.category] = (acc.category[item.category] || 0) + amount

      return acc
    },
    {
      monthly: {} as MonthlyMaxExpenseProps,
      category: {} as CategoryExpenseProps
    }
  )
}

/**
 * 현재 년도의 지출, 수입 금액의 합계
 */
export const getTotal = (
  data: LedgerProps[] | null,
  year: number,
  key: 'income' | 'expense'
) => {
  return getYearlyTrend(data).find(data => data.year === year)?.[key]
}

/**
 * 지출 내역 중 최대 및 최소 금액에 해당하는 내역
 */
export const findMinMax = (isMax: boolean, filteredData?: LedgerProps[]) => {
  return filteredData?.reduce((acc, obj) => {
    const amount = Number(obj.amount.replace(/,/g, ''))
    return isMax
      ? amount > Number(acc.amount.replace(/,/g, ''))
        ? obj
        : acc
      : amount < Number(acc.amount.replace(/,/g, ''))
        ? obj
        : acc
  })
}
