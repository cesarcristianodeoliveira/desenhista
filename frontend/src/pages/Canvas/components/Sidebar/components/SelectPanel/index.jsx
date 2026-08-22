import {
  AlignHorizontalLeft,
  AlignHorizontalCenter,
  AlignHorizontalRight,
  AlignVerticalTop,
  VerticalAlignCenter,
  AlignVerticalBottom
} from '@mui/icons-material'

import {
  Box,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material'

import {
  useEditor
} from '../../../../../../contexts/EditorContext'

function SelectPanel() {
  const {
    selection,
    alignObjectLeft,
    alignObjectCenterHorizontal,
    alignObjectRight,
    alignObjectTop,
    alignObjectCenterVertical,
    alignObjectBottom
  } = useEditor()

  const hasSelection =
    selection.length > 0

  const alignmentActions = [
    {
      label: 'Alinhar à esquerda',
      icon: <AlignHorizontalLeft />,
      onClick: alignObjectLeft
    },
    {
      label: 'Centralizar horizontalmente',
      icon: <AlignHorizontalCenter />,
      onClick: alignObjectCenterHorizontal
    },
    {
      label: 'Alinhar à direita',
      icon: <AlignHorizontalRight />,
      onClick: alignObjectRight
    },
    {
      label: 'Alinhar ao topo',
      icon: <AlignVerticalTop />,
      onClick: alignObjectTop
    },
    {
      label: 'Centralizar verticalmente',
      icon: <VerticalAlignCenter />,
      onClick: alignObjectCenterVertical
    },
    {
      label: 'Alinhar embaixo',
      icon: <AlignVerticalBottom />,
      onClick: alignObjectBottom
    }
  ]

  return (
    <Box
      sx={{
        p: 2
      }}
    >
      <Typography
        variant="subtitle1"
        fontWeight={600}
        sx={{
          mb: 2
        }}
      >
        Selecionar
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(3, 1fr)',
          gap: 1
        }}
      >
        {alignmentActions.map((action) => (
          <Tooltip
            key={action.label}
            title={action.label}
            placement="right"
          >
            <span>
              <IconButton
                disabled={!hasSelection}
                onClick={action.onClick}
                aria-label={action.label}
              >
                {action.icon}
              </IconButton>
            </span>
          </Tooltip>
        ))}
      </Box>
    </Box>
  )
}

export default SelectPanel