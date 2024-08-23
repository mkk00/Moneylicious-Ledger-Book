import SummaryCard from '@/components/dashBoard/SummaryCard'
import styled from 'styled-components'
import { LedgerProps } from '@/interface/LedgerProps'
import { useTransformData } from '@/hook/useTransformData'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AssetsProps, AssetsTargetProps } from '@/interface/AssetsProps'
import useModal from '@/hook/useModal'
import ModalPortal from '@/components/modal/ModalPortal'
import AssetsSummaryModal from '@/components/modal/AssetsSummaryModal'
import { parseAmount } from '@/utils/getLedgerUtils'
import { selectAssetsTarget } from '@/api/assetsApi'
import { getMonthlyTrend } from '@/utils/getLedgerTrends'
import { useResponsive } from '@/hook/useMediaQuery'

const Summary = ({
  ledgerData,
  assetsData,
  setOpenCash,
  setOpenAssets,
  fetchAssetsData
}: {
  ledgerData: LedgerProps[] | null
  assetsData: AssetsProps[] | null
  setOpenCash: Dispatch<SetStateAction<boolean>>
  setOpenAssets: Dispatch<SetStateAction<boolean>>
  fetchAssetsData: () => Promise<void>
}) => {
  const { isMobile } = useResponsive()
  const { isOpen, openModal, closeModal } = useModal()

  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth()
  const currentData = ledgerData
    ? ledgerData?.filter(data => data.created_at_year === currentYear)
    : null

  const { totalToMonthExpense, totalToMonthIncome } =
    useTransformData(currentData)
  const currentCash =
    (totalToMonthIncome ? totalToMonthIncome : 0) -
    (totalToMonthExpense ? totalToMonthExpense : 0)

  const monthTrend = getMonthlyTrend(ledgerData, currentYear)
  const currentMonthexpense = monthTrend[currentMonth].expense

  const [assetsAmount, setAssetsAmount] = useState(0)
  const [currentSaving, setCurrentSaving] = useState(0)

  const [assetsTargetData, setAssetsTargetData] =
    useState<AssetsTargetProps | null>(null)

  const getSavingMoney = () => {
    const total = ledgerData?.reduce((acc, obj) => {
      if (obj.category === '저축' || obj.category === '보험') {
        return acc + Number(obj.amount.replace(/,/g, ''))
      }
      return acc
    }, 0)

    total && setCurrentSaving(total)
  }

  const getAssetsTargetData = async () => {
    const data = await selectAssetsTarget()
    if (data) {
      setAssetsTargetData(data[0])
    }
  }

  const getTotalAssetsAmount = (assetsData: AssetsProps[] | null) => {
    if (assetsData) {
      const total = assetsData.reduce((acc, obj) => {
        return acc + parseAmount(obj.amount)
      }, 0)
      setAssetsAmount(total)
    }
  }

  useEffect(() => {
    fetchAssetsData()
    getSavingMoney()
  }, [ledgerData])

  useEffect(() => {
    getAssetsTargetData()
  }, [])

  useEffect(() => {
    getTotalAssetsAmount(assetsData)
  }, [assetsData])

  return (
    <Wrapper $isMobile={isMobile}>
      <SummaryCard
        title="현금"
        content={`${currentCash.toLocaleString() || 0}원`}
        description={() => {
          return currentCash < 0 ? '지출 금액이 더 많습니다.' : ''
        }}
        onClick={() => {
          setOpenCash(prev => !prev)
          setOpenAssets(false)
        }}
      />
      <SummaryCard
        title="내 자산"
        content={`${assetsAmount.toLocaleString() || 0}원`}
        description={() => ''}
        onClick={() => {
          setOpenAssets(prev => !prev)
          setOpenCash(false)
        }}
      />
      <SummaryCard
        title="한달 소비 계획 설정"
        content={`${assetsTargetData?.expense || 0}원`}
        description={() => {
          return `현재 지출 금액은 ${currentMonthexpense?.toLocaleString() || '0'}원 입니다.`
        }}
        onClick={() => openModal('소비')}
      />
      <SummaryCard
        title="연간 저축 목표 설정"
        content={`${assetsTargetData?.saving || 0}원`}
        description={() => {
          return `현재 저축액은 ${currentSaving.toLocaleString() || 0}원 입니다.`
        }}
        onClick={() => openModal('저축')}
      />
      {isOpen('소비') && (
        <ModalPortal>
          <AssetsSummaryModal
            type="소비"
            assetsTargetData={assetsTargetData}
            getAssetsTargetData={getAssetsTargetData}
            closeModal={() => closeModal('소비')}
          />
        </ModalPortal>
      )}
      {isOpen('저축') && (
        <ModalPortal>
          <AssetsSummaryModal
            type="저축"
            assetsTargetData={assetsTargetData}
            getAssetsTargetData={getAssetsTargetData}
            closeModal={() => closeModal('저축')}
          />
        </ModalPortal>
      )}
    </Wrapper>
  )
}

export default Summary

const Wrapper = styled.div<{ $isMobile: boolean }>`
  display: grid;
  grid-template-columns: ${({ $isMobile }) =>
    $isMobile ? 'repeat(1, 1fr)' : 'repeat(2, 1fr)'};
  gap: 30px;
`
