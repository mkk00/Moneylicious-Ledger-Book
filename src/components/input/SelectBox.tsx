import { Dispatch, SetStateAction, useState } from 'react'
import styled from 'styled-components'
import { BiDownArrow, BiSolidDownArrow } from 'react-icons/bi'

const SelectBox = <T extends number | string>({
  items,
  selectItem,
  setSelectItem,
  width
}: {
  items: T[]
  selectItem: T
  setSelectItem: Dispatch<SetStateAction<T>>
  width?: string
}) => {
  const [isOn, setIsOn] = useState(false)
  return (
    <Container $width={width}>
      <Select onClick={() => setIsOn(prev => !prev)}>
        {selectItem}
        {isOn ? <BiSolidDownArrow size={10} /> : <BiDownArrow size={10} />}
      </Select>
      {isOn && (
        <Option>
          {items.map(item => (
            <Li
              key={item}
              onClick={() => {
                setSelectItem(item)
                setIsOn(false)
              }}>
              {item}
            </Li>
          ))}
        </Option>
      )}
    </Container>
  )
}

export default SelectBox

const Container = styled.div<{ $width?: string }>`
  width: ${({ $width }) => ($width ? $width : '100px')};
  position: relative;
  cursor: pointer;
  font-size: 0.9rem;
`

const Select = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.gray.gray_200};
  padding-bottom: 10px;

  & svg {
    transform: translateY(-1px);
  }
`

const Option = styled.ul`
  width: 100%;
  position: absolute;
  left: 0;
  text-align: center;
  margin-top: 10px;
  border: 1px solid ${({ theme }) => theme.gray.gray_300};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.color.white};
  z-index: 1;
`

const Li = styled.li`
  padding: 14px 18px 13px;

  &:hover {
    &:first-of-type {
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }
    &:last-of-type {
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
    }
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.main_light};
  }
`
