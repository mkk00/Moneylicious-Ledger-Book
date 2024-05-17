import ProfileLayout from '@/components/modal/ProfileLayout'
import styled from 'styled-components'
import { RiLogoutBoxLine, RiHomeSmile2Line } from 'react-icons/ri'
import { supabase } from '@/supabaseconfig'
import useAuthStore from '@/store/useAuthStore'

const ProfileBoxModal = ({ closeModal }: { closeModal: () => void }) => {
  const setLogout = useAuthStore(state => state.setLogout)

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error(error)
      alert(error.message)
    } else {
      alert('로그아웃 되었습니다.')
      setLogout()
    }
  }
  return (
    <ProfileLayout
      closeModal={closeModal}
      width="150px">
      <Container>
        <Button onClick={handleLogOut}>
          <RiLogoutBoxLine size={20} />
          로그아웃
        </Button>
        <Button>
          <RiHomeSmile2Line size={20} />
          마이페이지
        </Button>
      </Container>
    </ProfileLayout>
  )
}

export default ProfileBoxModal

const Container = styled.div`
  display: flex;
  gap: 15px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

const Button = styled.button`
  display: flex;
  gap: 5px;
  align-items: center;

  svg {
    transform: translateY(-1px);
  }
`
