import { create } from 'zustand'
import { UserInfoProps } from '@/interface/AuthProps'

export interface UserAuthProps {
  isLogin: boolean
  setLogin: () => void
  setLogout: () => void
  userInfo: UserInfoProps | null
  setUserInfo: (userInfo: UserAuthProps['userInfo']) => void
}

const token = localStorage.getItem('sb-mbduhlqpzhiarzanmprr-auth-token')
const JSON_token = token ? JSON.parse(token) : null

const useAuthStore = create<UserAuthProps>(set => ({
  isLogin: localStorage.getItem('sb-mbduhlqpzhiarzanmprr-auth-token')
    ? true
    : false,

  setLogin: () =>
    set({
      isLogin: true
    }),

  setLogout: () =>
    set({
      isLogin: false,
      userInfo: null
    }),

  userInfo: token
    ? {
        id: JSON_token.user.id,
        email: JSON_token.user.email,
        image_url: JSON_token.user.image_url,
        created_at: JSON_token.user.created_at,
        username: JSON_token.user.user_metadata.user_name,
        message: JSON_token.user.user_metadata.message,
        accessToken: JSON_token.access_token
      }
    : null,
  setUserInfo: userInfo => set({ userInfo: userInfo })
}))

export default useAuthStore
