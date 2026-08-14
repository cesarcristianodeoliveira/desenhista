import {
  createContext,
  useContext,
  useMemo,
  useRef
} from 'react'

import {
  addText as addTextToCanvas
} from '../lib/canvas'

const EditorContext = createContext(null)

export function EditorProvider({ children }) {
  const canvasRef = useRef(null)

  const addText = () => {
    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    return addTextToCanvas(canvas)
  }

  const value = useMemo(() => {
    return {
      canvasRef,
      addText
    }
  }, [])

  return (
    <EditorContext.Provider value={value}>
      {children}
    </EditorContext.Provider>
  )
}

export function useEditor() {
  const context = useContext(EditorContext)

  if (!context) {
    throw new Error(
      'useEditor must be used within EditorProvider'
    )
  }

  return context
}