import { FormValues } from '@/hook/useFormControl'

export interface LedgerProps {
  id: string
  user_id: string
  title: string
  amount: string
  category: string
  means: string
  memo: string
  type: string
  created_at: string
  created_at_year: number
  created_at_month: number
  created_at_day: number
}
export interface CategoryProps {
  id: number
  category: string
  icon: JSX.Element
}

export interface MeansProps {
  id: number
  means: string
  icon: JSX.Element
}

export interface LedgerDataProps extends FormValues {
  id: string
}

export interface LedgerFullDateProps extends LedgerDataProps {
  created_at_year: number
  created_at_month: number
  created_at_day: number
}

export interface TypeAmountProps {
  type: string
  amount: string
  created_at_month: number
  created_at_day: number
}

export interface SummaryProps {
  expense: number
  income: number
}

export interface DailySummaryProps extends SummaryProps {
  month: number
  date: number
}
