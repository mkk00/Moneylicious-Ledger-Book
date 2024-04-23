import { useState } from 'react'

const Calendar = () => {
  const [currentDate, setCurruentDate] = useState(new Date())

  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토']

  // 해당 월의 시작 요일과 일 수 계산
  const getCalendarInfo = (year: number, month: number) => {
    const startDay = new Date(year, month - 1, 1).getDay()
    const totalDate = new Date(year, month, 0).getDate()
    return { startDay, totalDate }
  }

  const { startDay, totalDate } = getCalendarInfo(currentYear, currentMonth + 1)

  const createCalendarArr = () => {
    const CalendarArr: JSX.Element[] = []

    // 해당 월의 첫째 날이 시작되는 요일 전까지를 빈 요소로 채움
    for (let i = 0; i < startDay; i++) {
      CalendarArr.push(<td key={`empty + ${i}`}></td>)
    }

    // 1일부터 daysInMonth 까지의 날짜를 생성하여 배열에 추가
    for (let date = 1; date <= totalDate; date++) {
      CalendarArr.push(<td key={date}>{date}</td>)
    }
    return CalendarArr
  }

  // 캘린더 배열을 주 단위로 나누어 <tr> 태그로 묶어서 추가
  const CalendarArr = createCalendarArr()
  const weeksArr: JSX.Element[] = []

  for (let i = 0; i < CalendarArr.length; i += 7) {
    const weekIndex = i / 7 + 1
    const week = CalendarArr.slice(i, i + 7)
    weeksArr.push(<tr key={`week + ${weekIndex}`}>{week}</tr>)
  }

  const handleChangeMonth = (change: number) => {
    setCurruentDate(new Date(currentYear, currentMonth + change, 1))
  }

  return (
    <>
      <div>
        <button>
          {currentYear}년 {currentMonth + 1}월
        </button>
        <div>
          <button onClick={() => handleChangeMonth(-1)}>&lt;</button>
          <button onClick={() => handleChangeMonth(1)}>&gt;</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            {daysOfWeek.map(day => (
              <th key={`${day} + 요일`}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>{weeksArr}</tbody>
      </table>
    </>
  )
}

export default Calendar
