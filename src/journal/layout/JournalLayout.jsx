import { Box, Toolbar } from '@mui/material'
import { NavBar, SideBar } from '../components'

const deawerWidth = 280

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }} className='animate__animated animate__fadeIn animate__faster'>

      <NavBar deawerWidth={deawerWidth}/>

      <SideBar deawerWidth={deawerWidth}/>

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
