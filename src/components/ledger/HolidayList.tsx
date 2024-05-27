import { HolidayProps } from '@/interface/HolidayProps'
import { MdHolidayVillage } from 'react-icons/md'
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
    <MdHolidayVillage size={15} />
    {holiday.locdate % 100 === selectedDate.getDate() && holiday.dateName}
  </HolidayInfo>
)

const HolidayInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding-top: 10px;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.color.sub};
`
