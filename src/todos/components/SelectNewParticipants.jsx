import { Fade, Grid, TextField, Typography } from '@mui/material'

import { useSelector } from 'react-redux'
import { useState } from 'react'
import { SearchItem } from './SearchItem'

const filterUsersByEmail = (usersList, searchString) => {
  if (!usersList) return []
  const filteredUsers = usersList.filter(user =>
    user.email.toLowerCase().includes(searchString.toLowerCase())
  )
  return filteredUsers
}

export const SelectNewParticipants = ({ display = 'none' }) => {
  const [filterUsers, setfilterUsers] = useState([])

  const { usersList } = useSelector(state => state.users)

  const serching = (event) => {
    setfilterUsers([])
    if (event.target.value === '') {
      return
    }
    const searchString = event.target.value
    try {
      const filteredUsers = filterUsersByEmail(usersList, searchString)
      setfilterUsers(filteredUsers)
    } catch (error) {
      console.error('Error fetching or filtering users:', error)
    }
  }

  const isVisible = display !== 'none'
  return (
    <Grid container sx={{ display: { display }, alignItems: 'start', justifyContent: 'center', width: '74vw', height: '50vh', paddingBottom: '50px' }}>
      <Fade in={isVisible} timeout={500}>
        <Grid container sx={{ display: 'flex', alignItems: 'start', justifyContent: 'center', width: '60vw', height: '50vh', backgroundColor: '#d5d7d9 ', opacity: isVisible ? 1 : 0, visibility: isVisible ? 'visible' : 'hidden', transition: 'opacity 0.3s ease, visibility 0.3s ease' }}>
          <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography sx={{ marginTop: '20px', fontSize: '2.5vw' }}>Busqueda de usuarios</Typography>
            <TextField id="standard-basic" label="Email" onChange={serching} sx={{ width: '95%', marginTop: '20px' }}/>
          </Grid>
          <Grid containter sx={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', maxHeight: 'calc(40vh - 100px)', padding: '10px', width: '95%' }}>
            {
              filterUsers.map((user, index) => (
                <SearchItem key={index} index={index} user={user}/>
              ))
            }
          </Grid>
        </Grid>
      </Fade>
    </Grid>
  )
}
