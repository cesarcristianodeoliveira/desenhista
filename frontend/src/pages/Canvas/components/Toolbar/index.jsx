import {
  NearMe,
  TextFields,
  Image
} from '@mui/icons-material'

import {
  Box,
  Tab,
  Tabs,
  Tooltip
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
    setTool
  } = useEditor()

  const tools = [
    {
      label: 'Selecionar',
      value: TOOLS.SELECT,
      icon: (
        <NearMe
          sx={{
            transform: 'scaleX(-1)'
          }}
        />
      )
    },
    {
      label: 'Texto',
      value: TOOLS.TEXT,
      icon: <TextFields />
    },
    {
      label: 'Imagem',
      value: TOOLS.IMAGE,
      icon: <Image />
    }
  ]

  const handleChange = (
    event,
    value
  ) => {
    setTool(value)
  }

  return (
    <Box
      component="section"
      sx={{
        minHeight: 48,
        display: 'flex',
        alignItems: 'center',
        borderBottom: 1,
        borderColor: 'divider'
      }}
    >
      <Tabs
        value={activeTool}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        aria-label="Ferramentas do editor"
        sx={{
          minHeight: 48
        }}
      >
        {tools.map((tool) => (
          <Tab
            key={tool.value}
            value={tool.value}
            icon={
              <Tooltip
                title={tool.label}
                placement="bottom"
              >
                <Box
                  component="span"
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {tool.icon}
                </Box>
              </Tooltip>
            }
            aria-label={tool.label}
            sx={{
              minWidth: 48,
              width: 48,
              minHeight: 48,
              height: 48,
              p: 0
            }}
          />
        ))}
      </Tabs>
    </Box>
  )
}

export default Toolbar