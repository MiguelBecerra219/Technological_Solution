import { SaveOutlined } from '@mui/icons-material'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import { Button, Grid, TextField, Typography } from '@mui/material'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hook/useForm'
import { TaskItem } from '../components/TaskItem'
import { createNewTask, deleteTask, setActiveGroup } from '../../store/todos/todoSlice'
import { useEffect, useState } from 'react'
import { SelectNewParticipants } from '../components/SelectNewParticipants'
import { startSearchUser } from '../../store/search/thunks'
import { startDeletingGroup, starteSavingGroup } from '../../store/todos/thunks'
import Swal from 'sweetalert2'

export const GroupSelected = () => {
  const { activeGroup, isTodoSaving, messageSav } = useSelector(state => state.todos)
  const [displaySelect, setdisplaySelect] = useState('none')
  const dispatch = useDispatch()
  const { groupName, Description, tasks, onInputChange, onInputChangeTask, formState } = useForm(activeGroup)

  const onSaveGroup = () => {
    dispatch(starteSavingGroup())
  }

  const onDeleteTask = (event, index) => {
    dispatch(deleteTask(index))
  }

  const onSelectNewParticipants = () => {
    if (displaySelect === 'none') {
      setdisplaySelect('flex')
    } else {
      setdisplaySelect('none')
    }
  }

  const onCreateNewTask = () => {
    const fechaActual = new Date()
    const newTask = {
      description: 'Descripcion de la tarea',
      finalizada: false,
      assignment: null,
      startDate: fechaActual.toISOString(),
      endDate: fechaActual.toISOString()
    }
    dispatch(createNewTask(newTask))
  }

  const onDeleteGroup = () => {
    dispatch(startDeletingGroup())
  }

  useEffect(() => {
    dispatch(setActiveGroup(formState))
  }, [formState])

  useEffect(() => {
    dispatch(startSearchUser())
  }, [])

  useEffect(() => {
    if (messageSav.length > 0) {
      Swal.fire('Grupo actualizado', messageSav, 'success')
    }
  }, [messageSav])

  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1, backgroundColor: '#edeff2' }} className='animate__animated animate__fadeIn animate__faster'>
        <Grid container justifyContent='space-around' sx={{ paddingBottom: '15px', paddingTop: '10px' }}>

          <Button onClick={onSaveGroup} color='primary' sx={{ padding: 2 }} disabled={isTodoSaving}>
            <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
            Guardar
          </Button>
          <Button onClick={onSelectNewParticipants} color='primary' sx={{ padding: 2 }} disabled={isTodoSaving}>
            <GroupAddIcon sx={{ fontSize: 30, mr: 1 }}/>
            Añadir integrante
          </Button>
          <SelectNewParticipants display={ displaySelect }/>
        </Grid>

        <Grid container >
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder='Ingrese un titulo'
          label='Titulo'
          sx={{ border: 'none', mb: 1 }}
          name='groupName'
          value={groupName}
          onChange={onInputChange}
        />
        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='¿Que sucedio en el dia de hoy?'
          minRows={5}
          name='Description'
          value={Description}
          onChange={onInputChange}
        />
      </Grid>

      <Grid container justifyContent='center'>
        <Typography fontSize={39} sx={{ pb: '15px' }}>Tareas</Typography>
      </Grid>

      {
        tasks.map((task, index) => (
          <TaskItem key={index} onInputChange={onInputChange} onDeleteTask={onDeleteTask} isTodoSaving={isTodoSaving} task={task} onInputChangeTask={onInputChangeTask} index={index} />
        ))
      }
      <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
        <Button onClick={onCreateNewTask} color='primary' sx={{ padding: 2, marginBottom: '15px' }} disabled={isTodoSaving} alignItems='center' justifyContent='center'>
            <ControlPointIcon sx={{ fontSize: 30, mr: 1 }}/>
            Añadir Tarea
        </Button>
        <Button onClick={onDeleteGroup} color='primary' sx={{ padding: 2, color: 'red', border: '1px solid red', margin: '10px' }} disabled={isTodoSaving} alignItems='center' justifyContent='center'>
            <DeleteForeverIcon sx={{ fontSize: 30, mr: 1 }}/>
            Eliminar grupo
        </Button>
      </Grid>

    </Grid>

  )
}
