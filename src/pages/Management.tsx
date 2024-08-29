import Summary from '@/components/management/Summary'
import PageLayout from '@/layout/PageLayout'
import styled from 'styled-components'
import { supabase } from '@/supabaseconfig'
import { useEffect, useState } from 'react'
import { LedgerProps } from '@/interface/LedgerProps'
import useAuthStore from '@/store/useAuthStore'
import LedgerDetailList from '@/components/management/LedgerDetailList'
import AssetsDetailList from '@/components/management/AssetsDetailList'
import { useNavigate } from 'react-router-dom'
import NoData from '@/components/common/NoData'
import { selectIlliquidAsset } from '@/api/assetsApi'
import { AssetsProps } from '@/interface/AssetsProps'

const Management = () => {
  const { userInfo } = useAuthStore()
  const navigate = useNavigate()

  const [isOpenDetail, setIsOpenDetail] = useState(false)
  const [isOpenAssets, setIsOpenAssets] = useState(true)
  const [ledgerData, setLedgerData] = useState<LedgerProps[] | null>(null)
  const [assetsData, setAssetsData] = useState<AssetsProps[] | null>(null)

  const fetchLederData = async () => {
    try {
      const { data, error } = await supabase.from('ledger').select('*')

      if (data && data?.length > 0) {
        setLedgerData(data)
      }
      if (error) throw error
    } catch (error) {
      console.error(error)
    }
  }

  const fetchAssetsData = async () => {
    const assets = await selectIlliquidAsset()

    if (assets) {
      setAssetsData(assets)
    }
  }

  useEffect(() => {
    if (!userInfo?.accessToken) {
      navigate('/loginRequired')
    } else {
      fetchLederData()
      fetchAssetsData()
    }
  }, [])

  return (
    <PageLayout>
      <Title>자산</Title>
      <SummaryWrapper>
        <Summary
          ledgerData={ledgerData}
          assetsData={assetsData}
          setOpenCash={setIsOpenDetail}
          setOpenAssets={setIsOpenAssets}
          fetchAssetsData={fetchAssetsData}
        />
      </SummaryWrapper>
      {isOpenDetail && <LedgerDetailList ledgerData={ledgerData} />}
      {isOpenAssets && (
        <AssetsDetailList
          assetsData={assetsData}
          fetchAssetsData={fetchAssetsData}
        />
      )}
      {!ledgerData && <NoData />}
    </PageLayout>
  )
}

export default Management

const Title = styled.div`
  font-size: 1.7rem;
  font-weight: bold;
  text-align: center;
  padding: 20px 0;
`

const SummaryWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`
