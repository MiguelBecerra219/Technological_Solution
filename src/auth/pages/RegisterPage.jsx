import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hook/useForm'
import { useState } from 'react'
import { startCreatingUserWhitEmailPassword } from '../../store/auth/thunks'
import { useDispatch, useSelector } from 'react-redux'

// Esta es la pagina desde donde se podran registrar los usuarios mediante correo y contraseña
// valore iniciales del form
const formData = {
  email: '',
  password: '',
  displayName: ''
}

// Validaciones que se envian en el form, nos ayuidaran a validar la info e informar al usuario de que error cometio
const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe tener una arroba'],
  password: [(value) => value.length >= 6, 'El password debe de tener mas de 6 letras'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio.']
}

// Pagina de registro
export const RegisterPage = () => {
  // Traemos la informacion necesario para el login
  const dispatch = useDispatch()
  const [formSubmitted, setFormSubmitted] = useState(false)
  const { errorMessage } = useSelector(state => state.auth)

  // definimos el useForm con nuestros valores iniciales y validaciones
  const {
    displayName, email, password, onInputChange, formState,
    isFormValid, emailValid, passwordValid, displayNameValid
  } = useForm(formData, formValidations)

  // manejo de envio de formulario de registro
  const onSubmit = (event) => {
    event.preventDefault()
    setFormSubmitted(true)
    console.log(!isFormValid)
    if (!isFormValid) return
    dispatch(startCreatingUserWhitEmailPassword(formState))
  }

  // Renderizacion de componente
  return (
    <AuthLayout title='Register'>
      {/* Formulario de registro */}
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>
          {/* Input de nombre de usuario */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Nombre completo'
              type='name' placeholder='Tu nombre'
              fullWidth name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>
          {/* Input de email de usuario */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Correo'
              type='email'
              placeholder='correo@google.com'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>
          {/* Input de cotraseña de la cuenta */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Contraseña'
              type='password'
              placeholder='Contraseña'
              fullWidth name='password'
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>
          {/* Mensaje de error que se mostrara en caaso de que algo falle */}
          <Grid item xs={12} sx={{ mt: 3 }} display={errorMessage ? '' : 'none'}>
            <Alert severity='error'>
              {errorMessage}
            </Alert>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            {/* Boton de envio de foormulario */}
            <Grid item xs={12} sm={12}>
              <Button type='submint' variant='contained' fullWidth disabled={!isFormValid && formSubmitted}>Crear cuenta</Button>
            </Grid>
          </Grid>

          {/* Link para ir a la pagina de login */}
          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>
              Ingresar
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}
