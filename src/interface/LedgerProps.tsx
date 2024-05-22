import { FormValues } from '@/hook/useFormControl'

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

export interface TypeAmountProps {
  type: string
  amount: string
}

export interface SummaryProps {
  expense: number
  income: number
}
