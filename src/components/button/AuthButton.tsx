import styled from 'styled-components'

const AuthButton = ({
  text,
  type,
  onClick
}: {
  text: string
  type?: 'main'
  onClick: () => void
}) => {
  return (
    <Button
      type={type}
      onClick={() => onClick()}>
      {text}
    </Button>
  )
}

export default AuthButton

const Button = styled.button<{ type?: 'main' }>`
  border: 1px solid ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.white};
  border-radius: 5px;
  padding: 7px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;

  &:hover {
    background-color: ${({ theme }) => theme.color.white};
    color: ${({ theme, type }) =>
      type === 'main' ? theme.color.main_light : theme.color.sub_light};
  }
`
