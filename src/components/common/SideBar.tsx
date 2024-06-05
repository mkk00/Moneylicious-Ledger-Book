import styled, { css } from 'styled-components'
import UserInfo from '@/components/common/UserInfo'
import NavigationBar from '@/components/common/NavigationBar'
import SideBarModalLayout from '@/components/modal/SideBarModalLayout'
import useAuthStore from '@/store/useAuthStore'
import ProfileBox from '@/components/modal/ProfileBox'

const SideBar = ({ closeModal }: { closeModal: () => void }) => {
  const { userInfo } = useAuthStore()
  return (
    <SideBarModalLayout closeModal={closeModal}>
      <Container>
        <UserInfoWrapper $isLogin={userInfo ? true : false}>
          <UserName>
            <div>
              {userInfo && <img src={userInfo.image_url} />}
              <>{userInfo ? userInfo.username : 'Unkown User'} 님</>
            </div>
            <span>{userInfo?.email}</span>
          </UserName>
          {userInfo ? <ProfileBox /> : <UserInfo />}
        </UserInfoWrapper>
        <NavigationBar />
      </Container>
    </SideBarModalLayout>
  )
}

export default SideBar

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: flex-start;
  color: initial;
`

const UserInfoWrapper = styled.div<{ $isLogin: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;

  & button {
    color: ${({ theme }) => theme.gray.gray_400};
  }

  ${({ $isLogin }) =>
    $isLogin &&
    css`
      & div:nth-of-type(2) {
        gap: 15px;
        flex-direction: row;
        justify-content: flex-start;
        padding: 5px 10px;

        & svg {
          width: 15px;
          height: 15px;
          color: ${({ theme }) => theme.gray.gray_400};
        }

        & button {
          color: ${({ theme }) => theme.gray.gray_400};
        }
      }
    `}
`

const UserName = styled.div`
  font-size: 1.3rem;
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    align-items: center;
    gap: 8px;

    img {
      width: 28px;
      height: 28px;
    }
  }

  span {
    color: ${({ theme }) => theme.gray.gray_300};
    font-size: 0.9rem;
  }
`
