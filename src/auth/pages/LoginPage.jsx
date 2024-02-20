import { Google } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hook/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { startGoogleSingIn, startLoginWithEmailPassword } from '../../store/auth/'
import { useMemo } from 'react'

export const LoginPage = () => {
  const dispatch = useDispatch()
  const { status, errorMessage } = useSelector(state => state.auth)

  const { email, password, onInputChange } = useForm({
    email: '',
    password: ''
  })

  const isAuthenticate = useMemo(() => status === 'checking', [status])

  const onsubmit = (event) => {
    event.preventDefault()
    dispatch(startLoginWithEmailPassword({ email, password }))
  }

  const onGoogleSingIn = () => {
    dispatch(startGoogleSingIn())
  }

  return (
    <AuthLayout title='Login'>
      <form onSubmit={onsubmit} className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField label='Correo' type='email' placeholder='correo@google.com' name='email' onChange={onInputChange} value={email} fullWidth/>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField label='Contraseña' type='password' placeholder='******' name='password' onChange={onInputChange} value={password} fullWidth/>
          </Grid>

          <Grid item xs={12} sx={{ mt: 3 }} display={!!errorMessage ? '' : 'none'}>
            <Alert severity='error'>
              {errorMessage}
            </Alert>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

            <Grid item xs={12} sm={6}>
              <Button type='submit' variant='contained' fullWidth disabled={isAuthenticate}>Login</Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button onClick={onGoogleSingIn} variant='contained' fullWidth disabled={isAuthenticate}>
                <Google/>
                <Typography sx={{ ml: 1 }}/>
              </Button>
            </Grid>

          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color='inherit' to='/auth/register'>
              Crear una cuenta
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}
