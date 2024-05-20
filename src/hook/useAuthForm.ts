import { useState, ChangeEvent, MouseEvent } from 'react'
import { AuthErrorProps } from '@/utils/authValidation'

export interface AuthProps {
  email: string
  password: string
  name?: string
  confirmPassword?: string
  message?: string
}

interface FormProps {
  type: string
  initialValue: AuthProps
  onSubmit: (values: AuthProps) => void
  validate: (type: string, values: AuthErrorProps) => AuthErrorProps
}

const useAuthForm = ({ type, initialValue, onSubmit, validate }: FormProps) => {
  const [values, setValues] = useState(initialValue)
  const [errors, setErrors] = useState<AuthErrorProps>({})
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
