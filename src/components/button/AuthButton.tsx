import styled, { css } from 'styled-components'

const AuthButton = ({
  text,
  type,
  size = 'medium',
  onClick
}: {
  text: string
  type?: 'main'
  size?: 'small' | 'medium' | 'large'
  onClick: () => void
}) => {
  return (
    <Button
      type={type}
      $size={size}
      onClick={() => onClick()}>
      {text}
    </Button>
  )
}

export default AuthButton

const normalButton = css`
  border: 1px solid ${({ theme }) => theme.gray.gray_400};
  background-color: ${({ theme }) => theme.color.white};
  padding: 12px;
`

const authStyle = css`
  border: 1px solid ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.white};
  padding: 7px 10px;
  font-size: 0.8rem;
  &:hover {
    background-color: ${({ theme }) => theme.color.white};
    color: ${({ theme }) => theme.color.sub_light};
  }
`

const Button = styled.button<{
  type?: 'main'
  $size?: 'small' | 'medium' | 'large'
}>`
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${props => props.$size === 'medium' && normalButton}
  ${props => props.$size === 'small' && authStyle}

  ${({ theme, type, $size }) =>
    type === 'main' &&
    $size === 'small' &&
    css`
      &:hover {
        color: ${theme.color.main_light};
      }
    `}

    ${({ theme, type, $size }) =>
    type === 'main' &&
    $size === 'medium' &&
    css`
      background-color: ${theme.color.main_light};
      border-color: ${theme.color.main_light};
      color: ${theme.color.white};
    `}
`
