import styled from 'styled-components'
import { FiAlertCircle } from 'react-icons/fi'
import Button from '../button/Button'
import { useNavigate } from 'react-router-dom'

const NoData = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <FiAlertCircle size={40} />
      <Title>가계부 데이터가 없습니다.</Title>
      <span>
        캘린더에 데이터가 존재해야 콘텐츠를 표시할 수 있습니다.
        <br />
        캘린더 페이지에서 데이터를 추가해보세요!
      </span>
      <Button
        text="캘린더 바로가기"
        size="small"
        onClick={() => navigate('/')}
      />
    </Container>
  )
}

export default NoData

const Container = styled.div`
  margin: 120px auto;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;

  span {
    color: ${({ theme }) => theme.gray.gray_300};
    margin-bottom: 60px;
  }
`

const Title = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
`
