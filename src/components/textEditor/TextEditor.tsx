import { Dispatch, SetStateAction, useMemo } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const TextEditor = ({
  setValues,
  initialValue
}: {
  setValues: Dispatch<SetStateAction<null | string>>
  initialValue: string
}) => {
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ size: ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ align: [] }],
          [
            {
              color: []
            },
            { background: [] }
          ],
          ['link'],
          ['image']
        ]
      }
    }
  }, [])

  return (
    <ReactQuill
      modules={modules}
      style={editorStyle}
      value={initialValue}
      onChange={setValues}
    />
  )
}

const editorStyle = {
  height: '350px'
}

export default TextEditor
