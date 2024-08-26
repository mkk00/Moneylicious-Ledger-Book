import { UserInfoProps } from '@/interface/AuthProps'
import { supabase } from '@/supabaseconfig'

const getUserInfo = async (userInfo: UserInfoProps | null) => {
  try {
    const { data: userinfoData, error } = await supabase
      .from('userinfo')
      .select('*')
      .eq('id', userInfo?.id)
      .returns<UserInfoProps[] | null>()

    if (userinfoData) {
      return {
        ...userInfo,
        image_url: userinfoData[0].image_url,
        username: userinfoData[0].username,
        message: userinfoData[0].message
      }
    }

    if (error) {
      throw new Error('유저 정보를 불러오는 데 실패했습니다.')
    }
  } catch (error) {
    console.error(error)
  }
}

export { getUserInfo }
