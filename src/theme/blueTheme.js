import { createTheme } from '@mui/material'
import { red } from '@mui/material/colors'
// Tema de colores aZil
export const blueTheme = createTheme({
  palette: {
    primary: {
      main: '#0A1828'
    },
    secondary: {
      main: '#07111c'
    },
    error: {
      main: red.A400
    }
  }
})
