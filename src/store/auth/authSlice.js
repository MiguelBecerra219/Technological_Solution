import { createSlice } from '@reduxjs/toolkit'
// Este el elslice de auth
// Aqui se almacena toda la informacion relacionada a la autentificacion
// tamnien estan las acciones sincronas para modificar todo lo relacionado a la autentificacion
export const authSlice = createSlice({
  // Definicion de la estructura de que se almacenara relacionado a la autentificacion
  name: 'auth',
  initialState: {
    status: 'checking', // not-authenticated authenticated checking
    uid: null,
    email: null,
    actionsdisplayName: null,
    photoURL: null,
    errorMessage: null
  },
  // Estas son las acciones que realizaremos en la autentificacion
  reducers: {
    // Logueo de un usuarrio
    login: (state, action) => {
      state.status = 'authenticated'
      const { displayName, email, photoURL, uid } = action.payload
      state.uid = uid
      state.actionsdisplayName = displayName
      state.email = email
      state.photoURL = photoURL
      state.errorMessage = null
    },
    // logout de un usuario
    logout: (state, { payload = null }) => {
      state.status = 'not-authenticated'
      state.uid = null
      state.email = null
      state.actionsdisplayName = null
      state.photoURL = null
      state.errorMessage = payload
    },
    // Checkeo de validez de credenciales
    checkingCredentials: (state) => {
      state.status = 'checking'
    }
  }
})

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions
