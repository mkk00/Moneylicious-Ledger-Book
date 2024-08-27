import IconButton from '@/components/button/IconButton'
import TextEditor from '@/components/textEditor/TextEditor'
import PageLayout from '@/layout/PageLayout'
import styled from 'styled-components'
import { FormRow, Input } from '@/components/input/FormRow'
import { useLocation, useNavigate } from 'react-router-dom'
import { useResponsive } from '@/hook/useMediaQuery'
import SelectBox from '@/components/input/CustomSelect'
import { TAG_LIST } from '@/data/boardTagList'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import useAuthStore from '@/store/useAuthStore'
import { supabase } from '@/supabaseconfig'
import { BoardProps, BoardTitleProps } from '@/interface/BoardProps'
import MetaTags from '@/components/common/MetaTag'

const BoardWrite = () => {
  const { userInfo } = useAuthStore()
  const location = useLocation()
  const navigate = useNavigate()
  const { isDesktopOrLaptop } = useResponsive()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<BoardTitleProps>()

  const isEdit = location.state?.isEdit || false
  const existingItem = location.state?.item || null

  const [selectTag, setSelectTag] = useState<BoardProps>(TAG_LIST[0])
  const [values, setValues] = useState<string | null>(
    isEdit ? existingItem.content : null
  )

  const onSubmit: SubmitHandler<BoardTitleProps> = async boardData => {
    const isConfirmed = confirm(
      isEdit ? '게시글을 수정하시겠습니까?' : '게시글을 작성하시겠습니까?'
    )
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

        let data, error
        if (isEdit && existingItem) {
          ;({ data, error } = await supabase
            .from('board')
            .update(postData)
            .eq('id', existingItem.id)
            .select())
        } else {
          ;({ data, error } = await supabase
            .from('board')
            .insert([postData])
            .select())
        }

        if (data) {
          alert(
            isEdit ? '게시글이 수정되었습니다.' : '게시글이 작성되었습니다.'
          )
          navigate('/board')
        }
        error && alert(error.message)
      } catch (error) {
        console.error(error)
      }
  }

  useEffect(() => {
    if (isEdit) {
      setValue('title', existingItem.title)
      const prevTag = TAG_LIST.find(tag => tag.name === existingItem.tag)
      prevTag && setSelectTag(prevTag)
    }
  }, [isEdit, existingItem, setValue])

  return (
    <PageLayout>
      <MetaTags
        title="Moneylicious - 게시글 작성"
        description="커뮤니티에 공유할 게시글을 작성해보세요."
        url="https://moneylicious.vercel.app/board/write"
      />
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
        <TextEditor
          setValues={setValues}
          initialValue={values || ''}
        />
        <ButtonContainer>
          <IconButton
            type="del"
            ariaLabel="게시글 작성 취소"
            onClick={() => navigate('/board')}
          />
          <IconButton
            type="add"
            ariaLabel="게시글 작성 완료"
            submit
          />
        </ButtonContainer>
        {errors.title && <ErrorMessage>제목을 입력해주세요.</ErrorMessage>}
      </Container>
    </PageLayout>
  )
}

export default BoardWrite

const Container = styled.form<{ $responsive: boolean }>`
  width: ${({ $responsive }) => ($responsive ? '50%' : '90%')};
  margin: 0 auto;
`

const PageTitle = styled.h2`
  text-align: center;
  margin-top: 20px;
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
  margin: 90px auto 0 auto;
`

const ErrorMessage = styled.span`
  display: block;
  text-align: center;
  margin: 10px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.color.sub_dark};
`
