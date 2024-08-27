import { MouseEvent } from 'react'
import styled from 'styled-components'
import {
  CiSaveDown1,
  CiEdit,
  CiEraser,
  CiCirclePlus,
  CiCircleMinus
} from 'react-icons/ci'
import { PiPlusThin } from 'react-icons/pi'

const IconButton = ({
  type,
  submit,
  onClick,
  ariaLabel
}: {
  type: 'add' | 'edit' | 'del' | 'expense' | 'income' | 'plus'
  submit?: boolean
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  ariaLabel: string
}) => {
  return (
    <Button
      type={submit ? 'submit' : 'button'}
      $buttontype={type}
      onClick={e => onClick && onClick(e)}
      aria-label={ariaLabel}>
      {type === 'add' && <CiSaveDown1 size={24} />}
      {type === 'edit' && <CiEdit size={24} />}
      {type === 'del' && <CiEraser size={24} />}
      {type === 'expense' && <CiCircleMinus size={24} />}
      {type === 'income' && <CiCirclePlus size={24} />}
      {type === 'plus' && <PiPlusThin size={20} />}
    </Button>
  )
}

export default IconButton

const Button = styled.button<{
  $buttontype: 'add' | 'edit' | 'del' | 'expense' | 'income' | 'plus'
}>`
  width: ${({ $buttontype }) =>
    $buttontype === 'del' ||
    $buttontype === 'expense' ||
    $buttontype === 'income'
      ? 'initial'
      : '100%'};
  border: 1px solid ${({ theme }) => theme.gray.gray_200};
  border-radius: 8px;
  padding: ${({ $buttontype }) => ($buttontype === 'plus' ? '6px' : '15px')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;

  &:hover {
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ $buttontype, theme }) =>
      $buttontype === 'del' || $buttontype === 'expense'
        ? theme.color.sub
        : theme.color.main_light};
    border: 1px solid
      ${({ $buttontype, theme }) =>
        $buttontype === 'del' || $buttontype === 'expense'
          ? theme.color.sub
          : theme.color.main_light};
  }
`
