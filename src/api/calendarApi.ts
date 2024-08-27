import { supabase } from '@/supabaseconfig'
import { TypeAmountProps } from '@/interface/LedgerProps'

/**
 * 특정 연도와 월에 해당하는 총 금액을 가져오는 함수
 *
 * @param year - 조회 연도(selectYear)
 * @param month - 조회 월(0부터 시작)
 * @returns 해당 연도, 월에 대한 데이터 배열, 존재하지 않는 경우 null 반환
 *
 * @description 해당 월의 총 수입/지출 금액의 합계나, 일별 총 수입/지출의 합계 금액을 구할 때 사용합니다.
 */
const getTotalAmount = async (year: number, month: number) => {
  try {
    const { data, error } = await supabase
      .from('ledger')
      .select('type, amount, created_at_month, created_at_day')
      .eq('created_at_year', year)
      .eq('created_at_month', month + 1)
      .returns<TypeAmountProps[] | null>()

    if (error) throw new Error(error?.message)
    return data ? data : null
  } catch (error) {
    console.error(error)
    return null
  }
}

export { getTotalAmount }
