import styled from 'styled-components'
import DateItemProps from '@/interface/DateItemProps'
import { FaCircle } from 'react-icons/fa'

// 1일부터 daysInMonth 까지의 날짜를 생성하여 배열에 추가
const CreateDateItem = (dateInfo: DateItemProps) => {
  const { date, isToday, isHoliday, isSelected, handleSelectDate, dailyTotal } =
    dateInfo

  return (
    <TableItems
      key={date}
      onClick={() => handleSelectDate(date)}
      $isToday={isToday}
      $isHoliday={isHoliday}
      $isSelect={isSelected}>
      <span>{date}</span>
      <DailyFinancialSummary>
        {dailyTotal?.income ? <FaCircle /> : null}
        {dailyTotal?.income !== 0 && dailyTotal?.income.toLocaleString()}
      </DailyFinancialSummary>
      <DailyFinancialSummary>
        {dailyTotal?.expense ? <FaCircle /> : null}
        {dailyTotal?.expense !== 0 && dailyTotal?.expense.toLocaleString()}
      </DailyFinancialSummary>
    </TableItems>
  )
}

export default CreateDateItem

const TableItems = styled.td<{
  $isToday?: boolean
  $isHoliday?: boolean
  $isSelect?: boolean
}>`
  width: 85px;
  height: 85px;
  vertical-align: top;
  text-align: center;
  padding: 10px 5px;
  background-color: ${({ $isSelect, $isToday, theme }) =>
    $isSelect
      ? theme.color.main_light
      : $isToday
        ? theme.gray.gray_100
        : 'none'};
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  margin-top: 5px;
  font-size: 0.8rem;

  &:nth-of-type(1) svg {
    color: ${({ theme }) => theme.color.main};
  }
  &:nth-of-type(2) svg {
    color: ${({ theme }) => theme.color.sub};
  }
`
