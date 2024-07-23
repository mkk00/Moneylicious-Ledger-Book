import SelectBox from '@/components/input/SelectBox'
import {
  getMonthlyTrend,
  getUniqueYears,
  findMaxAmount
} from '@/utils/getLedgerStats'
import { LedgerProps } from '@/interface/LedgerProps'
import styled from 'styled-components'
import { useState } from 'react'
import BarChart from '@/components/dashBoard/BarChart'

const MonthlyChart = ({ ledgerData }: { ledgerData: LedgerProps[] | null }) => {
  const [selectYear, setSelectYear] = useState(new Date().getFullYear())
  const [type, setType] = useState('지출')

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
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 0;
`
