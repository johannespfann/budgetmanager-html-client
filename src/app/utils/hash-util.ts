import { MathUtil } from "./math-util";

export class HashUtil {

    /**
     * Generate a unique hash of an given input
     * @param aInput 
     */
    public static getUniqueHash(aInput: string): string {
        let unique: string = '';
        unique = unique + MathUtil.generateRandom();
        return unique;
    }

}