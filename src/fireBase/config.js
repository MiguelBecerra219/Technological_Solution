// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Configuracion de conexion a la base de datos

// Configuracion de la conexion con firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBW3Ihsi4BdTWEtnRPxV5aD9d4ojkrZz2Q',
  authDomain: 'journalapp-a57ea.firebaseapp.com',
  projectId: 'journalapp-a57ea',
  storageBucket: 'journalapp-a57ea.appspot.com',
  messagingSenderId: '55807769158',
  appId: '1:55807769158:web:3525cf3d22d54bf6eb6847'
}

// Inicializacion de firebase
export const FirebaseApp = initializeApp(firebaseConfig)
export const FirebaseAuth = getAuth(FirebaseApp) // funcionalidades de autenticacion
export const FirebaseDB = getFirestore(FirebaseApp) // funcionalidades de datos
