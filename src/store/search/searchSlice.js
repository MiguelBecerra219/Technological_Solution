import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    usersList: [],
    isSaving: ''
  },
  reducers: {
    addUsers: (state, action) => {
      state.usersList = action.payload
    },
    clearUsers: (state) => {
      state.usersList = []
    }
  }
})

// Action creators are generated for each case reducer function
export const { addUsers, clearUsers } = searchSlice.actions
