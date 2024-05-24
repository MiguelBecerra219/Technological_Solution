import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { journalSlice } from './journal'
import { todosSlice } from './todos/todoSlice'
import { searchSlice } from './search/searchSlice'

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    journal: journalSlice.reducer,
    todos: todosSlice.reducer,
    users: searchSlice.reducer
  }
})
