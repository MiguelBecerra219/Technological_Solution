// subir un archivo a claudinary
// claudinary es el servicio de almacenamiento de imagenes usado en el proyecto
export const fileUpload = async (file) => {
  // Validamos que tengamos archivo
  if (!file) throw new Error('No tenemos ningun archivo a subir')
  const cloudUrl = 'https://api.cloudinary.com/v1_1/dq8zzs3jd/upload'
  // damos forma al archivo que subiremos
  const formData = new FormData()
  formData.append('upload_preset', 'react-journal')
  formData.append('file', file)
  // Intentamos subir el archivo
  try {
    const resp = await fetch(cloudUrl, {
      method: 'POST',
      body: formData
    })
    // si existe algun error lo mostramos
    if (!resp.ok) throw new Error('No se pudo subir la imagen')
    // Epasamos la respuesta a json
    const cloudResp = await resp.json()
    // retornamos la url para que pueda ser almacenada en la base de datos
    return cloudResp.secure_url
    // En caso de error devolvemos este y se muestra en consola
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}
