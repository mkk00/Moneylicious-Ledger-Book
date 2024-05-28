import PageLayout from '@/layout/PageLayout'
import ContendsSplitLayout from '@/layout/ContendsSplitLayout'
import Calendar from '@/components/calendar/Calendar'
import LedgerList from '@/components/ledger/LedgerList'
import useDateStore from '@/store/useDateStore'
import MyLoginInfo from '@/components/userInfo/MyLoginInfo'
import useAuthStore from '@/store/useAuthStore'

const Home = () => {
  const selectedDate = useDateStore(state => state.selectedDate)
  const { userInfo } = useAuthStore()

  return (
    <PageLayout>
      <ContendsSplitLayout
        left={<Calendar />}
        center={selectedDate && userInfo ? <LedgerList /> : <></>}
        right={<MyLoginInfo />}
        flex={[2, 1, 1]}
      />
    </PageLayout>
  )
}

export default Home
