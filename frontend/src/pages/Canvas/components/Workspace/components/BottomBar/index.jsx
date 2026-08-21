import {
  Remove,
  Add
} from '@mui/icons-material'

import {
  Box,
  IconButton,
  Typography
} from '@mui/material'

import {
  useEditor
} from '../../../../../../contexts/EditorContext'

function BottomBar({
  onZoomIn,
  onZoomOut
}) {
  const {
    zoom
  } = useEditor()

  const zoomPercentage = Math.round(
    zoom * 100
  )

  return (
    <Box
      component="nav"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 48,
        px: 2
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

      <Typography
        variant="body2"
        sx={{
          minWidth: 52,
          textAlign: 'center',
          userSelect: 'none',
          lineHeight: 1
        }}
      >
        {zoomPercentage}%
      </Typography>

      <IconButton
        size="small"
        onClick={onZoomIn}
        disabled={zoom >= 5}
        aria-label="Aumentar zoom"
      >
        <Add fontSize="small" />
      </IconButton>
    </Box>
  )
}

export default BottomBar