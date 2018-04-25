import { MathUtil } from "./math-util";
import * as CryptoJS from 'crypto-js';

export class HashUtil {

    /**
     * Generate a unique hash of an given input
     * @param aInput 
     */
    public static getUniqueHash(aInput: string): string {
        let unique = CryptoJS.SHA1(MathUtil.generateRandom());
        return unique;
    }

}