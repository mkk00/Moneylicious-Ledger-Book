import { create } from 'zustand'

interface DateProps {
  currentDate: Date
  setCurruentDate: (date: Date) => void
  selectedDate: Date | null
  setSelectedDate: (date: Date | null) => void
  formatSelectedDate: (date: Date) => string | null
}

const useDateStore = create<DateProps>(set => ({
  // 캘린더에서 보여질 날짜
  currentDate: new Date(),
  setCurruentDate: date => set({ currentDate: date }),

  // 날짜 선택
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
