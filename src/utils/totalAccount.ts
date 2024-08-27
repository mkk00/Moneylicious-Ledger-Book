import {
  TypeAmountProps,
  DailySummaryProps,
  SummaryProps
} from '@/interface/LedgerProps'

/**
 * 조회한 가계부 내역 데이터 배열에서 `월별` 수입/지출의 총 합계를 구하는 함수
 *
 * @param data - 사용자의 해당 월(selectMonth)의 가계부 데이터
 * @returns 수입/지출의 총 합계를 포함한 객체(0원인 경우에도 포함)
 *
 * @description 이 함수는 `getTotalAmount` 함수에서 반환된 데이터를 사용합니다.
 * @see getTotalAmount
 */
export const calculateSummary = (data: TypeAmountProps[] | null) => {
  if (!data) return null

  const result = data.reduce(
    (acc: SummaryProps, item: TypeAmountProps) => {
      const amount = parseInt(item.amount.replace(/[^0-9]/g, ''))
      const validAmount = isNaN(amount) ? 0 : amount

      if (item.type === '지출' && typeof acc.expense === 'number') {
        acc.expense += validAmount
      } else if (item.type === '수입' && typeof acc.income === 'number') {
        acc.income += validAmount
      }

      return acc
    },
    { expense: 0, income: 0 }
  )

  const formattedResult = {
    expense: result.expense.toLocaleString(),
    income: result.income.toLocaleString()
  }

  return formattedResult
}

/**
 * 조회한 가계부 내역 데이터 배열에서 `일별` 수입/지출의 총 합계를 구하는 함수
 *
 * @param data - 사용자의 해당 월(selectMonth)의 가계부 데이터
 * @returns
 *
 * @description 이 함수는 `getTotalAmount` 함수에서 반환된 데이터를 사용합니다.
 * @see getTotalAmount
 */
export const calculateDailySummary = (data: TypeAmountProps[] | null) => {
  if (!data) return null

  const dailySummaryMap: DailySummaryProps[] = []

  data.forEach(item => {
    const amount = parseInt(item.amount.replace(/[^0-9]/g, ''))
    const month = item.created_at_month
    const date = item.created_at_day

    let existingItem = dailySummaryMap.find(
      summary => summary.date === date && summary.month === month
    )

    if (!existingItem) {
      existingItem = {
        month: month,
        date: date,
        expense: 0,
        income: 0
      }
      dailySummaryMap.push(existingItem)
    }

    if (item.type === '지출') {
      existingItem.expense += amount
    } else if (item.type === '수입') {
      existingItem.income += amount
    }
  })

  const dailySummary: DailySummaryProps[] = Object.values(dailySummaryMap)

  return dailySummary
}
