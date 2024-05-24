import { collection, getDocs } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../fireBase/config'
import { addUsers } from './searchSlice'

export const startSearchUser = (email) => {
  return async (dispatch) => {
    try {
      const usersCollection = collection(FirebaseDB, 'users')
      const usersSnapshot = await getDocs(usersCollection)
      const usersList = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      dispatch(addUsers(usersList))
      return usersList
    } catch (error) {
      console.error('Error fetching users:', error)
      return []
    }
  }
}
