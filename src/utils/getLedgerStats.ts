import { LedgerProps } from '@/interface/LedgerProps'

export interface AmountDataProps {
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

//#region 월별 통계 내역
/** 월별 총 금액
 *  @description 가계부 데이터에서 월별 수입지출
 *  @description 총 금액의 누적 금액을 배열로 저장합니다.
 */
export const getMonthlyTrend = (
  ledgerData: LedgerProps[] | null,
  year: number
) => {
  const initialData: AmountDataProps[] = []

  for (let month = 0; month < 12; month++) {
    initialData[month] = { income: 0, expense: 0 }
  }

  return (
    ledgerData?.reduce((acc, entry) => {
      if (entry.created_at_year !== year) return acc
      const monthKey = entry.created_at_month - 1

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

/** 월별 최대 금액
 *  @description 월별 수입지출 총 금액 배열 데이터에서
 *  @description 수입지출 금액을 분리해서 별도의 배열로 저장합니다.
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

/** 월별 최대 금액 비율
 *  @description 해당 월이 월별 최대 금액의 몇 퍼센트에 해당되는지
 *  @description 비율로 표시하고 '%' 를 붙여 리턴합니다.
 */

export const getMaxAmountRatio = (
  amoutType: keyof AmountDataProps,
  monthlyData: AmountDataProps,
  maxAmount: AmountDataProps
) => {
  return `${(monthlyData[amoutType] / maxAmount[amoutType]) * 100}%`
}

/** 차트에 금액 표시
 *  @description 해당 금액이 있는 경우에만 숫자를 회계금액으로 변경합니다.
 *  @description 금액이 0원인 경우 표시되지 않습니다.
 */
export const displayAmount = (item: AmountDataProps, type: string) => {
  if (type === 'expense' && item.expense !== 0) {
    return item.expense.toLocaleString()
  }
  if (type === 'income' && item.income !== 0) {
    return item.income.toLocaleString()
  }
  return null
}
//#endregion
