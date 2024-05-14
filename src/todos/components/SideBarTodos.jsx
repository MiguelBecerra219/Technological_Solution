import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { SideBarTodosItem } from './SideBarTodosItem'

// const groupTodo = [
//   {
//     id: '456651',
//     title: 'Title',
//     body: 'Info',
//     todos: [
//       { id: 'adad', body: 'todo', Finished: false, assignments: ['id1', 'id2'] }
//     ]
//   }
// ]

export const SideBarTodos = ({ deawerWidth = 240 }) => {
  const { actionsdisplayName } = useSelector(state => state.auth)
  const { groups } = useSelector(state => state.todos)

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
          groups.map(groups => (
            <SideBarTodosItem key={groups.id} {...groups} />
          ))
        }
      </List>
    </Drawer>
  </Box>
  )
}
