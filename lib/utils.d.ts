/**
 * 判断是否是图片文件类型
 * @param {File} file 文件
 * @returns
 */
export declare function isImageFile(file: File): boolean;
/**
 * 将图片文件转换成 base64 字符串
 * @param {File} file 图片文件
 * @returns
 */
export declare function fileToBase64(file: File): Promise<string | null>;
/**
 * 用图片base64生成 img 标签
 * @param base64 图片base64
 * @returns
 */
export declare function base64ToImgElem(base64: string): Promise<HTMLImageElement | null>;
/**
 * 将 canvas 元素转成文件对象
 * @param canvas canvas 标签元素
 * @param type  图片类型
 * @param quality 压缩质量，范围 0～1
 * @returns
 */
export declare function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null>;
/**
 * 转换图片格式
 * @param file 要转换的图片源文件
 * @param type 要转换的格式
 * @returns
 */
export declare function convertImgType(file: File, type: string): Promise<File | null>;
/**
 * 压缩 png 格式
 * @param context 画布上下文
 * @param img 图片标签
 * @param quality 压缩质量
 * @param name 导出文件名称
 * @returns
 */
export declare function compressPng(context: CanvasRenderingContext2D, img: HTMLImageElement, quality: number, name: string): File | null;
/**
 * 压缩非 png 格式的图片
 * @param canvas canvas 实例
 * @param type 图片类型
 * @param quality 压缩质量
 * @param name 导出文件名称
 * @returns
 */
export declare function compressNotPng(canvas: HTMLCanvasElement, type: string, quality: number, name: string): Promise<File | null>;
