import { MathUtil } from './math-util';
import * as CryptoJS from 'crypto-js';
import { LogUtil } from './log-util';

export class HashUtil {

    /**
     * Generate a unique hash of an random number
     * @param aInput
     */
    public static getUniqueHash(): string {
        return CryptoJS.SHA1(MathUtil.generateRandom().toString());
    }

    /**
     * Generate a unique hash of an random number and split the result to a string of max. lenght 6
     * @param aInput
     */
    public static getShortUniqueHash(): string {
        const hash = this.getUniqueHash().toString();
        if (hash.length >= 6) {
            return hash.substring(0, 6);
        }
        return hash;
    }

}
