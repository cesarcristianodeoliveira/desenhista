function normalizeProportionalText(object) {
  if (
    !object ||
    object.type !== 'i-text'
  ) {
    return
  }

  const scaleDifference = Math.abs(
    object.scaleX - object.scaleY
  )

  const isProportional =
    scaleDifference < 0.001

  if (!isProportional) {
    return
  }

  if (object.scaleX === 1) {
    return
  }

  object.set({
    fontSize: Math.round(
      object.fontSize * object.scaleX
    ),
    scaleX: 1,
    scaleY: 1
  })

  object.setCoords()
}

export default normalizeProportionalText