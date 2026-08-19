import {
  useEditor
} from '../../../../../../contexts/EditorContext'

function CanvasProperties() {
  const {
    currentPage,
    backgroundColor,
    updateCanvasBackground
  } = useEditor()

  const handleBackgroundColorChange = (
    event
  ) => {
    updateCanvasBackground(
      event.target.value
    )
  }

  return (
    <div>
      <p>Canvas</p>

      <p>
        Formato: {currentPage.name}
      </p>

      <p>
        Largura: {currentPage.width}px
      </p>

      <p>
        Altura: {currentPage.height}px
      </p>

      <label>
        Cor de fundo

        <input
          type="color"
          value={backgroundColor}
          onChange={handleBackgroundColorChange}
        />
      </label>
    </div>
  )
}

export default CanvasProperties