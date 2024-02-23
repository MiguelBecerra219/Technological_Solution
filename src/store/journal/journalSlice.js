import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null
    // Esta es la firma que tendra una nota
    // active: {
    //   id: '',
    //   title: '',
    //   body: '',
    //   date: 123456,
    //   imageUrls: [] // https://
    // }
  },
  reducers: {
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload)
      state.isSaving = false
    },
    savingNewNote: (state) => {
      state.isSaving = true
    },
    setActiveNote: (state, action) => {
      state.active = action.payload
      state.messageSaved = ''
    },
    setNotes: (state, action) => {
      state.notes = action.payload
    },
    setSaving: (state) => {
      state.isSaving = true
      // TODO: mensaje de error
    },
    updateNote: (state, action) => {
      state.isSaving = false
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) return action.payload
        return note
      })
      state.messageSaved = `${action.payload.title}, actualizada correctamente`
    },
    deleteNoteById: (state, action) => {
      state.active = null
      const newNotes = state.notes.filter(note => note.id !== action.payload)
      state.notes = newNotes
    },
    setPhotosToAvtiveNote: (state, action) => {
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload]
      state.isSaving = false
    },
    clearNoteLogout: (state) => {
      state.isSaving = false
      state.messageSaved = ''
      state.notes = []
      state.active = null
    }
  }
})

// Action creators are generated for each case reducer function
export const { addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById, savingNewNote, setPhotosToAvtiveNote, clearNoteLogout } = journalSlice.actions
