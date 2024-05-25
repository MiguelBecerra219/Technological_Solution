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
      state.messageSav = ''
    },
    setGroups: (state, action) => {
      state.groups = action.payload
      state.messageSav = ''
    },
    setSavingGroup: (state) => {
      state.isTodoSaving = true
    },
    updateGroup: (state, action) => {
      state.isTodoSaving = false
      state.groups = state.groups.map(note => {
        if (note.id === action.payload.id) {
          return action.payload
        }
        return note
      })
      state.messageSav = `${action.payload.groupName}, Actualizado correctamente`
    },
    deleteGroupById: (state, action) => {
      state.activeGroup = null
      state.groups = state.groups.filter(group => group.id !== action.payload)
    },
    createNewTask: (state, action) => {
      state.activeGroup.tasks.push(action.payload)
    },
    deleteTask: (state, action) => {
      console.log(action.payload)
      const newTasks = state.activeGroup.tasks.filter((_, index) => index !== action.payload)
      state.activeGroup.tasks = newTasks
    },
    addNewParticipantActiveGroup: (state, action) => {
      console.log('Entre addNewParticipantActiveGroup')
      state.activeGroup.participants.push(action.payload)
    },
    addUserTask: (state, action) => {
      const index = action.payload.index
      const user = action.payload.id
      state.activeGroup.tasks[index].assignment = user
    },
    clearGroup: (state) => {
      state.isTodoSaving = false
      state.messageSav = ''
      state.groups = []
      state.activeGroup = null
    }
  }
})

// Action creators are generated for each case reducer function
export const { savingNewGroup, addNewEmptyGroup, setActiveGroup, setGroups, setSavingGroup, updateGroup, deleteGroupById, createNewTask, deleteTask, addNewParticipantActiveGroup, addUserTask, clearGroup } = todosSlice.actions
