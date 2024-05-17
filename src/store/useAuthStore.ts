import { create } from 'zustand'

export interface userInfoProps {
  isLogin: boolean
  setLogin: () => void
  setLogout: () => void
  userInfo: {
    id?: string
    email?: string
    created_at?: string
    user_name?: string
    message?: string
    accessToken?: string
  } | null
  setUserInfo: (userInfo: userInfoProps['userInfo']) => void
}

const token = localStorage.getItem('sb-mbduhlqpzhiarzanmprr-auth-token')
const JSON_token = token ? JSON.parse(token) : null

const useAuthStore = create<userInfoProps>(set => ({
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
        created_at: JSON_token.user.created_at,
        user_name: JSON_token.user.user_metadata.user_name,
        message: JSON_token.user.user_metadata.message,
        accessToken: JSON_token.access_token
      }
    : null,
  setUserInfo: userInfo => set({ userInfo: userInfo })
}))

export default useAuthStore
