import {
  useEffect,
  useRef
} from 'react'

import {
  createCanvas
} from '../../../../lib/canvas'

function Canvas({ page, zoom }) {
  const canvasElementRef = useRef(null)
  const fabricCanvasRef = useRef(null)

  useEffect(() => {
    if (!canvasElementRef.current) {
      return undefined
    }

    const canvas = createCanvas(
      canvasElementRef.current
    )

    fabricCanvasRef.current = canvas

    return () => {
      canvas.dispose()
      fabricCanvasRef.current = null
    }
  }, [])

  useEffect(() => {
    const canvas = fabricCanvasRef.current

    if (!canvas) {
      return
    }

    canvas.setDimensions({
      width: page.width,
      height: page.height
    })

    canvas.setZoom(zoom)

    canvas.requestRenderAll()
  }, [page, zoom])

  return (
    <div>
      <canvas ref={canvasElementRef} />
    </div>
  )
}

export default Canvas