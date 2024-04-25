import { useState } from 'react'
import { BiSolidRightArrow, BiSolidLeftArrow } from 'react-icons/bi'
import styled from 'styled-components'

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
      CalendarArr.push(<TableItems key={`empty + ${i}`}></TableItems>)
    }

    // 1일부터 daysInMonth 까지의 날짜를 생성하여 배열에 추가
    for (let date = 1; date <= totalDate; date++) {
      CalendarArr.push(<TableItems key={date}>{date}</TableItems>)
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
      <SelectedDateWrapper>
        <SelectDateButton>
          {currentYear}년 {currentMonth + 1}월
        </SelectDateButton>
        <SelectMonthButton>
          <button onClick={() => handleChangeMonth(-1)}>
            <BiSolidLeftArrow size={12} />
          </button>
          <button onClick={() => handleChangeMonth(1)}>
            <BiSolidRightArrow size={12} />
          </button>
        </SelectMonthButton>
      </SelectedDateWrapper>
      <CalendarTable>
        <thead>
          <tr>
            {daysOfWeek.map(day => (
              <DaysItem key={`${day} + 요일`}>{day}</DaysItem>
            ))}
          </tr>
        </thead>
        <tbody>{weeksArr}</tbody>
      </CalendarTable>
    </>
  )
}

export default Calendar

const SelectedDateWrapper = styled.div`
  width: 595px;
  display: flex;
  padding: 8px 0;
  position: relative;
`

const SelectDateButton = styled.button`
  width: fit-content;
  padding: 10px 30px;
  margin: 0 auto;
  font-size: 1.2rem;
  border: 1px solid ${({ theme }) => theme.color.white};

  &:hover {
    cursor: pointer;
  }
`

const SelectMonthButton = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-45%);
  display: flex;
  gap: 5px;

  button {
    padding: 5px;
  }
`

const CalendarTable = styled.table`
  border-collapse: collapse;

  &,
  & thead {
    border-bottom: 1px solid ${({ theme }) => theme.gray.gray_100};
  }

  & tr th:nth-child(1),
  & tr td:nth-child(1) {
    color: ${({ theme }) => theme.color.sub_dark};
  }

  & tr th:nth-child(7),
  & tr td:nth-child(7) {
    color: ${({ theme }) => theme.color.main_dark};
  }
`

const DaysItem = styled.th`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.gray.gray_300};
  width: 85px;
  height: 30px;
`

const TableItems = styled.td`
  width: 85px;
  height: 85px;
  vertical-align: top;
  text-align: center;
  padding: 10px 5px;

  &:hover {
    font-weight: bold;
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.main_light};
    border-radius: 5px;
  }
`
