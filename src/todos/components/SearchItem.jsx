import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { startAddNewParticipant } from '../../store/todos/thunks'

export const SearchItem = ({ index, user }) => {
  const dispatch = useDispatch()
  const groupId = useSelector(state => state.todos.activeGroup.id)
  const addNewParticipant = (id) => {
    dispatch(startAddNewParticipant(id, groupId))
  }
  return (
    <Button variant="text" onClick={() => addNewParticipant(user.id)}>{user.displayName} - {user.email}</Button>
  )
}
