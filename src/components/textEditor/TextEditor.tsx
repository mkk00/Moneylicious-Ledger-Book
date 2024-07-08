import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const TextEditor = () => {
  return <ReactQuill style={editorStyle} />
}

const editorStyle = {
  height: '350px'
}

export default TextEditor
