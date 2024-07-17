import styled from 'styled-components'
import { RiLogoutBoxLine, RiHomeSmile2Line } from 'react-icons/ri'
import { supabase } from '@/supabaseconfig'
import useAuthStore from '@/store/useAuthStore'
import { useNavigate } from 'react-router-dom'

const ProfileBox = () => {
  const navigate = useNavigate()
  const { userInfo, setLogout, setUserInfo } = useAuthStore()

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error(error)
      alert(error.message)
    } else {
      alert('로그아웃 되었습니다.')
      setLogout()
      setUserInfo(null)
      navigate('/')
    }
  }
  return (
    <Container>
      {userInfo?.accessToken && (
        <>
          <Button onClick={handleLogOut}>
            <RiLogoutBoxLine size={20} />
            로그아웃
          </Button>
          <Button onClick={() => navigate('/mypage')}>
            <RiHomeSmile2Line size={20} />
            마이페이지
          </Button>
        </>
      )}
    </Container>
  )
}

export default ProfileBox

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
    position: static;
  }
`
