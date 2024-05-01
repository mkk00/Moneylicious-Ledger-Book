import { create } from 'zustand'

interface DateProps {
  selectedDate: Date | null
  setSelectedDate: (date: Date | null) => void
  formatSelectedDate: (date: Date) => string | null
}

const useDateStore = create<DateProps>(set => ({
  selectedDate: null,
  setSelectedDate: date => set({ selectedDate: date }),
  formatSelectedDate: date => {
    if ({ date }.date) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}/${month}/${day}`
    } else return null
  }
}))

export default useDateStore
