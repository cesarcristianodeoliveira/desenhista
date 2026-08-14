import {
  useEffect,
  useRef
} from 'react'

import {
  createCanvas
} from '../../../../lib/canvas/createCanvas'

function Canvas({ size }) {
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
    if (!fabricCanvasRef.current) {
      return
    }

    fabricCanvasRef.current.setDimensions({
      width: size,
      height: size
    })

    fabricCanvasRef.current.requestRenderAll()
  }, [size])

  return (
    <canvas ref={canvasElementRef} />
  )
}

export default Canvas