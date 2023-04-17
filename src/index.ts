import { fileToBase64, base64ToImgElem, compressNotPng, compressPng, convertImgType } from './utils'

export interface fnOptions {
  quality: number
  minSize?: number
  returnBase64?: boolean
}

async function imgToTiny(imgFile: File, options: fnOptions): Promise<File | string> {
  let file = imgFile
  if (options.minSize && options.minSize > 0 && imgFile.size < options.minSize) {
    return file
  }
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    const _convertImg = await convertImgType(file, 'jpg')
    if (_convertImg !== null) {
      file = _convertImg
    }
  }
  const base64 = await fileToBase64(file)
  if (base64 === null) throw new Error('文件转base64失败，请重试')

  const img = await base64ToImgElem(base64 as string)
  if (img === null) throw new Error('base64转Image失败，请重试')

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d') as CanvasRenderingContext2D

  canvas.width = img.width
  canvas.height = img.height

  context.drawImage(img, 0, 0, img.width, img.height)

  let newFile
  if (file.type === 'image/png') {
    newFile = compressPng(context, img, options.quality, file.name)
  } else {
    newFile = await compressNotPng(canvas, file.type, options.quality, file.name)
  }

  if (newFile === null) {
    throw new Error('压缩图片失败')
  }

  if (options.returnBase64) {
    const base64 = await fileToBase64(newFile as File)
    if (base64 === null) throw new Error('结果转base64失败，请重试')
    return base64
  } else {
    return newFile as File
  }
}

export default imgToTiny
