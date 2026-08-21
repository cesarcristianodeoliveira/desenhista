import {
  createTheme
} from '@mui/material/styles'

import {
  grey
} from '@mui/material/colors'

const theme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: grey[900]
    },

    background: {
      default: grey[50],
      paper: grey[50]
    },

    text: {
      primary: grey[900],
      secondary: grey[600]
    },

    divider: grey[300]
  },

  shape: {
    borderRadius: 0
  }
})

export default theme