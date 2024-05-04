import { Grid, Typography } from '@mui/material'
// Fondo para las pages de login y registro, aplica el color del tema al fondo y pone el titulo de la pagina sobre el form
export const AuthLayout = ({ children, title = '' }) => {
  return (
    // Contenedor principal este ocupa toda la pantalla y da el color de fondo
    <Grid
    container
    spacing={0}
    direction='column'
    alignItems='center'
    justifyContent='center'
    sx={
      {
        minHeight: '100vh',
        backgroundColor: 'primary.main',
        padding: 4
      }
    }>
      {/* Contenedor donde se renderizara la page que viene como children */}
      <Grid item
        className='box-shadow'
        xs={3}
        sx={
          {
            backgroundColor: 'white',
            padding: 3,
            borderRadius: 2,
            width: { sm: 450 }
          }
      }>
        {/* Titulo de la pagina */}
        <Typography variant='h5' sx={{ mb: 1 }}>{title}</Typography>
        {/* Page ya sea la de login o registro */}
        {children}
      </Grid>

    </Grid>
  )
}
