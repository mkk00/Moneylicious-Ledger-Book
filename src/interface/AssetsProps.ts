interface AssetsProps {
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

interface AssetsDataItemProps {
  id: string
  name: string
  title: string
  amount: string
}

interface AssetsDataProps {
  [name: string]: {
    id: string
    title: string
    amount: string
  }[]
}

interface AssetsTargetProps {
  id: string
  user_id: string
  email: string
  expense: string
  saving: string
  created_at: string
}

interface UpdateAssetsProps {
  type: string
  name: string
  updated_at: string
  amount: string
  title: string
}

export type {
  AssetsProps,
  AssetsDataItemProps,
  AssetsDataProps,
  AssetsTargetProps,
  UpdateAssetsProps
}
