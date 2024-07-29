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
import { formatDate } from '@/utils/formatDate'
import IconButton from '../button/IconButton'
import DefaultProfile from '../userInfo/DefaultProfile'
import useModal from '@/hook/useModal'
import ModalPortal from '@/components/modal/ModalPortal'
import LoginModal from '@/components/modal/LoginModal'

const Comment = ({
  boardData,
  handleUpdate
}: {
  boardData: BoardListProps
  handleUpdate: () => void
}) => {
  const { userInfo } = useAuthStore()
  const { register, reset, handleSubmit, setValue } =
    useForm<CommentTextProps>()
  const { isOpen, openModal, closeModal } = useModal()

  const [commentData, setCommentData] = useState<CommentProps[] | null>(null)
  const [isRecomment, setIsRecomment] = useState(false)
  const [recommentId, setRecommentId] = useState<string | null>(null)
  const [recommentToUser, setRecommentToUser] = useState<string | null>(null)
  const [isEdit, setIsEdit] = useState(false)
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null)

  const getCommentData = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(
          `*, userinfo:user_id (
          username,
          image_url,
          message)`
        )
        .eq('board_id', boardData.id)
        .order('created_at', { ascending: true })
        .returns<CommentProps[] | null>()

      if (data) {
        setCommentData(data)
      }
      if (error) throw error
    } catch (error) {
      console.error(error)
    }
  }

  const updateComment = async (comment: CommentProps) => {
    setIsEdit(true)
    setEditingCommentId(comment.id)
    setValue('content', comment.content)
  }

  const deleteComment = async (deleteComment: string) => {
    const isConfirmed = confirm('댓글을 삭제하시겠습니까?')
    if (isConfirmed)
      try {
        const { error } = await supabase
          .from('comments')
          .delete()
          .eq('id', deleteComment)

        if (!error) getCommentData()
      } catch (error) {
        console.error(error)
      }
  }

  const onSubmit: SubmitHandler<CommentTextProps> = async commentData => {
    if (!userInfo?.accessToken) {
      confirm('로그인이 필요한 서비스입니다.') && openModal('로그인')
      return null
    }
    if (isEdit && editingCommentId) {
      try {
        const { data, error } = await supabase
          .from('comments')
          .update({ content: commentData.content })
          .eq('id', editingCommentId)
          .select()

        if (data) {
          alert('댓글이 수정되었습니다.')
          reset()
          handleUpdate()
          getCommentData()
          setIsEdit(false)
          setEditingCommentId(null)
        }
        if (error) throw error
      } catch (error) {
        console.error(error)
      }
    } else {
      try {
        const postData = {
          board_id: boardData.id,
          user_id: userInfo?.id,
          parent_id: isRecomment ? recommentId : null,
          is_author: boardData.user_id === userInfo?.id,
          content: isRecomment ? commentData.recontent : commentData.content
        }
        const { data, error } = await supabase
          .from('comments')
          .insert([postData])
          .select()

        if (data) {
          alert('댓글이 작성되었습니다.')
          reset()
          handleUpdate()
          getCommentData()
          setIsRecomment(false)
          setRecommentId(null)
          setRecommentToUser(null)
        }
        if (error) throw error
      } catch (error) {
        console.error(error)
      }
    }
  }

  const renderComments = (datas: CommentProps[], parentId: string | null) => {
    return datas
      .filter(comment => comment.parent_id === parentId)
      .map(comment => (
        <CommentList
          key={comment.userinfo.username + '-comment'}
          $isRecomment={comment.parent_id ? true : false}>
          <div>
            <User>
              <ProfileImage>
                {comment.userinfo.image_url ? (
                  <img
                    src={comment.userinfo.image_url}
                    alt={comment.userinfo.username + '-profile'}
                  />
                ) : (
                  <DefaultProfile />
                )}
              </ProfileImage>
              <Name $author={comment.is_author}>
                {comment.is_author ? '작성자' : comment.userinfo.username}
              </Name>
              <Message>{comment.userinfo.message}</Message>
              {comment.user_id === userInfo?.id && (
                <>
                  <button onClick={() => updateComment(comment)}>수정</button>
                  <button onClick={() => deleteComment(comment.id)}>
                    삭제
                  </button>
                </>
              )}
            </User>
            <Content>{comment.content}</Content>
            <Bottom>
              <span>
                {formatDate(new Date(comment.created_at)) ===
                formatDate(new Date())
                  ? '오늘'
                  : formatDate(new Date(comment.created_at))}
              </span>
              <RecommentButton
                type="button"
                onClick={() => {
                  setIsRecomment(true)
                  setRecommentId(comment.id)
                  setRecommentToUser(comment.userinfo.username)
                }}>
                답글
              </RecommentButton>
            </Bottom>
          </div>
          {renderComments(datas, comment.id)}
        </CommentList>
      ))
  }

  useEffect(() => {
    getCommentData()
  }, [boardData.id])

  return (
    <Container>
      <div>
        댓글 {commentData ? commentData.length : 0}개
        {commentData && renderComments(commentData, null)}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isRecomment ? (
          <CommentWrite>
            <label>
              <Text
                {...register('recontent', { required: true })}
                placeholder={`To ${recommentToUser}`}
              />
            </label>
            <IconButton
              type="del"
              onClick={() => {
                setIsRecomment(false)
                setRecommentId(null)
                setRecommentToUser(null)
              }}
            />
            <Button
              text="등록"
              type="submit"
              size="small"
            />
          </CommentWrite>
        ) : (
          <CommentWrite>
            <label>
              <Text
                {...register('content', { required: true })}
                placeholder="댓글을 입력해주세요."
              />
            </label>
            {isEdit && (
              <IconButton
                type="del"
                onClick={() => {
                  setIsEdit(false)
                  setEditingCommentId(null)
                  setValue('content', '')
                }}
              />
            )}
            <Button
              text={isEdit ? '수정' : '등록'}
              type="submit"
              size="small"
            />
          </CommentWrite>
        )}
      </form>
      {isOpen('로그인') && (
        <ModalPortal>
          <LoginModal closeModal={() => closeModal('로그인')} />
        </ModalPortal>
      )}
    </Container>
  )
}

export default Comment

const Container = styled.div`
  margin: 50px 0;
`

const CommentList = styled.div<{ $isRecomment?: boolean }>`
  list-style: none;
  padding: ${({ $isRecomment }) =>
    $isRecomment ? '20px 0 0 30px' : '20px 0 0 0'};
`

const User = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

const ProfileImage = styled.div`
  width: 30px;
  height: 30px;
  overflow: hidden;
  border-radius: 100%;

  & img {
    width: 100%;
    height: 100%;
  }
`

const Name = styled.div<{ $author: boolean }>`
  color: ${({ theme, $author }) => ($author ? theme.color.main : 'initial')};
  font-weight: ${({ $author }) => ($author ? 'bold' : 'normal')};
`

const Message = styled.span`
  color: ${({ theme }) => theme.gray.gray_300};
  font-size: 0.7rem;
`

const Content = styled.div`
  margin: 5px 0;
`

const Bottom = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  & span {
    color: ${({ theme }) => theme.gray.gray_400};
    font-size: 0.7rem;
  }
`

const RecommentButton = styled.button`
  font-size: 0.7rem;
  padding: 2px 4px;
  border-radius: 4px;
`

const CommentWrite = styled(FormRow)`
  display: flex;
  gap: 15px;
  margin-top: 20px;

  label {
    flex-grow: 1;
  }

  & textarea {
    height: 50px;
  }
`
