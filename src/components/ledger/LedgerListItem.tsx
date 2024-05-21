import styled from 'styled-components'
import { LedgerDataProps } from '@/interface/LedgerProps'

const LedgerListItem = ({
  accountList,
  onClick
}: {
  accountList: LedgerDataProps
  onClick: () => void
}) => {
  return (
    <Container onClick={onClick}>
      <LedgerItem>
        <div>{accountList.title}</div>
        <div>{accountList.amount} 원</div>
      </LedgerItem>
      {accountList.memo && <Memo>{accountList.memo}</Memo>}
    </Container>
  )
}

export default LedgerListItem

const Container = styled.div`
  border-left: 4px solid ${({ theme }) => theme.color.sub};
  padding: 8px;
  cursor: pointer;
`

const LedgerItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  margin-top: 10px;

  &:nth-of-type(1) {
    margin-top: 0;
  }
`

const Memo = styled.div`
  color: ${({ theme }) => theme.gray.gray_300};
  font-size: 0.7rem;
  margin-top: 5px;
`
