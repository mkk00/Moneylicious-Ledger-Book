import { useState, ChangeEvent, MouseEvent } from 'react'
import { authProps } from '@/utils/authValidation'

interface FormProps {
  initialValue: authProps
  onSubmit: (values: authProps) => void
  validate: (values: authProps) => authProps
}

const useAuthForm = ({ initialValue, onSubmit, validate }: FormProps) => {
  const [values, setValues] = useState(initialValue)
  const [errors, setErrors] = useState<authProps>({})
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

    const validationErrors = validate(values)

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values)
    } else {
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
