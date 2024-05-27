import { HolidayProps } from '@/interface/HolidayProps'
import { BsCalendar2Event } from 'react-icons/bs'
import styled from 'styled-components'

interface HolidayListProps {
  holidays: HolidayProps[] | HolidayProps | null
  selectedDate: Date
}

const HolidayList = ({ holidays, selectedDate }: HolidayListProps) => {
  if (!holidays) return null

  if (Array.isArray(holidays)) {
    return holidays.map(holiday => (
      <HolidayListItem
        key={holiday.dateName}
        holiday={holiday}
        selectedDate={selectedDate}
      />
    ))
  } else {
    return (
      <HolidayListItem
        holiday={holidays}
        selectedDate={selectedDate}
      />
    )
  }
}

export default HolidayList

const HolidayListItem = ({
  holiday,
  selectedDate
}: {
  holiday: HolidayProps
  selectedDate: Date
}) => (
  <HolidayInfo key={holiday.dateName}>
    <BsCalendar2Event size={13} />
    {holiday.locdate % 100 === selectedDate.getDate() && holiday.dateName}
  </HolidayInfo>
)

const HolidayInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding-top: 10px;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.gray.gray_400};
`
