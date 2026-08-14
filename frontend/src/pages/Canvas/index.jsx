import Workspace from './components/Workspace'
import './index.css'

function Canvas() {
  return (
    <main className="canvas-page">
      <header className="canvas-header">
        <h1>Canvas</h1>
      </header>

      <Workspace />
    </main>
  )
}

export default Canvas