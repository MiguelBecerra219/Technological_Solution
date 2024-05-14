import { doc, setDoc, collection } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../fireBase/config'
import { addNewEmptyGroup, savingNewGroup, setActiveGroup, setGroups } from './todoSlice'
import { loadGroups } from '../../helpers'

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

    const newDoc = doc(collection(FirebaseDB, 'Groups/'))
    const setDocResp = await setDoc(newDoc, groupNew)
    console.log(setDocResp)

    groupNew.id = newDoc.id
    const groupUser = {
      groupId: newDoc.id
    }
    // Guardar el id del frupo para cargarlo
    const newDoc2 = doc(collection(FirebaseDB, `${uid}/groups/todos`))
    await setDoc(newDoc2, groupUser)

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
