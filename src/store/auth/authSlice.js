import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking', // not-authenticated authenticated checking
    uid: null,
    email: null,
    actionsdisplayName: null,
    photoURL: null,
    errorMessage: null
  },
  reducers: {
    login: (state, action) => {
      state.status = 'authenticated'
      const { displayName, email, photoURL, uid } = action.payload
      state.uid = uid
      state.actionsdisplayName = displayName
      state.email = email
      state.photoURL = photoURL
      state.errorMessage = null
    },
    logout: (state, { payload = null }) => {
      state.status = 'not-authenticated'
      state.uid = null
      state.email = null
      state.actionsdisplayName = null
      state.photoURL = null
      state.errorMessage = payload
    },
    checkingCredentials: (state) => {
      state.status = 'checking'
    }
  }
})

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions
