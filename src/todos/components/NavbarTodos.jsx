import { LogoutOutlined, MenuOutlined } from '@mui/icons-material'
import { AppBar, Grid, IconButton, Link, Toolbar, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { startLogout } from '../../store/auth/thunks'

export const NavBarTodos = ({ deawerWidth = 240 }) => {
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(startLogout())
  }

  return (
    <AppBar
      position='fixed'
      sx={{
        width: { sm: `calc(100% - ${deawerWidth}px)` },
        ml: { sm: `${deawerWidth}px` }
      }}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          edge='start'
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuOutlined />
        </IconButton>

        <Grid container direction='row' justifyContent='space-between' alignItems='center'>
          <Link component={RouterLink} underline="none" color='inherit' to='/'>
            <Typography variant='h6' noWrap component='div'>Anotaciones</Typography>
          </Link>
          <Typography variant='h5' noWrap component='div'>Tareas</Typography>
          <IconButton onClick={onLogout} color='error'>
            <LogoutOutlined />
          </IconButton>

        </Grid>
      </Toolbar>
    </AppBar>
  )
}
