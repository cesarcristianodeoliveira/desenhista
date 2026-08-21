import {
  useCallback,
  useState
} from 'react'

import {
  EditorProvider,
  useEditor
} from '../../contexts/EditorContext'

import CanvasStart from './components/CanvasStart'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Toolbar from './components/Toolbar'
import Workspace from './components/Workspace'
import Properties from './components/Properties'

import './index.css'

function CanvasEditor({
  onReady
}) {
  const {
    currentPage
  } = useEditor()

  return (
    <main className="canvas-page">
      <Header />

      <Toolbar />

      <div className="canvas-editor">
        <Sidebar />

        <Workspace
          page={currentPage}
          onReady={onReady}
        />

        <Properties />
      </div>
    </main>
  )
}

function CanvasContent() {
  const {
    setCurrentPage
  } = useEditor()

  const [
    isEditorOpen,
    setIsEditorOpen
  ] = useState(false)

  const [
    isLoading,
    setIsLoading
  ] = useState(false)

  const handleCreate = useCallback((page) => {
    setCurrentPage(page)
    setIsLoading(true)
    setIsEditorOpen(true)
  }, [
    setCurrentPage
  ])

  const handleEditorReady = useCallback(() => {
    setIsLoading(false)
  }, [])

  if (!isEditorOpen) {
    return (
      <CanvasStart
        onCreate={handleCreate}
      />
    )
  }

  return (
    <div className="canvas-editor-container">
      <CanvasEditor
        onReady={handleEditorReady}
      />

      {isLoading && (
        <div className="canvas-loading">
          <p>Carregando...</p>
        </div>
      )}
    </div>
  )
}

function Canvas() {
  return (
    <EditorProvider>
      <CanvasContent />
    </EditorProvider>
  )
}

export default Canvas