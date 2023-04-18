import { fileToBase64 } from './utils';
export interface fnOptions {
    quality?: number;
    minSize?: number;
    returnBase64?: boolean;
    allKeepType?: boolean;
}
declare function imgToTiny(imgFile: File, options?: fnOptions): Promise<File | string>;
export { fileToBase64 };
export default imgToTiny;
