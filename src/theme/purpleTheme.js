import { createTheme } from '@mui/material'
import { red } from '@mui/material/colors'
// Tema de colores modaro
export const purpleTheme = createTheme({
  palette: {
    primary: {
      main: '#262254'
    },
    secondary: {
      main: '#543884'
    },
    error: {
      main: red.A400
    }
  }
})
