import styled from 'styled-components'

const Pagination = ({
  page,
  totalPages,
  pageSize,
  onPageChange
}: {
  page: number
  totalPages: number
  pageSize: number
  onPageChange: (page: number) => void
}) => {
  const pageGroup = Math.ceil(page / pageSize)
  const startPage = (pageGroup - 1) * pageSize + 1
  const endPage = Math.min(startPage + pageSize - 1, totalPages)

  const handleNextPageGroup = () => {
    if (endPage < totalPages) {
      onPageChange(startPage + pageSize)
    }
  }

  const handlePreviousPageGroup = () => {
    if (startPage > 1) {
      onPageChange(startPage - pageSize)
    }
  }

  const handlePageClick = (pageNumber: number) => {
    onPageChange(pageNumber)
  }

  const renderPageNumbers = () => {
    const pageNumbers = []
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PageNumber
          key={i}
          onClick={() => handlePageClick(i)}
          disabled={i === page}>
          {i}
        </PageNumber>
      )
    }
    return pageNumbers
  }

  return (
    <Container>
      <Button
        onClick={handlePreviousPageGroup}
        disabled={startPage === 1}>
        이전
      </Button>
      <PageButtonWrapper>{renderPageNumbers()}</PageButtonWrapper>
      <Button
        onClick={handleNextPageGroup}
        disabled={endPage === totalPages}>
        다음
      </Button>
    </Container>
  )
}

export default Pagination

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  gap: 25px;
  font-size: 0.9rem;
`

const PageButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
`

const PageNumber = styled.button<{ disabled: boolean }>`
  padding: 3px 5px;
  border-radius: 6px;
  color: ${({ theme, disabled }) =>
    disabled ? theme.color.white : theme.gray.gray_400};
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.color.main_light : 'normal'};
`

const Button = styled.button<{ disabled: boolean }>`
  color: ${({ theme, disabled }) =>
    disabled ? theme.gray.gray_200 : 'normal'};
`
