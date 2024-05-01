import PageLayout from '@/layout/PageLayout'
import ContendsSplitLayout from '@/layout/ContendsSplitLayout'
import Calendar from '@/components/calendar/Calendar'
import LedgerList from '@/components/ledger/LedgerList'
import useDateStore from '@/store/useDateStore'

const Home = () => {
  const selectedDate = useDateStore(state => state.selectedDate)

  return (
    <PageLayout>
      <ContendsSplitLayout>
        <Calendar />
        {selectedDate && <LedgerList />}
        <></>
      </ContendsSplitLayout>
    </PageLayout>
  )
}

export default Home
