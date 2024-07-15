import useAuthStore from '@/store/useAuthStore'
import Profile from '@/components/common/Profile'
import styled from 'styled-components'
import AuthButton from '@/components/button/AuthButton'
import { useNavigate } from 'react-router-dom'
import useModal from '@/hook/useModal'
import ModalPortal from '@/components/modal/ModalPortal'
import LoginModal from '@/components/modal/LoginModal'

const UserInfo = () => {
  const navigate = useNavigate()
  const { userInfo } = useAuthStore()
  const { isOpen, openModal, closeModal } = useModal()

  return (
    <>
      {userInfo?.accessToken ? (
        <Profile userInfo={userInfo} />
      ) : (
        <AuthButtons>
          <AuthButton
            text="로그인"
            size="small"
            type="main"
            onClick={() => openModal('로그인')}
          />
          <AuthButton
            text="회원가입"
            size="small"
            onClick={() => navigate('/signup')}
          />
        </AuthButtons>
      )}
      {isOpen('로그인') && (
        <ModalPortal>
          <LoginModal closeModal={() => closeModal('로그인')} />
        </ModalPortal>
      )}
    </>
  )
}

export default UserInfo

const AuthButtons = styled.div`
  display: flex;
  gap: 10px;
`
