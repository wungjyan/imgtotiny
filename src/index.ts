import {
  fileToBase64,
  base64ToImgElem,
  compressNotPng,
  compressPng,
  convertImgType,
  isImageFile,
  isObject,
  isRange
} from './utils'

export interface fnOptions {
  quality?: number
  minSize?: number
  returnBase64?: boolean
  allKeepType?: boolean
}

async function imgToTiny(imgFile: File, options?: fnOptions): Promise<File | string> {
  let file
  if (isImageFile(imgFile)) {
    file = imgFile
  } else {
    return imgFile
  }

  let opts = options && isObject(options) ? options : {}

  if (opts.minSize && opts.minSize > 0 && imgFile.size < opts.minSize) {
    return file
  }

  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) && !opts.allKeepType) {
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
  let q = isRange(opts.quality) ? opts.quality : 0.6

  if (file.type === 'image/png') {
    newFile = compressPng(context, img, q!, file.name)
  } else {
    newFile = await compressNotPng(canvas, file.type, q!, file.name)
  }

  if (newFile === null) {
    throw new Error('压缩图片失败')
  }

  if (opts.returnBase64) {
    const base64 = await fileToBase64(newFile as File)
    if (base64 === null) throw new Error('结果转base64失败，请重试')
    return base64
  } else {
    return newFile as File
  }
}

export { fileToBase64 }

export default imgToTiny
