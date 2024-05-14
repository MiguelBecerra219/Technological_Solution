import { Button, ButtonGroup, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

export const TaskItem = ({ onInputChange, onDeleteTask, isTodoSaving = false, task = {}, onInputChangeTask, index }) => {
  return (
    <Grid container sx={{ m: '10px', border: '1px solid #000', mb: '15px' }} justifyContent='space-around' display='flex' flexDirection='column'>
      <Grid sx={{ margin: '10px', display: 'flex', justifyContent: 'center', mt: '20px', alignContent: 'center', alignItems: 'center' }}>
        <FormControlLabel color="primary" name='finalizada' control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 50, alignSelf: 'center', display: 'flex' } }}/> } checked={task.finalizada} onChange={(event) => onInputChangeTask(event, index)} />
        <TextField
          type="text"
          variant="filled"
          placeholder="Describa la tarea"
          label="Descripción de la tarea"
          sx={{ border: 'none', mb: 1, width: '95%' }}
          value={task.description}
          name='description'
          onChange={(event) => onInputChangeTask(event, index)}
        />
      </Grid>

      <Grid sx={{ display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'space-around', mb: '10px' }}>
        {/* Grupo de botones para eliminar y asignar un responsable */}
        <ButtonGroup orientation="horizontal" sx={{ padding: '10px' }}>
          {/* Boton para eliminar la tarea */}
          <Button onClick={(event) => onDeleteTask(event, index)} color="primary" sx={{ padding: 1, width: '10vw', fontSize: '80%' }} disabled={isTodoSaving}>
            <DeleteForeverIcon sx={{ fontSize: '1vw', mr: 1, color: 'red' }} />
            Eliminar
          </Button>
          {/* Boton para asginar un responsable a la tarea */}
          <Button onClick={onDeleteTask} color="primary" sx={{ padding: 1, width: '10vw', fontSize: '80%' }} disabled={isTodoSaving}>
            <GroupAddIcon sx={{ fontSize: '1vw', mr: 1 }} />
            Asignar
          </Button>
        </ButtonGroup>
        <form>
          <TextField
            id="date"
            label="Fecha limite"
            type="date"
            defaultValue="2017-05-24"
            name='endDate'
            onChange={(event) => onInputChangeTask(event, index)}
            InputLabelProps={{
              shrink: true
            }}
          />
        </form>
      </Grid>

    </Grid>
  )
}
