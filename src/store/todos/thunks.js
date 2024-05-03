import { doc, setDoc, collection } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../fireBase/config'
import { addNewEmptyGroup, savingNewGroup, setActiveGroup } from './todoSlice'

export const startNewGroup = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewGroup())
    const { uid } = getState().auth
    const groupNew = {
      groupName: 'Titulo',
      Description: 'Descripción',
      creator: uid
    }

    const newDoc = doc(collection(FirebaseDB, 'Groups/'))
    const setDocResp = await setDoc(newDoc, groupNew)
    console.log(setDocResp)

    groupNew.id = newDoc.id

    dispatch(addNewEmptyGroup(groupNew))
    dispatch(setActiveGroup(groupNew))
  }
}
