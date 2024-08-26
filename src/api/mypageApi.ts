import { AuthProps, MypageProps } from '@/interface/AuthProps'
import { supabase, supabaseUrl } from '@/supabaseconfig'

/** storage 에 업로드한 프로필 이미지를 저장합니다.
 *
 * @description 이미지의 경로는 email 의 @ 앞부분이 폴더 명이되며, 이미지 파일명이 파일명이 됩니다.
 * @description ex) path = 'user1/image.webp'
 * @returns 업로드된 이미지의 경로 또는 null 반환
 */
const uploadImage = async (email: string, file?: File | null) => {
  if (file) {
    try {
      const { data, error } = await supabase.storage
        .from('profile')
        .upload(`${email}/${file.name}`, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) throw new Error(error.message)

      return data ? data.path : null
    } catch (error) {
      console.error(error)
      return null
    }
  } else return null
}

/** 마이페이지에서 정보가 변경되면 데이터베이스의 유저 데이터를 업데이트합니다.
 *
 * @param values input 값(username, message)
 * @param imagePath storage 에 저장된 프로필 이미지의 경로
 * @param userId 유저 uuid
 * @returns AuthProps
 */
const updateUserProfile = async (
  values: MypageProps,
  imagePath: string | null,
  userId?: string
) => {
  const imageUrl = imagePath
    ? `${supabaseUrl}/storage/v1/object/public/profile/${imagePath}`
    : null
  try {
    const { data, error } = await supabase
      .from('userinfo')
      .update({
        image_url: imageUrl,
        username: values.name,
        message: values.message
      })
      .eq('id', userId)
      .select()
      .returns<AuthProps | null>()

    if (error) throw new Error(error.message)
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

interface UpdatePayload {
  data: {
    user_name?: string
    message?: string
    image_url?: string | null
  }
  password?: string
}

/** supabase 의 auth meta 데이터를 업데이트합니다.
 *
 */
const updateMetaData = async (
  imagePath: string | null,
  values: MypageProps
) => {
  const imageUrl = imagePath
    ? `${supabaseUrl}/storage/v1/object/public/profile/${imagePath}`
    : null
  try {
    const updatePayload: UpdatePayload = {
      data: {
        user_name: values?.name,
        message: values?.message,
        image_url: imagePath ? imageUrl : null
      }
    }

    if (values.password) {
      updatePayload.password = values.password
    }

    const { data, error } = await supabase.auth.updateUser(updatePayload)
    if (error) throw new Error(error.message)
    return data
  } catch (error) {
    console.error(error)
  }
}

/** 업로드 이미지 제거 시 스토리지의 이미지 파일 모두 제거
 */
const deleteFolder = async (eamil: string) => {
  const folderPath = `${eamil}/`

  try {
    const { data, error: fetchError } = await supabase.storage
      .from('profile')
      .list(folderPath)

    if (fetchError) {
      console.error('스토리지 파일을 가져오는데 실패했습니다.')
    }

    if (data && data?.length > 0) {
      const fileNames = data.map(file => `${folderPath}${file.name}`)
      const { error: removeFile } = await supabase.storage
        .from('profile')
        .remove(fileNames)
      if (removeFile) {
        console.error('스토리지 파일을 제거하는데 실패했습니다.')
      }
    }
  } catch (error) {
    console.error(error)
  }
}

export { uploadImage, updateUserProfile, updateMetaData, deleteFolder }
