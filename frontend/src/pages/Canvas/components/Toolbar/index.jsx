import {
  Box,
  Button
} from '@mui/material'

import {
  TOOLS
} from '../../../../constants/tools'

import {
  useEditor
} from '../../../../contexts/EditorContext'

function Toolbar() {
  const {
    activeTool,
    addText
  } = useEditor()

  return (
    <Box
      component="section"
      sx={{
        minHeight: 48,
        px: 2,
        display: 'flex',
        alignItems: 'center',
        borderBottom: 1,
        borderColor: 'divider'
      }}
    >
      {activeTool === TOOLS.TEXT && (
        <Button
          variant="outlined"
          onClick={addText}
          sx={{
            textTransform: 'none'
          }}
        >
          Adicionar texto
        </Button>
      )}
    </Box>
  )
}

export default Toolbar