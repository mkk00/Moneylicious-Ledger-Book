import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { supabase } from '@/supabaseconfig'
import LedgerListItem from '@/components/ledger/LedgerListItem'
import { LedgerDataProps } from '@/interface/LedgerProps'
import { FaCircle } from 'react-icons/fa'
import useDateStore from '@/store/useDateStore'
import useModal from '@/hook/useModal'
import AddLedgerModal from '@/components/modal/AddLedgerModal'
import ModalPortal from '@/components/modal/ModalPortal'
import { getTotalAmount, calculateSummary } from '@/utils/totalAccount'
import { getHolidayData } from '@/lib/holiday'
import { HolidayProps } from '@/interface/HolidayProps'
import { filterHoliday } from '@/utils/calendarUtils'
import HolidayList from '@/components/ledger/HolidayList'
import IconButton from '@/components/button/IconButton'

const LedgerList = () => {
  const { isOpen, openModal, closeModal } = useModal()
  const [dataList, setDataList] = useState<LedgerDataProps[] | null>(null)
  const [summary, setSummary] = useState<{
    expense: string
    income: string
  } | null>({
    expense: '0',
    income: '0'
  })
  const [isEdit, setIsEdit] = useState(false)
  const [editData, setEditData] = useState<LedgerDataProps | null>(null)
  const [holiday, setHoliday] = useState<HolidayProps[] | HolidayProps | null>(
    null
  )
  const [selectHoliday, setSelectHoliday] = useState<
    HolidayProps[] | HolidayProps | null
  >(null)

  const selectedDate = useDateStore(state => state.selectedDate)
  const currentDate = useDateStore(state => state.currentDate)
  const setCurrentDate = useDateStore(state => state.setCurrentDate)
  const formatSelectedDate = useDateStore(state => state.formatSelectedDate)

  const getAmountList = async () => {
    try {
      if (!selectedDate) return null
      const { data, error } = await supabase
        .from('ledger')
        .select('*')
        .eq('created_at_year', selectedDate?.getFullYear())
        .eq('created_at_month', selectedDate?.getMonth() + 1)
        .eq('created_at_day', selectedDate?.getDate())
        .returns<LedgerDataProps[] | null>()

      setDataList(data)
      error && alert(error?.message)
    } catch (error) {
      console.error(error)
    }
  }

  const handleIsOpenAdd = () => {
    openModal('내역추가')
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      )
    )
    setIsEdit(false)
  }

  const getLedgerItemData = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('ledger')
        .select('*')
        .eq('id', id)
        .returns<LedgerDataProps[] | null>()

      data && setEditData(data[0])
      error && alert(error.message)
    } catch (error) {
      console.error(error)
    }
  }

  const handleIsOpenEdit = (id: string) => {
    setIsEdit(true)
    getLedgerItemData(id).then(() => openModal('내역추가'))
  }

  useEffect(() => {
    getHolidayData(currentDate.getFullYear(), currentDate.getMonth()).then(
      res => {
        setHoliday(res.data.response.body.items.item)
      }
    )
  }, [currentDate.getFullYear(), currentDate.getMonth()])

  useEffect(() => {
    if (selectedDate && holiday) {
      setSelectHoliday(filterHoliday(holiday, selectedDate))
    }
  }, [selectedDate, holiday])

  useEffect(() => {
    const totalAmount = async () => {
      const data = await getTotalAmount(
        currentDate.getFullYear(),
        currentDate.getMonth()
      )
      if (data) {
        const total = calculateSummary(data)
        setSummary(total)
      }
    }

    totalAmount()
  }, [currentDate.getFullYear(), currentDate.getMonth(), selectHoliday])

  useEffect(() => {
    getAmountList()
  }, [selectedDate])

  return (
    <Container>
      {isOpen('내역추가') && (
        <ModalPortal>
          <AddLedgerModal
            isClose={() => closeModal('내역추가')}
            isEdit={isEdit}
            editData={editData}
            updateData={getAmountList}
          />
        </ModalPortal>
      )}
      <LedgerHeader>
        <div>내역</div>
        <span>{selectedDate && formatSelectedDate(selectedDate)}</span>
      </LedgerHeader>
      {selectedDate && selectHoliday && (
        <HolidayList
          holidays={selectHoliday}
          selectedDate={selectedDate}
        />
      )}
      <LedgerListWrapper>
        {dataList?.map(list => (
          <LedgerListItem
            key={list.id}
            accountList={list}
            onClick={() => handleIsOpenEdit(list.id)}
          />
        ))}
        <IconButton
          type="plus"
          onClick={handleIsOpenAdd}
        />
      </LedgerListWrapper>
      <Summary>
        <LedgerHeader>Total</LedgerHeader>
        <CountTotal>
          <div>수입</div>
          <Account type="plus">
            <FaCircle />
            {summary?.income} 원
          </Account>
        </CountTotal>
        <CountTotal>
          <div>지출</div>
          <Account type="minus">
            <FaCircle />
            {summary?.expense} 원
          </Account>
        </CountTotal>
      </Summary>
    </Container>
  )
}

export default LedgerList

const Container = styled.div`
  padding: 20px;
  font-size: 0.9rem;
`

const LedgerHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.gray.gray_100};
  font-size: 1.2rem;

  & span {
    color: ${({ theme }) => theme.gray.gray_300};
    font-size: 0.9rem;
  }
`

const LedgerListWrapper = styled.div`
  min-height: 280px;
  max-height: 340px;
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const Summary = styled.div`
  margin-top: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.gray.gray_100};
`

const CountTotal = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Account = styled.div<{ type: string }>`
  display: flex;
  gap: 5px;
  align-items: center;
  font-size: 1.1rem;
  font-weight: bold;

  svg {
    color: ${({ theme, type }) =>
      type === 'plus' ? theme.color.main : theme.color.sub};
  }
`
