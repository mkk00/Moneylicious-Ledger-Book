import styled, { css } from 'styled-components'
import ModalLayout from '@/components/modal/ModalLayout'
import { MENAS_LIST } from '@/data/meansList'
import useSelectLedgerStore from '@/store/useSelectLedgerStore'

const MeansModal = ({
  closeModal,
  type
}: {
  closeModal: (key: string) => void
  type: '지출' | '수입'
}) => {
  const setMeans = useSelectLedgerStore(state => state.setMeans)
  return (
    <ModalLayout closeModal={() => closeModal('수단')}>
      <Container type={type}>
        {type === '지출' ? (
          MENAS_LIST.map(item => (
            <CategoryItemList
              key={item.id}
              type={type}
              onClick={() => {
                setMeans(item)
                closeModal('수단')
              }}>
              <div>{item.icon}</div>
              <span>{item.means}</span>
            </CategoryItemList>
          ))
        ) : (
          <CategoryItemList
            key={MENAS_LIST[0].id}
            type={type}
            onClick={() => {
              setMeans(MENAS_LIST[0])
              closeModal('수단')
            }}>
            <div>{MENAS_LIST[0].icon}</div>
            <span>{MENAS_LIST[0].means}</span>
          </CategoryItemList>
        )}
      </Container>
    </ModalLayout>
  )
}

export default MeansModal

const Container = styled.div<{ type: string }>`
  width: auto;

  ${({ type }) =>
    type === '지출' &&
    css`
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 5px;
    `}
`

const CategoryItemList = styled.button<{ type: '지출' | '수입' }>`
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
    background-color: ${({ theme, type }) =>
      type === '지출' ? theme.color.sub : theme.color.main_light};
    color: ${({ theme }) => theme.color.white};
    border-radius: 15px;
  }
`
