import {
  Add,
  Remove
} from '@mui/icons-material'

import {
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material'

import {
  useState
} from 'react'

import {
  useEditor
} from '../../../../../../contexts/EditorContext'

const ZOOM_OPTIONS = [
  25,
  50,
  75,
  100,
  125,
  150,
  200,
  300,
  400
]

function BottomBar({
  onZoomIn,
  onZoomOut,
  onZoomSelect,
  onFitZoom
}) {
  const {
    zoom,
    isFitZoom
  } = useEditor()

  const [
    zoomMenuAnchor,
    setZoomMenuAnchor
  ] = useState(null)

  const zoomPercentage =
    Math.round(
      zoom * 100
    )

  const handleOpenZoomMenu = (
    event
  ) => {
    setZoomMenuAnchor(
      event.currentTarget
    )
  }

  const handleCloseZoomMenu = () => {
    setZoomMenuAnchor(null)
  }

  const handleSelectZoom = (
    percentage
  ) => {
    onZoomSelect(
      percentage / 100
    )

    handleCloseZoomMenu()
  }

  const handleFitZoom = () => {
    onFitZoom()

    handleCloseZoomMenu()
  }

  return (
    <Box
      component="nav"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 48,
        px: 2,
        borderTop: 1,
        borderColor: 'divider'
      }}
      aria-label="Controles do Workspace"
    >
      <IconButton
        size="small"
        onClick={onZoomOut}
        disabled={zoom <= 0.1}
        aria-label="Diminuir zoom"
      >
        <Remove fontSize="small" />
      </IconButton>

      <Button
        size="small"
        onClick={handleOpenZoomMenu}
        sx={{
          minWidth: 52,
          px: 1,
          textTransform: 'none',
          color: 'text.primary'
        }}
        aria-label="Selecionar zoom"
        aria-haspopup="menu"
      >
        {zoomPercentage}%
      </Button>

      <IconButton
        size="small"
        onClick={onZoomIn}
        disabled={zoom >= 5}
        aria-label="Aumentar zoom"
      >
        <Add fontSize="small" />
      </IconButton>

      <Menu
        anchorEl={zoomMenuAnchor}
        open={Boolean(zoomMenuAnchor)}
        onClose={handleCloseZoomMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
      >
        {ZOOM_OPTIONS
          .slice()
          .reverse()
          .map((percentage) => (
            <MenuItem
              key={percentage}
              selected={
                percentage ===
                zoomPercentage
              }
              onClick={() => {
                handleSelectZoom(
                  percentage
                )
              }}
            >
              {percentage}%
            </MenuItem>
          ))}

        <Divider />

        <MenuItem
          disabled={isFitZoom}
          onClick={handleFitZoom}
        >
          Ajustar à tela
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default BottomBar