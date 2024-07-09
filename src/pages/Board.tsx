import PageLayout from '@/layout/PageLayout'
import { useNavigate } from 'react-router-dom'
import { TAG_LIST } from '@/data/boardTagList'
import styled, { css, useTheme } from 'styled-components'
import { useEffect, useState } from 'react'
import BoardTable from '@/components/board/BoardTable'

const Board = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const [currentTag, setCurrentTag] = useState<number | null>(null)

  useEffect(() => {}, [currentTag])

  return (
    <PageLayout>
      <PageTitle>커뮤니티</PageTitle>
      <CategoryList>
        {TAG_LIST.map(list => (
          <List
            key={list.id}
            onClick={() => {
              currentTag === list.id
                ? setCurrentTag(null)
                : setCurrentTag(list.id)
            }}
            style={{
              color:
                list.id === currentTag ? theme.color.white : theme.color.main,
              backgroundColor:
                list.id === currentTag ? theme.color.main : theme.color.white
            }}>
            {list.name}
          </List>
        ))}
      </CategoryList>
      <PostHeader>
        <span>전체 0개</span>
        <Button
          type="button"
          onClick={() => navigate('/board/write')}>
          글작성
        </Button>
      </PostHeader>
      <BoardTable post={null} />
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
