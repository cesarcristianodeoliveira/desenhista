import { PAGE_PRESETS } from '../../constants/pages'
import {
  EditorProvider
} from '../../contexts/EditorContext'
import Toolbar from './components/Toolbar'
import Workspace from './components/Workspace'
import './index.css'

function Canvas() {
  const currentPage = PAGE_PRESETS.INSTAGRAM_POST

  return (
    <EditorProvider>
      <main className="canvas-page">
        <header className="canvas-header">
          <h1>{currentPage.name}</h1>
        </header>

        <Toolbar />

        <Workspace page={currentPage} />
      </main>
    </EditorProvider>
  )
}

export default Canvas