import { collection, getDocs } from 'firebase/firestore/lite'
import { FirebaseDB } from '../fireBase/config'
// Este helper nos permitira cargar las notas para mostrarlas en el menu lateral y guardarlas en nuestro store
export const loadNotes = async (uid) => {
  // traemos todas las notas que el usuario tiene asignasdas
  // Este proceso se facilita ya que solo necesitamos iid del usairo, todas las notas se guardan dentro de una coleccion con su id/ journal/notes
  if (!uid) throw new Error('El UID del usuario no existe')
  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`)
  const docs = await getDocs(collectionRef) // Traemos las referencias a los documentos
  const notes = []
  docs.forEach(doc => {
    notes.push({ id: doc.id, ...doc.data() })
  })
  return notes
}
