import { CircularProgress, Grid } from '@mui/material'
// Este componente se mostrara cuando la pagina esta haciendo cargas para evitar que se vea en blanco
// Es simplemente una rueda de carga con un fonde del color del tema
export const CheckingAuth = () => {
  return (
    <>
      <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={ { minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
      >

        <Grid container
          direction='row'
          justifyContent='center'
        >
          <CircularProgress color='warning'/>
        </Grid>

      </Grid>
    </>
  )
}
