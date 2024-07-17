import styled, { css } from 'styled-components'

const FormRow = styled.div`
  border: 1px solid ${({ theme }) => theme.gray.gray_300};
  border-radius: 6px;
  padding: 14px 18px 13px;
  height: 100%;
  flex-grow: 1;
`

const defaultStyle = css`
  width: 100%;
  border: none;
  outline: none;
  line-height: normal;
`

const Input = styled.input`
  ${defaultStyle}
`

const Text = styled.textarea`
  ${defaultStyle}
  resize: none;
  height: 100px;
`

export { FormRow, Input, Text }
