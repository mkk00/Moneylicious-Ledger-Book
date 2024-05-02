import { CATEGORY_LIST } from '@/data/categoryList'
import { MENAS_LIST } from '@/data/meansList'

export const ledgerFormInitialValues = {
  type: '',
  description: '',
  amount: '',
  category: CATEGORY_LIST[0].category,
  method: MENAS_LIST[0].means,
  memo: ''
}
