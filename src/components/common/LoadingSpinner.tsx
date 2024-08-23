import { PuffLoader } from 'react-spinners'
import styled from 'styled-components'

const LoadingSpinner = () => {
  return (
    <Container>
      <PuffLoader
        color="#3c5afe"
        size={60}
      />
    </Container>
  )
}

export default LoadingSpinner

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
`
