import PageLayout from '@/layout/PageLayout'
import styled from 'styled-components'
import useAuthForm from '@/hook/useAuthForm'
import { AuthProps } from '@/interface/AuthProps'
import authValidation from '@/utils/authValidation'
import Button from '@/components/button/Button'
import { supabase } from '@/supabaseconfig'
import { useNavigate } from 'react-router-dom'
import MetaTags from '@/components/common/MetaTag'
import { useResponsive } from '@/hook/useMediaQuery'

const Signup = () => {
  const { isMobile } = useResponsive()
  const navigate = useNavigate()
  const initialValue = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    message: ''
  }

  const onSubmit = async (values: AuthProps) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            user_name: values.name,
            image_url: null,
            message: values.message
          }
        }
      })

      if (error) {
        alert(error.message)
      } else if (data.session?.access_token) {
        alert('회원가입이 완료되었습니다.')
        navigate('/')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const { values, errors, handleChange, handleSubmit } = useAuthForm({
    type: 'signup',
    initialValue,
    onSubmit,
    validate: authValidation
  })

  return (
    <PageLayout>
      <MetaTags
        title="Moneylicious - 회원가입"
        description="Moenylicious 가계부를 이용하시려면 회원가입을 진행해주세요."
        url="https://moneylicious.vercel.app/signup"
      />
      <Container $responsive={isMobile}>
        <h2>회원가입</h2>
        <FormWrapper>
          <InputWrapper>
            <InputLeft>
              <InputName>이메일</InputName>
              <ErrorMessage>{errors.email}</ErrorMessage>
            </InputLeft>
            <InputInner>
              <InputRow>
                <label>
                  <input
                    type="email"
                    name="email"
                    placeholder="money@moneylicious.com"
                    value={values.email}
                    onChange={e => handleChange(e)}
                  />
                </label>
              </InputRow>
            </InputInner>
          </InputWrapper>
          <InputWrapper>
            <InputLeft>
              <InputName>패스워드</InputName>
              <ErrorMessage>{errors.password}</ErrorMessage>
            </InputLeft>
            <InputInner>
              <InputRow>
                <label>
                  <input
                    type="password"
                    name="password"
                    placeholder="**********"
                    value={values.password}
                    onChange={e => handleChange(e)}
                  />
                </label>
              </InputRow>
            </InputInner>
          </InputWrapper>
          <InputWrapper>
            <InputLeft>
              <InputName>패스워드 확인</InputName>
              <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
            </InputLeft>
            <InputInner>
              <InputRow>
                <label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="**********"
                    value={values.confirmPassword}
                    onChange={e => handleChange(e)}
                  />
                </label>
              </InputRow>
            </InputInner>
          </InputWrapper>
          <InputWrapper>
            <InputLeft>
              <InputName>닉네임</InputName>
              <ErrorMessage>{errors.name}</ErrorMessage>
            </InputLeft>
            <InputInner>
              <InputRow>
                <label>
                  <input
                    type="text"
                    name="name"
                    placeholder="moneylicious"
                    value={values.name}
                    onChange={e => handleChange(e)}
                  />
                </label>
              </InputRow>
            </InputInner>
          </InputWrapper>
          <InputWrapper>
            <InputLeft>
              <InputName>메시지</InputName>
              <ErrorMessage>{errors.message}</ErrorMessage>
            </InputLeft>
            <InputInner>
              <InputRow>
                <label>
                  <textarea
                    name="message"
                    placeholder="프로필 메시지를 작성해보세요."
                    value={values.message}
                    onChange={e => handleChange(e)}
                    maxLength={30}
                  />
                </label>
              </InputRow>
            </InputInner>
          </InputWrapper>
          <Button
            text="회원가입 완료"
            type="submit"
            size="small"
            onClick={handleSubmit}
          />
        </FormWrapper>
      </Container>
    </PageLayout>
  )
}

export default Signup

const Container = styled.div<{ $responsive: boolean }>`
  width: ${({ $responsive }) => ($responsive ? '100%' : '450px')};
  height: auto;
  margin: 20px auto;
  padding: ${({ $responsive }) => ($responsive ? '0 20px' : '0')};

  h2 {
    text-align: center;
  }
`

const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  margin-top: 50px;

  label {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const InputLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  align-items: flex-start;
`

const InputName = styled.div`
  font-size: 1.1rem;
`

const ErrorMessage = styled.div`
  width: 145px;
  color: ${({ theme }) => theme.color.sub_dark};
  font-size: 0.7rem;
`

const InputInner = styled.div`
  width: 300px;
  display: flex;
  gap: 10px;
`

const InputRow = styled.div`
  border: 1px solid ${({ theme }) => theme.gray.gray_300};
  border-radius: 6px;
  padding: 14px 18px 13px;
  height: 100%;
  flex-grow: 1;

  input,
  textarea {
    width: 100%;
    border: none;
    outline: none;
    line-height: normal;
  }

  textarea {
    resize: none;
    height: 100px;
  }
`
