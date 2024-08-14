import SummaryCard from '@/components/dashBoard/SummaryCard'
import styled from 'styled-components'
import { LedgerProps } from '@/interface/LedgerProps'
import { useTransformData } from '@/hook/useTransformData'
import { supabase } from '@/supabaseconfig'
import { useEffect, useState } from 'react'
import { AssetsProps } from '@/interface/AssetsProps'

const Summary = ({ ledgerData }: { ledgerData: LedgerProps[] | null }) => {
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

  const getIlliquidAssetsData = async () => {
    try {
      const { data, error } = await supabase
        .from('assets')
        .select('*')
        .eq('type', '비유동자산')
        .returns<AssetsProps[] | null>()

      if (data) {
        setAssetsData(data)
        if (assetsData) {
          const total =
            assetsData?.reduce((acc, obj) => {
              return acc + obj.amount
            }, 0) || 0
          return setAssetsAmount(total)
        }
      } else {
        setAssetsData(null)
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

  useEffect(() => {
    getIlliquidAssetsData()
    getSavingMoney()
  }, [ledgerData])

  return (
    <Wrapper>
      <SummaryCard
        title="현금"
        content={`${currentCash.toLocaleString() || 0}원`}
        description={() => {
          return currentCash < 0 ? '지출 금액이 더 많습니다.' : ''
        }}
      />
      <SummaryCard
        title="내 자산"
        content={`${assetsAmount.toLocaleString() || 0}원`}
        description={() => ''}
      />
      <SummaryCard
        title="한달 소비 계획"
        content="380,000원"
        description={() => {
          return `현재 지출 금액은 ${totalExpense?.toLocaleString() || 0}원 입니다.`
        }}
      />
      <SummaryCard
        title="연간 저축 목표"
        content="380,000원"
        description={() => {
          return `현재 저축액은 ${currentSaving.toLocaleString() || 0}원 입니다.`
        }}
      />
    </Wrapper>
  )
}

export default Summary

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
`
