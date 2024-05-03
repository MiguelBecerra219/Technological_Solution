import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { CheckingAuth } from '../UI/'
import { useCheckAuth } from '../hook'
import { TodosRoutes } from '../todos/routes/TodosRoutes'

export const AppRouter = () => {
  const status = useCheckAuth() // Custom hook que verifica la auth

  if (status === 'checking') {
    return <CheckingAuth />
  }
  return (
    <Routes>
      {status === 'authenticated' && (
        <>
          {/* Ruta para Journal cuando estás autenticado */}
          <Route path='/*' element={<JournalRoutes />} />
          {/* Ruta para Todos */}
          <Route path='/todos' element={<TodosRoutes />} />
        </>
      )}

      {/* Rutas de autenticación */}
      {status !== 'authenticated' && (
        <Route path='auth/*' element={<AuthRoutes />} />
      )}

      {/* Ruta predeterminada */}
      <Route path='/*' element={<Navigate to='/auth/login' />} />
    </Routes>
  )
}
