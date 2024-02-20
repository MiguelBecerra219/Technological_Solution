import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
import { FirebaseAuth } from './config'

const googleProvider = new GoogleAuthProvider()

export const singInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider)
    // const credentials = GoogleAuthProvider.credentialFromResult(result) podemos ver todo lo que optenemos de firebase
    // console.log({ credentials })
    // const user = result.user podemos ver la informacion del usuario directamente
    // console.log(user)
    const { displayName, email, photoURL, uid } = result.user
    return {
      ok: true,
      // user info
      displayName,
      email,
      photoURL,
      uid
    }
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    return {
      ok: false,
      errorMessage,
      errorCode
    }
  }
}

export const registerUserWhitEmailPassword = async ({ email, password, displayName }) => {
  try {
    const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
    const { uid, photoURL } = resp.user
    updateProfile(FirebaseAuth.currentUser, { displayName })
    console.log(resp)
    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName
    }
  } catch (error) {
    return { ok: false, errorMessage: error.message }
  }
}

export const loginWithEmailPassword = async ({ email, password }) => {
  try {
    const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)

    const { uid, photoURL, displayName } = resp.user
    return {
      ok: true,
      uid,
      photoURL,
      displayName
    }
  } catch (error) {
    return { ok: false, errorMessage: error.message }
  }
}

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut()
}
