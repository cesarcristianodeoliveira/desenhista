import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState
} from 'react'

import {
  TOOLS
} from '../constants/tools'

import {
  PAGE_PRESETS
} from '../constants/pages'

import {
  addText as addTextToCanvas,
  exportCanvas as exportCanvasToImage
} from '../lib/canvas'

const EditorContext = createContext(null)

export function EditorProvider({ children }) {
  const canvasRef = useRef(null)

  const [
    canvas,
    setCanvas
  ] = useState(null)

  const [
    currentPage,
    setCurrentPage
  ] = useState(
    PAGE_PRESETS.INSTAGRAM_POST
  )

  const [
    backgroundColor,
    setBackgroundColor
  ] = useState('#ffffff')

  const [
    hiddenTextareaContainer,
    setHiddenTextareaContainer
  ] = useState(null)

  const [
    activeTool,
    setActiveTool
  ] = useState(TOOLS.SELECT)

  const [
    selection,
    setSelection
  ] = useState([])

  const setTool = (tool) => {
    if (!Object.values(TOOLS).includes(tool)) {
      return
    }

    setActiveTool(tool)
  }

  const updateSelection = useCallback((objects) => {
    setSelection([
      ...objects
    ])
  }, [])

  const clearSelection = useCallback(() => {
    setSelection([])
  }, [])

  const updateObject = useCallback((properties) => {
    if (
      !canvas ||
      selection.length !== 1
    ) {
      return
    }

    const object = selection[0]

    object.set(properties)

    object.setCoords()

    canvas.requestRenderAll()

    setSelection([
      object
    ])
  }, [
    canvas,
    selection
  ])

  const updateCanvasBackground = useCallback((color) => {
    if (!canvas) {
      return
    }

    canvas.backgroundColor = color

    canvas.requestRenderAll()

    setBackgroundColor(color)
  }, [
    canvas
  ])

  const addText = useCallback(() => {
    if (
      !canvas ||
      !hiddenTextareaContainer
    ) {
      return
    }

    return addTextToCanvas(
      canvas,
      hiddenTextareaContainer
    )
  }, [
    canvas,
    hiddenTextareaContainer
  ])

  const exportImage = useCallback(() => {
    if (!canvas) {
      return
    }

    exportCanvasToImage(canvas)
  }, [
    canvas
  ])

  const value = useMemo(() => {
    return {
      canvasRef,
      canvas,
      setCanvas,
      currentPage,
      setCurrentPage,
      backgroundColor,
      updateCanvasBackground,
      hiddenTextareaContainer,
      setHiddenTextareaContainer,
      activeTool,
      setTool,
      selection,
      updateSelection,
      clearSelection,
      updateObject,
      addText,
      exportImage
    }
  }, [
    canvas,
    currentPage,
    backgroundColor,
    updateCanvasBackground,
    hiddenTextareaContainer,
    activeTool,
    selection,
    updateSelection,
    clearSelection,
    updateObject,
    addText,
    exportImage
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