import { MathUtil } from "./math-util";
import * as CryptoJS from 'crypto-js';
import { LogUtil } from "./log-util";

export class HashUtil {

    /**
     * Generate a unique hash of an given input
     * @param aInput 
     */
    public static getUniqueHash(): string {
        let bla = MathUtil.generateRandom();
        console.log(bla);
        let unique: string = CryptoJS.SHA1(MathUtil.generateRandom().toString());
        LogUtil.info(this, "Hash: " + unique);
        return unique;
    }

} 