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
  type,
  setType
}: {
  ledgerData: LedgerProps[] | null
  selectYear: number
  setSelectYear: Dispatch<SetStateAction<number>>
  type: string
  setType: Dispatch<SetStateAction<string>>
}) => {
  const yearList = getUniqueYears(ledgerData)
  const typeList = ['수입', '지출']

  const monthlyData = getMonthlyTrend(ledgerData, selectYear)
  const maxAmount = findMaxAmount(monthlyData)
  return (
    <Container>
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
        월별 내역
      </SelectWrapper>
      <BarChart
        type={type}
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
`

const SelectWrapper = styled.div`
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 0;
`
