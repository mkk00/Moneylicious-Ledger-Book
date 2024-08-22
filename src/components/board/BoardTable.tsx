import { formatDate } from '@/utils/formatDate'
import styled, { css, useTheme } from 'styled-components'
import { BoardListProps } from '@/interface/BoardProps'
import { NavLink } from 'react-router-dom'
import { useResponsive } from '@/hook/useMediaQuery'

const BoardTable = ({ post }: { post?: BoardListProps[] | null }) => {
  const { isMobile, isDesktopOrLaptop } = useResponsive()
  const today = new Date()
  const { color } = useTheme()

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navActiveStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? color.main_dark : 'initial',
    fontWeight: isActive ? 'bold' : 'normal',
    textDecoration: isActive ? 'underline' : 'none',
    textUnderlineOffset: '4px'
  })

  return (
    <Table $isMobile={isMobile}>
      <Thead>
        <tr>
          {!isMobile && <Th $width={isMobile ? 'ss' : 'md'}>No</Th>}
          <Th $width={isMobile ? 'sm' : 'md'}>태그</Th>
          <Th $width="wide">제목</Th>
          <Th $width={isMobile ? 'md' : 'lg'}>작성자</Th>
          <Th $width="md">작성일</Th>
          <Th $width={isMobile ? 'ss' : 'md'}>추천수</Th>
          <Th $width={isMobile ? 'ss' : 'md'}>조회수</Th>
        </tr>
      </Thead>
      <Tbody $isDesktopOrLaptop={isDesktopOrLaptop}>
        {post?.map(item => (
          <tr key={item.board_id}>
            {!isMobile && <td>{item.board_id}</td>}
            <td>{item.tag}</td>
            <Title
              onClick={handleScrollToTop}
              $isMobile={isMobile}>
              <NavLink
                to={`/board/${item.board_id}`}
                state={{ item }}
                style={navActiveStyle}>
                {item.title}
                <span>
                  {item.comments_count
                    ? ' [' + item.comments_count + ']'
                    : null}
                </span>
              </NavLink>
            </Title>
            <Name $isMobile={isMobile}>{item.user_name}</Name>
            <WriteDate>
              {formatDate(new Date(item.created_at)) === formatDate(today)
                ? '오늘'
                : formatDate(new Date(item.created_at))}
            </WriteDate>
            <td>{item.likes_count > 9999 ? '9999+' : item.likes_count}</td>
            <td>{item.views_count > 9999 ? '9999+' : item.views_count}</td>
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
`

const widthSize = {
  ss: '35px',
  sm: '55px',
  md: '80px',
  lg: '150px',
  wide: 'auto'
}

const Table = styled.table<{ $isMobile: boolean }>`
  text-align: center;
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  border-bottom: 1px solid ${({ theme }) => theme.gray.gray_100};

  & th {
    padding: ${({ $isMobile }) => ($isMobile ? '10px 0px' : '10px')};
    font-size: ${({ $isMobile }) => ($isMobile ? '0.7rem' : '0.8rem')};
  }
`

const Thead = styled.thead`
  background-color: ${({ theme }) => theme.gray.gray_100};
`

const Th = styled.th<{ $width?: string }>`
  font-weight: normal;

  width: ${({ $width }) =>
    ($width === 'ss' && widthSize.ss) ||
    ($width === 'sm' && widthSize.sm) ||
    ($width === 'md' && widthSize.md) ||
    ($width === 'lg' && widthSize.lg) ||
    ($width === 'wide' && widthSize.wide)};
`

const Tbody = styled.tbody<{ $isDesktopOrLaptop: boolean }>`
  width: 100%;
  font-size: ${({ $isDesktopOrLaptop }) =>
    $isDesktopOrLaptop ? '0.9rem' : '0.7rem'};

  & td {
    padding: ${({ $isDesktopOrLaptop }) =>
      $isDesktopOrLaptop ? '3px 10px' : '3px 0px'};
  }
`

const Title = styled.td<{ $isMobile: boolean }>`
  ${omiss}
  white-space: ${({ $isMobile }) => ($isMobile ? 'wrap' : 'nowrap')};
  line-height: ${({ $isMobile }) => $isMobile && '1.5'};
  font-size: ${({ $isMobile }) => $isMobile && '0.8rem'};
  text-align: start;

  & span {
    ${spanStyle}
  }
`

const Name = styled.td<{ $isMobile: boolean }>`
  ${omiss}
  white-space: ${({ $isMobile }) => ($isMobile ? 'wrap' : 'nowrap')};
  line-height: 44px;
`

const WriteDate = styled.td`
  ${spanStyle}
`
