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

export function extractNumbers(input: string) {
  return Number(input.match(/\d+/g)?.join('') || '')
}

export const transUnitOfAmount = (amount: number) => {
  if (amount < 10000) {
    return `${amount.toLocaleString()} 원`
  } else if (amount < 100000000) {
    const value = (amount / 10000).toFixed(1)
    return `${value.endsWith('.0') ? value.slice(0, -2) : value} 만원`
  } else if (amount < 10000000000) {
    const value = (amount / 100000000).toFixed(1)
    return `${value.endsWith('.0') ? value.slice(0, -2) : value} 억원`
  } else {
    const value = (amount / 1000000000).toFixed(1)
    return `${value.endsWith('.0') ? value.slice(0, -2) : value} 천억원`
  }
}

//#region 월별 통계 내역
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
 * 차트에 금액 표시
 *
 * @description 해당 금액이 있는 경우에만 숫자를 회계금액으로 변경합니다.
 * @description 금액이 0원인 경우 표시되지 않습니다.
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

//#region 년도별 통계 내역
/**
 * 년도별 총 급액
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
//#endregion

//#region 카테고리별 통계 내역
interface CategoryProps {
  [key: string]: number
}

export interface TypeProps {
  income: CategoryProps
  expense: CategoryProps
}

export interface MonthProps {
  [month: number]: TypeProps
}

export interface MonthDataProps {
  [year: number]: MonthProps
}

interface YearDataProps {
  [year: number]: TypeProps
}

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
//#endregion

//#region Summary 데이터 통계 내역
interface MonthlyMaxExpenseProps {
  [key: number]: number
}

interface CategoryExpenseProps {
  [key: string]: number
}

/**
 * 카테고리별 및 월별 최대 지출 금액
 */
const calculateExpenses = (filteredData: LedgerProps[]) => {
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
const getTotal = (
  data: LedgerProps[] | null,
  year: number,
  key: 'income' | 'expense'
) => {
  return getYearlyTrend(data)
    .find(data => data.year === year)
    ?.[key]?.toLocaleString()
}

/**
 * 지출 내역 중 최대 및 최소 금액에 해당하는 내역
 */
const findMinMax = (isMax: boolean, filteredData?: LedgerProps[]) => {
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
//#endregion
