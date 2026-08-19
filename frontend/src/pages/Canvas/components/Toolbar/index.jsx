import { TOOLS } from '../../../../constants/tools'

import {
  useEditor
} from '../../../../contexts/EditorContext'

function Toolbar() {
  const {
    activeTool,
    setTool,
    exportImage
  } = useEditor()

  return (
    <div>
      <button
        type="button"
        onClick={() => setTool(TOOLS.SELECT)}
        aria-pressed={activeTool === TOOLS.SELECT}
      >
        Selecionar
      </button>

      <button
        type="button"
        onClick={() => setTool(TOOLS.TEXT)}
        aria-pressed={activeTool === TOOLS.TEXT}
      >
        Texto
      </button>

      <button
        type="button"
        onClick={exportImage}
      >
        Exportar PNG
      </button>
    </div>
  )
}

export default Toolbar