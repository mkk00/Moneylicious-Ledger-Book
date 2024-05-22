import { TypeAmountProps, SummaryProps } from '@/interface/LedgerProps'
import { supabase } from '@/supabaseconfig'

export const getTotalAmount = async (year: number, month: number) => {
  try {
    const { data, error } = await supabase
      .from('amountbook')
      .select('type, amount')
      .eq('created_at_year', year)
      .eq('created_at_month', month + 1)
      .returns<TypeAmountProps[] | null>()

    error && alert(error?.message)
    if (data) return data
    return null
  } catch (error) {
    console.error(error)
    return null
  }
}

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
