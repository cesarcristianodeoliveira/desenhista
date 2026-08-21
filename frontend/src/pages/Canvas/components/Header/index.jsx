import {
  ArrowBack
} from '@mui/icons-material'

import {
  Box,
  Button,
  IconButton,
  Typography
} from '@mui/material'

import {
  useNavigate
} from 'react-router-dom'

import {
  useEditor
} from '../../../../contexts/EditorContext'

function Header() {
  const navigate = useNavigate()

  const {
    currentPage,
    exportImage
  } = useEditor()

  return (
    <Box
      component="header"
      sx={{
        minHeight: 56,
        px: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: 1,
        borderColor: 'divider'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <IconButton
          onClick={() => {
            navigate('/')
          }}
          aria-label="Voltar"
        >
          <ArrowBack fontSize="small" />
        </IconButton>

        <Typography
          variant="body1"
          sx={{
            fontWeight: 600
          }}
        >
          {currentPage.name}
        </Typography>
      </Box>

      <Button
        disableElevation
        disableRipple
        variant="outlined"
        onClick={exportImage}
        sx={{
          textTransform: 'capitalize'
        }}
      >
        Baixar
      </Button>
    </Box>
  )
}

export default Header