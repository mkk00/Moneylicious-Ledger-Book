import styled from 'styled-components'
import { useEffect, useState } from 'react'
import IconButton from '../button/IconButton'
import useModal from '@/hook/useModal'
import ModalPortal from '@/components/modal/ModalPortal'
import AddAssetsModal from '@/components/modal/AddAssetsModal'
import { supabase } from '@/supabaseconfig'
import {
  AssetsProps,
  AssetsDataProps,
  AssetsDataItemProps
} from '@/interface/AssetsProps'
import { parseAmount } from '@/utils/getLedgerUtils'

const LedgerDetailList = () => {
  const { isOpen, openModal, closeModal } = useModal()

  const [assetsData, setAssetsData] = useState<AssetsDataProps | null>(null)
  const [modalType, setModalType] = useState<'add' | 'edit' | null>(null)
  const [editAssetData, setEditAssetData] =
    useState<AssetsDataItemProps | null>(null)

  const transformAssetsData = (assets: AssetsProps[]) => {
    return assets.reduce((acc, asset) => {
      const name = asset.name

      if (!acc[name]) {
        acc[name] = []
      }

      acc[name].push({
        id: asset.id,
        title: asset.title,
        amount: asset.amount
      })

      return acc
    }, {} as AssetsDataProps)
  }

  const getAssetsData = async () => {
    try {
      const { data: assets, error } = await supabase
        .from('assets')
        .select('*')
        .eq('type', '비유동자산')
        .returns<AssetsProps[] | null>()

      if (assets) {
        setAssetsData(transformAssetsData(assets))
      }

      if (error) throw error
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAssetsData()
  }, [])

  useEffect(() => {}, [modalType])

  return (
    <Container>
      <Title>내 자산 목록</Title>
      <Wrapper>
        {assetsData &&
          Object.keys(assetsData).map(key => (
            <Assets key={key}>
              <AssetsTotal>
                <div>{key}</div>
                <span>
                  {assetsData[key]
                    .reduce((sum, item) => sum + parseAmount(item.amount), 0)
                    .toLocaleString()}
                  원
                </span>
              </AssetsTotal>
              <AssetsDetail>
                {assetsData[key].map((item, index) => (
                  <AssetsDetailList
                    key={index}
                    onClick={() => {
                      setEditAssetData({ name: key, ...item })
                      setModalType('edit')
                      openModal('자산수정')
                    }}>
                    <div>{item.title}</div>
                    <div>{item.amount}</div>
                  </AssetsDetailList>
                ))}
              </AssetsDetail>
            </Assets>
          ))}
        <IconButton
          type="plus"
          onClick={() => {
            setEditAssetData(null)
            setModalType('add')
            openModal('자산추가')
          }}
        />
      </Wrapper>
      {isOpen(modalType === 'edit' ? '자산수정' : '자산추가') && (
        <ModalPortal>
          <AddAssetsModal
            closeModal={() => {
              closeModal(modalType === 'edit' ? '자산수정' : '자산추가')
            }}
            modalType={modalType}
            setModalType={setModalType}
            getAssetsData={getAssetsData}
            editAssetData={editAssetData}
          />
        </ModalPortal>
      )}
    </Container>
  )
}

export default LedgerDetailList

const Container = styled.div`
  width: 600px;
  margin: 50px auto;
`
const Title = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin: 20px auto;

  & > span {
    padding: 30px 0;
    text-align: center;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.gray.gray_300};
  }
`

const Assets = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const AssetsTotal = styled.div`
  padding: 15px 20px;
  border: 1px solid ${({ theme }) => theme.gray.gray_200};
  border-radius: 8px;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
`

const AssetsDetail = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: stretch;
  width: 90%;
  margin: 0 auto;
  font-size: 0.8rem;
`

const AssetsDetailList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.9rem;
  cursor: pointer;

  & span {
    font-size: 0.7rem;
    color: ${({ theme }) => theme.gray.gray_300};
  }
`
