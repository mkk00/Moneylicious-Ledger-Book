import { useState, ChangeEvent, MouseEvent } from 'react'
import { authErrorProps } from '@/utils/authValidation'

export interface authProps {
  email: string
  password: string
  name?: string
  confirmPassword?: string
  message?: string
}

interface FormProps {
  type: string
  initialValue: authProps
  onSubmit: (values: authProps) => void
  validate: (type: string, values: authErrorProps) => authErrorProps
}

const useAuthForm = ({ type, initialValue, onSubmit, validate }: FormProps) => {
  const [values, setValues] = useState(initialValue)
  const [errors, setErrors] = useState<authErrorProps>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }))
  }

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const validationErrors = validate(type, values)

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values)
    } else {
      console.log('error', validationErrors)
      setErrors(validationErrors)
    }
  }

  return {
    values,
    errors,
    isLoading,
    handleChange,
    handleSubmit
  }
}

export default useAuthForm
