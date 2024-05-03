import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useMemo } from 'react'

export const SideBarTodosItem = ({ title, body, id, date, todos = [] }) => {
  const newTitle = useMemo(() => {
    return title.length > 17 ? title.subString(0, 17) + '...' : title
  }, [title])

  const selectTodo = () => {
    console.log('Todo Select')
  }

  return (
    <ListItem disablePadding >
    <ListItemButton onClick={selectTodo}>
      <ListItemIcon>
        <ChecklistOutlinedIcon/>
      </ListItemIcon>
      <Grid container>
        <ListItemText primary={newTitle}/>
        <ListItemText secondary={body}/>
      </Grid>
    </ListItemButton>
  </ListItem>
  )
}
