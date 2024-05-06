import { useState } from 'react'
import styled, { css } from 'styled-components'
import ModalLayout from '@/components/modal/ModalLayout'
import useDateStore from '@/store/useDateStore'
import { getCalendarInfo } from '@/utils/calendarUtils'

const DatePickerModal = ({
  closeModal,
  isSelectDate
}: {
  closeModal: (key: string) => void
  isSelectDate?: boolean
}) => {
  const [isOpenYearList, setIsOpenYearList] = useState(false)
  const [isOpenMonthSelector, setIsOpenMonthSelector] = useState(false)
  const [isOpenDateSelector, setIsOpenDateSelector] = useState(false)

  const [year, setYear] = useState(2024)

  const currentDate = useDateStore(state => state.currentDate)
  const setCurruentDate = useDateStore(state => state.setCurruentDate)
  const selectedDate = useDateStore(state => state.selectedDate)
  const setSelectedDate = useDateStore(state => state.setSelectedDate)

  const { totalDate } = getCalendarInfo(year, currentDate.getMonth() + 1)

  // year 선택 범위는 2020년도부터 현재 year를 기준으로 +1 year까지 보이도록 배열 생성
  const yearList = Array.from(
    { length: new Date().getFullYear() - 2020 + 2 },
    (_, idx) => new Date().getFullYear() - idx + 1
  )

  const monthList = Array.from({ length: 12 }, (_, idx) => idx + 1)

  const dateList = Array.from({ length: totalDate }, (_, idx) => idx + 1)

  // year 를 선택 및 저장하고 month 선택으로 넘어감
  const handleSelectYear = (option: number) => {
    setYear(option)
    setIsOpenYearList(false)
    setIsOpenMonthSelector(true)
  }

  // month 를 선택 완료하면 캘린더는 해당 월로 이동
  const handleSelectMonth = (month: number) => {
    setCurruentDate(new Date(year, month, 0))
    setIsOpenMonthSelector(false)
    setIsOpenDateSelector(true)

    if (!isSelectDate) {
      setSelectedDate(new Date(year, month, selectedDate?.getDate()))
      closeModal('날짜선택')
    }
  }

  const handleSelectDate = (date: number) => {
    console.log(date)
    setCurruentDate(new Date(year, currentDate.getMonth(), date))
    setSelectedDate(new Date(year, currentDate.getMonth() - 1, date))
    closeModal('날짜선택')
  }

  return (
    <ModalLayout closeModal={() => closeModal('날짜선택')}>
      {!isOpenMonthSelector && !isOpenDateSelector && (
        <SelectYearContainer>
          <YearButton onClick={() => setIsOpenYearList(!isOpenYearList)}>
            {year}
          </YearButton>
          {isOpenYearList && (
            <DropdownMenu>
              {yearList.map(option => (
                <li
                  key={option}
                  onClick={() => handleSelectYear(option)}>
                  {option}
                </li>
              ))}
            </DropdownMenu>
          )}
        </SelectYearContainer>
      )}
      {isOpenMonthSelector && (
        <SelectMonthContainer>
          {monthList.map(month => (
            <MonthButton
              key={month}
              onClick={() => handleSelectMonth(month)}>
              {month}
            </MonthButton>
          ))}
        </SelectMonthContainer>
      )}
      {isOpenDateSelector && isSelectDate && (
        <SelectDateContainer>
          {dateList.map(date => (
            <MonthButton
              key={date}
              onClick={() => handleSelectDate(date)}>
              {date}
            </MonthButton>
          ))}
        </SelectDateContainer>
      )}
    </ModalLayout>
  )
}

export default DatePickerModal

const hoverStyle = css`
  &:hover {
    font-weight: bold;
    background-color: ${({ theme }) => theme.color.sub_light};
    color: ${({ theme }) => theme.color.white};
  }
`

const gridStyle = css`
  display: grid;
  gap: 3px;
`

const SelectYearContainer = styled.div`
  position: relative;
`

const YearButton = styled.button`
  padding: 5px 15px;
`

const DropdownMenu = styled.ul`
  position: absolute;
  top: 200%;
  left: -20px;
  border-left: 1px solid ${({ theme }) => theme.gray.gray_200};
  border-right: 1px solid ${({ theme }) => theme.gray.gray_200};
  background-color: ${({ theme }) => theme.color.white};
  max-height: 200px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  li {
    ${hoverStyle}
    padding: 10px 35px;
    cursor: pointer;
  }
`

const SelectMonthContainer = styled.div`
  ${gridStyle}
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
`

const SelectDateContainer = styled.div`
  ${gridStyle}
  grid-template-columns: repeat(7, 1fr);
`

const MonthButton = styled.button`
  ${hoverStyle}
  width: 50px;
  height: 50px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
`
