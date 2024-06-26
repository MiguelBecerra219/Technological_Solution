import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import { ImageGallery } from '../components'
import { useForm } from '../../hook/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo, useRef } from 'react'
import { setActiveNote } from '../../store/journal/journalSlice'
import { startSavingNote } from '../../store/journal/thunks'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import { startDeletingNote, startUploadingFiles } from '../../store/auth/thunks'
// Componenete que permite ver editar y ahcer todas las acciones relacionadas con las ntoas
export const NoteView = () => {
  const dispatch = useDispatch()

  const { active: note, messageSaved, isSaving } = useSelector(state => state.journal)
  const { body, title, onInputChange, date, formState } = useForm(note)

  const dateString = useMemo(() => {
    const newDate = new Date(date)
    return newDate.toUTCString()
  }, [date])

  const onSaveNote = () => {
    dispatch(startSavingNote())
  }

  const onFileInputChange = ({ target }) => {
    // console.log(target.files) ver como recibimos los archivos
    if (target.files === 0) return
    dispatch(startUploadingFiles(target.files))
  }

  const onDelete = () => {
    dispatch(startDeletingNote())
  }

  const fileInputRef = useRef()

  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState])

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Nota actualizada', messageSaved, 'success')
    }
  }, [messageSaved])

  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }} className='animate__animated animate__fadeIn animate__faster'>
      <Grid item>
        <Typography fontSize={39} fontWeight='lIGTH'>{dateString}</Typography>
      </Grid>

      <Grid item>
        <input
          type="file"
          multiple
          onChange={onFileInputChange}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        <IconButton color='primary' disabled={isSaving} onClick={() => fileInputRef.current.click()}>
          <UploadOutlined />
        </IconButton>

        <Button onClick={onSaveNote} color='primary' sx={{ padding: 2 }} disabled={isSaving}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
          Guardar
        </Button>
      </Grid>

      <Grid container >
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder='Ingrese un titulo'
          label='Titulo'
          sx={{ border: 'none', mb: 1 }}
          name='title'
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='¿Que sucedio en el dia de hoy?'
          minRows={5}
          name='body'
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      <Grid containter justifyContent='end'>
        <Button
          onClick={onDelete}
          sx={{ mt: 2 }}
          color='error'
        >
          <DeleteOutline />
        </Button>
      </Grid>

      {/* Galeria de imagenes */}
      <ImageGallery images={note.imageUrls}/>

    </Grid>
  )
}
