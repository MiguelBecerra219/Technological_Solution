import { TurnedInNot } from '@mui/icons-material'
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

export const SideBar = ({ deawerWidth = 240 }) => {
  const { actionsdisplayName } = useSelector(state => state.auth)
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
          <Typography variant='h6' noWrap component='div'>{actionsdisplayName}</Typography>
        </Toolbar>
        <Divider/>

        <List>
          {
            ['Enero', 'Febrero', 'Marzo', 'Abril'].map(text => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TurnedInNot/>
                  </ListItemIcon>
                  <Grid container>
                    <ListItemText primary={text}/>
                    <ListItemText secondary={'Lorem ipsum dolor sit amet consectetur'}/>
                  </Grid>
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>
      </Drawer>
    </Box>
  )
}
