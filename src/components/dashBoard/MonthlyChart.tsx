import SelectBox from '@/components/input/SelectBox'
import {
  getMonthlyTrend,
  getUniqueYears,
  findMaxAmount
} from '@/utils/getLedgerStats'
import { LedgerProps } from '@/interface/LedgerProps'
import styled from 'styled-components'
import { Dispatch, SetStateAction } from 'react'
import BarChart from '@/components/dashBoard/BarChart'

const MonthlyChart = ({
  ledgerData,
  selectYear,
  setSelectYear,
  setSelectMonth,
  type,
  setType
}: {
  ledgerData: LedgerProps[] | null
  selectYear: number
  setSelectYear: Dispatch<SetStateAction<number>>
  setSelectMonth: Dispatch<SetStateAction<number>>
  type: string
  setType: Dispatch<SetStateAction<string>>
}) => {
  const yearList = getUniqueYears(ledgerData)
  const typeList = ['수입', '지출']

  const monthlyData = getMonthlyTrend(ledgerData, selectYear)
  const maxAmount = findMaxAmount(monthlyData)

  const isCurrentYear = selectYear === new Date().getFullYear()

  return (
    <Container>
      <Title>월별 {type} 추세</Title>
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
      <BarChart
        type={type}
        isCurrentYear={isCurrentYear}
        setSelectMonth={setSelectMonth}
        monthlyData={monthlyData}
        maxAmount={maxAmount}
      />
    </Container>
  )
}

export default MonthlyChart

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-bottom: 50px;
`

const Title = styled.div`
  font-size: 1.7rem;
  font-weight: bold;
  margin-top: 15px;
`

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
`
