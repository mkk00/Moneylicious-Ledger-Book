import { LedgerProps } from '@/interface/LedgerProps'
import {
  calculateExpenses,
  getTotal,
  findMinMax,
  getTotalToCurrentMonth
} from '@/utils/calculationLedgerAmount'
/**
 * 가계부 요약 데이터
 *
 * @description totalExpense: 현재까지의 지출 금액 총합
 * @description totalIncome: 현재까지의 수입 금액 총합
 * @description maxExpenseData: 가장 큰 지출 항목과 금액 찾기
 * @description minExpenseData: 가장 적은 지출 항목과 금액 찾기
 * @description maxExpenseMonthData: 가장 많이 지출한 월
 * @description maxCategoryData: 가장 많이 지출한 카테고리
 * @description minCategoryData: 가장 적게 지출한 카테고리
 */
export const useTransformData = (data: LedgerProps[] | null) => {
  const currentYear = new Date().getFullYear()
  const filteredData = data?.filter(data => data.type === '지출')

  const { monthly, category } = filteredData
    ? calculateExpenses(filteredData)
    : { monthly: {}, category: {} }

  return {
    totalExpense: getTotal(data, currentYear, 'expense'),
    totalIncome: getTotal(data, currentYear, 'income'),
    totalToMonthExpense: getTotalToCurrentMonth(data, 'expense'),
    totalToMonthIncome: getTotalToCurrentMonth(data, 'income'),
    maxExpenseData: data ? findMinMax(true, filteredData) : undefined,
    minExpenseData: data ? findMinMax(false, filteredData) : undefined,
    maxExpenseMonthData: Object.entries(monthly).reduce(
      (max, [key, value]) => (value > max.value ? { key, value } : max),
      { key: '', value: 0 }
    ),
    maxCategoryData: Object.entries(category).reduce(
      (max, [key, value]) => (value > max.value ? { key, value } : max),
      { key: '', value: 0 }
    ),
    minCategoryData: Object.entries(category).reduce(
      (min, [key, value]) => (value < min.value ? { key, value } : min),
      { key: '', value: Infinity }
    )
  }
}
