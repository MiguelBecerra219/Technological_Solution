import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveGroup } from '../../store/todos/todoSlice'

export const SideBarTodosItem = ({ groupName, Description, id, creator, tasks = [], participants = [] }) => {
  const dispatch = useDispatch()
  const group = { id, groupName, Description, creator, tasks, participants }
  const newTitle = useMemo(() => {
    return groupName.length > 17 ? groupName.substring(0, 17) + '...' : groupName
  }, [groupName])
  const newDesc = useMemo(() => {
    return Description.length > 20 ? Description.substring(0, 17) + '...' : Description
  }, [Description])

  const selectTodo = () => {
    dispatch(setActiveGroup(group))
  }

  return (
    <ListItem disablePadding >
    <ListItemButton onClick={selectTodo}>
      <ListItemIcon>
        <ChecklistOutlinedIcon/>
      </ListItemIcon>
      <Grid container>
        <ListItemText primary={newTitle}/>
        <ListItemText secondary={newDesc}/>
      </Grid>
    </ListItemButton>
  </ListItem>
  )
}
