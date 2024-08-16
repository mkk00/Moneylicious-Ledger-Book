export interface AssetsProps {
  id: string
  user_id: string
  email: string
  type: string
  name: string
  created_at: string
  updated_at: string
  amount: string
  title: string
}

export interface AssetsDataItemProps {
  id: string
  name: string
  title: string
  amount: string
}

export interface AssetsDataProps {
  [name: string]: {
    id: string
    title: string
    amount: string
  }[]
}

export interface AssetsTargetProps {
  id: string
  user_id: string
  email: string
  expense: string
  saving: string
  created_at: string
}
