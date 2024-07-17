import PageLayout from '@/layout/PageLayout'
import ContendsSplitLayout from '@/layout/ContendsSplitLayout'
import Calendar from '@/components/calendar/Calendar'
import LedgerList from '@/components/ledger/LedgerList'
import useDateStore from '@/store/useDateStore'
import MyLoginInfo from '@/components/userInfo/MyLoginInfo'
import useAuthStore from '@/store/useAuthStore'
import { useResponsive } from '@/hook/useMediaQuery'

const Home = () => {
  const selectedDate = useDateStore(state => state.selectedDate)
  const { userInfo } = useAuthStore()
  const { isDesktopOrLaptop } = useResponsive()

  return (
    <PageLayout>
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
