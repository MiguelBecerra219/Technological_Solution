import { singInWithGoogle, registerUserWhitEmailPassword, loginWithEmailPassword, logoutFirebase } from '../../fireBase/providers'
import { checkingCredentials, login, logout } from './authSlice'

export const chekingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
  }
}

export const startGoogleSingIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
    const { ok, displayName, email, photoURL, uid, errorMessage } = await singInWithGoogle()
    if (!ok) return dispatch(logout(errorMessage))
    dispatch(login({ ok, displayName, email, photoURL, uid }))
  }
}

export const startCreatingUserWhitEmailPassword = ({ email, password, displayName }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
    const { ok, uid, photoURL, errorMessage } = await registerUserWhitEmailPassword({ email, password, displayName })
    if (!ok) return dispatch(logout(errorMessage))
    dispatch(login({ uid, displayName, email, photoURL }))
  }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
    const { ok, uid, photoURL, displayName, errorMessage } = await loginWithEmailPassword({ email, password })
    if (!ok) return dispatch(logout(errorMessage))
    dispatch(login({ uid, displayName, email, photoURL }))
  }
}

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase()
    dispatch(logout())
  }
}
