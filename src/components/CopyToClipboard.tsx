import styled from 'styled-components'

const CopyToClipboard = ({ text }: { text: string }) => {
  const handleClickCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('copied')
    } catch (e) {
      alert('failed')
    }
  }
  return <Button onClick={() => handleClickCopy(text)}>{text}</Button>
}

export default CopyToClipboard

const Button = styled.button`
  text-decoration: underline;

  &:hover {
    font-weight: bold;
  }
`
