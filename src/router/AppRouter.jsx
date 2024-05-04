import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { CheckingAuth } from '../UI/'
import { useCheckAuth } from '../hook'
import { TodosRoutes } from '../todos/routes/TodosRoutes'
// Aplicacion principla de las rutas aqui es donde se define a que pagina entrara el usuario
export const AppRouter = () => {
  const status = useCheckAuth() // Custom hook que verifica la auth
  // si el usuario se esta autenticando se envia a esta pagina
  if (status === 'checking') {
    return <CheckingAuth />
  }
  return (
    // Rutas principales si esta autenticado se encvia a la pagina de anotaciones si no a la de autenticacion
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
