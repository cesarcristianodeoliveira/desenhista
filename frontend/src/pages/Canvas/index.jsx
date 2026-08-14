import { PAGE_PRESETS } from '../../constants/pages'
import Workspace from './components/Workspace'
import './index.css'

function Canvas() {
  const currentPage = PAGE_PRESETS.INSTAGRAM_POST

  return (
    <main className="canvas-page">
      <header className="canvas-header">
        <h1>{currentPage.name}</h1>
      </header>

      <Workspace page={currentPage} />
    </main>
  )
}

export default Canvas