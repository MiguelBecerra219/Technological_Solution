import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import { Grid, Typography } from '@mui/material'

export const NothingSelectedTodoView = () => {
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
        <PlaylistAddCheckIcon sx={{ fontSize: 100, color: 'white' }}/>
      </Grid>

      <Grid item xs={12}>
        <Typography color='white' variant='h5'>Selecciona o crea un grupo de tareas</Typography>
      </Grid>

    </Grid>
  )
}
