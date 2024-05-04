import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { blueTheme } from './blueTheme'
// Aplicacion principla para dar acceso a tod a la aplicacion al tema de material IU
export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={ blueTheme }>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
