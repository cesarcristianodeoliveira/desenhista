import {
  useEditor
} from '../../../../contexts/EditorContext'

import CanvasProperties from './components/CanvasProperties'
import TextProperties from './components/TextProperties'

function Properties() {
  const {
    selection
  } = useEditor()

  const selectionCount = selection.length

  if (selectionCount === 0) {
    return (
      <aside>
        <CanvasProperties />
      </aside>
    )
  }

  if (selectionCount > 1) {
    return (
      <aside>
        <p>
          {selectionCount} objetos selecionados
        </p>
      </aside>
    )
  }

  const selectedObject = selection[0]

  if (selectedObject.type === 'i-text') {
    return (
      <aside>
        <TextProperties
          object={selectedObject}
        />
      </aside>
    )
  }

  return (
    <aside>
      <p>Objeto selecionado</p>

      <p>
        Tipo: {selectedObject.type}
      </p>
    </aside>
  )
}

export default Properties