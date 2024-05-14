import { createSlice } from '@reduxjs/toolkit'

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    isTodoSaving: false,
    messageSav: '',
    groups: [],
    activeGroup: null
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
      state.groups = action.payload
    },
    setSavingGroup: (state) => {

    },
    updateGroup: (state, action) => {

    },
    deleteGroupById: (state, action) => {

    },
    createNewTask: (state, action) => {
      state.activeGroup.tasks.push(action.payload)
    },
    deleteTask: (state, action) => {
      console.log(action.payload)
      const newTasks = state.activeGroup.tasks.filter((_, index) => index !== action.payload)
      state.activeGroup.tasks = newTasks
    }
  }
})

// Action creators are generated for each case reducer function
export const { savingNewGroup, addNewEmptyGroup, setActiveGroup, setGroups, setSavingGroup, updateGroup, deleteGroupById, createNewTask, deleteTask } = todosSlice.actions
