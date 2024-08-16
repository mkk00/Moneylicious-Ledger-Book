import PageLayout from '@/layout/PageLayout'
import ContendsSplitLayout from '@/layout/ContendsSplitLayout'
import Calendar from '@/components/calendar/Calendar'
import LedgerList from '@/components/ledger/LedgerList'
import useDateStore from '@/store/useDateStore'
import MyLoginInfo from '@/components/userInfo/MyLoginInfo'
import useAuthStore from '@/store/useAuthStore'
import { useResponsive } from '@/hook/useMediaQuery'
import MetaTags from '@/components/common/MetaTag'

const Home = () => {
  const selectedDate = useDateStore(state => state.selectedDate)
  const { userInfo } = useAuthStore()
  const { isDesktopOrLaptop } = useResponsive()

  return (
    <PageLayout>
      <MetaTags
        title="Moneylicious - 자산 관리는 Deliciously 하게"
        description="캘린더에 나의 수입, 지출 내역을 추가해보세요."
        url="https://moneylicious.vercel.app/"
      />
      <ContendsSplitLayout
        left={<Calendar />}
        center={selectedDate && userInfo?.accessToken ? <LedgerList /> : <></>}
        right={isDesktopOrLaptop && <MyLoginInfo />}
        flex={userInfo?.accessToken ? [2, 1, 1] : [4, 1, 2]}
      />
    </PageLayout>
  )
}

export default Home
