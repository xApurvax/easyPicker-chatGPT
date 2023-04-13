type PixelCropProps = {
  height: number;
  width: number;
  x: number;
  y: number;
}


export const createImage = (url : string): Promise<HTMLImageElement> =>
new Promise((resolve, reject) => {
  const image = new Image()
  if (image) {
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = url
  }
})

export function getRadianAngle(degreeValue : number) {
  return (degreeValue * Math.PI) / 180
}

type RotateSize = {width : number, height: number, rotation: number}

export function rotateSize(image: RotateSize) {
  const {width , height , rotation} = image
  const rotRad = getRadianAngle(rotation)
  
  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  }
}

export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: PixelCropProps,
  rotation = 0,
  flip = { horizontal: false, vertical: false }
) {

  const image:any = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return null
  }

  const rotRad = getRadianAngle(rotation)
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize({
    width: image.width,
    height: image.height,
    rotation: rotation,
  })

  canvas.width = bBoxWidth
  canvas.height = bBoxHeight

  ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
  ctx.rotate(rotRad)
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
  ctx.translate(-image.width / 2, -image.height / 2)
  ctx.drawImage(image, 0, 0)

  const data = ctx.getImageData(
    pixelCrop?.x,
    pixelCrop?.y,
    pixelCrop?.width,
    pixelCrop?.height
  )

  canvas.width = pixelCrop?.width || 0
  canvas.height = pixelCrop?.height ||0
  ctx.putImageData(data, 0, 0)

  return new Promise((resolve, reject) => {
    
    // canvas.toBlob((file: Omit<Blob, "name"> & {name: string} | null) => {
    canvas.toBlob((file: Blob | null) => {
      if(file) {
        const customFile: Omit<Blob, "name"> & {name: string} = file;
        // const selectedFile = new Blob([file as BlobPart], {
        //   // ...file,
        //   name: 'cropped.jpeg',
        // });
        customFile.name = 'cropped.jpeg'
        resolve({ file: file, url: URL.createObjectURL(file) })
      }
    }, 'image/jpeg')
  })
}
