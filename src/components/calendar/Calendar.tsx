import { useState, useEffect } from 'react'
import { RiHome5Line } from 'react-icons/ri'
import { BiSolidRightArrow, BiSolidLeftArrow } from 'react-icons/bi'
import { FaCircle } from 'react-icons/fa'
import styled, { css } from 'styled-components'
import DatePickerModal from '@/components/modal/DatePickerModal'
import { getHolidayData } from '@/lib/holiday'
import { holidayProps } from '@/interface/holidayProps'
import useModal from '@/hook/useModal'

const Calendar = () => {
  const [currentDate, setCurruentDate] = useState(new Date())
  const [holiday, setHoliday] = useState<holidayProps[] | holidayProps | null>(
    null
  )

  const { isOpen, openModal, closeModal } = useModal()

  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토']

  // 오늘 날짜 찾는 함수
  const isToday = (date: number) => {
    const today = new Date()

    return (
      currentYear === today.getFullYear() &&
      currentMonth === today.getMonth() &&
      date === today.getDate()
    )
  }

  // 공휴일 목록에서 date 추출해서 배열에 저장
  const extractDayFromHoliday = () => {
    if (Array.isArray(holiday)) {
      return holiday
        ?.filter(h => h.isHoliday === 'Y')
        .map(holidays => holidays.locdate % 100)
    } else if (holiday && holiday.isHoliday === 'Y') {
      return holiday.locdate % 100
    }
  }

  // 공휴일 체크
  const findHoliday = (date: number) => {
    const extractedDays = extractDayFromHoliday()
    if (Array.isArray(extractedDays)) {
      return extractedDays.includes(date)
    } else if (extractedDays) {
      return extractedDays === date
    } else {
      return false
    }
  }

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
      CalendarArr.push(
        <TableItems
          key={`empty + ${i}`}
          $isToday={false}
          $isHoliday={false}></TableItems>
      )
    }

    // 1일부터 daysInMonth 까지의 날짜를 생성하여 배열에 추가
    for (let date = 1; date <= totalDate; date++) {
      CalendarArr.push(
        <TableItems
          key={date}
          $isToday={isToday(date)}
          $isHoliday={findHoliday(date) || false}>
          <span>{date}</span>
          {/* <DailyFinancialSummary>
            <FaCircle />
            20,000
          </DailyFinancialSummary>
          <DailyFinancialSummary>
            <FaCircle />
            20,000
          </DailyFinancialSummary> */}
        </TableItems>
      )
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

  useEffect(() => {
    // 공휴일 조회 api
    getHolidayData(
      currentYear,
      currentMonth + 1 < 9
        ? (currentMonth + 1).toString().padStart(2, '0')
        : currentMonth + 1
    ).then(res => {
      setHoliday(res.data.response.body.items.item)
      console.log(holiday)
      console.log(extractDayFromHoliday())
    })
  }, [currentYear, currentMonth])

  return (
    <>
      {isOpen && (
        <DatePickerModal
          closeModal={closeModal}
          setCurruentDate={setCurruentDate}
        />
      )}
      <SelectedDateWrapper>
        <BackTodayButton>
          <RiHome5Line
            size={16}
            onClick={() => setCurruentDate(new Date())}
          />
        </BackTodayButton>
        <SelectDateButton onClick={openModal}>
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

const buttonStyles = css`
  position: absolute;
  top: 50%;
  transform: translateY(-45%);
`

const hoverStyle = css`
  :hover {
    color: ${({ theme }) => theme.color.main};
  }
`

const SelectedDateWrapper = styled.div`
  width: 595px;
  display: flex;
  padding: 8px 0;
  position: relative;
`

const BackTodayButton = styled.button`
  ${buttonStyles}
  ${hoverStyle}
  left: 20px;
  padding: 5px;
`

const SelectDateButton = styled.button`
  width: fit-content;
  padding: 10px 30px;
  margin: 0 auto;
  font-size: 1.2rem;
`

const SelectMonthButton = styled.div`
  ${buttonStyles}
  right: 20px;
  display: flex;
  gap: 5px;

  button {
    padding: 5px;
    ${hoverStyle}
  }
`

const CalendarTable = styled.table`
  border-collapse: collapse;
  width: 100%;

  &,
  & thead {
    border-bottom: 1px solid ${({ theme }) => theme.gray.gray_100};
  }

  & tr th:nth-child(1),
  & tr td:nth-child(1) span {
    color: ${({ theme }) => theme.color.sub_dark};
  }

  & tr th:nth-child(7),
  & tr td:nth-child(7) span {
    color: ${({ theme }) => theme.color.main_dark};
  }
`

const DaysItem = styled.th`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.gray.gray_300};
  width: 85px;
  height: 30px;
`

const TableItems = styled.td<{ $isToday?: boolean; $isHoliday?: boolean }>`
  width: 85px;
  height: 85px;
  vertical-align: top;
  text-align: center;
  padding: 10px 5px;
  background-color: ${({ $isToday, theme }) =>
    $isToday ? theme.gray.gray_100 : 'none'};
  border-radius: 5px;

  & > span {
    color: ${({ $isHoliday, theme }) =>
      $isHoliday ? theme.color.sub_dark : 'inherit'};
    font-weight: ${({ $isToday }) => ($isToday ? 'bold' : 'normal')};
  }

  &:hover {
    font-weight: bold;
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.main_light};
  }
`

const DailyFinancialSummary = styled.div`
  /* color: ${({ theme }) => theme.color.sub_dark}; */
  display: flex;
  align-items: center;
  gap: 3px;
  margin-top: 5px;
  font-size: 0.8rem;
`
