import { HolidayProps } from '@/interface/HolidayProps'

/**
 * 해당 월의 시작 요일과 일 수를 반환
 */
export const getCalendarInfo = (year: number, month: number) => {
  const startDay = new Date(year, month - 1, 1).getDay()
  const totalDate = new Date(year, month, 0).getDate()
  return { startDay, totalDate }
}

/**
 * 오늘 날짜를 찾아 true 를 반환
 */
export const isToday = (
  currentYear: number,
  currentMonth: number,
  date: number
) => {
  const today = new Date()

  return (
    currentYear === today.getFullYear() &&
    currentMonth === today.getMonth() &&
    date === today.getDate()
  )
}

/**
 * 캘린더의 해당 월의 공휴일 목록에서 date를 추출해서 배열에 저장
 * 1. 공휴일이 배열인 경우 (if)
 * 2. 공휴일이 단일 개수일 경우 (else if)
 */
export const extractDayFromHoliday = (
  holiday: HolidayProps[] | HolidayProps | null
) => {
  if (Array.isArray(holiday)) {
    return holiday
      ?.filter(h => h.isHoliday === 'Y')
      .map(holidays => holidays.locdate % 100)
  } else if (holiday && holiday.isHoliday === 'Y') {
    return holiday.locdate % 100
  } else {
    return null
  }
}

/**
 * date 가 공휴일에 해당되는지 판단하는 함수
 */
export const findHoliday = (
  holiday: HolidayProps[] | HolidayProps | null,
  date: number
) => {
  const extractedDays = extractDayFromHoliday(holiday)

  if (Array.isArray(extractedDays)) {
    return extractedDays.includes(date)
  } else if (extractedDays) {
    return extractedDays === date
  } else {
    return false
  }
}

export const filterHoliday = (
  holiday: HolidayProps[] | HolidayProps | null,
  selected: Date
) => {
  const locdate = Number(formatHolidayDate(selected))

  if (!Array.isArray(holiday)) {
    if (!holiday) return null
    else {
      return holiday.locdate === locdate ? holiday : null
    }
  }

  return holiday.filter(h => {
    const day = h.locdate
    return day === locdate
  })
}

const formatHolidayDate = (date: Date) => {
  if (date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}${month}${day}`
  } else return null
}
