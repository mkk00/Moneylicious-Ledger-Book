import styled, { useTheme } from 'styled-components'
import {
  getYearlyTrend,
  findMaxAmount,
  transUnitOfAmount,
  extractNumbers
} from '@/utils/getLedgerStats'
import { LedgerProps } from '@/interface/LedgerProps'
import '@toast-ui/chart/dist/toastui-chart.min.css'
import { LineChart } from '@toast-ui/react-chart'

const YearlyCell = ({
  type,
  ledgerData,
  selectYear
}: {
  type: string
  ledgerData: LedgerProps[] | null
  selectYear: number
}) => {
  const theme = useTheme()
  const yearlyData = getYearlyTrend(ledgerData)

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

  const options = {
    series: {
      spline: true,
      eventDetectType: 'grouped'
    },
    xAxis: {
      label: {
        formatter: (value: number) => {
          return `${value}년도`
        }
      },
      pointOnColumn: true,
      margin: 10
    },
    yAxis: {
      label: {
        formatter: (value: string) => {
          return transUnitOfAmount(Number(value))
        }
      },
      margin: 10
    },
    lang: {
      loData: '데이터가 없습니다.'
    },
    legend: {
      visible: false
    },
    tooltip: {
      offsetX: -80,
      offsetY: -90,
      formatter: (value: number) => {
        return transUnitOfAmount(value)
      }
    },
    scale: {
      min: 0,
      max:
        type === '지출'
          ? findMaxAmount(yearlyData).expense
          : findMaxAmount(yearlyData).income
    },
    plot: {
      visible: false
    },
    exportMenu: {
      visible: false
    },
    theme: {
      chart: {
        fontFamily: 'NanumSquareRound',
        fontSize: 16
      },
      series: {
        lineWidth: 5,
        colors: [theme.gray.gray_400]
      },
      yAxis: {
        width: 1,
        color: theme.gray.gray_300
      },
      xAxis: {
        width: 1,
        color: theme.gray.gray_300
      },
      legend: {
        label: {
          fontSize: 16
        }
      }
    }
  }

  const containerStyle = {
    width: '350px',
    height: '250px'
  }

  return (
    <Container>
      <Title>연도별 {type} 추세</Title>
      {extractNumbers(yearExpenseDiff) !== 0 && (
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
      )}
      <Wrapper>
        {ledgerData && (
          <LineChart
            data={data}
            options={options}
            style={containerStyle}
          />
        )}
      </Wrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 70px;
`

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 15px;
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
