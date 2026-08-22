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

const MIN_ZOOM = 0.1
const MAX_ZOOM = 5
const ZOOM_STEP = 0.1

export function EditorProvider({ children }) {
  const canvasRef = useRef(null)

  const historyRef = useRef([])
  const futureRef = useRef([])

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
    documentName,
    setDocumentName
  ] = useState('Sem título')

  const [
    hasChanges,
    setHasChanges
  ] = useState(false)

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
    zoom,
    setZoom
  ] = useState(1)

  const [
    isFitZoom,
    setIsFitZoom
  ] = useState(true)

  const [
    selection,
    setSelection
  ] = useState([])

  const [
    canUndo,
    setCanUndo
  ] = useState(false)

  const [
    canRedo,
    setCanRedo
  ] = useState(false)

  const setTool = useCallback((tool) => {
    if (!Object.values(TOOLS).includes(tool)) {
      return
    }

    setActiveTool(tool)
  }, [])

  const markAsChanged = useCallback(() => {
    setHasChanges(true)
  }, [])

  const setZoomLevel = useCallback((value) => {
    const nextZoom = Math.min(
      Math.max(value, MIN_ZOOM),
      MAX_ZOOM
    )

    setZoom(nextZoom)
    setIsFitZoom(false)
  }, [])

  const setFitZoom = useCallback((value) => {
    const nextZoom = Math.min(
      Math.max(value, MIN_ZOOM),
      MAX_ZOOM
    )

    setZoom(nextZoom)
    setIsFitZoom(true)
  }, [])

  const zoomIn = useCallback(() => {
    setZoom((currentZoom) => {
      return Math.min(
        currentZoom + ZOOM_STEP,
        MAX_ZOOM
      )
    })

    setIsFitZoom(false)
  }, [])

  const zoomOut = useCallback(() => {
    setZoom((currentZoom) => {
      return Math.max(
        currentZoom - ZOOM_STEP,
        MIN_ZOOM
      )
    })

    setIsFitZoom(false)
  }, [])

  const updateHistoryState = useCallback(() => {
    setCanUndo(
      historyRef.current.length > 0
    )

    setCanRedo(
      futureRef.current.length > 0
    )
  }, [])

  const undo = useCallback(() => {
    const operation =
      historyRef.current.pop()

    if (!operation) {
      return
    }

    futureRef.current.push(
      operation
    )

    updateHistoryState()
  }, [
    updateHistoryState
  ])

  const redo = useCallback(() => {
    const operation =
      futureRef.current.pop()

    if (!operation) {
      return
    }

    historyRef.current.push(
      operation
    )

    updateHistoryState()
  }, [
    updateHistoryState
  ])

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

    markAsChanged()
  }, [
    canvas,
    selection,
    markAsChanged
  ])

  const alignObjectLeft = useCallback(() => {
    if (
      !canvas ||
      selection.length !== 1
    ) {
      return
    }

    const object = selection[0]

    const bounds =
      object.getBoundingRect()

    object.set({
      left:
        object.left -
        bounds.left
    })

    object.setCoords()

    canvas.requestRenderAll()

    setSelection([
      object
    ])

    markAsChanged()
  }, [
    canvas,
    selection,
    markAsChanged
  ])

  const alignObjectCenterHorizontal = useCallback(() => {
    if (
      !canvas ||
      selection.length !== 1
    ) {
      return
    }

    const object = selection[0]

    const bounds =
      object.getBoundingRect()

    const canvasCenter =
      canvas.getWidth() / 2

    const objectCenter =
      bounds.left +
      bounds.width / 2

    object.set({
      left:
        object.left +
        (
          canvasCenter -
          objectCenter
        )
    })

    object.setCoords()

    canvas.requestRenderAll()

    setSelection([
      object
    ])

    markAsChanged()
  }, [
    canvas,
    selection,
    markAsChanged
  ])

  const alignObjectRight = useCallback(() => {
    if (
      !canvas ||
      selection.length !== 1
    ) {
      return
    }

    const object = selection[0]

    const bounds =
      object.getBoundingRect()

    const canvasRight =
      canvas.getWidth()

    const objectRight =
      bounds.left +
      bounds.width

    object.set({
      left:
        object.left +
        (
          canvasRight -
          objectRight
        )
    })

    object.setCoords()

    canvas.requestRenderAll()

    setSelection([
      object
    ])

    markAsChanged()
  }, [
    canvas,
    selection,
    markAsChanged
  ])

  const alignObjectTop = useCallback(() => {
    if (
      !canvas ||
      selection.length !== 1
    ) {
      return
    }

    const object = selection[0]

    const bounds =
      object.getBoundingRect()

    object.set({
      top:
        object.top -
        bounds.top
    })

    object.setCoords()

    canvas.requestRenderAll()

    setSelection([
      object
    ])

    markAsChanged()
  }, [
    canvas,
    selection,
    markAsChanged
  ])

  const alignObjectCenterVertical = useCallback(() => {
    if (
      !canvas ||
      selection.length !== 1
    ) {
      return
    }

    const object = selection[0]

    const bounds =
      object.getBoundingRect()

    const canvasCenter =
      canvas.getHeight() / 2

    const objectCenter =
      bounds.top +
      bounds.height / 2

    object.set({
      top:
        object.top +
        (
          canvasCenter -
          objectCenter
        )
    })

    object.setCoords()

    canvas.requestRenderAll()

    setSelection([
      object
    ])

    markAsChanged()
  }, [
    canvas,
    selection,
    markAsChanged
  ])

  const alignObjectBottom = useCallback(() => {
    if (
      !canvas ||
      selection.length !== 1
    ) {
      return
    }

    const object = selection[0]

    const bounds =
      object.getBoundingRect()

    const canvasBottom =
      canvas.getHeight()

    const objectBottom =
      bounds.top +
      bounds.height

    object.set({
      top:
        object.top +
        (
          canvasBottom -
          objectBottom
        )
    })

    object.setCoords()

    canvas.requestRenderAll()

    setSelection([
      object
    ])

    markAsChanged()
  }, [
    canvas,
    selection,
    markAsChanged
  ])

  const updateCanvasBackground = useCallback((color) => {
    if (!canvas) {
      return
    }

    canvas.backgroundColor = color

    canvas.requestRenderAll()

    setBackgroundColor(color)

    markAsChanged()
  }, [
    canvas,
    markAsChanged
  ])

  const addText = useCallback(() => {
    if (
      !canvas ||
      !hiddenTextareaContainer
    ) {
      return
    }

    const text = addTextToCanvas(
      canvas,
      hiddenTextareaContainer
    )

    markAsChanged()

    setActiveTool(TOOLS.SELECT)

    return text
  }, [
    canvas,
    hiddenTextareaContainer,
    markAsChanged
  ])

  const exportImage = useCallback(() => {
    if (
      !canvas ||
      !hasChanges
    ) {
      return
    }

    exportCanvasToImage(
      canvas,
      {
        documentName,
        pageName: currentPage.name
      }
    )
  }, [
    canvas,
    hasChanges,
    documentName,
    currentPage
  ])

  const value = useMemo(() => {
    return {
      canvasRef,
      canvas,
      setCanvas,

      currentPage,
      setCurrentPage,

      documentName,
      setDocumentName,

      hasChanges,
      markAsChanged,

      backgroundColor,
      updateCanvasBackground,

      hiddenTextareaContainer,
      setHiddenTextareaContainer,

      activeTool,
      setTool,

      zoom,
      isFitZoom,
      setZoomLevel,
      setFitZoom,
      zoomIn,
      zoomOut,

      selection,
      updateSelection,
      clearSelection,
      updateObject,

      alignObjectLeft,
      alignObjectCenterHorizontal,
      alignObjectRight,
      alignObjectTop,
      alignObjectCenterVertical,
      alignObjectBottom,

      addText,
      exportImage,

      canUndo,
      canRedo,
      undo,
      redo
    }
  }, [
    canvas,
    currentPage,
    documentName,
    hasChanges,
    markAsChanged,
    backgroundColor,
    updateCanvasBackground,
    hiddenTextareaContainer,
    activeTool,
    setTool,
    zoom,
    isFitZoom,
    setZoomLevel,
    setFitZoom,
    zoomIn,
    zoomOut,
    selection,
    updateSelection,
    clearSelection,
    updateObject,
    alignObjectLeft,
    alignObjectCenterHorizontal,
    alignObjectRight,
    alignObjectTop,
    alignObjectCenterVertical,
    alignObjectBottom,
    addText,
    exportImage,
    canUndo,
    canRedo,
    undo,
    redo
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