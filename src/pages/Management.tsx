import Summary from '@/components/management/Summary'
import PageLayout from '@/layout/PageLayout'
import styled from 'styled-components'
import { supabase } from '@/supabaseconfig'
import { useEffect, useState } from 'react'
import { LedgerProps } from '@/interface/LedgerProps'
import useAuthStore from '@/store/useAuthStore'
import useModal from '@/hook/useModal'
import ModalPortal from '@/components/modal/ModalPortal'
import LoginModal from '@/components/modal/LoginModal'
import LedgerDetailList from '@/components/management/LedgerDetailList'
import AssetsDetailList from '@/components/management/AssetsDetailList'

const Management = () => {
  const { userInfo } = useAuthStore()
  const { isOpen, openModal, closeModal } = useModal()

  const [isOpenDetail, setIsOpenDetail] = useState(false)
  const [isOpenAssets, setIsOpenAssets] = useState(false)
  const [ledgerData, setLedgerData] = useState<LedgerProps[] | null>(null)

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
      <Title>자산</Title>
      <SummaryWrapper>
        <Summary
          ledgerData={ledgerData}
          setOpenCash={setIsOpenDetail}
          setOpenAssets={setIsOpenAssets}
        />
      </SummaryWrapper>
      {isOpenDetail && <LedgerDetailList ledgerData={ledgerData} />}
      {isOpenAssets && <AssetsDetailList ledgerData={ledgerData} />}
      {isOpen('로그인') && (
        <ModalPortal>
          <LoginModal closeModal={() => closeModal('로그인')} />
        </ModalPortal>
      )}
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
