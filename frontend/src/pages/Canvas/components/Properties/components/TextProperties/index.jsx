import {
  useEditor
} from '../../../../../../contexts/EditorContext'

function TextProperties({
  object
}) {
  const {
    updateObject
  } = useEditor()

  const formatScale = (value) => {
    return Number(
      value.toFixed(2)
    )
  }

  const handleFontSizeChange = (
    event
  ) => {
    const value = Number(
      event.target.value
    )

    if (!Number.isFinite(value)) {
      return
    }

    if (value <= 0) {
      return
    }

    updateObject({
      fontSize: value
    })
  }

  const handleScaleXChange = (
    event
  ) => {
    const value = Number(
      event.target.value
    )

    if (!Number.isFinite(value)) {
      return
    }

    if (value <= 0) {
      return
    }

    updateObject({
      scaleX: value
    })
  }

  const handleScaleYChange = (
    event
  ) => {
    const value = Number(
      event.target.value
    )

    if (!Number.isFinite(value)) {
      return
    }

    if (value <= 0) {
      return
    }

    updateObject({
      scaleY: value
    })
  }

  const handleAngleChange = (
    event
  ) => {
    const value = Number(
      event.target.value
    )

    if (!Number.isFinite(value)) {
      return
    }

    updateObject({
      angle: value
    })
  }

  return (
    <div>
      <p>Texto</p>

      <p>
        Conteúdo: {object.text}
      </p>

      <p>
        Fonte: {object.fontFamily}
      </p>

      <section>
        <p>Tipografia</p>

        <label>
          Tamanho

          <input
            type="number"
            min="1"
            value={object.fontSize}
            onChange={handleFontSizeChange}
          />
        </label>
      </section>

      <section>
        <p>Transformação</p>

        <label>
          Escala X

          <input
            type="number"
            min="0.01"
            step="0.01"
            value={formatScale(object.scaleX)}
            onChange={handleScaleXChange}
          />
        </label>

        <label>
          Escala Y

          <input
            type="number"
            min="0.01"
            step="0.01"
            value={formatScale(object.scaleY)}
            onChange={handleScaleYChange}
          />
        </label>

        <label>
          Rotação

          <input
            type="number"
            step="1"
            value={object.angle}
            onChange={handleAngleChange}
          />
        </label>
      </section>

      <p>
        Cor: {object.fill}
      </p>
    </div>
  )
}

export default TextProperties