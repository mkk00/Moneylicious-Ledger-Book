import { supabase } from '@/supabaseconfig'
import { LedgerDataProps, LedgerInputProps } from '@/interface/LedgerProps'

/** 기존 가계부 내역 수정
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

/** 새 가계부 내역 추가
 */
const insertLedger = async (inputData: LedgerInputProps) => {
  try {
    const { error } = await supabase.from('ledger').insert(inputData)

    if (error) throw new Error(error.message)
  } catch (error) {
    console.error(error)
  }
}

/** 계부 내역 삭제
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

export { updateLedger, insertLedger, deleteLedger }
