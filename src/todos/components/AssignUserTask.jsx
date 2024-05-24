import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { addUserTask } from '../../store/todos/todoSlice'

export const AssignUserTask = ({ index, user }) => {
  const dispatch = useDispatch()

  const addParticipantToTask = (id) => {
    console.log(id)
    dispatch(addUserTask({ index, id }))
  }
  return (
    <Button variant="text" onClick={() => addParticipantToTask(user.id)}>{user.displayName} - {user.email}</Button>
  )
}
