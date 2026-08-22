function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function formatDateTime() {
  const now = new Date()

  const hours =
    String(now.getHours()).padStart(2, '0')

  const minutes =
    String(now.getMinutes()).padStart(2, '0')

  const seconds =
    String(now.getSeconds()).padStart(2, '0')

  const day =
    String(now.getDate()).padStart(2, '0')

  const month =
    String(now.getMonth() + 1).padStart(2, '0')

  const year =
    now.getFullYear()

  return [
    hours,
    minutes,
    seconds,
    day,
    month,
    year
  ].join('-')
}

export function exportCanvas(
  canvas,
  {
    documentName,
    pageName
  } = {}
) {
  if (!canvas) {
    return
  }

  const dataURL = canvas.toDataURL({
    format: 'png',
    multiplier: 1
  })

  const safeDocumentName =
    slugify(
      documentName || 'sem-titulo'
    )

  const safePageName =
    slugify(
      pageName || 'desenhista'
    )

  const dateTime =
    formatDateTime()

  const fileName = [
    safeDocumentName,
    safePageName,
    dateTime
  ].join('-')

  const link =
    document.createElement('a')

  link.download =
    `${fileName}.png`

  link.href = dataURL

  link.click()
}