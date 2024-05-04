import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveNote } from '../../store/journal/journalSlice'
// Item para cargar las anotaciones
export const SideBarItem = ({ title, body, id, date, imageUrls = [] }) => {
  // Informacion necesaria
  const note = { title, body, id, date, imageUrls }
  const dispatch = useDispatch()
  const newTitle = useMemo(() => {
    return title.length > 17 ? title.subString(0, 17) + '...' : title
  }, [title])
  // Accion al seleccionar el item para activar la ntoa
  const selectNote = () => {
    dispatch(setActiveNote(note))
  }
  return (
  <ListItem disablePadding >
    <ListItemButton onClick={selectNote}>
      <ListItemIcon>
        <TurnedInNot/>
      </ListItemIcon>
      <Grid container>
        <ListItemText primary={newTitle}/>
        <ListItemText secondary={body}/>
      </Grid>
    </ListItemButton>
  </ListItem>
  )
}
