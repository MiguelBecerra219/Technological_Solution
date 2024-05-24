import { Fade, Grid, Typography } from '@mui/material'
import { AssignUserTask } from './AssignUserTask'
import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../fireBase/config'

export const AssignTask = ({ userList = [], indexTask }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const userDetails = []
      for (const userId of userList) {
        const userDoc = await getDoc(doc(FirebaseDB, `users/${userId}`))
        if (userDoc.exists()) {
          userDetails.push({ id: userId, ...userDoc.data() })
        }
      }
      setUsers(userDetails)
    }

    fetchUsers()
  }, [userList])

  const isVisible = true
  return (
    <Grid container sx={{ display: 'flex', alignItems: 'start', justifyContent: 'center', width: '85vw', height: '50vh', paddingBottom: '50px' }}>
    <Fade in={isVisible} timeout={500}>
      <Grid container sx={{ display: 'flex', alignItems: 'start', justifyContent: 'center', width: '60vw', height: '50vh', backgroundColor: '#d5d7d9 ', opacity: isVisible ? 1 : 0, visibility: isVisible ? 'visible' : 'hidden', transition: 'opacity 0.3s ease, visibility 0.3s ease' }}>
        <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography sx={{ marginTop: '20px', fontSize: '2.5vw' }}>selección de responsable</Typography>
        </Grid>
        <Grid containter sx={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', maxHeight: 'calc(40vh - 100px)', padding: '10px', width: '95%' }}>
          {
            users.map((user, index) => (
              <AssignUserTask key={index} index={indexTask} user={user}/>
            ))
          }
        </Grid>
      </Grid>
    </Fade>
  </Grid>
  )
}
