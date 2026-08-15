import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState
} from 'react'

import { TOOLS } from '../constants/tools'

import {
  addText as addTextToCanvas
} from '../lib/canvas'

const EditorContext = createContext(null)

export function EditorProvider({ children }) {
  const canvasRef = useRef(null)

  const [
    canvas,
    setCanvas
  ] = useState(null)

  const [
    activeTool,
    setActiveTool
  ] = useState(TOOLS.SELECT)

  const setTool = (tool) => {
    if (!Object.values(TOOLS).includes(tool)) {
      return
    }

    setActiveTool(tool)
  }

  const addText = useCallback(() => {
    if (!canvas) {
      return
    }

    return addTextToCanvas(canvas)
  }, [
    canvas
  ])

  const value = useMemo(() => {
    return {
      canvasRef,
      canvas,
      setCanvas,
      activeTool,
      setTool,
      addText
    }
  }, [
    canvas,
    activeTool,
    addText
  ])

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