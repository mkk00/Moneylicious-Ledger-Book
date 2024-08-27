import styled from 'styled-components'
import CalendarHeader from '@/components/calendar/CalendarHeader'
import CalendarWeekDays from '@/components/calendar/CalendarWeekDays'
import CalendarDateCell from '@/components/calendar/CalendarDateCell'
import { DailySummaryProps } from '@/interface/LedgerProps'

const Calendar = ({
  getDailyTotal,
  dailyTotalAmount
}: {
  getDailyTotal: () => Promise<void>
  dailyTotalAmount: DailySummaryProps[] | null
}) => {
  return (
    <>
      <CalendarHeader />
      <CalendarTable>
        <CalendarWeekDays />
        <CalendarDateCell
          getDailyTotal={getDailyTotal}
          dailyTotalAmount={dailyTotalAmount}
        />
      </CalendarTable>
    </>
  )
}

export default Calendar

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
