import PageLayout from '@/layout/PageLayout'
import { useNavigate } from 'react-router-dom'
import { TAG_LIST } from '@/data/boardTagList'
import styled, { css, useTheme } from 'styled-components'
import { useEffect, useState } from 'react'
import BoardTable from '@/components/board/BoardTable'
import { supabase } from '@/supabaseconfig'
import { BoardProps, BoardListProps } from '@/interface/BoardProps'
import Pagination from '@/components/common/Pagination'
import { Outlet } from 'react-router-dom'
import useModal from '@/hook/useModal'
import ModalPortal from '@/components/modal/ModalPortal'
import LoginModal from '@/components/modal/LoginModal'
import useAuthStore from '@/store/useAuthStore'
import MetaTags from '@/components/common/MetaTag'

const Board = () => {
  const { userInfo } = useAuthStore()
  const navigate = useNavigate()
  const theme = useTheme()
  const { isOpen, openModal, closeModal } = useModal()

  const [currentTag, setCurrentTag] = useState<BoardProps | null>(null)
  const [boardData, setBoardData] = useState<BoardListProps[] | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const pageGroupSize = 10
  const postsPerPage = 15

  const getTotalPages = async () => {
    try {
      const { count, error } = await supabase
        .from('board')
        .select('board_id', { count: 'exact', head: true })

      if (count) {
        setTotalPages(Math.ceil(count! / postsPerPage))
      }
      if (error) {
        throw error.message
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getBoardData = async () => {
    let query = supabase
      .from('board')
      .select(
        'id, board_id, user_id, tag, title, content, comments_count, user_name, created_at, likes_count, views_count'
      )
      .order('board_id', { ascending: false })
      .range((page - 1) * postsPerPage, page * postsPerPage - 1)

    if (currentTag !== null) {
      query = query.eq('tag', currentTag.name)

      const { data, error } = await query
      if (data) setBoardData(data)
      if (error) alert(error.message)
    }

    try {
      const { data, error } = await query

      if (data) setBoardData(data)
      if (error) alert(error.message)
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdate = () => {
    getBoardData()
  }

  useEffect(() => {
    getTotalPages()
    getBoardData()
  }, [currentTag, page])

  return (
    <PageLayout>
      <MetaTags
        title="Moneylicious - 커뮤니티"
        description="커뮤니티 페이지에서 다른 이용자들과 소통해보세요."
        url="https://moneylicious.vercel.app/board"
      />
      <PageTitle>커뮤니티</PageTitle>
      <CategoryList>
        {TAG_LIST.map(list => (
          <List
            key={list.id}
            onClick={() => {
              currentTag?.id === list.id
                ? setCurrentTag(null)
                : setCurrentTag(list)
            }}
            style={{
              color:
                list.id === currentTag?.id
                  ? theme.color.white
                  : theme.color.main,
              backgroundColor:
                list.id === currentTag?.id
                  ? theme.color.main
                  : theme.color.white
            }}>
            {list.name}
          </List>
        ))}
      </CategoryList>
      <Outlet context={{ handleUpdate }} />
      <PostHeader>
        <span>전체 {boardData ? boardData.length : 0}개</span>
        <Button
          type="button"
          onClick={() => {
            if (!userInfo?.accessToken) {
              confirm('로그인이 필요한 서비스입니다.') && openModal('로그인')
              return null
            }
            navigate('/board/write')
          }}>
          글작성
        </Button>
      </PostHeader>
      <BoardTable post={boardData} />
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        pageSize={pageGroupSize}
      />
      {isOpen('로그인') && (
        <ModalPortal>
          <LoginModal closeModal={() => closeModal('로그인')} />
        </ModalPortal>
      )}
    </PageLayout>
  )
}

export default Board

const buttonStyle = css`
  font-size: 0.9rem;
  border: 1px solid ${({ theme }) => theme.color.main_dark};
  display: block;
  padding: 6px 10px;
  border-radius: 6px;
`

const PageTitle = styled.h2`
  text-align: center;
  margin-top: 100px;
`

const CategoryList = styled.ul`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 20px 0;
`

const List = styled.li`
  cursor: pointer;
  ${buttonStyle}
`

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  & span {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.gray.gray_400};
    align-self: flex-end;
  }
`

const Button = styled.button`
  ${buttonStyle}
  background-color: ${({ theme }) => theme.color.main};
  color: ${({ theme }) => theme.color.white};
`
