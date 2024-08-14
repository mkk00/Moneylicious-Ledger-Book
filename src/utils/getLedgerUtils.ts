import { LedgerProps } from '@/interface/LedgerProps'
import { AmountDataProps } from '@/interface/DashBoardProps'

/**
 * 문자열 형태의 금액을 정수로 변환
 */
export const parseAmount = (amount: string): number => {
  return parseInt(amount.replace(/,/g, ''), 10)
}

/**
 * 주어진 데이터에서 고유한 연도를 추출
 */
export const getUniqueYears = (data: LedgerProps[] | null) => {
  const years = data?.map(entry => entry.created_at_year)
  return Array.from(new Set(years))
}

/**
 * 문자열에서 숫자만 추출하여 반환
 */
export function extractNumbers(input: string) {
  return Number(input.match(/\d+/g)?.join('') || '')
}

/**
 * 금액을 단위에 맞게 변환하여 반환
 */
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

/**
 * 차트에 금액 표시
 *
 * @description 해당 금액이 있는 경우에만 숫자를 회계금액으로 변경
 * @description 금액이 0원인 경우 표시되지 않음
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
