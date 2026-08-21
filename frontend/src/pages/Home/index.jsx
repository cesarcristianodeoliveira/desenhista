import {
  Palette
} from '@mui/icons-material'

import {
  Box,
  Typography
} from '@mui/material'

import {
  Link
} from 'react-router-dom'

import BottomNav from './components/BottomNav'

function Home() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fill, minmax(120px, 120px))',
          alignContent: 'start',
          gap: 3,
          p: 3
        }}
      >
        <Box
          component={Link}
          to="/canvas"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            color: 'text.primary',
            textDecoration: 'none'
          }}
        >
          <Palette
            sx={{
              fontSize: 32
            }}
          />

          <Typography
            variant="body2"
            align="center"
          >
            Canvas
          </Typography>
        </Box>
      </Box>

      <BottomNav />
    </Box>
  )
}

export default Home