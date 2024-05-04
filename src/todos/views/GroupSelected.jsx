import { SaveOutlined } from '@mui/icons-material'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import { Button, Grid, TextField, Typography } from '@mui/material'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { useSelector } from 'react-redux'
import { useForm } from '../../hook/useForm'
import { TaskItem } from '../components/TaskItem'

export const GroupSelected = () => {
  const { activeGroup } = useSelector(state => state.todos)
  const { isTodoSaving } = useSelector(state => state.todos)

  const { groupName, Description, todos, participantes, onInputChange } = useForm(activeGroup)
  const onSaveGroup = () => {

  }

  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1, backgroundColor: '#edeff2' }} className='animate__animated animate__fadeIn animate__faster'>
        <Grid container justifyContent='space-around'>

          <Button onClick={onSaveGroup} color='primary' sx={{ padding: 2 }} disabled={isTodoSaving}>
            <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
            Guardar
          </Button>
          <Button onClick={onSaveGroup} color='primary' sx={{ padding: 2 }} disabled={isTodoSaving}>
            <GroupAddIcon sx={{ fontSize: 30, mr: 1 }}/>
            Añadir integrante
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

      <TaskItem onInputChange={onInputChange} onSaveGroup={onSaveGroup} isTodoSaving={isTodoSaving} />
      <TaskItem onInputChange={onInputChange} onSaveGroup={onSaveGroup} isTodoSaving={isTodoSaving} />
      <TaskItem onInputChange={onInputChange} onSaveGroup={onSaveGroup} isTodoSaving={isTodoSaving} />

      <Button onClick={onSaveGroup} color='primary' sx={{ padding: 2 }} disabled={isTodoSaving} alignItems='center' justifyContent='center'>
            <ControlPointIcon sx={{ fontSize: 30, mr: 1 }}/>
            Añadir Tarea
          </Button>
    </Grid>

  )
}
