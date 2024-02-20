import { IconButton } from '@mui/material'
import { JournalLayout } from '../layout/JournalLayout'
import { NothingSelectedView } from '../views'
import { AddOutlined } from '@mui/icons-material'

export const JournalPage = () => {
  return (
    <JournalLayout>

      <NothingSelectedView/>
      {/* nada seleccionado */ }
      {/* <NoteView /> */}

      <IconButton
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.7 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }}/>
      </IconButton>
    </JournalLayout>
  )
}
