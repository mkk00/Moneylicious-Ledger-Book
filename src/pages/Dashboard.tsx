import MonthlyChart from '@/components/dashBoard/MonthlyChart'
import PageLayout from '@/layout/PageLayout'
import { supabase } from '@/supabaseconfig'
import { useEffect, useState } from 'react'
import { LedgerProps } from '@/interface/LedgerProps'
import YearlyCell from '@/components/dashBoard/YearlyCell'
import CategoryChart from '@/components/dashBoard/CategoryChart'

const Dashboard = () => {
  const [ledgerData, setLedgerData] = useState<LedgerProps[] | null>(null)
  const [selectYear, setSelectYear] = useState(new Date().getFullYear())
  const [type, setType] = useState('지출')

  const getLederData = async () => {
    try {
      const { data, error } = await supabase.from('ledger').select('*')

      if (data) {
        setLedgerData(data)
        ledgerData && console.log(ledgerData)
      } else {
        setLedgerData(null)
      }
      if (error) throw error
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getLederData()
  }, [])
  return (
    <PageLayout>
      <MonthlyChart
        ledgerData={ledgerData}
        selectYear={selectYear}
        setSelectYear={setSelectYear}
        type={type}
        setType={setType}
      />
      <YearlyCell ledgerData={ledgerData} />
      <CategoryChart ledgerData={ledgerData} />
    </PageLayout>
  )
}

export default Dashboard
