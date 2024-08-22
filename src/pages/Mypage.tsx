import PageLayout from '@/layout/PageLayout'
import styled from 'styled-components'
import { useResponsive } from '@/hook/useMediaQuery'
import useAuthStore from '@/store/useAuthStore'
import useAuthForm from '@/hook/useAuthForm'
import { AuthProps, MypageProps } from '@/interface/AuthProps'
import Button from '@/components/button/Button'
import { ChangeEvent, useEffect, useState } from 'react'
import mypageValidation from '@/utils/mypageValidation'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { supabase, supabaseUrl } from '@/supabaseconfig'
import MetaTags from '@/components/common/MetaTag'

const Mypage = () => {
  const { isMobile } = useResponsive()
  const { userInfo } = useAuthStore()

  const [edit, setEdit] = useState(false)

  const [file, setFile] = useState<File>()
  const [previewImg, setPreviewImg] = useState<string | null>(null)

  const initialValue = {
    image_url: userInfo?.image_url,
    name: userInfo?.username,
    password: '',
    message: userInfo?.message
  }

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const imageFile = e.target.files?.[0]
    setFile(imageFile)

    if (imageFile) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImg(reader.result as string)
      }
      reader.readAsDataURL(imageFile)
    } else {
      setPreviewImg(null)
    }
  }

  const uploadImage = async (file?: File) => {
    if (file)
      try {
        const { data, error } = await supabase.storage
          .from('profile')
          .upload(`${userInfo?.email?.split('@')[0]}/${file.name}`, file, {
            cacheControl: '3600',
            upsert: false
          })

        error && alert(error.message)

        if (data) return data.path
        else return null
      } catch (error) {
        console.error(error)
        return null
      }
    else return null
  }

  const updateUserProfile = async (
    values: MypageProps,
    imagePath: string | null
  ) => {
    const imageUrl = `${supabaseUrl}/storage/v1/object/public/profile/${imagePath}`
    try {
      const { data, error } = await supabase
        .from('userinfo')
        .update({
          image_url: imagePath ? imageUrl : userInfo?.image_url,
          username: values.name,
          message: values.message
        })
        .eq('id', userInfo?.id)
        .select()
        .returns<AuthProps | null>()

      error && alert(error.message)
      return data ? data : null
    } catch (error) {
      console.error(error)
      return null
    }
  }

  const updateMetaData = async (imagePath: string | null) => {
    const imageUrl = `${supabaseUrl}/storage/v1/object/public/profile/${imagePath}`
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: values.password,
        data: {
          user_name: values?.name,
          message: values?.message,
          image_url: imagePath ? imageUrl : userInfo?.image_url
        }
      })
      data && setEdit(false)
      error && alert(error.message)
    } catch (error) {
      console.error(error)
    }
  }

  const onSubmit = async (values: MypageProps) => {
    try {
      const imagePath: string | null = await uploadImage(file)
      await updateUserProfile(values, imagePath)
      await updateMetaData(imagePath)
    } catch (error) {
      console.error(error)
    }
  }

  const { values, errors, handleChange, handleSubmit } = useAuthForm({
    type: 'mypage',
    initialValue,
    onSubmit,
    validate: mypageValidation
  })

  const renderProfilImage = () => {
    if (previewImg) {
      return (
        <img
          src={previewImg}
          alt="uploadImage"
        />
      )
    }

    if (userInfo?.image_url) {
      return (
        <img
          src={userInfo?.image_url}
          alt="uploadImage"
        />
      )
    }

    return (
      <NoProfileImage
        src="/public/moneylicious.svg"
        alt="uploadImage"
      />
    )
  }

  useEffect(() => {
    if (!edit) {
      delete errors.name
      delete errors.password
      delete errors.message
    }
  }, [edit])

  return (
    <PageLayout>
      <MetaTags
        title="Moneylicious - 마이페이지"
        description="개인정보를 수정할 수 있습니다."
        url="https://moneylicious.vercel.app/mypage"
      />
      <Container $isMobile={isMobile}>
        <Title>{edit ? '개인정보 수정' : '마이페이지'}</Title>
        <InputWrapper>
          <InputRows>
            프로필
            <Profile>
              {renderProfilImage()}
              {edit && (
                <UploadIcon>
                  <FaCloudUploadAlt size={35} />
                </UploadIcon>
              )}
              <input
                type="file"
                accept="image/*"
                disabled={!edit}
                onChange={handleFileUpload}
              />
            </Profile>
          </InputRows>
          <InputRows>
            이메일
            <span>{userInfo?.email}</span>
          </InputRows>
          <InputRows>
            <InputLeft>
              <InputName>닉네임</InputName>
              {edit && <ErrorMessage>{errors.name}</ErrorMessage>}
            </InputLeft>
            {edit ? (
              <label>
                <input
                  name="name"
                  type="text"
                  value={values.name}
                  readOnly={!edit}
                  onChange={e => handleChange(e)}
                />
              </label>
            ) : (
              <span>{userInfo?.username}</span>
            )}
          </InputRows>
          <InputRows>
            <InputLeft>
              <InputName>패스워드</InputName>
              {edit && <ErrorMessage>{errors.password}</ErrorMessage>}
            </InputLeft>
            {edit ? (
              <label>
                <input
                  name="password"
                  type="password"
                  value={values.password}
                  readOnly={!edit}
                  onChange={e => handleChange(e)}
                />
              </label>
            ) : (
              <span>********</span>
            )}
          </InputRows>
          <InputRows>
            <InputLeft>
              <InputName>메시지</InputName>
              {edit && <ErrorMessage>{errors.message}</ErrorMessage>}
            </InputLeft>
            {edit ? (
              <label>
                <textarea
                  name="message"
                  value={values.message}
                  readOnly={!edit}
                  onChange={e => handleChange(e)}
                  maxLength={30}
                />
              </label>
            ) : (
              <span>{userInfo?.message}</span>
            )}
          </InputRows>
          {!edit && (
            <ButtonWrapper>
              <Button
                text="개인정보 수정"
                type="button"
                size="small"
                onClick={() => setEdit(true)}
              />
            </ButtonWrapper>
          )}
          {edit && (
            <ButtonWrapper>
              <Button
                text="취소"
                type="button"
                size="small"
                onClick={() => {
                  setEdit(false)
                  setPreviewImg(null)
                }}
              />
              <Button
                text="수정완료"
                type="submit"
                size="small"
                onClick={handleSubmit}
              />
            </ButtonWrapper>
          )}
        </InputWrapper>
      </Container>
    </PageLayout>
  )
}

