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
  const setCurruentDate = useDateStore(state => state.setCurruentDate)
  const selectedDate = useDateStore(state => state.selectedDate)
  const setSelectedDate = useDateStore(state => state.setSelectedDate)

  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()

  const handleChangeMonth = (change: number) => {
    setCurruentDate(
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
        <BackTodayButton>
          <RiHome5Line
            size={16}
            onClick={() => {
              setCurruentDate(new Date())
              setSelectedDate(null)
            }}
          />
        </BackTodayButton>
        <SelectDateButton onClick={() => openModal('날짜선택')}>
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
