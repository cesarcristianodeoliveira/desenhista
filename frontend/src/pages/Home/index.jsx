import {
  Palette
} from '@mui/icons-material'

import {
  Box,
  CardActionArea,
  Grid,
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
      <Grid
        container
        sx={{
          flex: 1,
          alignContent: 'flex-start',
          gap: 1,
          p: 2
        }}
      >
        <Grid
          size={{
            xs: 3,
            sm: 3,
            md: 2,
            lg: 1
          }}
        >
          <CardActionArea
            component={Link}
            to="/canvas"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              p: 2,
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
              sx={{
                lineHeight: 1
              }}
            >
              Canvas
            </Typography>
          </CardActionArea>
        </Grid>
      </Grid>

      <BottomNav />
    </Box>
  )
}

export default Home