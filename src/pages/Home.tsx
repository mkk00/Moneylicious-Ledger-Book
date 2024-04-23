import PageLayout from '@/layout/PageLayout'
import ContendsSplitLayout from '@/layout/ContendsSplitLayout'
import Calendar from '@/components/Calendar'

const Home = () => {
  return (
    <PageLayout>
      <ContendsSplitLayout leftRatio={3}>
        <Calendar />
        <></>
      </ContendsSplitLayout>
    </PageLayout>
  )
}

export default Home
