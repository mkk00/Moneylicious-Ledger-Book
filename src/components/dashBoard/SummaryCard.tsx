import styled from 'styled-components'

const SummaryCard = ({
  title,
  content,
  description,
  onClick
}: {
  title: string
  content?: string
  description: () => string
  onClick?: () => void
}) => {
  return (
    <Container onClick={onClick}>
      <Title>{title}</Title>
      <Content>{content}</Content>
      <Description>{description()}</Description>
    </Container>
  )
}

export default SummaryCard

const Title = styled.div`
  font-weight: bold;
`

const Content = styled.span`
  font-size: 1.6rem;
  font-weight: bold;
`

const Description = styled.span`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.gray.gray_500};
`

const Container = styled.div`
  width: 300px;
  min-height: 180px;
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.gray.gray_100};
  border-radius: 8px;
  padding: 20px 30px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.main_light};

    ${Title}, ${Content} {
      color: ${({ theme }) => theme.color.white};
    }

    ${Description} {
      color: ${({ theme }) => theme.gray.gray_100};
    }
  }
`
