import { createSlice } from '@reduxjs/toolkit'

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    isTodoSaving: false,
    messageSav: '',
    groups: [],
    activeGroup: {
      id: 'ABC',
      groupName: '',
      Description: '',
      todos: [],
      participantes: []
    }
  },
  reducers: {
    savingNewGroup: (state) => {
      state.isTodoSaving = true
    },
    addNewEmptyGroup: (state, action) => {
      state.groups.push(action.payload)
      state.isTodoSaving = false
    },
    setActiveGroup: (state, action) => {
      state.activeGroup = action.payload
    },
    setGroups: (state, action) => {

    },
    setSavingGroup: (state) => {

    },
    updateGroup: (state, action) => {

    },
    deleteGroupById: (state, action) => {

    }
  }
})

// Action creators are generated for each case reducer function
export const { savingNewGroup, addNewEmptyGroup, setActiveGroup, setGroups, setSavingGroup, updateGroup, deleteGroupById } = todosSlice.actions
