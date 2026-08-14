import { useEditor } from '../../../../contexts/EditorContext'

function Toolbar() {
  const {
    addText
  } = useEditor()

  return (
    <div>
      <button onClick={addText}>
        Adicionar texto
      </button>
    </div>
  )
}

export default Toolbar