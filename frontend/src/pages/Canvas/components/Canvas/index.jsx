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

function Canvas({
  page,
  hiddenTextareaContainer
}) {
  const canvasElementRef = useRef(null)

  const {
    canvasRef,
    setCanvas,
    setHiddenTextareaContainer
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

    canvasRef.current = canvas

    setCanvas(canvas)

    setHiddenTextareaContainer(
      hiddenTextareaContainer.current
    )

    return () => {
      canvas.dispose()

      canvasRef.current = null

      setCanvas(null)

      setHiddenTextareaContainer(null)
    }
  }, [
    canvasRef,
    hiddenTextareaContainer,
    page,
    setCanvas,
    setHiddenTextareaContainer
  ])

  return (
    <canvas ref={canvasElementRef} />
  )
}

export default Canvas