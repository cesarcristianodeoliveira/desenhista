import {
  Box,
  Button,
  Typography
} from '@mui/material'

import {
  useEditor
} from '../../../../../../contexts/EditorContext'

function TextPanel() {
  const {
    addText
  } = useEditor()

  const handleAddText = () => {
    addText()
  }

  return (
    <Box
      sx={{
        p: 2
      }}
    >
      <Typography
        variant="subtitle1"
        fontWeight={600}
      >
        Texto
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mt: 1,
          mb: 2
        }}
      >
        Adicione um novo texto ao canvas.
      </Typography>

      <Button
        fullWidth
        variant="contained"
        onClick={handleAddText}
        sx={{
          textTransform: 'none'
        }}
      >
        Adicionar texto
      </Button>
    </Box>
  )
}

export default TextPanel