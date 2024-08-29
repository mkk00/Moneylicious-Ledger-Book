import styled from 'styled-components'
import '@toast-ui/chart/dist/toastui-chart.min.css'
import { PieChart } from '@toast-ui/react-chart'
import { getUniqueYears } from '@/utils/getLedgerUtils'
import {
  getYearlyCategoryTrend,
  getMonthlyCategoryTrend
} from '@/utils/filterLedgerCategory'
import { TypeProps, MonthDataProps } from '@/interface/DashBoardProps'
import { pieChartOptions } from '@/data/chartOptionsData'
import { LedgerProps } from '@/interface/LedgerProps'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
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
  selectMonth = null,
  setSelectMonth = () => {}
}: {
  ledgerData: LedgerProps[] | null
  selectMonth?: number | null
  setSelectMonth?: Dispatch<SetStateAction<number>>
}) => {
  const [isLoading, setIsLoading] = useState(true)

  const [year, setYear] = useState(new Date().getFullYear())
  const [type, setType] = useState('지출')
  const yearList = getUniqueYears(ledgerData)
  const typeList = ['수입', '지출']
  const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  const [chartData, setChartData] = useState<ChartData | null>({
    categories: [],
    series: []
  })

  const [dataNotFound, setDataNotFound] = useState(false)

  const loadChartData = () => {
    const yearData = getYearlyCategoryTrend(ledgerData, year)
    let data = yearData?.[year]
    let monthData: MonthDataProps | undefined | null = null

    if (year && selectMonth) {
      monthData = getMonthlyCategoryTrend(ledgerData, year, selectMonth)
      if (!monthData || !monthData[year] || !monthData[year][selectMonth]) {
        setDataNotFound(true)
        setChartData(null)
        setIsLoading(false)
        data = undefined
        return
      }
      data = monthData?.[year][selectMonth]
    }

    const getSeriesData = (data: TypeProps | undefined) => {
      if (!data) return []
      const categoryData = type === '수입' ? data.income : data.expense
      const entries = Object.entries(categoryData)

      const topCategoryNumber = type === '수입' ? 3 : 7
      const DescEntries = entries.sort(([, a], [, b]) => b - a)
      const topEntries = DescEntries.slice(0, topCategoryNumber)

      const otherEntries = DescEntries.slice(topCategoryNumber)
      const otherEntriesTotal = otherEntries.reduce(
        (acc, [, value]) => acc + value,
        0
      )

      const result = topEntries.map(([key, value]) => ({
        name: key,
        data: value
      }))

      if (otherEntriesTotal > 0) {
        result.push({
          name: '기타',
          data: otherEntriesTotal
        })
      }

      return result
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
    width: '500px',
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
  }, [year, selectMonth, type, isLoading, ledgerData])

  return (
    <Container>
      <Title>
        카테고리별 {type} 비율 {selectMonth && `(${selectMonth}월)`}
      </Title>
      <SelectWrapper>
        <SelectBox
          selectItem={year}
          setSelectItem={setYear}
          items={yearList}
        />
        {selectMonth && setSelectMonth && (
          <SelectBox
            selectItem={selectMonth}
            setSelectItem={setSelectMonth}
            items={monthList}
          />
        )}
        <SelectBox
          selectItem={type}
          setSelectItem={setType}
          items={typeList}
        />
      </SelectWrapper>
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
  color: ${({ theme }) => theme.gray.gray_400};
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
