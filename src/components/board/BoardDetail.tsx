import styled, { css } from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom'
import { formatDate } from '@/utils/formatDate'
import DOMPurify from 'isomorphic-dompurify'
import { GoThumbsup } from 'react-icons/go'
import { supabase } from '@/supabaseconfig'
import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import useAuthStore from '@/store/useAuthStore'
import useModal from '@/hook/useModal'
import ModalPortal from '@/components/modal/ModalPortal'
import LoginModal from '@/components/modal/LoginModal'
import Comment from '@/components/board/Comment'

const BoardDetail = () => {
  const { handleUpdate } = useOutletContext<{ handleUpdate: () => void }>()
  const location = useLocation()
  const { item } = location.state || {}
  const navigate = useNavigate()
  const { userInfo } = useAuthStore()
  const { isOpen, openModal, closeModal } = useModal()

  const [viewsCount, setViewsCount] = useState<number>(item.views_count)
  const [isLike, setIsLike] = useState(false)
  const [likesCount, setLikesCount] = useState<number>(item.likes_count)
  // const [isEdit, setIsEdit] = useState(false)

  const fetchViewCount = async () => {
    const { data, error } = await supabase
      .from('board')
      .update({
        views_count: item.views_count + 1
      })
      .eq('id', item.id)
      .select('views_count')

    if (data) {
      setViewsCount(data[0].views_count)
      handleUpdate()
    }

    if (error) console.error(error)
  }

  const checkLiked = async () => {
    if (!userInfo?.accessToken) return null
    const { data } = await supabase
      .from('likes')
      .select('*')
      .eq('board_id', item.id)
      .eq('user_id', userInfo?.id)
      .single()

    if (data) {
      setIsLike(true)
    } else {
      setIsLike(false)
    }
  }

  const getLikesCount = async () => {
    const { data } = await supabase
      .from('board')
      .select('likes_count')
      .eq('id', item.id)
      .single()

    if (data) {
      setLikesCount(data.likes_count)
    }
  }

  const handleLike = async () => {
    if (!userInfo?.accessToken) {
      confirm('로그인이 필요한 서비스입니다.') && openModal('로그인')
      return null
    }
    if (isLike) {
      await supabase
        .from('likes')
        .delete()
        .eq('board_id', item.id)
        .eq('user_id', userInfo?.id)
      setIsLike(false)
    } else {
      await supabase
        .from('likes')
        .insert({ board_id: item.id, user_id: userInfo?.id })
      setIsLike(true)
    }
    getLikesCount()
    handleUpdate()
  }

  const deleteBoard = async () => {
    const isConfirmed = confirm('게시글을 삭제하시겠습니까?')
    if (isConfirmed)
      try {
        const { error } = await supabase
          .from('board')
          .delete()
          .eq('id', item.id)

        if (!error) {
          handleUpdate()
          navigate('/board')
        }
      } catch (error) {
        console.error(error)
      }
  }

  const updateBoard = async () => {
    console.log(item)
    navigate('/board/write', {
      state: {
        item,
        isEdit: true
      }
    })
  }

  useEffect(() => {
    checkLiked()
    getLikesCount()
  }, [item.id, userInfo?.id, isLike])

  useEffect(() => {
    fetchViewCount()
  }, [item])

  return (
    <>
      <BoardContainer>
        <Detailheader>
          <Top>
            <Title>
              {item.title}
              {item.comments_count ? ' [' + item.comments_count + ']' : null}
            </Title>
            <Tag>#{item.tag}</Tag>
          </Top>
          <Bottom>
            <BoardInfo>
              <div>작성 {item.user_name}</div>
              <CteatedAt>
                작성일 {formatDate(new Date(item.created_at))}
              </CteatedAt>
              <div>조회 {viewsCount}</div>
              <div>추천 {likesCount}</div>
              <div>댓글 {item.comments_count}</div>
            </BoardInfo>
            {item.user_id === userInfo?.id && (
              <Control>
                <button
                  type="button"
                  onClick={updateBoard}>
                  수정
                </button>
                <button
                  type="button"
                  onClick={deleteBoard}>
                  삭제
                </button>
              </Control>
            )}
          </Bottom>
        </Detailheader>
        {item?.content && (
          <Content
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(String(item?.content))
            }}
          />
        )}
        <Button
          $isLike={isLike}
          onClick={handleLike}>
          <GoThumbsup size={30} />
          {likesCount}
        </Button>
        {isOpen('로그인') && (
          <ModalPortal>
            <LoginModal closeModal={() => closeModal('로그인')} />
          </ModalPortal>
        )}
      </BoardContainer>
      <Comment
        boardData={item}
        handleUpdate={handleUpdate}
      />
    </>
  )
}

export default BoardDetail

const flexStyle = css`
  display: flex;
  align-items: center;
  gap: 20px;
`

const BoardContainer = styled.div`
  margin: 50px 0;
  border-bottom: 1px solid ${({ theme }) => theme.gray.gray_200};
`

const Detailheader = styled.div`
  border-top: 1px solid ${({ theme }) => theme.gray.gray_200};
  border-bottom: 1px solid ${({ theme }) => theme.gray.gray_200};
  padding: 20px 10px;
`

const Top = styled.span`
  ${flexStyle}
`

const Bottom = styled.div`
  ${flexStyle}
  justify-content: space-between;
`

const BoardInfo = styled.div`
  ${flexStyle}
  color: ${({ theme }) => theme.gray.gray_400};
  font-size: 0.8rem;
  margin-top: 5px;
`

const Control = styled.div`
  display: flex;
  gap: 10px;
  color: ${({ theme }) => theme.gray.gray_400};
`

const Title = styled.h3`
  font-size: 1.7rem;
`

const Tag = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.gray.gray_300};
`

const CteatedAt = styled.span`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.gray.gray_300};
`

const Content = styled.div`
  width: 100%;
  padding: 30px 10px;
  line-height: 1.5;

  & a {
    color: ${({ theme }) => theme.color.main_light};
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  & a:hover {
    font-weight: bold;
  }

  & ul {
    margin: 10px 0;
    list-style-type: circle;
    list-style-position: inside;
    padding-left: 10px;
  }

  & ul li {
    text-indent: -20px;
    padding-left: 20px;
  }

  & li[class^='ql-indent-'] {
    padding-left: 3rem;
  }
`

const Button = styled.button<{ $isLike: boolean }>`
  ${flexStyle}
  width: 65px;
  height: 65px;
  flex-direction: column;
  gap: 3px;
  margin: 30px auto;
  border-radius: 100%;
  padding: 15px;
  background-color: ${({ theme, $isLike }) =>
    $isLike ? theme.color.main_light : theme.gray.gray_100};
  font-size: 0.7rem;

  & svg {
    color: ${({ theme, $isLike }) => ($isLike ? theme.color.white : 'initial')};
  }
`
