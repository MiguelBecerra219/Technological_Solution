import NotesIcon from '@mui/icons-material/Notes'
import { Grid, Typography } from '@mui/material'
// Esta vista se renderiza cuando no hay niguna nota seleccionada,
// simplemente indica que no hay nada seleccioando
export const NothingSelectedView = () => {
  return (
    <Grid
    container
    spacing={0}
    direction='column'
    alignItems='center'
    justifyContent='center'
    sx={
      {
        minHeight: 'calc(100vh - 110px)',
        backgroundColor: 'primary.main',
        borderRadius: 3
      }
    }>

      <Grid item xs={12}>
        <NotesIcon sx={{ fontSize: 100, color: 'white' }}/>
      </Grid>

      <Grid item xs={12}>
        <Typography color='white' variant='h5'>Selecciona o crea una anotación</Typography>
      </Grid>

    </Grid>
  )
}
