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

function Canvas({ page, zoom }) {
  const canvasElementRef = useRef(null)

  const {
    canvasRef,
    setCanvas
  } = useEditor()

  useEffect(() => {
    if (!canvasElementRef.current) {
      return undefined
    }

    const canvas = createCanvas(
      canvasElementRef.current
    )

    canvasRef.current = canvas
    setCanvas(canvas)

    return () => {
      canvas.dispose()
      canvasRef.current = null
      setCanvas(null)
    }
  }, [
    canvasRef,
    setCanvas
  ])

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    canvas.setDimensions({
      width: page.width,
      height: page.height
    })

    canvas.setZoom(zoom)

    canvas.requestRenderAll()
  }, [
    canvasRef,
    page,
    zoom
  ])

  return (
    <canvas ref={canvasElementRef} />
  )
}

export default Canvas