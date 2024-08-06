import styled from 'styled-components'
import '@toast-ui/chart/dist/toastui-chart.min.css'
import { PieChart } from '@toast-ui/react-chart'
import {
  getYearlyCategoryTrend,
  transUnitOfAmount,
  getUniqueYears
} from '@/utils/getLedgerStats'
import { LedgerProps } from '@/interface/LedgerProps'
import { useEffect, useState } from 'react'
import SelectBox from '@/components/input/SelectBox'

interface SeriesData {
  name: string
  data: number
}

interface ChartData {
  categories: string[]
  series: SeriesData[]
}

const CategoryChart = ({
  ledgerData
}: {
  ledgerData: LedgerProps[] | null
}) => {
  const [isLoading, setIsLoading] = useState(true)

  const [selectYear, setSelectYear] = useState(new Date().getFullYear())
  const [type, setType] = useState('지출')
  const yearList = getUniqueYears(ledgerData)
  const typeList = ['수입', '지출']

  const [chartData, setChartData] = useState<ChartData | null>({
    categories: [],
    series: []
  })

  const [dataNotFound, setDataNotFound] = useState(false)

  const loadChartData = () => {
    const data = getYearlyCategoryTrend(ledgerData, selectYear)
    const yearData = data?.[selectYear]

    const getSeriesData = () => {
      if (type === '수입')
        return yearData?.income
          ? Object.entries(yearData.income).map(([key, value]) => ({
              name: key,
              data: value
            }))
          : []
      if (type === '지출')
        return yearData?.expense
          ? Object.entries(yearData.expense).map(([key, value]) => ({
              name: key,
              data: value
            }))
          : []
      return []
    }

    const seriesData = getSeriesData()
    setChartData({
      categories: [type],
      series: seriesData
    })

    if (seriesData.length === 0) {
      setDataNotFound(true)
      setChartData(null)
    } else {
      setDataNotFound(false)
      setChartData({
        categories: [type],
        series: seriesData
      })
    }
    setIsLoading(false)
  }

  const chartOptions = {
    legend: {
      visible: false
    },
    series: {
      dataLabels: {
        visible: true,
        anchor: 'outer',
        pieSeriesName: { visible: true }
      }
    },
    exportMenu: {
      visible: false
    },
    tooltip: {
      offsetX: -80,
      offsetY: -90,
      formatter: (value: number) => {
        return transUnitOfAmount(value)
      }
    },
    lang: {
      loData: '데이터가 없습니다.'
    },
    theme: {
      chart: {
        fontFamily: 'NanumSquareRound',
        fontSize: 16
      }
    }
  }

  const containerStyle = {
    width: '400px',
    height: '400px'
  }

  useEffect(() => {
    if (!ledgerData) {
      setIsLoading(true)
      return
    }
    setIsLoading(true)
    setDataNotFound(false)
    loadChartData()
  }, [selectYear, type, isLoading, ledgerData])

  return (
    <Container>
      <Title>
        카테고리별 {selectYear}년 {type} 내역 비율
      </Title>
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
      {dataNotFound && !isLoading && <span>데이터가 없습니다.</span>}
      {!isLoading && !dataNotFound && (
        <Wrapper>
          <PieChart
            data={chartData}
            options={chartOptions}
            style={containerStyle}
          />
        </Wrapper>
      )}
    </Container>
  )
}

export default CategoryChart

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    text-align: center;
    color: ${({ theme }) => theme.gray.gray_300};
  }
`

const Title = styled.div`
  font-size: 1.1rem;
  margin-bottom: 15px;
`

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
