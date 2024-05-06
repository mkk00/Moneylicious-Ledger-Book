import styled from 'styled-components'

const CalendarWeekDays = () => {
  const days = ['일', '월', '화', '수', '목', '금', '토']

  return (
    <thead>
      <tr>
        {days.map(day => (
          <DaysItem key={`${day} + 요일`}>{day}</DaysItem>
        ))}
      </tr>
    </thead>
  )
}

export default CalendarWeekDays

const DaysItem = styled.th`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.gray.gray_300};
  width: 85px;
  height: 30px;
`