export default Mypage

const Container = styled.div<{ $isMobile?: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? '100%' : '400px')};
  padding: ${({ $isMobile }) => ($isMobile ? '0 30px' : '0')};
  margin: ${({ $isMobile }) => ($isMobile ? '100px auto' : '130px auto')};
`

const Title = styled.div`
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 1.8rem;
  margin-bottom: 30px;
`

const InputWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 80px;

  & > div:nth-of-type(1) label {
    border: none;
  }
`

const InputRows = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  label {
    width: 220px;
    border: 1px solid ${({ theme }) => theme.gray.gray_300};
    border-radius: 10px;
    padding: 10px 15px;
  }

  input,
  textarea {
    width: 100%;
    border: none;
    outline: none;
    line-height: normal;
  }

  textarea {
    resize: none;
    height: 50px;
  }

  input[type='file'] {
    display: inline-block;
    overflow: hidden;
    position: absolute !important;
    clip: rect(0, 0, 0, 0);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;

    ::file-selector-button {
      border: none;
      background: none;
      color: transparent;
      text-indent: 10px;
    }
  }
`

const Profile = styled.label`
  width: 200px;
  height: 200px;
  background-color: ${({ theme }) => theme.gray.gray_100};
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
  }
`

const NoProfileImage = styled.img`
  width: 70%;
  height: 70%;
  filter: brightness(1000%);
`

const UploadIcon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;

  svg {
    color: ${({ theme }) => theme.color.main_light};
    margin-top: 4px;
    margin-right: 8px;
  }
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

const ButtonWrapper = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin: 30px 0;
`
