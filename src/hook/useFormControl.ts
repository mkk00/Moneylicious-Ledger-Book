import { ChangeEvent, useState, MouseEvent } from 'react'

export interface FormValues {
  user_id?: string
  created_at: Date | null
  description?: string
  amount: string
  category: string
  means: string
  memo?: string
}

interface FormProps {
  initialValue: FormValues
  onSubmit: () => Promise<void>
}

const useFormControl = ({ initialValue, onSubmit }: FormProps) => {
  const [values, setValues] = useState(initialValue)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    let updatedValue: string | number = value

    if (name === 'amount') {
      updatedValue = updatedValue.replace(/[^0-9]/g, '')

      if (updatedValue) {
        updatedValue = Number(updatedValue).toLocaleString()
      }
    }

    setValues(prevs => ({
      ...prevs,
      [name]: name !== 'amount' ? value : updatedValue
    }))
  }

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (!values.user_id) {
      alert('유저정보가 없습니다.')
    } else if (!values.amount) {
      alert('금액은 필수 입력값입니다.')
    }

    if (values.user_id && values.amount !== '') {
      onSubmit()
    }
  }

  return {
    values,
    handleChange,
    handleSubmit
  }
}

export default useFormControl
