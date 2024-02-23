import { collection, getDocs } from 'firebase/firestore/lite'
import { FirebaseDB } from '../fireBase/config'

export const loadNotes = async (uid) => {
  if (!uid) throw new Error('El UID del usuario no existe')
  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`)
  const docs = await getDocs(collectionRef) // Traemos las referencias a los documentos
  const notes = []
  docs.forEach(doc => {
    notes.push({ id: doc.id, ...doc.data() })
  })
  return notes
}
