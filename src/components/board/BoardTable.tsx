import { formatDate } from '@/utils/formatDate'
import styled, { css } from 'styled-components'
import { BoardListProps } from '@/interface/BoardProps'

const BoardTable = ({ post }: { post?: BoardListProps[] | null }) => {
  const today = new Date()

  return (
    <Table>
      <Thead>
        <tr>
          <Th $width="md">No</Th>
          <Th $width="md">태그</Th>
          <Th $width="wide">제목</Th>
          <Th $width="lg">작성자</Th>
          <Th $width="md">작성일</Th>
          <Th $width="md">추천수</Th>
        </tr>
      </Thead>
      <Tbody>
        {post?.map(item => (
          <tr key={item.board_id}>
            <td>{item.board_id}</td>
            <td>{item.tag}</td>
            <Title>
              {item.title} <span>[{item.comments_count}]</span>
            </Title>
            <Name>{item.user_name}</Name>
            <WriteDate>
              {formatDate(new Date(item.created_at)) === formatDate(today)
                ? '오늘'
                : formatDate(new Date(item.created_at))}
            </WriteDate>
            <td>{item.likes_count > 9999 ? '9999+' : item.likes_count}</td>
          </tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default BoardTable

const spanStyle = css`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.gray.gray_400};
`

const omiss = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const widthSize = {
  sm: '50px',
  md: '90px',
  lg: '150px',
  wide: 'auto'
}

const Table = styled.table`
  text-align: center;
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  border-bottom: 1px solid ${({ theme }) => theme.gray.gray_100};
`

const Thead = styled.thead`
  background-color: ${({ theme }) => theme.gray.gray_100};
`

const Th = styled.th<{ $width?: string }>`
  padding: 10px;
  font-weight: normal;
  font-size: 0.8rem;

  width: ${({ $width }) =>
    ($width === 'sm' && widthSize.sm) ||
    ($width === 'md' && widthSize.md) ||
    ($width === 'lg' && widthSize.lg) ||
    ($width === 'wide' && widthSize.wide)};
`

const Tbody = styled.tbody`
  width: 100%;
  & td {
    padding: 3px 10px;
  }
  font-size: 0.9rem;
`

const Title = styled.td`
  ${omiss}
  text-align: start;

  & span {
    ${spanStyle}
  }
`

const Name = styled.td`
  ${omiss}
  line-height: 44px;
`

const WriteDate = styled.td`
  ${spanStyle}
`
