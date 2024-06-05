import { useState, ChangeEvent, MouseEvent } from 'react'

interface FormProps<T extends object> {
  type: string
  initialValue: T
  onSubmit: (values: T) => void
  validate: (type: string, values: T) => Partial<Record<keyof T, string>>
}

const useAuthForm = <T extends object>({
  type,
  initialValue,
  onSubmit,
  validate
}: FormProps<T>) => {
  const [values, setValues] = useState<T>(initialValue)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    if (type === 'file') {
      const file = (e.target as HTMLInputElement).files?.[0] || null
      setValues(prevValues => ({
        ...prevValues,
        [name]: file
      }))
    } else
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
      console.error('error', validationErrors)
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
