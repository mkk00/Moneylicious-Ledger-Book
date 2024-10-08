import { getMaxAmountRatio } from '@/utils/calculationLedgerAmount'
import styled, { css } from 'styled-components'
import { displayAmount } from '@/utils/getLedgerUtils'
import { Dispatch, SetStateAction } from 'react'
import { AmountDataProps } from '@/interface/DashBoardProps'

const BarChart = ({
  type,
  isCurrentYear,
  monthlyData,
  maxAmount,
  setSelectMonth
}: {
  type: string
  isCurrentYear: boolean
  monthlyData: AmountDataProps[]
  maxAmount: AmountDataProps
  setSelectMonth: Dispatch<SetStateAction<number>>
}) => {
  const thisMonth = new Date().getMonth() + 1
  const amoutType = type === '수입' ? 'income' : 'expense'

  /** 조회 조건에 따라 현재 월까지의 내역 또는 전체 월 내역 조회
   *  @description 선택 년도가 현재 년도일 경우 현재 월까지의 내역을 조회
   *  @description 현재 년도가 아닐 경우에는 전체 월 내역 조회
   */
  const filterMonthsData = (prevData: AmountDataProps[]) => {
    const newData: AmountDataProps[] = []
    for (let i = 0; i < thisMonth; i++) {
      const index = i % 12
      newData.push(prevData[index])
    }

    if (isCurrentYear) return newData
    else return prevData
  }

  /** 조회 조건에 따라 현재 월까지의 내역 또는 전체 월 숫자만 조회
   *  @description 선택 년도가 현재 년도일 경우 현재 월까지의 월 숫자 조회
   *  @description 현재 년도가 아닐 경우에는 전체 월 숫자 조회
   */
  const filterMonthsIndex = (data: AmountDataProps[]) => {
    const indexArr = Object.keys(data)
    const filteredindex = indexArr.filter(item => {
      if (isCurrentYear)
        return Number(item) >= 0 && Number(item) <= thisMonth - 1
      else return item
    })
    return filteredindex
  }

  return (
    <>
      <Container>
        {filterMonthsData(monthlyData).map((item, idx) => (
          <BarWrapper key={idx}>
            <Bar
              $type={type}
              height={getMaxAmountRatio(amoutType, item, maxAmount)}
              onClick={() =>
                setSelectMonth(Number(filterMonthsIndex(monthlyData)[idx]) + 1)
              }>
              <Amount>{displayAmount(item, amoutType)}</Amount>
            </Bar>
          </BarWrapper>
        ))}
      </Container>
      <Container>
        {filterMonthsIndex(monthlyData).map(item => (
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
  height: 150px;
  background-color: ${({ theme }) => theme.gray.gray_100};
  border-radius: 10px;
  position: relative;
`

const Amount = styled.span`
  position: absolute;
  top: -20px;
  font-size: 0.7rem;
  left: 50%;
  transform: translateX(-50%);
  color: ${({ theme }) => theme.gray.gray_500};
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
