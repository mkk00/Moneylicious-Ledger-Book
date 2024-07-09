import IconButton from '@/components/button/IconButton'
import TextEditor from '@/components/textEditor/TextEditor'
import PageLayout from '@/layout/PageLayout'
import styled from 'styled-components'
import { FormRow, Input } from '@/components/input/FormRow'
import { useNavigate } from 'react-router-dom'
import { useResponsive } from '@/hook/useMediaQuery'
import SelectBox from '@/components/input/CustomSelect'
import { TAG_LIST } from '@/data/boardTagList'

const Board = () => {
  const navigate = useNavigate()
  const { isDesktopOrLaptop } = useResponsive()

  return (
    <PageLayout>
      <Container $responsive={isDesktopOrLaptop}>
        <PageTitle>게시글 작성</PageTitle>
        <BoardTitle>
          <SelectBox list={TAG_LIST} />
          <FormRow>
            <label>
              <Input
                placeholder="Title"
                type="text"
              />
            </label>
          </FormRow>
        </BoardTitle>
        <TextEditor />
        <ButtonContainer>
          <IconButton
            type="del"
            onClick={() => navigate('/board')}
          />
          <IconButton
            type="add"
            onClick={() => {}}
          />
        </ButtonContainer>
      </Container>
    </PageLayout>
  )
}

export default Board

const Container = styled.div<{ $responsive: boolean }>`
  width: ${({ $responsive }) => ($responsive ? '50%' : '90%')};
  margin: 0 auto;
`

const PageTitle = styled.h2`
  text-align: center;
  margin-top: 100px;
`

const BoardTitle = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0 20px 0;
`

const ButtonContainer = styled.div`
  width: 250px;
  height: 50px;
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 20px auto 0 auto;
  margin-top: 60px;
`
