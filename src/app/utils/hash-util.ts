import { MathUtil } from './math-util';
import * as CryptoJS from 'crypto-js';
import { LogUtil } from './log-util';

export class HashUtil {

    /**
     * Generate a unique hash of an given input
     * @param aInput
     */
    public static getUniqueHash(): string {
        return CryptoJS.SHA1(MathUtil.generateRandom().toString());
    }

}
