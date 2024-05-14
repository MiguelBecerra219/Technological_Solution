import { Fade, Grid } from '@mui/material'

export const SelectNewParticipants = ({ display = 'none' }) => {
  const isVisible = display !== 'none'
  return (
    <Grid container sx={{ display: { display }, alignItems: 'center', justifyContent: 'center', width: '74vw', height: '50vh', paddingBottom: '50px' }}>
      <Fade in={isVisible} timeout={500}>
        <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60vw', height: '50vh', backgroundColor: 'black', opacity: isVisible ? 1 : 0, visibility: isVisible ? 'visible' : 'hidden', transition: 'opacity 0.3s ease, visibility 0.3s ease' }}>

        </Grid>
      </Fade>
    </Grid>
  )
}
