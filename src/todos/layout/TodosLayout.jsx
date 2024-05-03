import { Box, Toolbar } from '@mui/material'
import { SideBarTodos } from '../components/SideBarTodos'
import { NavBarTodos } from '../components/NavbarTodos'

const deawerWidth = 280

export const TodosLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }} className='animate__animated animate__fadeIn animate__faster'>

      <NavBarTodos deawerWidth={deawerWidth}/>

      <SideBarTodos deawerWidth={deawerWidth}/>

      <Box
        component={'main'}
        sx={{ flexGrow: 1, p: 2 }}
      >
        <Toolbar/>
        {children}
      </Box>
    </Box>
  )
}
