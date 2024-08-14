import styled from 'styled-components'
import ModalLayout from '@/components/modal/ModalLayout'
import { FormRow, Input } from '@/components/input/FormRow'
import Button from '@/components/button/Button'
import { useState, ChangeEvent, FormEvent } from 'react'
import { supabase } from '@/supabaseconfig'
import useAuthStore from '@/store/useAuthStore'
import { AssetsTargetProps } from '@/interface/AssetsProps'

const AssetsSummaryModal = ({
  closeModal,
  assetsTargetData,
  type
}: {
  closeModal: (key: string) => void
  assetsTargetData: AssetsTargetProps | null
  type: '소비' | '저축'
}) => {
  const [inputValue, setInputValue] = useState('')
  useState<AssetsTargetProps | null>(null)
  const { userInfo } = useAuthStore()

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
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
      const insertData = {
        user_id: userInfo?.id,
        email: userInfo?.email,
        ...(type === '소비' && { expense: inputValue }),
        ...(type === '저축' && { saving: inputValue })
      }
      if (!assetsTargetData) {
        const { data, error } = await supabase
          .from('assetsTarget')
          .insert(insertData)
          .select('*')
          .returns<AssetsTargetProps | null>()
        if (data) {
          alert('목표 설정이 완료되었습니다.')
          closeModal(type)
        }
        if (error) throw error
      } else {
        const { data, error } = await supabase
          .from('assetsTarget')
          .update(insertData)
          .eq('user_id', userInfo?.id)
          .select('*')
          .returns<AssetsTargetProps | null>()
        if (data) {
          alert('목표 설정이 수정되었습니다.')
          closeModal(type)
        }
        if (error) throw error
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ModalLayout closeModal={() => closeModal(type)}>
      <Container onSubmit={handleSubmit}>
        <Title>{type} 목표 설정</Title>
        <Row>
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="목표 금액을 설정하세요."
            required
          />
        </Row>
        <Button
          text="완료"
          size="small"
          type="submit"
        />
      </Container>
    </ModalLayout>
  )
}

export default AssetsSummaryModal

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 40px;
`

const Title = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
`

const Row = styled(FormRow)`
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${({ theme }) => theme.gray.gray_300};
  margin: 20px 0 40px 0;
`
