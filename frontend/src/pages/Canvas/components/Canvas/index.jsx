import {
  useEffect,
  useRef
} from 'react'

import {
  useEditor
} from '../../../../contexts/EditorContext'

import {
  createCanvas
} from '../../../../lib/canvas'

import normalizeProportionalText from '../../../../lib/canvas/normalizeProportionalText'

function Canvas({
  page,
  hiddenTextareaContainer
}) {
  const canvasElementRef = useRef(null)

  const {
    canvasRef,
    setCanvas,
    setHiddenTextareaContainer,
    updateSelection,
    clearSelection
  } = useEditor()

  useEffect(() => {
    if (!canvasElementRef.current) {
      return undefined
    }

    const canvas = createCanvas(
      canvasElementRef.current
    )

    canvas.setDimensions({
      width: page.width,
      height: page.height
    })

    const handleSelectionChange = () => {
      updateSelection(
        canvas.getActiveObjects()
      )
    }

    const handleSelectionCleared = () => {
      clearSelection()
    }

    const handleObjectModified = (event) => {
      const object = event.target

      normalizeProportionalText(
        object
      )

      canvas.requestRenderAll()

      updateSelection(
        canvas.getActiveObjects()
      )
    }

    const handleTextChanged = () => {
      updateSelection(
        canvas.getActiveObjects()
      )
    }

    canvas.on(
      'selection:created',
      handleSelectionChange
    )

    canvas.on(
      'selection:updated',
      handleSelectionChange
    )

    canvas.on(
      'selection:cleared',
      handleSelectionCleared
    )

    canvas.on(
      'object:modified',
      handleObjectModified
    )

    canvas.on(
      'text:changed',
      handleTextChanged
    )

    canvasRef.current = canvas

    setCanvas(canvas)

    setHiddenTextareaContainer(
      hiddenTextareaContainer.current
    )

    return () => {
      canvas.off(
        'selection:created',
        handleSelectionChange
      )

      canvas.off(
        'selection:updated',
        handleSelectionChange
      )

      canvas.off(
        'selection:cleared',
        handleSelectionCleared
      )

      canvas.off(
        'object:modified',
        handleObjectModified
      )

      canvas.off(
        'text:changed',
        handleTextChanged
      )

      canvas.dispose()

      canvasRef.current = null

      setCanvas(null)

      setHiddenTextareaContainer(null)

      clearSelection()
    }
  }, [
    canvasRef,
    hiddenTextareaContainer,
    page,
    setCanvas,
    setHiddenTextareaContainer,
    updateSelection,
    clearSelection
  ])

  return (
    <canvas ref={canvasElementRef} />
  )
}

export default Canvas