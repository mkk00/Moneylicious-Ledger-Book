import styled from 'styled-components'
import ModalLayout from '@/components/modal/ModalLayout'
import { MENAS_LIST } from '@/data/meansList'
import useSelectLedgerStore from '@/store/useSelectLedgerStore'

const MeansModal = ({ closeModal }: { closeModal: (key: string) => void }) => {
  const setMeans = useSelectLedgerStore(state => state.setMeans)
  return (
    <ModalLayout closeModal={() => closeModal('수단')}>
      <Container>
        {MENAS_LIST.map(item => (
          <CategoryItemList
            key={item.id}
            onClick={() => {
              setMeans(item)
              closeModal('수단')
            }}>
            <div>{item.icon}</div>
            <span>{item.means}</span>
          </CategoryItemList>
        ))}
      </Container>
    </ModalLayout>
  )
}

export default MeansModal

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
`

const CategoryItemList = styled.button`
  width: 65px;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 7px;

  & > span {
    font-size: 0.7rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.main_light};
    color: ${({ theme }) => theme.color.white};
    border-radius: 15px;
  }
`
