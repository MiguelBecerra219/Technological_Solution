import { Button, ButtonGroup, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

export const TaskItem = ({ onInputChange, onSaveGroup, isTodoSaving = false }) => {
  return (
    <Grid container sx={{ mt: '10px', border: '1px solid #000', height: 95, mb: '15px' }} justifyContent='space-around'>
      <Grid item sx={{ alignSelf: 'center' }}>
        <FormControlLabel color="primary" control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 50 }, height: 50, width: 50 }}/> }/>
      </Grid>
      <Grid item sx={{ alignSelf: 'center', mr: '20px', width: '60vw' }}>
        <TextField
          type="text"
          variant="filled"
          placeholder="Describa la tarea"
          label="Descripción de la tarea"
          sx={{ border: 'none', mb: 1, width: '60vw' }}
          name="Title task"
          value=""
          onChange={onInputChange}
        />
      </Grid>
      <Grid item sx={{ alignSelf: 'center' }}>
        <ButtonGroup orientation="vertical">
          <Button onClick={onSaveGroup} color="primary" sx={{ padding: 1, width: '7vw' }} disabled={isTodoSaving}>
            <GroupAddIcon sx={{ fontSize: '1vw', mr: 1 }} />
            Asignar
          </Button>
          <Button onClick={onSaveGroup} color="primary" sx={{ padding: 1, width: '7vw' }} disabled={isTodoSaving}>
            <DeleteForeverIcon sx={{ fontSize: '1vw', mr: 1, color: 'red' }} />
            Eliminar
          </Button>
        </ButtonGroup>
      </Grid>
  </Grid>
  )
}
