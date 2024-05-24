import { doc, setDoc, collection, getDoc, updateDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../fireBase/config'
import { addNewEmptyGroup, addNewParticipantActiveGroup, savingNewGroup, setActiveGroup, setGroups, setSavingGroup, updateGroup } from './todoSlice'
import { loadGroups } from '../../helpers'
import 'sweetalert2/dist/sweetalert2.css'

export const startNewGroup = () => {
  const fechaActual = new Date()
  return async (dispatch, getState) => {
    dispatch(savingNewGroup())
    const { uid } = getState().auth
    const groupNew = {
      groupName: 'Titulo',
      Description: 'Descripción',
      creator: uid,
      participants: [uid],
      tasks: [{
        description: 'Empieza a definir las tareas de tu equipo',
        finalizada: false,
        assignment: null,
        startDate: fechaActual.toISOString(),
        endDate: fechaActual.toISOString()
      }]
    }

    const newDoc = doc(collection(FirebaseDB, 'Groups'))
    const setDocResp = await setDoc(newDoc, groupNew)
    console.log(setDocResp)

    groupNew.id = newDoc.id

    // Guardar el id del grupo en la ruta ${uid}/groups/todos con el ID del grupo
    const userGroupDoc = doc(FirebaseDB, `${uid}/groups/todos/${newDoc.id}`)
    await setDoc(userGroupDoc, { groupId: newDoc.id })

    dispatch(addNewEmptyGroup(groupNew))
    dispatch(setActiveGroup(groupNew))
  }
}

export const startLoadingGroups = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth
    const groups = await loadGroups(uid)
    dispatch(setGroups(groups))
  }
}

export const startAddNewParticipant = (id, groupId) => {
  return async (dispatch, getState) => {
    try {
      // Obtener el estado actual del grupo
      const group = getState().todos.activeGroup

      // Verificar si el participante ya está en la lista local del grupo
      if (group.participants.includes(id)) {
        console.log('El participante ya está en el grupo')
        return // Salir de la función si el participante ya está en el grupo
      }

      // Obtener el documento del usuario en la colección de grupos
      const userGroupDoc = doc(FirebaseDB, `${id}/groups/todos/${groupId}`)

      // Verificar si el documento ya existe
      const docSnapshot = await getDoc(userGroupDoc)
      if (docSnapshot.exists()) {
        console.log('El participante ya está en el grupo')
        return // Salir de la función si el documento ya existe
      }

      // Obtener el documento del grupo desde Firestore
      const groupDoc = doc(FirebaseDB, `Groups/${groupId}`)
      const groupSnapshot = await getDoc(groupDoc)

      if (!groupSnapshot.exists()) {
        console.error('El grupo no existe')
        return
      }

      const groupData = groupSnapshot.data()
      const participants = groupData.participants || []

      // Verificar si el participante ya está en la lista
      if (participants.includes(id)) {
        console.log('El participante ya está en el grupo')
        return
      }

      // Añadir el nuevo participante a la lista
      const updatedParticipants = [...participants, id]

      // Actualizar Firestore con la nueva lista de participantes
      await updateDoc(groupDoc, {
        participants: updatedParticipants
      })

      // Agregar el nuevo participante al documento del usuario
      await setDoc(userGroupDoc, { groupId })

      console.log('Participante añadido al grupo')

      // Actualizacion de state
      dispatch(addNewParticipantActiveGroup(id))
    } catch (error) {
      console.error('Error al añadir participante al grupo:', error)
    }
  }
}

export const startGetUserById = (id) => {
  return async () => {
    const userDoc = await getDoc(doc(FirebaseDB, `users/${id}`))
    return userDoc.data()
  }
}

export const starteSavingGroup = () => {
  return async (dispatch, getState) => {
    dispatch(setSavingGroup())
    const activeGroup = getState().todos.activeGroup
    const groupToFireStore = { ...activeGroup }
    delete groupToFireStore.id
    const groupDoc = doc(FirebaseDB, `Groups/${activeGroup.id}`)
    await setDoc(groupDoc, groupToFireStore, { merge: true })
    dispatch(updateGroup(activeGroup))
  }
}
