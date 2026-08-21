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
} from '../../../../contexts/EditorContext'

function WorkspaceBottomBar() {
  const {
    zoom,
    zoomIn,
    zoomOut
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
        onClick={zoomOut}
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
          userSelect: 'none'
        }}
      >
        {zoomPercentage}%
      </Typography>

      <IconButton
        size="small"
        onClick={zoomIn}
        disabled={zoom >= 5}
        aria-label="Aumentar zoom"
      >
        <Add fontSize="small" />
      </IconButton>
    </Box>
  )
}

export default WorkspaceBottomBar