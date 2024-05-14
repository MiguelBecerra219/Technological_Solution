import { singInWithGoogle, registerUserWhitEmailPassword, loginWithEmailPassword, logoutFirebase } from '../../fireBase/providers'
import { clearNoteLogout, deleteNoteById, setPhotosToAvtiveNote, setSaving } from '../journal/journalSlice'
import { checkingCredentials, login, logout } from './authSlice'
import { fileUpload } from '../../helpers'
import { FirebaseDB } from '../../fireBase/config'
import { deleteDoc, doc } from 'firebase/firestore/lite'

// Aqui encontramos todas las acciones asincronas con respecto a la autentificacion

// validacion de usuario para loguear
export const chekingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
  }
}

// Inicio de logueo con cuenrta de google
export const startGoogleSingIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
    const { ok, displayName, email, photoURL, uid, errorMessage } = await singInWithGoogle()
    if (!ok) return dispatch(logout(errorMessage))
    dispatch(login({ ok, displayName, email, photoURL, uid }))
  }
}

// Creacion de cuenta con email y contraseña
export const startCreatingUserWhitEmailPassword = ({ email, password, displayName }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
    const { ok, uid, photoURL, errorMessage } = await registerUserWhitEmailPassword({ email, password, displayName })
    if (!ok) return dispatch(logout(errorMessage))
    dispatch(login({ uid, displayName, email, photoURL }))
  }
}

// logueo con email y contraseña
export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
    const { ok, uid, photoURL, displayName, errorMessage } = await loginWithEmailPassword({ email, password })
    if (!ok) return dispatch(logout(errorMessage))
    dispatch(login({ uid, displayName, email, photoURL }))
  }
}

// terminar una seccion
export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase()
    dispatch(clearNoteLogout())
    dispatch(logout())
  }
}

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving())
    const fileUploadPromises = []
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file))
    }
    const photosUrl = await Promise.all(fileUploadPromises)
    dispatch(setPhotosToAvtiveNote(photosUrl))
  }
}

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth
    const { active: note } = getState().journal

    const ref = `${uid}/journal/notes/${note.id}`
    const docRef = doc(FirebaseDB, ref)
    await deleteDoc(docRef)

    dispatch(deleteNoteById(note.id))
  }
}
