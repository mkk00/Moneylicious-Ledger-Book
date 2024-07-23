import MonthlyChart from '@/components/dashBoard/MonthlyChart'
import PageLayout from '@/layout/PageLayout'
import { supabase } from '@/supabaseconfig'
import { useEffect, useState } from 'react'
import { LedgerProps } from '@/interface/LedgerProps'

const Dashboard = () => {
  const [ledgerData, setLedgerData] = useState<LedgerProps[] | null>(null)

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
      <MonthlyChart ledgerData={ledgerData} />
    </PageLayout>
  )
}

export default Dashboard
