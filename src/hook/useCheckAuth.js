import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FirebaseAuth } from '../fireBase/config'
import { login, logout } from '../store/auth'
import { startLoadingNotes } from '../store/journal/thunks'
import { startLoadingGroups } from '../store/todos/thunks'
// Hook para checkear que el usuario esta autenticado
// si lo esta este hook cargara sus notas y sus grupos llamando los thunks respectivo
export const useCheckAuth = () => {
  const { status } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  // UseEfecct que solo se ejecuta una ves al autenticar el usuario
  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout())
      const { uid, email, displayName, photoURL } = user
      // se hace el logueo y se cargan notas y grupos de tareas
      dispatch(login({ uid, email, displayName, photoURL }))
      dispatch(startLoadingNotes())
      dispatch(startLoadingGroups())
    })
  }, [])
  return status
}
