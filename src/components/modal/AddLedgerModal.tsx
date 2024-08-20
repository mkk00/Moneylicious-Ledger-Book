import { useEffect, useState, MouseEvent, ChangeEvent } from 'react'
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
import { updateLedger, insertLedger, deleteLedger } from '@/api/ledgerApi'

const AddLedgerModal = ({
  isClose,
  isEdit,
  editData,
  updateData
}: {
  isClose: () => void
  isEdit: boolean
  editData: LedgerDataProps | null
  updateData: () => Promise<null | undefined>
}) => {
  const { isOpen, openModal, closeModal } = useModal()
  const { userInfo } = useAuthStore()

  const [amountType, setAmountType] = useState<'지출' | '수입'>('지출')

  // 고정 금액 여부 관리
  const [isFixedAmount, setIsFixedAmount] = useState(false)

  // 카테고리, 결제수단 선택 상태(전역)
  const selectCategory = useSelectLedgerStore(state => state.category)
  const setSelectCategory = useSelectLedgerStore(state => state.setCategory)
  const selectMeans = useSelectLedgerStore(state => state.means)
  const setSelectMeans = useSelectLedgerStore(state => state.setMeans)

  // 선택된 날짜 및 연도, 일 추출
  const selectedDate = useDateStore(state => state.selectedDate)
  const formatSelectedDate = useDateStore(state => state.formatSelectedDate)

  const selectedDay = selectedDate?.getDate()
  const selectedYear = selectedDate?.getFullYear()

  const handleAmountType = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setAmountType(amountType === '지출' ? '수입' : '지출')
  }

  /** 고정 금액 체크박스 상태 변경 함수
   */
  const handleFixedAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsFixedAmount(e.target.checked)
  }

  /** 입력 데이터 반환 함수
   */
  const getInputData = () => ({
    user_id: userInfo?.id as string,
    created_at: selectedDate,
    type: amountType,
    title: values.title,
    amount: values.amount,
    category: selectCategory.category,
    means: selectMeans.means,
    memo: values.memo,
    fixed_amount: isFixedAmount
  })

  /** 가계부 내역 추가 시 호출되는 함수
   *
   * @description 고정 금액 모드 시 해당연도의 모든 월에 데이터 추가
   */
  const handleAddLedgerItem = async () => {
    try {
      const inputData = getInputData()
      if (isFixedAmount && selectedYear) {
        for (let month = 0; month < 12; month++) {
          const monthDate = new Date(selectedYear, month, selectedDay)
          await insertLedger({ ...inputData, created_at: monthDate })
        }
      } else {
        await insertLedger({ ...inputData, created_at: selectedDate })
      }

      await updateData()
      isClose()
    } catch (error) {
      console.error(error)
    }
  }

  /** 가계부 내역 수정 시 호출되는 함수
   *
   *  @description 고정 금액 수정 시 해당 데이터 조회하여 존재하면 내역 수정, 존재하지 않으면 내역 추가
   */
  const handleEditLedgerItem = async () => {
    try {
      const inputData = getInputData()

      await updateLedger(
        {
          ...inputData,
          created_at: selectedDate
        },
        editData?.id
      )

      if (isFixedAmount && selectedYear) {
        for (let month = 0; month < 12; month++) {
          const monthDate = new Date(selectedYear, month, selectedDay)
          const isSelectedMonth = month === selectedDate?.getMonth()

          const { data: existingData, error: existingError } = await supabase
            .from('ledger')
            .select('id')
            .eq('title', editData?.title)
            .eq('fixed_amount', true)
            .eq('created_at_year', selectedYear)
            .eq('created_at_month', month + 1)
            .eq('created_at_day', selectedDay)

          if (existingError) throw new Error(existingError.message)

          if (existingData.length > 0) {
            await updateLedger(
              {
                ...inputData,
                created_at: monthDate
              },
              existingData[0].id
            )
          } else if (!isSelectedMonth) {
            await insertLedger({
              ...inputData,
              created_at: monthDate
            })
          }
        }
      }

      await updateData()
      isClose()
    } catch (error) {
      console.error(error)
    }
  }

  /** 가계부 내역 삭제 시 호출되는 함수
   *
   *  @description 고정 금액 전체를 삭제하고자 하는 경우 반복문을 통해 전체 내역 삭제
   *  @description title, created_at_year, created_at_month, created_at_day 일치하는 데이터 삭제
   */
  const handleDeleteLedgerItem = async () => {
    try {
      await deleteLedger(editData?.id as string)

      if (isFixedAmount && selectedDate) {
        for (let month = 0; month < 12; month++) {
          const { error } = await supabase
            .from('ledger')
            .delete()
            .eq('title', editData?.title)
            .eq('fixed_amount', true)
            .eq('created_at_year', selectedYear)
            .eq('created_at_month', month + 1)
            .eq('created_at_day', selectedDay)

          if (error) throw new Error(error.message)
        }
      }

      await updateData()
      isClose()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isEdit && editData) {
      setAmountType(editData.type)
      setIsFixedAmount(editData.fixed_amount || false)

      const meansItem = MENAS_LIST.find(item => item.means === editData.means)
      const categoryItem =
        editData.type === '지출'
          ? CATEGORY_LIST.find(item => item.category === editData.category)
          : INCOME_LIST.find(item => item.category === editData.category)

      if (categoryItem) setSelectCategory(categoryItem)
      if (meansItem) setSelectMeans(meansItem)
    } else {
      setSelectCategory(
        amountType === '지출' ? CATEGORY_LIST[0] : INCOME_LIST[0]
      )
      setSelectMeans(MENAS_LIST[0])
    }
  }, [isEdit, editData, amountType])

  /** 가초기값 설정
   * @description 내역 수정 모드 시 기존 데이터로 초기화
   */
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
    memo: isEdit && editData ? editData.memo : '',
    fixed_amount: isEdit && editData ? editData.fixed_amount : isFixedAmount
  }

  const { values, handleChange, handleSubmit } = useFormControl({
    initialValue,
    onSubmit: handleAddLedgerItem
  })

  return (
    <ModalLayout closeModal={isClose}>
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
        <label>
          고정 금액
          <FixedCheckBox
            type="checkbox"
            checked={isFixedAmount}
            onChange={handleFixedAmountChange}
            amountType={amountType}
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

const FixedCheckBox = styled.input<{ amountType: '수입' | '지출' }>`
  -webkit-appearance: none;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 3px;
  cursor: pointer;
  margin-left: 8px;

  &[type='checkbox'] {
    border: 1px solid ${({ theme }) => theme.gray.gray_200};
    width: 30px;
    height: 30px;
    position: relative;

    &:focus {
      border: 1px solid ${({ theme }) => theme.gray.gray_200};
    }
  }

  &::before {
    content: '* 매월 해당 내역을 추가/제거합니다. ';
    position: absolute;
    right: 40px;
    top: 5px;
    width: 80px;
    font-size: 0.6rem;
    text-align: right;
    color: ${({ theme }) => theme.gray.gray_300};
  }

  &:checked {
    border: none;
    background-color: ${({ theme, amountType }) =>
      amountType === '수입' ? theme.color.sub : theme.color.main_light};
  }

  &:checked::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    top: 50%;
    left: 50%;
    border: solid white;
    transform: translate(-50%, -70%) rotate(45deg);
    border-width: 0 3px 3px 0;
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
