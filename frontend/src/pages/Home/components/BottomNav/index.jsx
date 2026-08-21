import {
  Box,
  Typography
} from '@mui/material'

function BottomNav() {
  return (
    <Box
      component="nav"
      sx={{
        minHeight: 56,
        p: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: 1,
        borderColor: 'divider'
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontWeight: 600,
          lineHeight: 1
        }}
      >
        Desenhista
      </Typography>

      <Typography
        variant="body2"
        color="textSecondary"
        sx={{
          lineHeight: 1
        }}
      >
        0.0.1
      </Typography>
    </Box>
  )
}

export default BottomNav