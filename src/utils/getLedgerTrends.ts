import { LedgerProps } from '@/interface/LedgerProps'
import { AmountDataProps } from '@/interface/DashBoardProps'
import { parseAmount } from '@/utils/getLedgerUtils'

/**
 * 월별 총 금액
 *
 * @description 가계부 데이터에서 월별 수입지출 총 금액을 배열로 저장합니다.
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

/**
 * 년도별 총 금액
 *
 * @description 가계부 데이터에서 년도별 수입지출 총 금액을 배열로 저장합니다.
 */
export const getYearlyTrend = (ledgerData: LedgerProps[] | null) => {
  const initialData: Record<number, AmountDataProps> = {}

  const yearlyData = ledgerData?.reduce((acc, entry) => {
    const yearKey = entry.created_at_year

    if (!acc[yearKey]) {
      acc[yearKey] = { income: 0, expense: 0 }
    }

    if (entry.type === '수입') {
      acc[yearKey].income += parseAmount(entry.amount)
    } else {
      acc[yearKey].expense += parseAmount(entry.amount)
    }
    return acc
  }, initialData)

  return Object.keys(yearlyData || {})
    .map(yearStr => {
      const year = parseInt(yearStr, 10)
      const data = yearlyData ? yearlyData[year] : { income: 0, expense: 0 }
      return {
        year,
        diff: data.income - data.expense,
        ...data
      }
    })
    .sort((a, b) => a.year - b.year)
}
