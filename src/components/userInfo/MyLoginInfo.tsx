import useAuthStore from '@/store/useAuthStore'
import styled, { useTheme } from 'styled-components'
import AuthButton from '@/components/button/AuthButton'
import useModal from '@/hook/useModal'
import ModalPortal from '@/components/modal/ModalPortal'
import LoginModal from '@/components/modal/LoginModal'
import { useNavigate } from 'react-router-dom'

const MyLoginInfo = () => {
  const { isOpen, openModal, closeModal } = useModal()
  const navigate = useNavigate()
  const { userInfo } = useAuthStore()
  const theme = useTheme()
  console.log(userInfo)
  return (
    <>
      <ProfileBox>
        {userInfo?.image_url ? (
          <ProfileImage>
            <img
              src={userInfo.image_url}
              alt="user profile image"
            />
          </ProfileImage>
        ) : (
          <ProfileImage>
            <svg
              height="180"
              viewBox="0 0 94 96"
              fill="none">
              <ellipse
                cx="52.5"
                cy="36.5"
                rx="24.5"
                ry="21.5"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M86.332 14.635C86.048 3.53641 74.2242 -3.41827 64.386 1.72651L53.6064 7.36351C50.1895 9.15038 46.2156 9.55272 42.5098 8.48701L29.7467 4.81662C20.7777 2.23732 11.6557 8.38691 10.6828 17.6686L9.02537 33.4807C8.88077 34.8601 8.54555 36.2129 8.02928 37.5002L1.08384 54.8191C-2.23293 63.0896 2.34922 72.411 10.9237 74.8361L22.0258 77.9762C25.3767 78.9239 28.2934 81.008 30.2758 83.871L33.878 89.0734C40.4561 98.5738 54.8543 97.3811 59.7796 86.9279L66.4326 72.8077C68.533 68.3498 72.689 65.208 77.5507 64.4028L81.0739 63.8192C91.2339 62.1363 96.7151 50.9502 91.8193 41.8899L88.498 35.7435C87.3761 33.6673 86.7599 31.3555 86.6995 28.9963L86.332 14.635ZM40.6927 33.4293C43.1394 32.9929 44.769 30.6557 44.3326 28.2091C43.8962 25.7624 41.559 24.1327 39.1124 24.5691C36.6657 25.0055 35.0361 27.3427 35.4725 29.7894C35.9089 32.2361 38.2461 33.8657 40.6927 33.4293ZM69.3388 34.4597C69.8296 37.2114 67.9968 39.84 65.2451 40.3308C62.4934 40.8216 59.8648 38.9888 59.3739 36.237C58.8831 33.4853 60.716 30.8567 63.4677 30.3659C66.2194 29.8751 68.848 31.7079 69.3388 34.4597ZM45.3236 39.7806C45.3236 39.7806 40.3236 46.3671 48.4508 51.8856C56.578 57.4042 60.8557 50.3273 60.8557 50.3273L45.3236 39.7806Z"
                fill={theme.color.main_light}
              />
            </svg>
          </ProfileImage>
        )}
        <UserInfo>
          <UserName>
            {userInfo ? `${userInfo.username} 님! 반가워요` : 'Unkown User 님!'}
          </UserName>
          {userInfo ? (
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
          {userInfo?.message
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
    height: 100%;
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
