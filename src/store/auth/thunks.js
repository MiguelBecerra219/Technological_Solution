import { singInWithGoogle, registerUserWhitEmailPassword, loginWithEmailPassword, logoutFirebase } from '../../fireBase/providers'
import { clearNoteLogout, deleteNoteById, setPhotosToAvtiveNote, setSaving } from '../journal/journalSlice'
import { checkingCredentials, login, logout } from './authSlice'
import { fileUpload } from '../../helpers'
import { FirebaseDB } from '../../fireBase/config'
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore/lite'
import { clearGroup } from '../todos/todoSlice'

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

    try {
      // Verificar si el usuario ya existe en la colección "users"
      const userDocRef = doc(FirebaseDB, `users/${uid}`)
      const userDocSnap = await getDoc(userDocRef)

      if (!userDocSnap.exists()) {
        // Si el usuario no existe, crear un nuevo documento en "users"
        const userData = {
          displayName,
          email,
          createdAt: new Date().getTime()
        }
        await setDoc(userDocRef, userData)
      }

      dispatch(login({ ok, displayName, email, photoURL, uid }))
    } catch (error) {
      console.error('Error saving user data:', error)
      dispatch(logout('Error saving user data'))
    }
  }
}

// Creacion de cuenta con email y contraseña
export const startCreatingUserWhitEmailPassword = ({ email, password, displayName }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())

    const { ok, uid, photoURL, errorMessage } = await registerUserWhitEmailPassword({ email, password, displayName })

    if (!ok) return dispatch(logout(errorMessage))

    try {
      // Crear el documento del usuario en la colección "users"
      const userDocRef = doc(FirebaseDB, `users/${uid}`)
      const userData = {
        displayName,
        email,
        createdAt: new Date().getTime()
      }
      await setDoc(userDocRef, userData)

      dispatch(login({ uid, displayName, email, photoURL }))
    } catch (error) {
      console.error('Error saving user data:', error)
      dispatch(logout('Error saving user data'))
    }
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
    dispatch(clearGroup())
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
