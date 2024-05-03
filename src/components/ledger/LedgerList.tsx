import { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { FaCircle } from 'react-icons/fa'
import { CiSquarePlus } from 'react-icons/ci'
import AddLedgerModal from '@/components/modal/AddLedgerModal'
import useModal from '@/hook/useModal'
import useDateStore from '@/store/useDateStore'
import ModalPortal from '@/components/modal/ModalPortal'

const LedgerList = () => {
  const [isEdit, setIsEdit] = useState(false)

  const { isOpen, openModal, closeModal } = useModal()

  const { color } = useTheme()

  const selectedDate = useDateStore(state => state.selectedDate)
  const formatSelectedDate = useDateStore(state => state.formatSelectedDate)

  const handleIsOpenAdd = () => {
    openModal('내역추가')
    setIsEdit(false)
  }

  const handleIsOpenEdit = () => {
    openModal('내역추가')
    setIsEdit(true)
  }

  return (
    <Container>
      {isOpen('내역추가') && (
        <ModalPortal>
          <AddLedgerModal
            IsClose={() => closeModal('내역추가')}
            isEdit={isEdit}
          />
        </ModalPortal>
      )}
      <LedgerHeader>
        <Title>
          <div>내역</div>
          <CiSquarePlus
            size={24}
            color={color.main_dark}
            onClick={handleIsOpenAdd}
          />
        </Title>
        <span>{selectedDate && formatSelectedDate(selectedDate)}</span>
      </LedgerHeader>
      <LedgerListWrapper>
        <LedgerItem onClick={handleIsOpenEdit}>
          <div>BBQ 치킨</div>
          <div>20,000원</div>
        </LedgerItem>
      </LedgerListWrapper>
      <Memo>소비 이유 메모</Memo>
      <Summary>
        <LedgerHeader>Total</LedgerHeader>
        <CountTotal>
          <div>수입</div>
          <Account type="plus">
            <FaCircle />
            1,800,000
          </Account>
        </CountTotal>
        <CountTotal>
          <div>지출</div>
          <Account type="minus">
            <FaCircle />
            2,000,000
          </Account>
        </CountTotal>
      </Summary>
    </Container>
  )
}

export default LedgerList

const Container = styled.div`
  padding: 20px;
  font-size: 0.9rem;
`

const LedgerHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.gray.gray_100};
  font-size: 1.2rem;

  & span {
    color: ${({ theme }) => theme.gray.gray_300};
    font-size: 0.9rem;
  }
`

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const LedgerListWrapper = styled.div`
  min-height: 181px;
  max-height: 275px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const LedgerItem = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  cursor: pointer;
`

const Memo = styled.div`
  max-height: 90px;
  margin: 20px 0;
  background-color: ${({ theme }) => theme.gray.gray_100};
  color: ${({ theme }) => theme.gray.gray_400};
  border-radius: 10px;
  padding: 15px;
  line-height: 1.2;
  font-size: 0.8rem;
`

const Summary = styled.div`
  margin-top: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.gray.gray_100};
`

const CountTotal = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Account = styled.div<{ type: string }>`
  display: flex;
  gap: 5px;
  align-items: center;
  font-size: 1.1rem;
  font-weight: bold;

  svg {
    color: ${({ theme, type }) =>
      type === 'plus' ? theme.color.main : theme.color.sub};
  }
`
