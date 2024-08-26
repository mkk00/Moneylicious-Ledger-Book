import PageLayout from '@/layout/PageLayout'
import ContendsSplitLayout from '@/layout/ContendsSplitLayout'
import Calendar from '@/components/calendar/Calendar'
import LedgerList from '@/components/ledger/LedgerList'
import useDateStore from '@/store/useDateStore'
import MyLoginInfo from '@/components/userInfo/MyLoginInfo'
import useAuthStore from '@/store/useAuthStore'
import { useResponsive } from '@/hook/useMediaQuery'
import MetaTags from '@/components/common/MetaTag'
import { getTotalAmount } from '@/api/calendarApi'
import { calculateDailySummary } from '@/utils/totalAccount'
import { DailySummaryProps } from '@/interface/LedgerProps'
import { useState } from 'react'

const Home = () => {
  const selectedDate = useDateStore(state => state.selectedDate)
  const { userInfo } = useAuthStore()
  const { isDesktopOrLaptop } = useResponsive()

  const currentDate = useDateStore(state => state.currentDate)

  const [total, setTotal] = useState<DailySummaryProps[] | null>(null)

  const getDailyTotal = async () => {
    const data = await getTotalAmount(
      currentDate.getFullYear(),
      currentDate.getMonth()
    )
    if (data) {
      const totalData = calculateDailySummary(data)
      setTotal(totalData)
    }
  }

  return (
    <PageLayout>
      <MetaTags
        title="Moneylicious - 자산 관리는 Deliciously 하게"
        description="캘린더에 나의 수입, 지출 내역을 추가해보세요."
        url="https://moneylicious.vercel.app/"
      />
      <ContendsSplitLayout
        left={
          <Calendar
            getDailyTotal={getDailyTotal}
            dailyTotalAmount={total}
          />
        }
        center={
          selectedDate && userInfo?.accessToken ? (
            <LedgerList getDailyTotal={getDailyTotal} />
          ) : (
            <></>
          )
        }
        right={isDesktopOrLaptop && <MyLoginInfo />}
        flex={userInfo?.accessToken ? [2, 1, 1] : [4, 1, 2]}
      />
    </PageLayout>
  )
}

export default Home
