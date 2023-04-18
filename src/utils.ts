import UPNG from './UPNG'

/**
 * 判断是否是图片文件类型
 * @param {File} file 文件
 * @returns
 */
export function isImageFile(file: File) {
  if (!file) {
    throw new Error('文件不能为空')
  } else if (!file.type.includes('image/')) {
    throw new Error('文件需要是图片类型')
  } else {
    return true
  }
}

/**
 * 判断值是否是对象类型
 * @param obj 要判断的值
 * @returns
 */
export function isObject(obj: unknown): boolean {
  return obj !== null && typeof obj === 'object'
}

/**
 * 判断压缩质量数值是否在范围 0-1 内
 * @param num
 * @returns
 */
export function isRange(num: any): boolean {
  if (num === 0 || num === 1) {
    return true
  }
  return num && typeof num === 'number' && num > 0 && num < 1
}

/**
 * 将图片文件转换成 base64 字符串
 * @param {File} file 图片文件
 * @returns
 */
export function fileToBase64(file: File): Promise<string | null> {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      if (reader.result && typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        resolve(null)
      }
    }
    reader.onerror = () => {
      resolve(null)
    }
  })
}

/**
 * 用图片base64生成 img 标签
 * @param base64 图片base64
 * @returns
 */
export function base64ToImgElem(base64: string): Promise<HTMLImageElement | null> {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = base64
  })
}

/**
 * 将 canvas 元素转成文件对象
 * @param canvas canvas 标签元素
 * @param type  图片类型
 * @param quality 压缩质量，范围 0～1
 * @returns
 */
export function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
  return new Promise(resolve => canvas.toBlob(blob => resolve(blob), type, quality))
}

/**
 * 转换图片格式
 * @param file 要转换的图片源文件
 * @param type 要转换的格式
 * @returns
 */
export async function convertImgType(file: File, type: string): Promise<File | null> {
  let toType = type === 'jpg' ? 'jpeg' : type
  if (file.type === `image/${toType}`) {
    return file
  }
  const _base64 = await fileToBase64(file)
  if (_base64 === null) throw new Error('文件转base64失败，请重试')
  const _img = await base64ToImgElem(_base64)
  if (_img === null) throw new Error('base64转Image失败，请重试')

  const _canvas = document.createElement('canvas')
  const _context = _canvas.getContext('2d') as CanvasRenderingContext2D

  _canvas.width = _img.width
  _canvas.height = _img.height

  _context.drawImage(_img, 0, 0, _img.width, _img.height)

  const _blob = await canvasToBlob(_canvas, `image/${toType}`, 1)
  if (_blob) {
    const fileName = file.name.split('.')[0] + '.' + type
    return new File([_blob], fileName, { type: `image/${toType}` })
  }
  return null
}

/**
 * 压缩 png 格式
 * @param context 画布上下文
 * @param img 图片标签
 * @param quality 压缩质量
 * @param name 导出文件名称
 * @returns
 */
export function compressPng(
  context: CanvasRenderingContext2D,
  img: HTMLImageElement,
  quality: number,
  name: string
): File | null {
  const imageData = context.getImageData(0, 0, img.width, img.height).data
  let cnum = 0
  if (quality > 0 && quality < 1) {
    cnum = quality * 256
  }
  const pngImg = UPNG.encode([imageData.buffer], img.width, img.height, cnum)
  if (pngImg) {
    return new File([pngImg], name, { type: 'image/png' })
  }
  return null
}

/**
 * 压缩非 png 格式的图片
 * @param canvas canvas 实例
 * @param type 图片类型
 * @param quality 压缩质量
 * @param name 导出文件名称
 * @returns
 */
export async function compressNotPng(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number,
  name: string
): Promise<File | null> {
  const _blob = await canvasToBlob(canvas, type, quality)
  if (_blob) {
    return new File([_blob], name, { type })
  }
  return null
}
