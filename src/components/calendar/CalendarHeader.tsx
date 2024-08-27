import styled, { css } from 'styled-components'
import { RiHome5Line } from 'react-icons/ri'
import { BiSolidRightArrow, BiSolidLeftArrow } from 'react-icons/bi'
import DatePickerModal from '@/components/modal/DatePickerModal'
import useModal from '@/hook/useModal'
import ModalPortal from '@/components/modal/ModalPortal'
import useDateStore from '@/store/useDateStore'

const CalendarHeader = () => {
  const { isOpen, openModal, closeModal } = useModal()

  const currentDate = useDateStore(state => state.currentDate)
  const setCurrentDate = useDateStore(state => state.setCurrentDate)
  const selectedDate = useDateStore(state => state.selectedDate)
  const setSelectedDate = useDateStore(state => state.setSelectedDate)

  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()

  const handleChangeMonth = (change: number) => {
    setCurrentDate(
      new Date(
        currentYear,
        currentMonth + change,
        selectedDate ? selectedDate.getDate() : 1
      )
    )

    const select = new Date(
      currentYear,
      currentMonth + change,
      selectedDate?.getDate()
    )
    if (selectedDate) setSelectedDate(select)
  }

  return (
    <>
      <SelectedDateWrapper>
        <BackTodayButton aria-label="오늘 날짜로 가기">
          <RiHome5Line
            size={16}
            onClick={() => {
              setCurrentDate(new Date())
              setSelectedDate(new Date())
            }}
          />
        </BackTodayButton>
        <SelectDateButton onClick={() => openModal('날짜선택')}>
          {currentYear}년 {currentMonth + 1}월
        </SelectDateButton>
        <SelectMonthButton>
          <button
            onClick={() => handleChangeMonth(-1)}
            aria-label="이전 월">
            <BiSolidLeftArrow size={12} />
          </button>
          <button
            onClick={() => handleChangeMonth(1)}
            aria-label="다음 월">
            <BiSolidRightArrow size={12} />
          </button>
        </SelectMonthButton>
      </SelectedDateWrapper>
      {isOpen('날짜선택') && (
        <ModalPortal>
          <DatePickerModal closeModal={() => closeModal('날짜선택')} />
        </ModalPortal>
      )}
    </>
  )
}

export default CalendarHeader

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
