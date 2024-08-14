import { LedgerProps } from '@/interface/LedgerProps'
import { parseAmount } from '@/utils/getLedgerUtils'
import { YearDataProps, MonthDataProps } from '@/interface/DashBoardProps'

/**
 * 가계부 데이터를 연별/월별 데이터에 맞게 필터링
 */
const filteredCategoryData = (
  ledgerData: LedgerProps[] | null,
  year: number,
  month?: number
) => {
  return ledgerData?.filter(item => {
    const yearCond = year === item.created_at_year
    const monthCond =
      month !== undefined ? month === item.created_at_month : true
    return yearCond && monthCond
  })
}

export const filteredMaxMonth = (
  ledgerData: LedgerProps[] | null,
  year: number
) => {
  const filteredMonth = filteredCategoryData(ledgerData, year)?.map(
    item => item.created_at_month
  )
  if (filteredMonth) return Math.max.apply(null, filteredMonth)
  else return null
}

/**
 * 카테고리별 연별 통계 내역
 *
 * @description 특정 연도의 카테고리별 합계 내역을 계산합니다.
 */
export const getYearlyCategoryTrend = (
  ledgerData: LedgerProps[] | null,
  year: number
) => {
  if (!ledgerData) return null

  const filteredData = filteredCategoryData(ledgerData, year)

  const data = filteredData?.reduce((acc, entry) => {
    const yearKey = entry.created_at_year
    const type = entry.type
    const category = entry.category
    const amount = entry.amount

    if (!acc[yearKey]) {
      acc[yearKey] = { income: {}, expense: {} }
    }

    if (type === '수입') {
      if (!acc[yearKey].income[category]) {
        acc[yearKey].income[category] = 0
      }
      acc[yearKey].income[category] += parseAmount(amount)
    } else {
      if (!acc[yearKey].expense[category]) {
        acc[yearKey].expense[category] = 0
      }
      acc[yearKey].expense[category] += parseAmount(amount)
    }
    return acc
  }, {} as YearDataProps)
  return data
}

/**
 * 카테고리별 월별 통계 내역
 *
 * @description 선택적으로 특정 월의 카테고리별 합계 내역을 계산합니다.
 */
export const getMonthlyCategoryTrend = (
  ledgerData: LedgerProps[] | null,
  year: number,
  month: number
) => {
  if (!ledgerData) return null
  const filteredData = filteredCategoryData(ledgerData, year, month)

  const data = filteredData?.reduce((acc, entry) => {
    const yearKey = entry.created_at_year
    const monthKey = entry.created_at_month
    const type = entry.type
    const category = entry.category
    const amount = entry.amount

    if (!acc[yearKey]) {
      acc[yearKey] = {}
    }
    if (!acc[yearKey][monthKey]) {
      acc[yearKey][monthKey] = { income: {}, expense: {} }
    }

    if (type === '수입') {
      if (!acc[yearKey][monthKey].income[category]) {
        acc[yearKey][monthKey].income[category] = 0
      }
      acc[yearKey][monthKey].income[category] += parseAmount(amount)
    } else {
      if (!acc[yearKey][monthKey].expense[category]) {
        acc[yearKey][monthKey].expense[category] = 0
      }
      acc[yearKey][monthKey].expense[category] += parseAmount(amount)
    }
    return acc
  }, {} as MonthDataProps)
  return data
}
