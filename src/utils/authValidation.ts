import { emailRegex, passwordRegex } from './regexUtils'

export interface authProps {
  email?: string
  password?: string
}

const authValidation = ({ email, password }: authProps) => {
  const errors: authProps = {
    email: '',
    password: ''
  }
  const regex = {
    email: emailRegex,
    password: passwordRegex
  }

  if (!email) {
    errors.email = '이메일을 입력해주세요.'
  } else if (!regex.email.test(email)) {
    errors.email = '유효하지 않은 이메일입니다.'
  }

  if (!password) {
    errors.password = '비밀번호를 입력해주세요.'
  } else if (password.length < 10) {
    errors.password = '10자리 이상의 패스워드를 사용해야 합니다.'
  } else if (!regex.password.test(password)) {
    errors.password = '유효하지 않은 패스워드입니다.'
  }

  return errors
}

export default authValidation
