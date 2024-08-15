import styled from 'styled-components'
import { LedgerProps } from '@/interface/LedgerProps'
import { useState } from 'react'
import SelectBox from '@/components/input/SelectBox'
import { getUniqueYears } from '@/utils/getLedgerUtils'

const LedgerDetailList = ({
  ledgerData
}: {
  ledgerData: LedgerProps[] | null
}) => {
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 1

  const [selectYear, setSelectYear] = useState(currentYear)
  const [selectMonth, setSelectMonth] = useState(currentMonth)

  const monthList = Array.from(
    { length: currentMonth },
    (_, index) => index + 1
  )
  const yearList = getUniqueYears(ledgerData)

  const filteredMonthDate = ledgerData
    ? ledgerData.filter(
        date =>
          date.created_at_month === selectMonth &&
          date.created_at_year === selectYear
      )
    : []

  const groupByDate = filteredMonthDate?.reduce(
    (acc, obj) => {
      const date = obj.created_at.split('T')[0]

      if (!acc[date]) {
        acc[date] = []
      }

      acc[date].push(obj)
      return acc
    },
    {} as Record<string, LedgerProps[]>
  )

  const sortedGroupByDate = Object.keys(groupByDate)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .reduce(
      (acc, obj) => {
        acc[obj] = groupByDate[obj]
        return acc
      },
      {} as Record<string, (typeof groupByDate)[string]>
    )
  console.log(sortedGroupByDate)

  return (
    <Container>
      <Title>
        현금 이용 내역
        <SelectWrapper>
          <SelectBox
            selectItem={selectYear}
            setSelectItem={setSelectYear}
            items={yearList}
          />
          <SelectBox
            selectItem={selectMonth}
            setSelectItem={setSelectMonth}
            items={monthList}
          />
        </SelectWrapper>
      </Title>
      <Wrapper>
        {sortedGroupByDate &&
          Object.keys(sortedGroupByDate).map(date => (
            <div key={date}>
              <LedgerDate>{date}</LedgerDate>
              <LedgerList>
                {sortedGroupByDate[date].map(item => (
                  <LedgerListItem key={item.id}>
                    <div>{item.category}</div>
                    <Content>
                      <div>{item.title}</div>
                      <span>{item.memo}</span>
                    </Content>
                    <span>{item.means}</span>
                    <Amount $type={item.type}>
                      {item.type === '지출' ? '-' : '+'}
                      {item.amount}원
                    </Amount>
                  </LedgerListItem>
                ))}
              </LedgerList>
            </div>
          ))}
        {Object.keys(sortedGroupByDate).length === 0 && (
          <span>선택한 월에 해당하는 이용내역이 없습니다.</span>
        )}
      </Wrapper>
    </Container>
  )
}

export default LedgerDetailList

const Container = styled.div`
  width: 600px;
  margin: 50px auto;
`

const Title = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: normal;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px auto;

  & > span {
    padding: 30px 0;
    text-align: center;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.gray.gray_300};
  }
`

const LedgerList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
  margin-bottom: 10px;
`

const LedgerListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border: 1px solid ${({ theme }) => theme.gray.gray_200};
  border-radius: 8px;
  font-size: 0.9rem;

  & span {
    font-size: 0.7rem;
    color: ${({ theme }) => theme.gray.gray_300};
  }

  & > div:first-of-type {
    width: 80px;
  }
  & > div:last-of-type {
    width: 100px;
    text-align: right;
  }
`

const Content = styled.div`
  flex-grow: 1;
`

const LedgerDate = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 10px;
`

const Amount = styled.div<{ $type: string }>`
  font-weight: bold;
  color: ${({ theme, $type }) =>
    $type === '지출' ? theme.color.sub_dark : theme.color.main};
`
