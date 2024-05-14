import { useEffect, useMemo, useState } from 'react'
// Este hook nos permitira hacer un facil manejo de todos los formularios de la aplicacion, tambien nos permite hacer validaciones si se neceistan
export const useForm = (initialForm = {}, formValidations = {}) => {
  // estados del formulario para guardar la informacion, esta se guarada como obejto por lo que sirve opara cualquier formulario
  const [formState, setFormState] = useState(initialForm)
  const [formValidation, setFormValidation] = useState({})
  // si el estado del formulario cambia llamamos la validacion
  useEffect(() => {
    createValidators()
  }, [formState])
  // inicializacion de formulario con valiores inciiales
  useEffect(() => {
    setFormState(initialForm)
  }, [initialForm])
  // Validacion para el login y registro
  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false
    }
    return true
  }, [formValidation])
  // manejo de cambios en todos los valores de formulario
  // Este se maneja de una manera dinamica para que pueda usarse con formularios de cualqueir tamaño y con cualquier valor
  const onInputChange = ({ target }) => {
    const { name, value } = target
    setFormState({
      ...formState,
      [name]: value
    })
  }
  // Actualizacion de una tarea
  const onInputChangeTask = ({ target }, index) => {
    let { name, value } = target
    const updatedTasks = [...formState.tasks]
    if (name === 'finalizada') {
      value = !updatedTasks[index].finalizada
    }
    updatedTasks[index] = {
      ...updatedTasks[index],
      [name]: value
    }
    setFormState({
      ...formState,
      tasks: updatedTasks
    })
  }
  // Regresar el formulario a su formal inciial, esto por ejemplo para el caso de un envio de formulario
  const onResetForm = () => {
    setFormState(initialForm)
  }
  // Ejecucion de las validaciones que se proporcionen
  const createValidators = () => {
    const formCheckedValues = {}
    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage = 'Erores de validación'] = formValidations[formField]
      formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage
      setFormValidation(formCheckedValues)
    }
  }

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    ...formValidation,
    isFormValid,
    onInputChangeTask
  }
}
