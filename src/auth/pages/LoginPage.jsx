import { Google } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hook/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { startGoogleSingIn, startLoginWithEmailPassword } from '../../store/auth/'
import { useMemo } from 'react'

// Calores inciales del formulario de logueo
const formData = {
  email: '',
  password: ''
}

// Pagina de logueo, permitira a los usuarios loguearse por correo y contraseña o mediante cuenta de google
export const LoginPage = () => {
  // importamos el useDispatch para usar acciones de nuestro store de redux
  const dispatch = useDispatch()

  // Traemos los valores desde nuestro store para verificar si el usuario ya esta identificado o si ubo un error
  // Esto nos permitira mantener la autenticacion asi se recargue la pagina
  const { status, errorMessage } = useSelector(state => state.auth)

  // Usamos la funcion de manejo de formularios esta fue creada para el proyecto y se usara en varias ocaciones
  // Esta nos permitira manejar los cambios en los formularios
  const { email, password, onInputChange } = useForm(formData)

  // Memorisamos el estado de la autenticacion opara que no re renderizar si el status no cambia
  const isAuthenticate = useMemo(() => status === 'checking', [status])

  // Funcion de envio de formulario, esta dispara el thunk de autenticacion
  const onsubmit = (event) => {
    // Evitamos que se recargue la pagina
    event.preventDefault()
    // llamamos la accion de autentificacion esta esta en el thunk de auth
    // Si es correcto el logueo este dispara la accion de entrar en la web y amacena los datos de autenticacion en el store de redux
    dispatch(startLoginWithEmailPassword({ email, password }))
  }

  // Disparador de la utenticacion mediante cuenta de google
  const onGoogleSingIn = () => {
    // Hacemos dispatch del thunk, este dispara la ventana para seleccionar la cuenta de google y valida que salga bien la autentificacion
    dispatch(startGoogleSingIn())
  }

  // Renderizacion del componente
  return (
    <AuthLayout title='Login'>
      {/* Formulario de logueo */}
      <form onSubmit={onsubmit} className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>
          {/* Input de email */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField label='Correo' type='email' placeholder='correo@google.com' name='email' onChange={onInputChange} value={email} fullWidth/>
          </Grid>
          {/* Input de password */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField label='Contraseña' type='password' placeholder='******' name='password' onChange={onInputChange} value={password} fullWidth/>
          </Grid>
          {/* Este alert soplo se muestra en caso de que exista algun error en la auth para informar al usuario */}
          <Grid item xs={12} sx={{ mt: 3 }} display={errorMessage ? '' : 'none'}>
            <Alert severity='error'>
              {errorMessage}
            </Alert>
          </Grid>
          {/* Botones de acción */}
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            {/* Boton para sumint el formulario de autenticacion por correo y contraseña */}
            <Grid item xs={12} sm={6}>
              <Button type='submit' variant='contained' fullWidth disabled={isAuthenticate}>Login</Button>
            </Grid>
            {/* Boton para iniciar proceso de autentificacion por cuenta de google */}
            <Grid item xs={12} sm={6}>
              <Button onClick={onGoogleSingIn} variant='contained' fullWidth disabled={isAuthenticate}>
                <Google/>
                <Typography sx={{ ml: 1 }}/>
              </Button>
            </Grid>

          </Grid>
          {/* Link para cambio a la vista de registro */}
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
