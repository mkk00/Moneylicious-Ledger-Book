export interface UserInfoProps {
  id?: string
  email?: string
  image_url?: string
  created_at?: string
  username?: string
  message?: string
  accessToken?: string
}

export interface AuthProps {
  email: string
  password: string
  image_url?: string
  name?: string
  confirmPassword?: string
  message?: string
}

export interface MypageProps {
  image_url?: string
  name?: string
  password?: string
  message?: string
}
