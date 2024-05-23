import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import ModalLayout from '@/components/modal/ModalLayout'
import CategoryModal from '@/components/modal/CategoryModal'
import MeansModal from '@/components/modal/MeansModal'
import IconButton from '@/components/button/IconButton'
import { CATEGORY_LIST, INCOME_LIST } from '@/data/categoryList'
import { MENAS_LIST } from '@/data/meansList'
import useModal from '@/hook/useModal'
import ModalPortal from '@/components/modal/ModalPortal'
import useDateStore from '@/store/useDateStore'
import useFormControl from '@/hook/useFormControl'
import useSelectLedgerStore from '@/store/useSelectLedgerStore'
import DatePickerModal from '@/components/modal/DatePickerModal'
import { supabase } from '@/supabaseconfig'
import useAuthStore from '@/store/useAuthStore'
import { LedgerDataProps } from '@/interface/LedgerProps'

const AddLedgerModal = ({
  IsClose,
  isEdit,
  editData
}: {
  IsClose: () => void
  isEdit: boolean
  editData: LedgerDataProps | null
}) => {
  const [amountType, setAmountType] = useState<'지출' | '수입'>('지출')

  const selectCategory = useSelectLedgerStore(state => state.category)
  const setSelectCategory = useSelectLedgerStore(state => state.setCategory)
  const selectMeans = useSelectLedgerStore(state => state.means)
  const setSelectMeans = useSelectLedgerStore(state => state.setMeans)

  const selectedDate = useDateStore(state => state.selectedDate)
  const formatSelectedDate = useDateStore(state => state.formatSelectedDate)

  const { isOpen, openModal, closeModal } = useModal()

  const { userInfo } = useAuthStore()

  const handleAmountType = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setAmountType(amountType === '지출' ? '수입' : '지출')
  }

  const handleAddLedgerItem = async () => {
    try {
      const { data, error } = await supabase
        .from('amountbook')
        .insert({
          user_id: userInfo?.id,
          created_at: selectedDate,
          type: amountType,
          title: values.title,
          amount: values.amount,
          category: selectCategory.category,
          means: selectMeans.means,
          memo: values.memo
        })
        .select()
      data && IsClose()
      if (error) alert(error.message)
    } catch (error) {
      console.error(error)
    }
  }

  const initialValue = {
    user_id: userInfo?.id,
    created_at: selectedDate,
    type: isEdit && editData ? editData.type : '지출',
    title: isEdit && editData ? editData.title : '',
    amount: isEdit && editData ? editData.amount : '',
    category:
      isEdit && editData
        ? editData.category
        : amountType === '지출'
          ? CATEGORY_LIST[0].category
          : INCOME_LIST[0].category,
    means: isEdit && editData ? editData.means : MENAS_LIST[0].means,
    memo: isEdit && editData ? editData.memo : ''
  }

  const { values, handleChange, handleSubmit } = useFormControl({
    initialValue,
    onSubmit: handleAddLedgerItem
  })

  const handleEditLedgerItem = async () => {}

  const handleDeleteLedgerItem = async () => {}

  useEffect(() => {
    if (isEdit && editData) {
      setAmountType(editData.type)
    }
  }, [isEdit, editData])

  useEffect(() => {
    if (!isEdit) {
      if (amountType === '지출') {
        setSelectCategory(CATEGORY_LIST[0])
      } else {
        setSelectCategory(INCOME_LIST[0])
      }
      setSelectMeans(MENAS_LIST[0])
    }
  }, [setSelectCategory, setSelectMeans, amountType])

  useEffect(() => {
    if (isEdit && editData) {
      const meansItem = MENAS_LIST.filter(item => item.means === editData.means)

      if (editData.type === '지출') {
        const categoryItem = CATEGORY_LIST.filter(
          item => item.category === editData.category
        )
        setSelectCategory(categoryItem[0])
      } else {
        const incomeItem = INCOME_LIST.filter(
          item => item.category === editData.category
        )
        setSelectCategory(incomeItem[0])
      }
      setSelectMeans(meansItem[0])
    }
  }, [isEdit])

  return (
    <ModalLayout closeModal={IsClose}>
      <Title>{isEdit ? '기록 수정' : '기록 추가'}</Title>
      <LedgerDate onClick={() => openModal('날짜선택')}>
        {selectedDate && formatSelectedDate(selectedDate)}
      </LedgerDate>
      {isOpen('날짜선택') && (
        <ModalPortal>
          <DatePickerModal
            closeModal={() => closeModal('날짜선택')}
            isSelectDate={true}
          />
        </ModalPortal>
      )}
      {isOpen(`${amountType}카테고리`) && (
        <ModalPortal>
          <CategoryModal
            closeModal={closeModal}
            type={amountType}
          />
        </ModalPortal>
      )}
      {isOpen('수단') && (
        <ModalPortal>
          <MeansModal
            closeModal={closeModal}
            type={amountType}
          />
        </ModalPortal>
      )}
      <LedgerForm>
        <label>
          내역
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={e => handleChange(e)}
          />
        </label>
        <label>
          금액
          <input
            type="text"
            name="amount"
            value={values.amount}
            onChange={e => handleChange(e)}
          />
        </label>
        <SelectListLabel>
          {amountType} 카테고리
          <SelectListItem onClick={() => openModal(`${amountType}카테고리`)}>
            {selectCategory.category}
            {selectCategory.icon}
          </SelectListItem>
        </SelectListLabel>
        <SelectListLabel>
          수단
          <SelectListItem onClick={() => openModal('수단')}>
            {selectMeans.means}
            {selectMeans.icon}
          </SelectListItem>
        </SelectListLabel>
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
        {amountType === '지출' ? (
          <IconButton
            type="expense"
            onClick={handleAmountType}
          />
        ) : (
          <IconButton
            type="income"
            onClick={handleAmountType}
          />
        )}
        {!isEdit && (
          <IconButton
            type="add"
            onClick={handleSubmit}
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

const labelStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  height: 35px;
`

const inputStyle = css`
  width: 150px;
  height: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.gray.gray_200};
  padding: 5px 15px;
`

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
  width: 263px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  & label {
    ${labelStyle}
    position: relative;
  }

  & input,
  & textarea {
    border: none;
    ${inputStyle}

    &:focus {
      outline: none;
      border-bottom: 1px solid ${({ theme }) => theme.gray.gray_400};
      transition: all 0.3s;
    }
  }

  & input[name='amount'] {
    text-align: center;
    padding-right: 25px;
  }

  & label:nth-of-type(2):after {
    content: '원';
    display: block;
    position: absolute;
    right: 2px;
    top: 7px;
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

const SelectListLabel = styled.div`
  ${labelStyle}
`

const SelectListItem = styled.div`
  ${inputStyle}
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 40px;
  position: relative;

  & > svg {
    position: absolute;
    right: 0;
    bottom: 4px;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`
