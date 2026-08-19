import {
  EditorProvider,
  useEditor
} from '../../contexts/EditorContext'

import Sidebar from './components/Sidebar'
import Toolbar from './components/Toolbar'
import Workspace from './components/Workspace'
import Properties from './components/Properties'

import './index.css'

function CanvasEditor() {
  const {
    currentPage
  } = useEditor()

  return (
    <main className="canvas-page">
      <header className="canvas-header">
        <h1>{currentPage.name}</h1>
      </header>

      <Toolbar />

      <div className="canvas-editor">
        <Sidebar />

        <Workspace
          page={currentPage}
        />

        <Properties />
      </div>
    </main>
  )
}

function Canvas() {
  return (
    <EditorProvider>
      <CanvasEditor />
    </EditorProvider>
  )
}

export default Canvas