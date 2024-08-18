import PageLayout from '@/layout/PageLayout'
import useModal from '@/hook/useModal'
import ModalPortal from '@/components/modal/ModalPortal'
import LoginModal from '@/components/modal/LoginModal'
import styled from 'styled-components'
import { RiLoginBoxLine } from 'react-icons/ri'
import AuthButton from '@/components/button/AuthButton'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '@/store/useAuthStore'
import { useEffect } from 'react'

const LoginRequired = () => {
  const { isOpen, openModal, closeModal } = useModal()
  const navigate = useNavigate()
  const { isLogin, userInfo } = useAuthStore()

  useEffect(() => {
    if (isLogin && userInfo?.accessToken) {
      alert('이미 로그인했습니다.')
      navigate(-1)
    }
  }, [isLogin, isLogin, navigate])

  return (
    <PageLayout>
      <Container>
        <RiLoginBoxLine size={40} />
        <Title>로그인이 필요한 서비스입니다.</Title>
        <span>
          서비스를 이용하시려면 회원가입 또는 로그인을 해주셔야 합니다.
        </span>
        <ButtonWrapper>
          <AuthButton
            text="로그인"
            size="medium"
            onClick={() => openModal('로그인')}
          />
          <AuthButton
            text="회원가입"
            type="main"
            onClick={() => navigate('/signup')}
          />
        </ButtonWrapper>
      </Container>
      {isOpen('로그인') && (
        <ModalPortal>
          <LoginModal
            closeModal={() => {
              closeModal('로그인')
              navigate(-1)
            }}
          />
        </ModalPortal>
      )}
    </PageLayout>
  )
}

export default LoginRequired

const Container = styled.div`
  margin: 120px auto;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;

  span {
    color: ${({ theme }) => theme.gray.gray_300};
  }
`

const Title = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
`

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 60px;
`
