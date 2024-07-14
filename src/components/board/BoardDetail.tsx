import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { formatDate } from '@/utils/formatDate'
import DOMPurify from 'isomorphic-dompurify'
import { GoThumbsup } from 'react-icons/go'

const BoardDetail = () => {
  const location = useLocation()
  const { item } = location.state || {}

  console.log(item.content)

  return (
    <Container>
      <Detailheader>
        <Top>
          <Title>
            {item.title}
            {item.comments_count ? ' [' + item.comments_count + ']' : null}
          </Title>
          <Tag>#{item.tag}</Tag>
        </Top>
        <Bottom>
          <div>작성 {item.user_name}</div>
          <CteatedAt>작성일 {formatDate(new Date(item.created_at))}</CteatedAt>
        </Bottom>
      </Detailheader>
      {item?.content && (
        <Content
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(String(item?.content))
          }}
        />
      )}
      <Button>
        <GoThumbsup size={30} />
      </Button>
    </Container>
  )
}

export default BoardDetail

const Container = styled.div`
  margin: 50px 0;
  border-bottom: 1px solid ${({ theme }) => theme.gray.gray_200};
`

const Detailheader = styled.div`
  border-top: 1px solid ${({ theme }) => theme.gray.gray_200};
  border-bottom: 1px solid ${({ theme }) => theme.gray.gray_200};
  padding: 15px 10px;
`

const Top = styled.span`
  display: flex;
  gap: 10px;
  align-items: center;
`

const Bottom = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-end;
  color: ${({ theme }) => theme.gray.gray_400};
  font-size: 0.8rem;
  margin-top: 5px;
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

const Button = styled.button`
  width: 65px;
  height: 65px;
  display: block;
  margin: 30px auto;
  border-radius: 100%;
  padding: 15px;
  background-color: ${({ theme }) => theme.color.main_light};

  & svg {
    color: ${({ theme }) => theme.color.white};
  }
`
