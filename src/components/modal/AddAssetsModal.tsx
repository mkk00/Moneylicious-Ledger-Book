import styled, { css } from 'styled-components'
import ModalLayout from '@/components/modal/ModalLayout'
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState
} from 'react'
import SelectBox from '@/components/input/SelectBox'
import { FormRow, Input } from '@/components/input/FormRow'
import Button from '@/components/button/Button'
import useAuthStore from '@/store/useAuthStore'
import { supabase } from '@/supabaseconfig'
import { AssetsDataItemProps } from '@/interface/AssetsProps'

const AddAssetsModal = ({
  closeModal,
  isEdit,
  setIsEdit,
  getAssetsData,
  editAssetData
}: {
  closeModal: () => void
  isEdit: boolean
  setIsEdit: Dispatch<SetStateAction<boolean>>
  getAssetsData: () => Promise<void>
  editAssetData: AssetsDataItemProps | null
}) => {
  const { userInfo } = useAuthStore()

  const edit = isEdit ? '자산수정' : '자산추가'

  const [selectType, setSelectType] = useState('저축')
  const [titleValue, setTitleValue] = useState('')
  const [inputValue, setInputValue] = useState('')
  const selectList = ['저축', '보험', '투자']

  const handleInputTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value)
  }

  const handleInputAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const numericValue = value.replace(/,/g, '')
    const numericComma =
      !isNaN(Number(numericValue)) && numericValue !== ''
        ? Number(numericValue).toLocaleString()
        : ''
    setInputValue(numericComma)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (isEdit) {
        const insertData = {
          type: '비유동자산',
          name: selectType,
          amount: inputValue,
          title: titleValue,
          updated_at: new Date()
        }
        const { data, error } = await supabase
          .from('assets')
          .update(insertData)
          .eq('user_id', userInfo?.id)
          .eq('id', editAssetData?.id)
          .select()

        if (data) {
          alert('수정되었습니다.')
          getAssetsData()
          closeModal()
          setIsEdit(false)
        }

        if (error) throw error
      } else {
        const insertData = {
          user_id: userInfo?.id,
          email: userInfo?.email,
          type: '비유동자산',
          name: selectType,
          amount: inputValue,
          title: titleValue
        }
        const { data, error } = await supabase
          .from('assets')
          .insert(insertData)
          .select()

        if (data) {
          alert('추가되었습니다.')
          getAssetsData()
          closeModal()
        }

        if (error) throw error
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleRemoveAsset = async () => {
    try {
      const { error } = await supabase
        .from('assets')
        .delete()
        .eq('id', editAssetData?.id)

      alert('삭제되었습니다.')
      getAssetsData()
      closeModal()

      if (error) throw error
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isEdit && editAssetData) {
      setSelectType(editAssetData.name)
      setTitleValue(editAssetData.title)
      setInputValue(editAssetData.amount)
    }
  }, [editAssetData, isEdit])

  return (
    <ModalLayout closeModal={closeModal}>
      <Container onSubmit={handleSubmit}>
        <SelectBox
          selectItem={selectType}
          setSelectItem={setSelectType}
          items={selectList}
        />
        <RowWrapper>
          <Row>
            <Input
              type="text"
              value={titleValue}
              onChange={handleInputTitleChange}
              placeholder="자산 항목"
              required
            />
          </Row>
          <Row>
            <Input
              type="text"
              value={inputValue}
              onChange={handleInputAmountChange}
              placeholder="금액을 입력하세요."
              required
            />
          </Row>
        </RowWrapper>
        <ButtonWrapper>
          <Button
            text={edit}
            size="small"
            type="submit"
          />
          <Button
            text="삭제"
            size="small"
            type="button"
            onClick={handleRemoveAsset}
          />
        </ButtonWrapper>
      </Container>
    </ModalLayout>
  )
}
export default AddAssetsModal

const Container = styled.form`
  display: flex;
  gap: 30px;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`

const RowWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  & > div:first-of-type {
    width: 100px;
  }

  & > div:last-of-type {
    width: 170px;
  }
`

const Row = styled(FormRow)`
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${({ theme }) => theme.gray.gray_300};

  & > input {
    text-align: center;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`
