import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { SideBarItem } from './SideBarItem'

// Esta es la barra lateral donde se msotraran las notas del usuaio
export const SideBar = ({ deawerWidth = 240 }) => {
  const { actionsdisplayName } = useSelector(state => state.auth)
  const { notes } = useSelector(state => state.journal)
  return (
    <Box
      className='animate__animated animate__fadeIn animate__faster'
      component='nav'
      sx={{ width: { sm: deawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant='permanent' // temporary si tenemos la intencion de que se oculte
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: deawerWidth }
        }}
      >
        <Toolbar>
          <Typography ariant='h6' noWrap component='div'>{actionsdisplayName}</Typography>
        </Toolbar>
        <Divider/>
        {/* Recorremos las notas para cargaras en el componente */}
        <List>
          {
            notes.map(note => (
              <SideBarItem key={note.id} {...note} />
            ))
          }
        </List>
      </Drawer>
    </Box>
  )
}
