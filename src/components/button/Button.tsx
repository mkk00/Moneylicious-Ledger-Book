import { MouseEvent } from 'react'
import styled from 'styled-components'

const Button = ({
  text,
  type,
  onClick
}: {
  text: string
  type?: 'button' | 'submit'
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
}) => {
  return (
    <ButtonComponents
      type={type}
      onClick={e => {
        e.preventDefault()
        onClick(e)
      }}>
      {text}
    </ButtonComponents>
  )
}

export default Button

const ButtonComponents = styled.button`
  background-color: ${({ theme }) => theme.color.main};
  color: ${({ theme }) => theme.color.white};
  border: none;
  font-weight: bold;
  font-size: 1.4rem;
  border-radius: 6px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`
