import { BsPersonCircle } from 'react-icons/bs'
import { userInfoProps } from '@/store/useAuthStore'
import styled from 'styled-components'
import ProfileBoxModal from '@/components/modal/ProfileBoxModal'
import useModal from '@/hook/useModal'

const Profile = ({ userInfo }: { userInfo: userInfoProps['userInfo'] }) => {
  const { isOpen, openModal, closeModal } = useModal()
  return (
    <Container>
      <ProfileWrapper onClick={() => openModal('프로필')}>
        <BsPersonCircle size={20} />
        <span>{userInfo?.user_name}</span>
      </ProfileWrapper>
      {isOpen('프로필') && (
        <ProfileBoxModal closeModal={() => closeModal('프로필')} />
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
