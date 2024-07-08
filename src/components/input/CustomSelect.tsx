import { useState } from 'react'
import styled from 'styled-components'
import { FormRow } from '@/components/input/FormRow'

const SelectBox = ({
  list,
  width
}: {
  list: {
    id: number
    name: string
  }[]
  width?: string
}) => {
  const [select, setSelect] = useState<{
    id: number
    name: string
  }>(list[0])

  const [isOn, setIsOn] = useState(false)
  return (
    <Container $width={width}>
      <Select onClick={() => setIsOn(prev => !prev)}>{select.name}</Select>
      {isOn && (
        <Option>
          {list.map(list => (
            <Li
              key={list.id}
              onClick={() => {
                setSelect(list)
                setIsOn(false)
              }}>
              {list.name}
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

const Select = styled(FormRow)`
  text-align: center;
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
