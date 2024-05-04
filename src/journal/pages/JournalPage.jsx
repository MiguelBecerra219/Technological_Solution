import { IconButton } from '@mui/material'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../views'
import { AddOutlined } from '@mui/icons-material'
import { startNewNote } from '../../store/journal/thunks'
import { useDispatch, useSelector } from 'react-redux'
// pagina principla de las anotaciones
export const JournalPage = () => {
  const dispatch = useDispatch()
  const { isSaving, active } = useSelector(state => state.journal)
  // Disparados de crear una nota nueva
  const onClickNewNote = () => {
    dispatch(startNewNote())
  }

  return (
    <JournalLayout>
      {/* Aqui se muestra una vista u otra dependiendo de si hay una nota seleccionada o no */}
      {
        active != null
          ? <NoteView />
          : <NothingSelectedView/>
      }
      {/* Boton para crear nueva nota */}
      <IconButton
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.7 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
        onClick={onClickNewNote}
        disabled={isSaving}
      >
        <AddOutlined sx={{ fontSize: 30 }}/>
      </IconButton>
    </JournalLayout>
  )
}
