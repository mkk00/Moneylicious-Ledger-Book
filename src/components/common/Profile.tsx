import { BsPersonCircle } from 'react-icons/bs'
import { UserAuthProps } from '@/store/useAuthStore'
import styled from 'styled-components'
import ProfileBox from '@/components/modal/ProfileBox'
import useModal from '@/hook/useModal'
import ProfileLayout from '@/components/modal/ProfileLayout'

const Profile = ({ userInfo }: { userInfo: UserAuthProps['userInfo'] }) => {
  const { isOpen, openModal, closeModal } = useModal()
  return (
    <Container>
      <ProfileWrapper onClick={() => openModal('프로필')}>
        {userInfo?.image_url ? (
          <ProfileImage>
            <img
              src={userInfo.image_url}
              alt="유저프로필"
            />
          </ProfileImage>
        ) : (
          <BsPersonCircle size={20} />
        )}
        <span>{userInfo?.username}</span>
      </ProfileWrapper>
      {isOpen('프로필') && (
        <ProfileLayout
          closeModal={() => closeModal('프로필')}
          width="150px">
          <ProfileBox />
        </ProfileLayout>
      )}
    </Container>
  )
}

export default Profile

const Container = styled.div`
  position: relative;
  cursor: pointer;
`

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
`

const ProfileImage = styled.div`
  width: 23px;
  height: 23px;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 100%;
  padding: 2px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
`
