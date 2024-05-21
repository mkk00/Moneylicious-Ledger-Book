import { create } from 'zustand'

interface DateProps {
  currentDate: Date
  setCurrentDate: (date: Date) => void
  selectedDate: Date | null
  setSelectedDate: (date: Date | null) => void
  formatSelectedDate: (date: Date) => string | null
}

const useDateStore = create<DateProps>(set => ({
  // 캘린더에서 보여질 날짜
  currentDate: new Date(),
  setCurrentDate: date => {
    const currentDate = new Date()
    currentDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate())
    set({ currentDate: currentDate })
  },

  // 날짜 선택
  selectedDate: null,
  setSelectedDate: date => {
    const currentDate = new Date()
    if (date) {
      currentDate.setFullYear(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      )
      set({ selectedDate: currentDate })
    } else {
      set({ selectedDate: null })
    }
  },
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
