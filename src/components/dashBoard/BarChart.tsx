import { getMaxAmountRatio, AmountDataProps } from '@/utils/getLedgerStats'
import { useEffect } from 'react'
import styled, { css } from 'styled-components'
import { displayAmount } from '@/utils/getLedgerStats'

const BarChart = ({
  type,
  monthlyData,
  maxAmount
}: {
  type: string
  monthlyData: AmountDataProps[]
  maxAmount: AmountDataProps
}) => {
  const thisMonth = new Date().getMonth() + 1
  const amoutType = type === '수입' ? 'income' : 'expense'

  useEffect(() => {}, [type, amoutType])

  return (
    <>
      <Container>
        {monthlyData.map((item, idx) => (
          <BarWrapper key={idx}>
            <Bar
              $type={type}
              height={getMaxAmountRatio(amoutType, item, maxAmount)}>
              <Amount>{displayAmount(item, amoutType)}</Amount>
            </Bar>
          </BarWrapper>
        ))}
      </Container>
      <Container>
        {Object.keys(monthlyData).map(item => (
          <Month
            key={item}
            $thisMonth={thisMonth === Number(item) + 1}
            $type={type}>
            {Number(item) + 1}월
          </Month>
        ))}
      </Container>
    </>
  )
}
export default BarChart

const Container = styled.div`
  display: flex;
  gap: 25px;
`

const BarWrapper = styled.div`
  width: 25px;
  height: 180px;
  background-color: ${({ theme }) => theme.gray.gray_100};
  border-radius: 10px;
  position: relative;
`

const Amount = styled.span`
  position: absolute;
  top: -15px;
  font-size: 0.7rem;
  left: 50%;
  transform: translateX(-50%);
  color: ${({ theme }) => theme.gray.gray_400};
`

const Bar = styled.div<{ $type: string; height: string }>`
  width: 100%;
  height: ${({ height }) => (height ? height : 0)};
  border-radius: 10px;
  position: absolute;
  bottom: 0;
  background-color: ${({ theme, $type }) =>
    $type === '지출' ? theme.color.sub_light : theme.color.main_light};
  transition: all 300ms ease-out;
  cursor: pointer;

  &:hover ${Amount} {
    font-weight: bold;
    font-size: 0.8rem;
  }
`

const Month = styled.div<{ $thisMonth: boolean; $type: string }>`
  width: 25px;
  height: 25px;
  text-align: center;
  font-size: 0.8rem;
  margin-top: 5px;
  position: relative;
  font-weight: ${({ $thisMonth }) => ($thisMonth ? 'bold' : 'normal')};
  white-space: nowrap;
  ${({ $thisMonth }) =>
    $thisMonth &&
    css<{ $type: string }>`
      &::after {
        content: '';
        display: block;
        width: 10px;
        height: 10px;
        position: absolute;
        bottom: -3px;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 100%;
        background-color: ${({ theme, $type }) =>
          $type === '지출' ? theme.color.main_light : theme.color.sub};
      }
    `};
`
