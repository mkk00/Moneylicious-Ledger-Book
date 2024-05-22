import styled from 'styled-components'
import ModalLayout from '@/components/modal/ModalLayout'
import { CATEGORY_LIST, INCOME_LIST } from '@/data/categoryList'
import useSelectLedgerStore from '@/store/useSelectLedgerStore'

const CategoryModal = ({
  closeModal,
  type
}: {
  closeModal: (key: string) => void
  type: '지출' | '수입'
}) => {
  const setSelectCategory = useSelectLedgerStore(state => state.setCategory)

  return (
    <ModalLayout closeModal={() => closeModal(`${type}카테고리`)}>
      <Container>
        {type === '지출'
          ? CATEGORY_LIST.map(item => (
              <CategoryItemList
                key={item.id}
                type={type}
                onClick={() => {
                  setSelectCategory(item)
                  closeModal('지출카테고리')
                }}>
                <div>{item.icon}</div>
                <span>{item.category}</span>
              </CategoryItemList>
            ))
          : INCOME_LIST.map(item => (
              <CategoryItemList
                key={item.id}
                type={type}
                onClick={() => {
                  setSelectCategory(item)
                  closeModal('수입카테고리')
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
