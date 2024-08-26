import { supabase } from '@/supabaseconfig'
import { LedgerDataProps, LedgerInputProps } from '@/interface/LedgerProps'

/**
 * 선택한 날짜에 해당하는 가계부 데이터 조회
 *
 * @param selectDate - 현재 선택한 날짜
 * @returns data - 선택한 날짜의 가계부 내역 데이터 객체 배열 반환
 */
const selectAmountList = async (selectedDate: Date) => {
  try {
    if (!selectedDate) return null
    const { data, error } = await supabase
      .from('ledger')
      .select('*')
      .eq('created_at_year', selectedDate?.getFullYear())
      .eq('created_at_month', selectedDate?.getMonth() + 1)
      .eq('created_at_day', selectedDate?.getDate())
      .returns<LedgerDataProps[] | null>()

    if (error) throw new Error(error.message)
    return data ? data : null
  } catch (error) {
    console.error(error)
    return null
  }
}

/**
 * 새 가계부 내역 추가
 */
const insertLedger = async (inputData: LedgerInputProps) => {
  try {
    const { error } = await supabase.from('ledger').insert(inputData)

    if (error) throw new Error(error.message)
  } catch (error) {
    console.error(error)
  }
}

/**
 * 수정할 가계부 내역 데이터 조회
 *
 * @param id - 수정할 가계부 데이터 행의 id
 * @returns data - 수정할 날짜의 가계부 내역 데이터 객체
 */
const selectLedgerItemData = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('ledger')
      .select('*')
      .eq('id', id)
      .returns<LedgerDataProps[] | null>()

    if (error) throw new Error(error.message)
    return data ? data[0] : null
  } catch (error) {
    console.error(error)
    return null
  }
}

/**
 * 기존 가계부 내역 수정
 *
 * @param inputData created_at 만 수정
 *
 * @description id 와 일치하는 데이터 수정
 */
const updateLedger = async (inputData: LedgerInputProps, id?: string) => {
  try {
    const { data, error } = await supabase
      .from('ledger')
      .update(inputData)
      .eq('id', id)
      .select()
      .returns<LedgerDataProps[] | null>()

    if (error) throw new Error(error.message)
    return data
  } catch (error) {
    console.error(error)
  }
}

/**
 * 계부 내역 삭제
 *
 * @description id 와 일치하는 데이터 삭제
 */
const deleteLedger = async (id: string) => {
  try {
    const { error } = await supabase.from('ledger').delete().eq('id', id)

    if (error) throw new Error(error.message)
  } catch (error) {
    console.error(error)
  }
}

export {
  selectAmountList,
  insertLedger,
  selectLedgerItemData,
  updateLedger,
  deleteLedger
}
