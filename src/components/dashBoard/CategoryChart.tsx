import styled from 'styled-components'
import '@toast-ui/chart/dist/toastui-chart.min.css'
import { PieChart } from '@toast-ui/react-chart'
import {
  getYearlyCategoryTrend,
  getMonthlyCategoryTrend,
  getUniqueYears,
  TypeProps,
  MonthDataProps
} from '@/utils/getLedgerStats'
import { pieChartOptions } from '@/data/chartOptionsData'
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
  ledgerData,
  monthlySelectYear,
  selectMonth = null,
  isSelect
}: {
  ledgerData: LedgerProps[] | null
  monthlySelectYear?: number
  selectMonth?: number | null
  isSelect: boolean
}) => {
  const [isLoading, setIsLoading] = useState(true)

  const [yearlySelectYear, setyearlySelectYear] = useState(
    new Date().getFullYear()
  )
  const [type, setType] = useState('지출')
  const yearList = getUniqueYears(ledgerData)
  const typeList = ['수입', '지출']

  const [chartData, setChartData] = useState<ChartData | null>({
    categories: [],
    series: []
  })

  const [dataNotFound, setDataNotFound] = useState(false)

  const loadChartData = () => {
    const yearData = getYearlyCategoryTrend(ledgerData, yearlySelectYear)
    let data = yearData?.[yearlySelectYear]
    let monthData: MonthDataProps | undefined | null = null

    if (monthlySelectYear && selectMonth) {
      monthData = getMonthlyCategoryTrend(
        ledgerData,
        monthlySelectYear,
        selectMonth
      )
      if (
        !monthData ||
        !monthData[monthlySelectYear] ||
        !monthData[monthlySelectYear][selectMonth]
      ) {
        setDataNotFound(true)
        setChartData(null)
        setIsLoading(false)
        data = undefined
        return
      }
      data = monthData?.[monthlySelectYear][selectMonth]
    }

    const getSeriesData = (data: TypeProps | undefined) => {
      if (type === '수입')
        return data?.income
          ? Object.entries(data.income).map(([key, value]) => ({
              name: key,
              data: value
            }))
          : []
      if (type === '지출')
        return data?.expense
          ? Object.entries(data.expense).map(([key, value]) => ({
              name: key,
              data: value
            }))
          : []
      return []
    }

    const seriesData = getSeriesData(data)
    setChartData({
      categories: [type],
      series: seriesData
    })

    if (seriesData.length === 0 || data === undefined) {
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
  }, [
    monthlySelectYear,
    yearlySelectYear,
    selectMonth,
    type,
    isLoading,
    ledgerData
  ])

  return (
    <Container>
      <Title>
        카테고리별 {type} 비율
        {selectMonth && chartData && ` (${selectMonth}월)`}
      </Title>
      {isSelect && (
        <SelectWrapper>
          <SelectBox
            selectItem={yearlySelectYear}
            setSelectItem={setyearlySelectYear}
            items={yearList}
          />
          <SelectBox
            selectItem={type}
            setSelectItem={setType}
            items={typeList}
          />
        </SelectWrapper>
      )}
      {dataNotFound && !isLoading && !chartData && (
        <NoData>데이터가 없습니다.</NoData>
      )}
      {!isLoading && !dataNotFound && chartData && (
        <Wrapper>
          <PieChart
            data={chartData}
            options={pieChartOptions}
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
`

const Title = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
`

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
`

const NoData = styled.span`
  margin-top: 40px;
  margin-bottom: 50px;
  color: ${({ theme }) => theme.gray.gray_300};
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
