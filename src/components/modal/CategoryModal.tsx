import styled from 'styled-components'
import ModalLayout from '@/components/modal/ModalLayout'
import { CATEGORY_LIST } from '@/data/categoryList'
import useSelectLedgerStore from '@/store/useSelectLedgerStore'

const CategoryModal = ({
  closeModal
}: {
  closeModal: (key: string) => void
}) => {
  const setSelectCategory = useSelectLedgerStore(state => state.setCategory)

  return (
    <ModalLayout closeModal={() => closeModal('카테고리')}>
      <Container>
        {CATEGORY_LIST.map(item => (
          <CategoryItemList
            key={item.id}
            onClick={() => {
              setSelectCategory(item)
              closeModal('카테고리')
            }}>
            <div>{item.icon}</div>
            <span>{item.category}</span>
          </CategoryItemList>
        ))}
      </Container>
    </ModalLayout>
  )
}

export default CategoryModal

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
