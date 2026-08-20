import {
  useState
} from 'react'

import {
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
  PAGE_PRESETS
} from '../../../../constants/pages'

function CanvasStart({
  onCreate
}) {
  const presets = Object.values(
    PAGE_PRESETS
  )

  const [
    selectedPage,
    setSelectedPage
  ] = useState(
    presets[0]
  )

  const [
    customWidth,
    setCustomWidth
  ] = useState('')

  const [
    customHeight,
    setCustomHeight
  ] = useState('')

  const isCustom =
    selectedPage === null

  const handleFormatChange = (event) => {
    if (event.target.value === 'custom') {
      setSelectedPage(null)

      return
    }

    const page = presets.find(
      (preset) =>
        preset.id === event.target.value
    )

    setSelectedPage(page)
  }

  const handleCreate = () => {
    if (isCustom) {
      const width = Number(customWidth)

      const height = Number(customHeight)

      if (
        !Number.isFinite(width) ||
        !Number.isFinite(height) ||
        width < MIN_PAGE_SIZE ||
        width > MAX_PAGE_SIZE ||
        height < MIN_PAGE_SIZE ||
        height > MAX_PAGE_SIZE
      ) {
        return
      }

      onCreate({
        id: 'custom',
        name: 'Personalizado',
        width,
        height
      })

      return
    }

    onCreate(selectedPage)
  }

  return (
    <section>
      <h2>
        O que você deseja criar?
      </h2>

      <label>
        Formato

        <select
          value={
            isCustom
              ? 'custom'
              : selectedPage.id
          }
          onChange={handleFormatChange}
        >
          {presets.map((preset) => (
            <option
              key={preset.id}
              value={preset.id}
            >
              {preset.name}
            </option>
          ))}

          <option value="custom">
            Personalizado
          </option>
        </select>
      </label>

      {isCustom && (
        <>
          <label>
            Largura

            <input
              type="number"
              min={MIN_PAGE_SIZE}
              max={MAX_PAGE_SIZE}
              value={customWidth}
              onChange={(event) => {
                setCustomWidth(
                  event.target.value
                )
              }}
            />
          </label>

          <label>
            Altura

            <input
              type="number"
              min={MIN_PAGE_SIZE}
              max={MAX_PAGE_SIZE}
              value={customHeight}
              onChange={(event) => {
                setCustomHeight(
                  event.target.value
                )
              }}
            />
          </label>
        </>
      )}

      <button
        type="button"
        onClick={handleCreate}
      >
        Criar
      </button>
    </section>
  )
}

export default CanvasStart