import styled from 'styled-components'
import {
  transUnitOfAmount,
  extractNumbers,
  getUniqueYears
} from '@/utils/getLedgerUtils'
import { getYearlyTrend } from '@/utils/getLedgerTrends'
import { LedgerProps } from '@/interface/LedgerProps'
import '@toast-ui/chart/dist/toastui-chart.min.css'
import { LineChart } from '@toast-ui/react-chart'
import SelectBox from '@/components/input/SelectBox'
import { useState } from 'react'
import { lineChartOptions } from '@/data/chartOptionsData'

const YearlyCell = ({ ledgerData }: { ledgerData: LedgerProps[] | null }) => {
  const yearlyData = getYearlyTrend(ledgerData)

  const [selectYear, setSelectYear] = useState(new Date().getFullYear())
  const [type, setType] = useState('지출')
  const yearList = getUniqueYears(ledgerData)
  const typeList = ['수입', '지출']

  const currYearData = yearlyData.find(data => data.year === selectYear)
  const prevYearData = yearlyData.find(data => data.year === selectYear - 1)

  let yearExpenseDiff = '0원'
  let yearIncomeDiff = '0원'

  if (currYearData && prevYearData) {
    yearExpenseDiff = transUnitOfAmount(
      currYearData.expense - prevYearData.expense
    )
    yearIncomeDiff = transUnitOfAmount(
      currYearData.income - prevYearData.income
    )
  }

  const series = [
    {
      name: type,
      data: [
        type === '지출' ? prevYearData?.expense : prevYearData?.income,
        type === '지출' ? currYearData?.expense : currYearData?.income
      ]
    }
  ]

  const data = {
    categories: [selectYear - 1, selectYear],
    series: series
  }

  const containerStyle = {
    width: '350px',
    height: '250px'
  }

  return (
    <Container>
      <Title>연도별 {type} 추세</Title>
      <SelectWrapper>
        <SelectBox
          selectItem={selectYear}
          setSelectItem={setSelectYear}
          items={yearList}
        />
        <SelectBox
          selectItem={type}
          setSelectItem={setType}
          items={typeList}
        />
      </SelectWrapper>
      {extractNumbers(yearExpenseDiff) !== 0 && (
        <>
          <YearSummary $type={type}>
            {selectYear - 1} 년도보다
            <span>{type === '지출' ? yearExpenseDiff : yearIncomeDiff}</span>
            {type === '지출'
              ? extractNumbers(yearExpenseDiff) > 0
                ? ' 더 지출'
                : ' 덜 지출'
              : extractNumbers(yearIncomeDiff) > 0
                ? ' 수입 증가'
                : ' 수입 감소'}
          </YearSummary>
          <Wrapper>
            {ledgerData && (
              <LineChart
                data={data}
                options={lineChartOptions}
                style={containerStyle}
              />
            )}
          </Wrapper>
        </>
      )}
      {extractNumbers(yearExpenseDiff) === 0 && (
        <NoData>데이터가 없습니다.</NoData>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
`

const Title = styled.div`
  font-size: 1.7rem;
  font-weight: bold;
`

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
`

const NoData = styled.span`
  color: ${({ theme }) => theme.gray.gray_300};
  margin-bottom: 50px;
`

const YearSummary = styled.div<{ $type?: string }>`
  margin-bottom: 10px;

  & span {
    position: relative;
    display: inline-block;
    margin: 0 10px;
    text-decoration: none;
    font-weight: bold;
    color: ${({ theme, $type }) =>
      $type === '지출' ? theme.color.sub : theme.color.main};
  }

  & span::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -6px;
    width: 100%;
    height: 6px;
    background-color: ${({ theme, $type }) =>
      $type === '지출' ? theme.color.sub : theme.color.main};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.8s ease;
  }

  & span:hover::after {
    transform: scaleX(1);
  }
`

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
`

export default YearlyCell
