import {
  useEffect,
  useRef,
  useState
} from 'react'

import {
  ArrowBack
} from '@mui/icons-material'

import {
  Box,
  Button,
  IconButton,
  TextField,
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

  const inputRef = useRef(null)

  const [
    isEditingName,
    setIsEditingName
  ] = useState(false)

  const [
    nameValue,
    setNameValue
  ] = useState('')

  const {
    documentName,
    setDocumentName,
    hasChanges,
    exportImage
  } = useEditor()

  useEffect(() => {
    if (
      isEditingName &&
      inputRef.current
    ) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [
    isEditingName
  ])

  const startEditingName = () => {
    setNameValue(documentName)

    setIsEditingName(true)
  }

  const saveDocumentName = () => {
    const nextName =
      nameValue.trim()

    setDocumentName(
      nextName || 'Sem título'
    )

    setIsEditingName(false)
  }

  const cancelEditingName = () => {
    setNameValue(documentName)

    setIsEditingName(false)
  }

  const handleNameKeyDown = (
    event
  ) => {
    if (event.key === 'Enter') {
      saveDocumentName()
    }

    if (event.key === 'Escape') {
      cancelEditingName()
    }
  }

  return (
    <Box
      component="header"
      sx={{
        minHeight: 56,
        px: 1,
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

        {isEditingName ? (
          <TextField
            inputRef={inputRef}
            value={nameValue}
            onChange={(event) => {
              setNameValue(
                event.target.value
              )
            }}
            onKeyDown={handleNameKeyDown}
            onBlur={saveDocumentName}
            size="small"
            variant="standard"
            inputProps={{
              'aria-label':
                'Nome do design'
            }}
            sx={{
              width: 240
            }}
          />
        ) : (
          <Typography
            variant="body1"
            onClick={startEditingName}
            sx={{
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {documentName}
          </Typography>
        )}
      </Box>

      <Button
        disableElevation
        disableRipple
        variant="outlined"
        disabled={!hasChanges}
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