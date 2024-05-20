import { emailRegex, passwordRegex, nameRegex } from './regexUtils'

export interface AuthErrorProps {
  email?: string
  password?: string
  name?: string
  confirmPassword?: string
  message?: string
}

const authValidation = (
  type: string,
  { email, password, confirmPassword, name, message }: AuthErrorProps
) => {
  const errors: AuthErrorProps = {}

  const regex = {
    email: emailRegex,
    password: passwordRegex,
    name: nameRegex
  }

  if (!email) {
    errors.email = '이메일을 입력해주세요.'
  } else if (!regex.email.test(email)) {
    errors.email = '유효하지 않은 이메일입니다.'
  } else {
    delete errors.email
  }

  if (!password) {
    errors.password = '패스워드를 입력해주세요.'
  } else if (password.length < 10) {
    errors.password = '패스워드는 최소 10글자 이상 입력해주세요.'
  } else if (!regex.password.test(password)) {
    errors.password = '패스워드는 문자, 숫자 및 특수문자를 포함해야 합니다.'
  } else {
    delete errors.password
  }

  if (type === 'signup')
    if (password !== confirmPassword) {
      errors.confirmPassword = '패스워드가 일치하지 않습니다.'
    } else {
      delete errors.confirmPassword
    }

  if (type === 'signup')
    if (!name) {
      errors.name = '닉네임을 입력해주세요.'
    } else if (!regex.name.test(name)) {
      errors.name =
        '닉네임은 3글자 이상 8글자 이하의 영어, 한글 또는 숫자만 가능합니다.'
    } else {
      delete errors.name
    }

  if (type === 'signup')
    if (message && message.length > 30) {
      errors.message = '메시지는 30글자 이하만 입력 가능합니다.'
    } else {
      delete errors.message
    }

  return errors
}

export default authValidation
