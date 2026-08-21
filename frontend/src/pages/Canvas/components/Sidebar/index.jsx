import {
  TextFields,
  NearMe
} from '@mui/icons-material'

import {
  Box,
  IconButton,
  Tooltip
} from '@mui/material'

import {
  TOOLS
} from '../../../../constants/tools'

import {
  useEditor
} from '../../../../contexts/EditorContext'

function Sidebar() {
  const {
    activeTool,
    setTool
  } = useEditor()

  return (
    <Box
      component="aside"
      sx={{
        width: 56,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: 2,
        py: 1,
        gap: 1,
        borderRight: 1,
        borderColor: 'divider'
      }}
    >
      <Tooltip title="Selecionar" placement="right">
        <IconButton
          onClick={() => {
            setTool(TOOLS.SELECT)
          }}
          color={
            activeTool === TOOLS.SELECT
              ? 'primary'
              : 'default'
          }
          aria-label="Selecionar"
        >
          <NearMe
            sx={{
              transform: 'scaleX(-1)'
            }}
          />
        </IconButton>
      </Tooltip>

      <Tooltip title="Texto" placement="right">
        <IconButton
          onClick={() => {
            setTool(TOOLS.TEXT)
          }}
          color={
            activeTool === TOOLS.TEXT
              ? 'primary'
              : 'default'
          }
          aria-label="Texto"
        >
          <TextFields />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default Sidebar