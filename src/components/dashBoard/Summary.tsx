import styled from 'styled-components'
import SummaryCard from './SummaryCard'
import { LedgerProps } from '@/interface/LedgerProps'
import { useTransformData } from '@/hook/useTransformData'

const Summary = ({ ledgerData }: { ledgerData: LedgerProps[] | null }) => {
  const currentYear = new Date().getFullYear()
  const currentData = ledgerData
    ? ledgerData?.filter(data => data.created_at_year === currentYear)
    : null

  const {
    totalExpense,
    totalIncome,
    maxExpenseData,
    minExpenseData,
    maxExpenseMonthData,
    maxCategoryData,
    minCategoryData
  } = useTransformData(currentData)

  const title_content: {
    id: number
    title: string
    content?: string
    description: () => string
  }[] = [
    {
      id: 0,
      title: '지금까지의 소비',
      content: `${totalExpense?.toLocaleString() || 0}원`,
      description: () => {
        return `지금까지의 소득은 ${totalIncome?.toLocaleString() || 0}원입니다.`
      }
    },
    {
      id: 1,
      title: '가장 큰 지출',
      content: `${maxExpenseData?.title || '-'} (${maxExpenseData?.amount || '0'}원)`,
      description: () => {
        const year = maxExpenseData?.created_at_year
        const month = maxExpenseData?.created_at_month
        const max = maxExpenseData?.amount
        const min = minExpenseData?.amount
        const diff = (
          Number(max?.replace(/,/g, '')) - Number(min?.replace(/,/g, ''))
        ).toLocaleString()

        return `${year}년 ${month}월에 가장 큰 소비 금액은 ${max || 0}원입니다. 가장 적은 소비 금액인 ${min || 0}원에 비해 ${diff || 0}원의 차이가 있습니다.`
      }
    },
    {
      id: 2,
      title: '가장 많이 소비한 달',
      content: `${maxExpenseMonthData?.key || '-'}월`,
      description: () => {
        const data = maxExpenseMonthData
        const month = data?.key
        const amount = data?.value.toLocaleString()
        return `${month || '-'}월의 소비 금액은 ${amount || 0}원 입니다.`
      }
    },
    {
      id: 3,
      title: '가장 많이 소비한 카테고리',
      content: maxCategoryData?.key || '-',
      description: () => {
        const maxCategory = maxCategoryData?.key
        const maxAmount = maxCategoryData?.value.toLocaleString()
        const minCategory = minCategoryData?.key
        const minAmount = minCategoryData?.value.toLocaleString()
        const diff = Math.abs(
          Number(maxAmount?.replace(/,/g, '')) -
            Number(minAmount?.replace(/,/g, ''))
        ).toLocaleString()
        return `${maxCategory || '-'} 카테고리의 총 소비 금액은 ${maxAmount || 0}원 입니다. 가장 적게 소비한 ${minCategory || '-'}(${minAmount || 0}원) 보다 ${diff || 0}원의 차이가 있습니다.`
      }
    }
  ]
  return (
    <Container>
      <Title>가계부 요약</Title>
      <Wrapper>
        {title_content.map(content => (
          <SummaryCard
            key={content.id}
            title={content.title}
            content={content.content}
            description={content.description}
          />
        ))}
      </Wrapper>
    </Container>
  )
}

export default Summary

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  margin-bottom: 60px;
`

const Title = styled.div`
  margin-top: 15px;
  font-size: 1.7rem;
  font-weight: bold;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
`
