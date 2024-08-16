import MonthlyChart from '@/components/dashBoard/MonthlyChart'
import PageLayout from '@/layout/PageLayout'
import { supabase } from '@/supabaseconfig'
import { useEffect, useState } from 'react'
import { LedgerProps } from '@/interface/LedgerProps'
import YearlyCell from '@/components/dashBoard/YearlyCell'
import CategoryChart from '@/components/dashBoard/CategoryChart'
import useAuthStore from '@/store/useAuthStore'
import useModal from '@/hook/useModal'
import ModalPortal from '@/components/modal/ModalPortal'
import LoginModal from '@/components/modal/LoginModal'
import Summary from '@/components/dashBoard/Summary'
import MetaTags from '@/components/common/MetaTag'

const Dashboard = () => {
  const { userInfo } = useAuthStore()
  const { isOpen, openModal, closeModal } = useModal()

  const [ledgerData, setLedgerData] = useState<LedgerProps[] | null>(null)
  const [selectYear, setSelectYear] = useState(new Date().getFullYear())
  const [selectMonth, setSelectMonth] = useState(new Date().getMonth() + 1)
  const [type, setType] = useState('지출')

  const getLederData = async () => {
    try {
      const { data, error } = await supabase.from('ledger').select('*')

      if (data) {
        setLedgerData(data)
      } else {
        setLedgerData(null)
      }
      if (error) throw error
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!userInfo?.accessToken) {
      confirm('로그인이 필요한 서비스입니다.') && openModal('로그인')
    } else {
      getLederData()
    }
  }, [])

  return (
    <PageLayout>
      <MetaTags
        title="Moneylicious - 대시보드"
        description="가계부 내역을 차트를 통해 한눈에 확인해보세요."
        url="https://moneylicious.vercel.app/dashboard"
      />
      <Summary ledgerData={ledgerData} />
      <MonthlyChart
        ledgerData={ledgerData}
        selectYear={selectYear}
        setSelectYear={setSelectYear}
        setSelectMonth={setSelectMonth}
        type={type}
        setType={setType}
      />
      <CategoryChart
        ledgerData={ledgerData}
        selectMonth={selectMonth}
        setSelectMonth={setSelectMonth}
      />
      <YearlyCell ledgerData={ledgerData} />
      <CategoryChart ledgerData={ledgerData} />
      {isOpen('로그인') && (
        <ModalPortal>
          <LoginModal closeModal={() => closeModal('로그인')} />
        </ModalPortal>
      )}
    </PageLayout>
  )
}

export default Dashboard
