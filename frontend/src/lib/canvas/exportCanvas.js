export function exportCanvas(canvas) {
  if (!canvas) {
    return
  }

  const dataURL = canvas.toDataURL({
    format: 'png',
    multiplier: 1
  })

  const link = document.createElement('a')

  link.download = 'desenhista.png'

  link.href = dataURL

  link.click()
}