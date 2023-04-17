export interface fnOptions {
    quality: number;
    minSize?: number;
    returnBase64?: boolean;
}
declare function imgToTiny(imgFile: File, options: fnOptions): Promise<File | string>;
export default imgToTiny;
