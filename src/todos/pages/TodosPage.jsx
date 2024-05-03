import { IconButton } from '@mui/material'
import { TodosLayout } from '../layout/TodosLayout'
import { useDispatch, useSelector } from 'react-redux'
import { NothingSelectedTodoView } from '../views/NothingSelectedTodoView'
import { startNewGroup } from '../../store/todos/thunks'
import AddTaskIcon from '@mui/icons-material/AddTask'
import { GroupSelected } from '../views/GroupSelected'

export const TodosPage = () => {
  const dispatch = useDispatch()
  const { isTodoSaving, activeGroup } = useSelector(state => state.todos)

  const onClickNewGroup = () => {
    dispatch(startNewGroup())
  }
  return (
    <TodosLayout>
      {
        activeGroup != null
          ? <GroupSelected/>
          : <NothingSelectedTodoView/>
      }

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
        onClick={onClickNewGroup}
        disabled={isTodoSaving}
      >
        <AddTaskIcon sx={{ fontSize: 30 }}/>
      </IconButton>

    </TodosLayout>
  )
}
