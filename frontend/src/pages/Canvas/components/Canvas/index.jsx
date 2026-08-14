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
    canvasRef
  } = useEditor()

  useEffect(() => {
    if (!canvasElementRef.current) {
      return undefined
    }

    const canvas = createCanvas(
      canvasElementRef.current
    )

    canvasRef.current = canvas

    return () => {
      canvas.dispose()
      canvasRef.current = null
    }
  }, [canvasRef])

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
  }, [canvasRef, page, zoom])

  return (
    <canvas ref={canvasElementRef} />
  )
}

export default Canvas