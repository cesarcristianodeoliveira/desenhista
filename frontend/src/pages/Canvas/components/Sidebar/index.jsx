import { TOOLS } from '../../../../constants/tools'
import { useEditor } from '../../../../contexts/EditorContext'

import './index.css'

function Sidebar() {
  const {
    activeTool,
    addText
  } = useEditor()

  return (
    <aside className="canvas-sidebar">
      <div className="canvas-sidebar-header">
        <span>Ferramentas</span>
      </div>

      <div className="canvas-sidebar-content">
        {activeTool === TOOLS.SELECT && (
          <p>
            Selecione um elemento no Canvas.
          </p>
        )}

        {activeTool === TOOLS.TEXT && (
          <>
            <p>
              Ferramenta de texto.
            </p>

            <button
              type="button"
              onClick={addText}
            >
              Adicionar texto
            </button>
          </>
        )}
      </div>
    </aside>
  )
}

export default Sidebar