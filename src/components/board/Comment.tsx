import { FormRow, Text } from '@/components/input/FormRow'
import styled from 'styled-components'
import Button from '@/components/button/Button'
import { supabase } from '@/supabaseconfig'
import useAuthStore from '@/store/useAuthStore'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  CommentProps,
  BoardListProps,
  CommentTextProps
} from '@/interface/BoardProps'
import { useEffect, useState } from 'react'

const Comment = ({
  boardData,
  handleUpdate
}: {
  boardData: BoardListProps
  handleUpdate: () => void
}) => {
  const { userInfo } = useAuthStore()
  const { register, reset, handleSubmit } = useForm<CommentTextProps>()
  const [isRecomment, setIsRecomment] = useState(false)

  const onSubmit: SubmitHandler<CommentTextProps> = async commentData => {
    console.log('제출')
    try {
      const postData = {
        board_id: boardData.id,
        user_id: userInfo?.id,
        is_author: boardData.user_id === userInfo?.id,
        content: commentData.content
      }
      const { data, error } = await supabase
        .from('comments')
        .insert([postData])
        .select()

      if (data) {
        alert('댓글이 작성되었습니다.')
        reset()
        handleUpdate()
      }
      if (error) throw error
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CommentWrite>
          <label>
            <Text
              {...register('content', { required: true })}
              placeholder="댓글을 입력해주세요."
            />
          </label>
          <Button
            text="등록"
            type="submit"
            size="small"
          />
        </CommentWrite>
      </form>
    </Container>
  )
}

export default Comment

const Container = styled.div`
  margin: 50px 0;
`

const CommentWrite = styled(FormRow)`
  display: flex;
  gap: 15px;

  label {
    flex-grow: 1;
  }

  & textarea {
    height: 50px;
  }
`
