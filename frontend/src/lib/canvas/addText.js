import { IText } from 'fabric'

export function addText(
  canvas,
  hiddenTextareaContainer
) {
  const text = new IText('Texto', {
    left: canvas.getWidth() / 2,
    top: canvas.getHeight() / 2,
    originX: 'center',
    originY: 'center',
    fontSize: 60,
    fill: '#000000',
    fontFamily: 'Arial',
    hiddenTextareaContainer
  })

  canvas.add(text)

  canvas.setActiveObject(text)

  text.setCoords()

  canvas.requestRenderAll()

  return text
}