import { passwordRegex, nameRegex } from './regexUtils'

export interface MypageErrorProps {
  name?: string
  password?: string
  message?: string
}

const mypageValidation = (
  type: string,
  { password, name, message }: MypageErrorProps
) => {
  const errors: Partial<Record<keyof MypageErrorProps, string>> = {}

  const regex = {
    password: passwordRegex,
    name: nameRegex
  }

  if (name)
    if (!regex.name.test(name)) {
      errors.name =
        '닉네임은 3글자 이상 8글자 이하의 영어, 한글 또는 숫자만 가능합니다.'
    } else {
      delete errors.name
    }

  if (password)
    if (password.length < 10) {
      errors.password = '패스워드는 최소 10글자 이상 입력해주세요.'
    } else if (!regex.password.test(password)) {
      errors.password = '패스워드는 문자, 숫자 및 특수문자를 포함해야 합니다.'
    } else {
      delete errors.password
    }

  if (message)
    if (message.length > 30) {
      errors.message = '메시지는 30글자 이하만 입력 가능합니다.'
    } else {
      delete errors.message
    }

  if (type !== 'mypage') return {}

  return errors
}

export default mypageValidation
