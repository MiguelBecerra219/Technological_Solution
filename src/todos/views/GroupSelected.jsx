import { SaveOutlined } from '@mui/icons-material'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import { Button, Grid, TextField, Typography } from '@mui/material'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hook/useForm'
import { TaskItem } from '../components/TaskItem'
import { createNewTask, deleteTask, setActiveGroup } from '../../store/todos/todoSlice'
import { useEffect, useState } from 'react'
import { SelectNewParticipants } from '../components/SelectNewParticipants'

export const GroupSelected = () => {
  const { activeGroup } = useSelector(state => state.todos)
  const { isTodoSaving } = useSelector(state => state.todos)
  const [displaySelect, setdisplaySelect] = useState('none')
  const dispatch = useDispatch()
  const { groupName, Description, tasks, participantes, onInputChange, onInputChangeTask, formState } = useForm(activeGroup)

  const onSaveGroup = () => {

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

  useEffect(() => {
    dispatch(setActiveGroup(formState))
  }, [formState])

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

      <Button onClick={onCreateNewTask} color='primary' sx={{ padding: 2 }} disabled={isTodoSaving} alignItems='center' justifyContent='center'>
          <ControlPointIcon sx={{ fontSize: 30, mr: 1 }}/>
          Añadir Tarea
      </Button>

    </Grid>

  )
}
