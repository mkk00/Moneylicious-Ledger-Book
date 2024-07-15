import { MouseEvent } from 'react'
import styled from 'styled-components'

const Button = ({
  text,
  type,
  size = 'medium',
  onClick
}: {
  text: string
  type?: 'button' | 'submit'
  size?: 'small' | 'medium' | 'large'
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}) => {
  return (
    <ButtonComponents
      type={type}
      size={size}
      onClick={e => {
        type === 'button' && e.preventDefault()
        onClick && onClick(e)
      }}>
      {text}
    </ButtonComponents>
  )
}

export default Button

const ButtonComponents = styled.button<{ size?: 'small' | 'medium' | 'large' }>`
  background-color: ${({ theme }) => theme.color.main};
  color: ${({ theme }) => theme.color.white};
  border: none;
  font-weight: ${({ size }) => (size === 'small' ? 'normal' : 'bold')};
  font-size: ${({ size }) =>
    size === 'small' ? '0.9rem' : size === 'large' ? '1.4rem' : '1.2rem'};
  border-radius: 6px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
`
