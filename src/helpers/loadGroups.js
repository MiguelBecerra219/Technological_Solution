import { collection, getDocs } from 'firebase/firestore/lite'
import { FirebaseDB } from '../fireBase/config'
// este helper nos ayuda a cargar los grupos que un usuario tiene asignados para ponerlos en el menu lateral y guarddarlos en nuestro store
export const loadGroups = async (uid = '') => {
  // definicion de la la referencia donde buscaremos que grupos tiene el usuario asignados
  const collectionRef = collection(FirebaseDB, `${uid}/groups/todos`)
  const docs = await getDocs(collectionRef)
  const groupsIDs = []
  docs.forEach(doc => {
    groupsIDs.push(doc.data().groupId)
  })
  // Buscamos solo los gurpos que coincidan con los que el usuario tiene asgnados
  const filtered = (element) => {
    if (groupsIDs.includes(element.id)) {
      return true
    }
  }
  // Traemos los grupos que coincidan con los del usuario para mostrarlos
  const collectionRef2 = collection(FirebaseDB, 'Groups')
  const docs2 = await getDocs(collectionRef2)
  const groupsData = docs2.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  const groupsDataFiltered = groupsData.filter(filtered)
  return groupsDataFiltered
}
