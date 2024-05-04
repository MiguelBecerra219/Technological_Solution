import { Grid, ImageList, ImageListItem } from '@mui/material'
// Componente de galeria para mostrar las imagenes en las notas
export const ImageGallery = ({ images = [] }) => {
  return (
    // contenedor principal
    <Grid container justifyContent='center' sx={{ width: '100%' }}>
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {/* Mapeo de cada una de las url para generar un img de cada imagem */}
        {images.map((image) => (
          <ImageListItem key={image}>
            <img
              srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${image}?w=164&h=164&fit=crop&auto=format`}
              alt={'imagen de la nota'}
              loading="lazy"
              />
          </ImageListItem>
        ))}
      </ImageList>
    </Grid>
  )
}
