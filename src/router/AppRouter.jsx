import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { CheckingAuth } from '../UI/'
import { useCheckAuth } from '../hook'

export const AppRouter = () => {
  const status = useCheckAuth() // Custom hook que verifica la auth

  if (status === 'checking') {
    return <CheckingAuth />
  }
  return (
    <Routes>

      {
        status === 'authenticated'
          ? <Route path='/*' element={ <JournalRoutes /> }/>
          : <Route path='auth/*' element={ <AuthRoutes /> }/>
      }

      <Route path='/*' element={<Navigate to='/auth/login'/>}/>

    </Routes>
  )
}
