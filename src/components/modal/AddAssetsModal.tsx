import styled from 'styled-components'
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
import { AssetsDataItemProps } from '@/interface/AssetsProps'
import { insertAsset, updateAsset, deleteAsset } from '@/api/assetsApi'

const AddAssetsModal = ({
  closeModal,
  selectList,
  modalType,
  setModalType,
  fetchAssetsData,
  editAssetData
}: {
  closeModal: () => void
  selectList: string[]
  modalType: 'add' | 'edit' | null
  setModalType: Dispatch<SetStateAction<'add' | 'edit' | null>>
  fetchAssetsData: () => Promise<void>
  editAssetData: AssetsDataItemProps | null
}) => {
  const { userInfo } = useAuthStore()

  const edit = modalType === 'edit' ? '자산수정' : '자산추가'

  const [selectType, setSelectType] = useState('저축')
  const [titleValue, setTitleValue] = useState('')
  const [inputValue, setInputValue] = useState('')

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
    if (modalType === 'edit' && editAssetData?.id) {
      const data = await updateAsset(editAssetData?.id, {
        type: '비유동자산',
        name: selectType,
        amount: inputValue,
        title: titleValue,
        updated_at: new Date().toISOString()
      })
      if (data) alert('수정되었습니다.')
    }

    if (modalType === 'add') {
      const data = await insertAsset({
        user_id: userInfo?.id,
        email: userInfo?.email,
        type: '비유동자산',
        name: selectType,
        amount: inputValue,
        title: titleValue
      })
      if (data) alert('추가되었습니다.')
    }

    fetchAssetsData()
    setModalType(null)
    closeModal()
  }

  const handleRemoveAsset = async () => {
    if (editAssetData?.id) {
      await deleteAsset(editAssetData.id)
      alert('삭제되었습니다.')
      fetchAssetsData()
      setModalType(null)
      closeModal()
    }
  }

  useEffect(() => {
    if (modalType && editAssetData) {
      setSelectType(editAssetData.name)
      setTitleValue(editAssetData.title)
      setInputValue(editAssetData.amount)
    }
  }, [editAssetData, modalType])

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
