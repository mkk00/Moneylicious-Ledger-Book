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
    <Container
      onClick={onClick}
      type={accountList.type}>
      <LedgerItem>
        <div>{accountList.title}</div>
        <div>{accountList.amount} 원</div>
      </LedgerItem>
      <Detail memo={accountList.memo}>
        {accountList.memo && <div>{accountList.memo}</div>}
        <div>{accountList.category}</div>
      </Detail>
    </Container>
  )
}

export default LedgerListItem

const Container = styled.div<{ type: string }>`
  border-left: 4px solid
    ${({ theme, type }) =>
      type === '지출' ? theme.color.sub : theme.color.main};
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

const Detail = styled.div<{ memo?: string }>`
  display: flex;
  justify-content: ${({ memo }) => (memo ? 'space-between' : 'flex-end')};
  align-items: center;
  font-size: 0.7rem;
  margin-top: 5px;
  color: ${({ theme }) => theme.gray.gray_300};
`
