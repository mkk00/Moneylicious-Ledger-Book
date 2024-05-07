import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getHolidayData } from '@/lib/holiday'
import { HolidayProps } from '@/interface/HolidayProps'
import useDateStore from '@/store/useDateStore'
import { isToday, findHoliday, getCalendarInfo } from '@/utils/calendarUtils'
import CreateDateItem from '@/components/calendar/CreateDateItem'

const CalendarDateCell = () => {
  const [holiday, setHoliday] = useState<HolidayProps[] | HolidayProps | null>(
    null
  )

  const selectedDate = useDateStore(state => state.selectedDate)
  const setSelectedDate = useDateStore(state => state.setSelectedDate)

  const currentFullDate = useDateStore(state => state.currentDate)
  const currentYear = currentFullDate.getFullYear()
  const currentMonth = currentFullDate.getMonth()

  const { startDay, totalDate } = getCalendarInfo(currentYear, currentMonth + 1)

  /** 캘린더에서 선택된 날짜를 표시
   *  이미 선택된 날짜를 다시 클릭하면, 선택 해제
   *  @param {number} date 선택된 날짜의 일
   */
  const handleSelectDate = (date: number) => {
    const select = new Date(currentYear, currentMonth, date)
    setSelectedDate(select)

    if (date === selectedDate?.getDate()) setSelectedDate(null)
  }

  /** 현재 설정된 연도, 월에 대한 캘린더 데이터 생성
   *  1. 배열을 캘린더가 시작되는 요일 전까지 빈 요소로 채움
   *  2. 실제 날짜를 나타내는 요소들을 배열에 추가
   * @return JSX.Element[] : 캘린더 데이터의 일자 요소들의 JSX 배열 반환
   */
  const createDateArr = () => {
    const DateArr: JSX.Element[] = []

    for (let i = 0; i < startDay; i++) {
      DateArr.push(<TableEmptyItems key={`empty-${i}`}></TableEmptyItems>)
    }

    for (let date = 1; date <= totalDate; date++) {
      DateArr.push(
        CreateDateItem({
          date,
          isToday: isToday(currentYear, currentMonth, date),
          isHoliday: findHoliday(holiday, date) || false,
          isSelected: selectedDate?.getDate() === date,
          handleSelectDate
        })
      )
    }

    return DateArr
  }

  /** 캘린더 데이터를 주단위로 캘린더로 변환
   *  CalendarWeekArr 배열을 순환하여 7일 단위로 주를 나눔
   * @return JSX.Element[] : 캘린더의 각 주를 나타내는 JSX 배열 반환
   */
  const createWeekArr = () => {
    const CalendarWeekArr = createDateArr()
    const weeksArr: JSX.Element[] = []

    for (let i = 0; i < CalendarWeekArr.length; i += 7) {
      const weekIndex = i / 7 + 1
      const week = CalendarWeekArr.slice(i, i + 7)
      weeksArr.push(<tr key={`week-${weekIndex}`}>{week}</tr>)
    }

    return weeksArr
  }

  useEffect(() => {
    setSelectedDate(new Date())
  }, [])

  useEffect(() => {
    getHolidayData(currentYear, currentMonth).then(res => {
      setHoliday(res.data.response.body.items.item)
    })
  }, [currentYear, currentMonth, selectedDate])

  return <tbody>{createWeekArr()}</tbody>
}

export default CalendarDateCell

const TableEmptyItems = styled.td`
  width: 85px;
  height: 85px;
  vertical-align: top;
  text-align: center;
  padding: 10px 5px;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 5px;
`
