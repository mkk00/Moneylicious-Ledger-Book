import { create } from 'zustand'
import { CATEGORY_LIST } from '@/data/categoryList'
import { MENAS_LIST } from '@/data/meansList'
import { CategoryProps, MeansProps } from '@/interface/LedgerProps'

interface LedgerProps {
  category: CategoryProps
  setCategory: (category: CategoryProps) => void
  means: MeansProps
  setMeans: (means: MeansProps) => void
}

const useSelectLedgerStore = create<LedgerProps>(set => ({
  category: CATEGORY_LIST[0],
  setCategory: category => set({ category: category }),

  means: MENAS_LIST[0],
  setMeans: means => set({ means: means })
}))

export default useSelectLedgerStore
