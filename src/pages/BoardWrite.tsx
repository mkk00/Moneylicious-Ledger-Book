import IconButton from '@/components/button/IconButton'
import TextEditor from '@/components/textEditor/TextEditor'
import PageLayout from '@/layout/PageLayout'
import styled from 'styled-components'
import { FormRow, Input } from '@/components/input/FormRow'
import { useNavigate } from 'react-router-dom'
import { useResponsive } from '@/hook/useMediaQuery'
import SelectBox from '@/components/input/CustomSelect'
import { TAG_LIST } from '@/data/boardTagList'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import useAuthStore from '@/store/useAuthStore'
import { supabase } from '@/supabaseconfig'
import { BoardProps, BoardTitleProps } from '@/interface/BoardProps'

const Board = () => {
  const { userInfo } = useAuthStore()
  const navigate = useNavigate()
  const { isDesktopOrLaptop } = useResponsive()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<BoardTitleProps>()

  const [selectTag, setSelectTag] = useState<BoardProps>(TAG_LIST[0])
  const [values, setValues] = useState<string | null>(null)

  const onSubmit: SubmitHandler<BoardTitleProps> = async boardData => {
    const isConfirmed = confirm('게시글을 작성하시겠습니까?')
    if (isConfirmed)
      try {
        const postData = {
          user_id: userInfo?.id,
          email: userInfo?.email,
          user_name: userInfo?.username,
          title: boardData.title,
          tag: selectTag.name,
          content: values
        }

        const { data, error } = await supabase
          .from('board')
          .insert([postData])
          .select()

        if (data) {
          alert('게시글이 작성되었습니다.')
          navigate('/board')
        }
        error && alert(error.message)
      } catch (err) {
        console.error(err)
      }
  }

  return (
    <PageLayout>
      <Container
        $responsive={isDesktopOrLaptop}
        onSubmit={handleSubmit(onSubmit)}>
        <PageTitle>게시글 작성</PageTitle>
        <BoardTitle>
          <SelectBox
            selectTag={selectTag}
            setSelectTag={setSelectTag}
            list={TAG_LIST}
          />
          <FormRow>
            <label>
              <Input
                {...register('title', { required: true })}
                placeholder="Title"
              />
            </label>
          </FormRow>
        </BoardTitle>
        <TextEditor setValues={setValues} />
        <ButtonContainer>
          <IconButton
            type="del"
            onClick={() => navigate('/board')}
          />
          <IconButton
            type="add"
            submit
          />
        </ButtonContainer>
        {errors.title && <ErrorMessage>제목을 입력해주세요.</ErrorMessage>}
      </Container>
    </PageLayout>
  )
}

export default Board

const Container = styled.form<{ $responsive: boolean }>`
  width: ${({ $responsive }) => ($responsive ? '50%' : '90%')};
  margin: 0 auto;
`

const PageTitle = styled.h2`
  text-align: center;
  margin-top: 100px;
`

const BoardTitle = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0 20px 0;
`

const ButtonContainer = styled.div`
  width: 250px;
  height: 50px;
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 20px auto 0 auto;
  margin-top: 60px;
`

const ErrorMessage = styled.span`
  display: block;
  text-align: center;
  margin: 10px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.color.sub_dark};
`
