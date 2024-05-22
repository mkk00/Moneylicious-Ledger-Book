import { MouseEvent } from 'react'
import styled from 'styled-components'
import {
  CiSaveDown1,
  CiEdit,
  CiEraser,
  CiCirclePlus,
  CiCircleMinus
} from 'react-icons/ci'

const IconButton = ({
  type,
  onClick
}: {
  type: 'add' | 'edit' | 'del' | 'expense' | 'income'
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
}) => {
  return (
    <Button
      type={type}
      onClick={e => onClick(e)}>
      {type === 'add' && <CiSaveDown1 size={24} />}
      {type === 'edit' && <CiEdit size={24} />}
      {type === 'del' && <CiEraser size={24} />}
      {type === 'expense' && <CiCircleMinus size={24} />}
      {type === 'income' && <CiCirclePlus size={24} />}
    </Button>
  )
}

export default IconButton

const Button = styled.button<{
  type: 'add' | 'edit' | 'del' | 'expense' | 'income'
}>`
  width: ${({ type }) =>
    type === 'del' || type === 'expense' || type === 'income'
      ? 'initial'
      : '100%'};
  border: 1px solid ${({ theme }) => theme.gray.gray_200};
  border-radius: 8px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;

  &:hover {
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ type, theme }) =>
      type === 'del' || type === 'expense'
        ? theme.color.sub
        : theme.color.main_light};
    border: 1px solid
      ${({ type, theme }) =>
        type === 'del' || type === 'expense'
          ? theme.color.sub
          : theme.color.main_light};
  }
`
