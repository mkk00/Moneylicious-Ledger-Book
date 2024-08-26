import PageLayout from '@/layout/PageLayout'
import styled from 'styled-components'
import { useResponsive } from '@/hook/useMediaQuery'
import useAuthStore from '@/store/useAuthStore'
import useAuthForm from '@/hook/useAuthForm'
import { MypageProps, UserInfoProps } from '@/interface/AuthProps'
import Button from '@/components/button/Button'
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import mypageValidation from '@/utils/mypageValidation'
import { MdOutlineCancel } from 'react-icons/md'
import MetaTags from '@/components/common/MetaTag'
import imageCompression from 'browser-image-compression'
import { getUserInfo } from '@/api/userDataApi'
import {
  uploadImage,
  updateUserProfile,
  updateMetaData,
  deleteFolder
} from '@/api/mypageApi'

const renderProfilImage = (
  userInfo: UserInfoProps | null,
  previewImg: string | null
) => {
  const url =
    previewImg === '/moneylicious.svg' || (!previewImg && !userInfo?.image_url)
      ? '/moneylicious.svg'
      : previewImg || userInfo?.image_url

  return url ? (
    <img
      src={url}
      alt={url === '/moneylicious.svg' ? 'noImage' : 'uploadImage'}
    />
  ) : (
    <NoProfileImage
      src="/moneylicious.svg"
      alt="noImage"
    />
  )
}

const Mypage = () => {
  const { isMobile } = useResponsive()
  const { userInfo, setUserInfo } = useAuthStore()

  const [edit, setEdit] = useState(false)

  const [file, setFile] = useState<File | null>(null)
  const [previewImg, setPreviewImg] = useState<string | null>(null)

  const initialValue = {
    image_url: userInfo?.image_url,
    name: userInfo?.username,
    password: '',
    message: userInfo?.message
  }

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const imageFile = e.target.files?.[0]
    const regex = /^[a-zA-Z0-9_.-]+$/

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 400,
      fileType: 'image/webp'
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp']

    if (!imageFile) {
      setPreviewImg(null)
      return
    }

    if (!regex.test(imageFile.name)) {
      alert('파일명은 영문자, 숫자, -, _, . 만 가능합니다.')
      return null
    }

    if (!validTypes.includes(imageFile?.type)) {
      alert(
        '지원하지 않는 파일 형식입니다. JPEG, PNG, WEBP 파일만 업로드 가능합니다.'
      )
      setPreviewImg(null)
      return
    }
    try {
      const compressionFiles = await imageCompression(imageFile, options)

      setFile(compressionFiles)
      const reader = new FileReader()
      reader.onloadend = async () => {
        setPreviewImg(reader.result as string)
      }
      reader.readAsDataURL(compressionFiles)
    } catch (error) {
      console.error(error)
    }
  }

  const handleCancelIcon = (e: MouseEvent<SVGAElement>) => {
    e.preventDefault()
    setFile(null)
    setPreviewImg('/moneylicious.svg')
  }

  /** 유저정보 변경 시 store 의 userInfo 업데이트
   */
  const updateUserInfo = async () => {
    try {
      if (userInfo?.id) {
        const userData = await getUserInfo(userInfo)
        if (userData) setUserInfo(userData)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onSubmit = async (values: MypageProps) => {
    try {
      if (!file) return null
      if (!userInfo?.email) return null

      const userEmail = userInfo.email.split('@')[0]
      const imagePath: string | null = await uploadImage(userEmail, file)

      if (imagePath) {
        await updateUserProfile(values, imagePath, userInfo?.id)
        await updateMetaData(imagePath, values)
      } else {
        deleteFolder(userEmail)
        setFile(null)
        setPreviewImg(null)
      }

      updateUserInfo()
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
            <Profile $isEdit={edit}>
              {renderProfilImage(userInfo, previewImg)}
              {edit && (
                <UploadIcon>
                  <MdOutlineCancel
                    size={35}
                    onClick={handleCancelIcon}
                  />
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
  margin: 0 auto;
`

const Title = styled.div`
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 1.8rem;
  margin-bottom: 30px;
  padding: 20px 0;
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
    z-index: 1;

    ::file-selector-button {
      border: none;
      background: none;
      color: transparent;
      text-indent: 10px;
    }
  }
`

const Profile = styled.label<{ $isEdit: boolean }>`
  width: 200px;
  height: 200px;
  background-color: ${({ theme }) => theme.gray.gray_100};
  border-radius: 20px;
  cursor: ${({ $isEdit }) => ($isEdit ? 'pointer' : 'default')};
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
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  z-index: 10;
  pointer-events: auto;

  svg {
    color: ${({ theme }) => theme.color.white};
    margin-top: 5px;
    margin-right: 5px;
    cursor: grab;
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
