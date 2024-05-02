import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

interface FormValues {
  [key: string]: string | number
}

interface FormProps {
  values: FormValues
  category: string | number
  setCategory: Dispatch<SetStateAction<string | number>>
  means: string | number
  setMeans: Dispatch<SetStateAction<string | number>>
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const useFormControl = (initialValue: FormValues): FormProps => {
  const [values, setValues] = useState(initialValue)

  const [category, setCategory] = useState(initialValue.category)
  const [means, setMeans] = useState(initialValue.means)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    if (name === 'category') {
      setValues(prevs => ({
        ...prevs,
        category: category
      }))
    } else if (name === 'means') {
      setValues(prevs => ({
        ...prevs,
        means: means
      }))
    } else {
      setValues(prevs => ({
        ...prevs,
        [name]: value
      }))
    }
  }

  return {
    values,
    category,
    setCategory,
    means,
    setMeans,
    handleChange
  }
}

export default useFormControl
