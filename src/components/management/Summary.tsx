import SummaryCard from '@/components/dashBoard/SummaryCard'
import styled from 'styled-components'
import { LedgerProps } from '@/interface/LedgerProps'
import { useTransformData } from '@/hook/useTransformData'
import { supabase } from '@/supabaseconfig'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AssetsProps, AssetsTargetProps } from '@/interface/AssetsProps'
import useModal from '@/hook/useModal'
import ModalPortal from '@/components/modal/ModalPortal'
import AssetsSummaryModal from '@/components/modal/AssetsSummaryModal'

const Summary = ({
  ledgerData,
  setOpenCash,
  setOpenAssets
}: {
  ledgerData: LedgerProps[] | null
  setOpenCash: Dispatch<SetStateAction<boolean>>
  setOpenAssets: Dispatch<SetStateAction<boolean>>
}) => {
  const { isOpen, openModal, closeModal } = useModal()

  const currentYear = new Date().getFullYear()
  const currentData = ledgerData
    ? ledgerData?.filter(data => data.created_at_year === currentYear)
    : null

  const { totalExpense, totalIncome } = useTransformData(currentData)
  const currentCash =
    (totalIncome ? totalIncome : 0) - (totalExpense ? totalExpense : 0)

  const [assetsData, setAssetsData] = useState<AssetsProps[] | null>(null)
  const [assetsAmount, setAssetsAmount] = useState(0)
  const [currentSaving, setCurrentSaving] = useState(0)

  const [assetsTargetData, setAssetsTargetData] =
    useState<AssetsTargetProps | null>(null)

  const getIlliquidAssetsData = async () => {
    try {
      const { data, error } = await supabase
        .from('assets')
        .select('*')
        .eq('type', '비유동자산')
        .returns<AssetsProps[] | null>()

      if (data) {
        setAssetsData(data)
        const total = assetsData?.reduce((acc, obj) => {
          return acc + obj.amount
        }, 0)
        total && setAssetsAmount(total)
      }
      if (error) throw error
    } catch (error) {
      console.error(error)
    }
  }

  const getSavingMoney = () => {
    const total = ledgerData?.reduce((acc, obj) => {
      if (obj.category === '저축' || obj.category === '보험') {
        return acc + Number(obj.amount.replace(/,/g, ''))
      }
      return acc
    }, 0)

    total && setCurrentSaving(total)
  }

  const getAssetsData = async () => {
    try {
      const { data, error } = await supabase
        .from('assetsTarget')
        .select()
        .returns<AssetsTargetProps[] | null>()
      if (data) {
        setAssetsTargetData(data[0])
      }
      if (error) throw error
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getIlliquidAssetsData()
    getSavingMoney()
  }, [ledgerData])

  useEffect(() => {
    getAssetsData()
  }, [])

  return (
    <Wrapper>
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
          return `현재 지출 금액은 ${totalExpense?.toLocaleString() || '0'}원 입니다.`
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
            getAssetsData={getAssetsData}
            closeModal={() => closeModal('소비')}
          />
        </ModalPortal>
      )}
      {isOpen('저축') && (
        <ModalPortal>
          <AssetsSummaryModal
            type="저축"
            assetsTargetData={assetsTargetData}
            getAssetsData={getAssetsData}
            closeModal={() => closeModal('저축')}
          />
        </ModalPortal>
      )}
    </Wrapper>
  )
}

export default Summary

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
`
