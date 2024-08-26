import useAuthStore from '@/store/useAuthStore'
import styled from 'styled-components'
import AuthButton from '@/components/button/AuthButton'
import useModal from '@/hook/useModal'
import ModalPortal from '@/components/modal/ModalPortal'
import LoginModal from '@/components/modal/LoginModal'
import { useNavigate } from 'react-router-dom'
import DefaultProfile from './DefaultProfile'

const MyLoginInfo = () => {
  const { isOpen, openModal, closeModal } = useModal()
  const navigate = useNavigate()
  const { userInfo } = useAuthStore()

  console.log(userInfo)
  return (
    <>
      <ProfileBox>
        {userInfo?.accessToken && userInfo.image_url ? (
          <ProfileImage>
            <img
              src={userInfo.image_url}
              alt="user profile image"
            />
          </ProfileImage>
        ) : (
          <DefaultProfile />
        )}
        <UserInfo>
          <UserName>
            {userInfo?.accessToken
              ? `${userInfo.username} 님! 반가워요`
              : 'Unkown User 님!'}
          </UserName>
          {userInfo?.accessToken ? (
            <span>{userInfo.email}</span>
          ) : (
            <AuthButtons>
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
            </AuthButtons>
          )}
        </UserInfo>
        <Message>
          {userInfo?.accessToken
            ? userInfo.message
            : "서비스를 이용하시려면 '회원가입' 또는 '로그인'을 해주셔야 합니다."}
        </Message>
        {isOpen('로그인') && (
          <ModalPortal>
            <LoginModal closeModal={() => closeModal('로그인')} />
          </ModalPortal>
        )}
      </ProfileBox>
    </>
  )
}

export default MyLoginInfo

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0 0 20px;
  gap: 15px;
`

const ProfileImage = styled.div`
  max-width: 300px;
  max-height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  margin: 0 auto;

  svg,
  img {
    object-fit: contain;
    max-width: 300px;
    max-height: 250px;
  }
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;

  & span {
    color: ${({ theme }) => theme.gray.gray_300};
    font-size: 0.9rem;
  }
`

const UserName = styled.div`
  font-size: 1.2rem;
`

const AuthButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;

  button {
    flex-grow: 1;
  }
`

const Message = styled.div`
  color: ${({ theme }) => theme.gray.gray_400};
  padding: 15px;
  background-color: ${({ theme }) => theme.gray.gray_100};
  font-size: 0.9rem;
`
