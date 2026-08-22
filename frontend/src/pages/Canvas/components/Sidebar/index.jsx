import {
  Box
} from '@mui/material'

import {
  TOOLS
} from '../../../../constants/tools'

import {
  useEditor
} from '../../../../contexts/EditorContext'

import SelectPanel from './components/SelectPanel'
import TextPanel from './components/TextPanel'

function Sidebar() {
  const {
    activeTool
  } = useEditor()

  const renderContent = () => {
    switch (activeTool) {
      case TOOLS.TEXT:
        return <TextPanel />

      case TOOLS.IMAGE:
        return (
          <Box>
            Imagem
          </Box>
        )

      case TOOLS.SELECT:
      default:
        return <SelectPanel />
    }
  }

  return (
    <Box
      component="aside"
      sx={{
        width: '100%',
        height: '100%',
        minWidth: 0,
        minHeight: 0,
        overflow: 'auto',
        borderRight: 1,
        borderColor: 'divider'
      }}
    >
      {renderContent()}
    </Box>
  )
}

export default Sidebar