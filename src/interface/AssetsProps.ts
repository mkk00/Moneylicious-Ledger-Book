export interface AssetsProps {
  id: string
  user_id: string
  email: string
  type: string
  name: string
  created_at: string
  updated_at: string
  amount: number
}

export interface AssetsTargetProps {
  id: string
  user_id: string
  email: string
  expense: string
  saving: string
  created_at: string
}
