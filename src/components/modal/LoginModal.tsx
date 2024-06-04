import authValidation from '@/utils/authValidation'
import useAuthForm from '@/hook/useAuthForm'
import { AuthProps } from '@/interface/authProps'
import ModalLayout from '@/components/modal/ModalLayout'
import styled from 'styled-components'
import Button from '@/components/button/Button'
import { MdMailOutline, MdLockOpen } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/supabaseconfig'
import useAuthStore from '@/store/useAuthStore'
import { useResponsive } from '@/hook/useMediaQuery'

const LoginModal = ({ closeModal }: { closeModal: () => void }) => {
  const navigate = useNavigate()
  const { setUserInfo, setLogin } = useAuthStore()
  const { isMobile } = useResponsive()
  const initialValue = {
    email: '',
    password: ''
  }

  const onSubmit = async (values: AuthProps) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password
      })

      if (data) {
        console.log(data)
        setUserInfo({
          id: data.user?.id,
          email: data.user?.email,
          image_url: data.user?.user_metadata.image_url,
          created_at: data.user?.created_at,
          username: data.user?.user_metadata.user_name,
          message: data.user?.user_metadata.message,
          accessToken: data.session?.access_token
        })
        setLogin()
        closeModal()
      }
      if (error) {
        alert(error)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const { values, errors, handleChange, handleSubmit } = useAuthForm({
    type: 'login',
    initialValue,
    onSubmit,
    validate: authValidation
  })

  return (
    <ModalLayout
      closeModal={closeModal}
      width={isMobile ? '95%' : undefined}>
      <Wrapper>
        <Title>Moneylicious</Title>
        <span>나만의 Moneylicious하는 비법!</span>
        <span>로그인하고 맛있게 자산관리 해보세요.</span>
        <FormWrapper>
          <InputRow $isMobile={isMobile}>
            <label>
              <MdMailOutline size={20} />
              <input
                type="text"
                name="email"
                placeholder="이메일"
                value={values.email}
                onChange={e => handleChange(e)}
              />
            </label>
          </InputRow>
          <InputRow $isMobile={isMobile}>
            <label>
              <MdLockOpen size={20} />
              <input
                type="password"
                name="password"
                placeholder="패스워드"
                value={values.password}
                onChange={e => handleChange(e)}
              />
            </label>
          </InputRow>
          <ErrorMessage>
            <div>{errors.email}</div>
            <div>{errors.password}</div>
          </ErrorMessage>
          <Button
            text="로그인"
            type="submit"
            onClick={handleSubmit}
          />
        </FormWrapper>
        <FindWrapper>
          <button>이메일 찾기</button>
          <button>패스워드 찾기</button>
          <button onClick={() => navigate('/signup')}>회원가입</button>
        </FindWrapper>
      </Wrapper>
    </ModalLayout>
  )
}

export default LoginModal

const Wrapper = styled.div`
  padding: 20px 20px;

  span {
    display: block;
    text-align: center;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.gray.gray_400};
  }
`

const Title = styled.div`
  position: relative;
  z-index: 1;
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 10px;
  font-family: 'PyeongChangPeace-Bold';
`

const FormWrapper = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 25px;
  color: ${({ theme }) => theme.color.white};

  label {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`

const InputRow = styled.div<{ $isMobile?: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? undefined : '350px')};
  border: 1px solid ${({ theme }) => theme.gray.gray_300};
  border-radius: 6px;
  padding: 16px 18px 15px;
  height: 100%;

  svg {
    color: ${({ theme }) => theme.gray.gray_300};
  }

  input {
    width: 100%;
    border: none;
    outline: none;
    line-height: normal;
  }
`

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.color.sub_dark};
  font-size: 0.7rem;
`

const FindWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;

  button {
    position: relative;
    padding-left: 28px;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.gray.gray_400};
  }

  button:nth-of-type(2)::before,
  button:nth-of-type(3)::before {
    content: '|';
    position: absolute;
    top: 1px;
    left: 12px;
  }
`
