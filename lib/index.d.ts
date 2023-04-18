import { fileToBase64 } from './utils';
export interface Options {
    quality?: number;
    minSize?: number;
    returnBase64?: boolean;
    allKeepType?: boolean;
}
declare function imgToTiny(imgFile: File, options?: Options): Promise<File | string>;
export { fileToBase64 };
export default imgToTiny;
