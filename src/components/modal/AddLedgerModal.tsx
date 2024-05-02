import { useEffect } from 'react'
import styled from 'styled-components'
import ModalLayout from '@/components/modal/ModalLayout'
import CategoryModal from '@/components/modal/CategoryModal'
import MeansModal from '@/components/modal/MeansModal'
import IconButton from '@/components/button/IconButton'
import { CATEGORY_LIST } from '@/data/categoryList'
import { MENAS_LIST } from '@/data/meansList'
import useModal from '@/hook/useModal'
import ModalPortal from '@/components/modal/ModalPortal'
import useDateStore from '@/store/useDateStore'
import useFormControl from '@/hook/useFormControl'
import { ledgerFormInitialValues } from '@/constants/ledgerFormInitialValues'
import useSelectLedgerStore from '@/store/useSelectLedgerStore'

const AddLedgerModal = ({
  IsClose,
  isEdit
}: {
  IsClose: () => void
  isEdit: boolean
}) => {
  const { values, handleChange, category, setCategory, means, setMeans } =
    useFormControl(ledgerFormInitialValues)

  const selectCategory = useSelectLedgerStore(state => state.category)
  const setSelectCategory = useSelectLedgerStore(state => state.setCategory)
  const selectMeans = useSelectLedgerStore(state => state.means)
  const setSelectMeans = useSelectLedgerStore(state => state.setMeans)

  const selectedDate = useDateStore(state => state.selectedDate)
  const formatSelectedDate = useDateStore(state => state.formatSelectedDate)

  const { isOpen, openModal, closeModal } = useModal()

  const handleAddLedgerItem = () => {}
  const handleEditLedgerItem = () => {}
  const handleDeleteLedgerItem = () => {}

  useEffect(() => {
    if (selectCategory.category !== category)
      setCategory(selectCategory.category)

    if (selectMeans.means !== means) setMeans(selectMeans.means)
  }, [selectCategory, category, setCategory])

  useEffect(() => {
    setSelectCategory(CATEGORY_LIST[0])
    setSelectMeans(MENAS_LIST[0])
  }, [setSelectCategory, setSelectMeans])

  return (
    <ModalLayout closeModal={IsClose}>
      <Title>{isEdit ? '기록 수정' : '기록 추가'}</Title>
      <LedgerDate>
        {selectedDate && formatSelectedDate(selectedDate)}
      </LedgerDate>
      {isOpen('카테고리') && (
        <ModalPortal>
          <CategoryModal closeModal={closeModal} />
        </ModalPortal>
      )}
      {isOpen('수단') && (
        <ModalPortal>
          <MeansModal closeModal={closeModal} />
        </ModalPortal>
      )}
      <LedgerForm>
        <label>
          내역
          <input
            type="text"
            name="description"
            value={values.description}
            onChange={e => handleChange(e)}
          />
        </label>
        <label>
          금액
          <input
            type="number"
            name="amount"
            value={values.amount}
            onChange={e => handleChange(e)}
          />
        </label>
        <label>
          카테고리
          <CategoryInputWrapper>
            <input
              type="text"
              name="category"
              value={selectCategory.category}
              onChange={e => handleChange(e)}
              onClick={e => {
                e.preventDefault()
                openModal('카테고리')
              }}
              readOnly
            />
            {selectCategory.icon}
          </CategoryInputWrapper>
        </label>
        <label>
          수단
          <CategoryInputWrapper>
            <input
              type="text"
              name="means"
              value={selectMeans.means}
              onChange={e => handleChange(e)}
              onClick={e => {
                e.preventDefault()
                openModal('수단')
              }}
              readOnly
            />
            {selectMeans.icon}
          </CategoryInputWrapper>
        </label>
        <label>
          메모
          <textarea
            name="memo"
            value={values.memo}
            onChange={e => handleChange(e)}
            maxLength={50}
          />
        </label>
      </LedgerForm>
      <ButtonWrapper>
        {!isEdit && (
          <IconButton
            type="add"
            onClick={handleAddLedgerItem}
          />
        )}
        {isEdit && (
          <>
            <IconButton
              type="edit"
              onClick={handleEditLedgerItem}
            />
            <IconButton
              type="del"
              onClick={handleDeleteLedgerItem}
            />
          </>
        )}
      </ButtonWrapper>
    </ModalLayout>
  )
}

export default AddLedgerModal

const Title = styled.div`
  width: 100%;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 10px 0 5px 0;
  text-align: center;
`

const LedgerDate = styled.button`
  width: fit-content;
  display: block;
  margin: 0 auto;
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 2px;
  padding: 4px 13px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.color.main};
  color: ${({ theme }) => theme.color.white};
`

const LedgerForm = styled.form`
  margin: 20px;
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  & label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    height: 40px;
  }

  & input,
  & textarea {
    width: 150px;
    height: 100%;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.gray.gray_200};
    padding: 5px 15px;

    &:focus {
      outline: none;
      border-bottom: 1px solid ${({ theme }) => theme.gray.gray_400};
      transition: all 0.3s;
    }
  }

  & textarea {
    align-self: flex-start;
    resize: none;
    -ms-overflow-style: none;
    scrollbar-width: none;

    ::-webkit-scrollbar {
      width: 0;
    }
  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
`

const CategoryInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  & > input {
    text-align: right;
    border: none;
    padding-right: 40px;
  }

  & > svg {
    position: absolute;
    right: 0;
  }
`

const CategoryButton = styled.button`
  width: 150px;
  border-bottom: 1px solid ${({ theme }) => theme.gray.gray_200};
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  & svg {
    color: ${({ theme }) => theme.color.main_light};
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`
