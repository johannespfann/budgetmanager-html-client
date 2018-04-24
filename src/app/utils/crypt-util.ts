import * as CryptoJS from 'crypto-js';
import { LogUtil } from './log-util';

export class CryptUtil{

    private static maxSize: number = 9;

    public static encryptString(aKey: string, aMessage: string): string {
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(aMessage), aKey);
        return this.wrapEncryptedStringMessage(ciphertext.toString());
    }

    public static decryptString(aKey: string, aMessage: string): string {
        if(this.isStringEncrypted(aMessage)){
            var bytes  = CryptoJS.AES.decrypt(this.extractEncryptedStringMessage(aMessage), aKey);
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }
        LogUtil.info(this,'Message: ' + aMessage + ' -> was not encrypted');
        return aMessage
    }

    /**
     * @param aKey 
     * @param aMessage 
     */
    public static encryptNumber(aKey: string, aMessage: number): number {
        var convertKey = this.countAsNumber(aKey);
        return aMessage;
    }

    public static countAsNumber(aKey: string): number {
        var index = 0;
        var charNumber: number = 0;
        while(index < aKey.length){
            charNumber = charNumber + aKey[index].charCodeAt(0);
            index++;
        }
        return charNumber;
    }

    public static decryptNumber(aKey: string, aMessage: number): number {
        return aMessage;
    }

    

    public static isStringEncrypted(aMessage: string): boolean{
        if(aMessage.charAt(0) != '{'){
            return false
        }

        if(aMessage.charAt(aMessage.length-1) != "}"){
            return false
        }

        return true
    }

    private static wrapEncryptedStringMessage(aMessage: string): string {
        return '{' + aMessage + '}'
    }

    private static extractEncryptedStringMessage(aMessage: string): string {
        return aMessage.slice(1, aMessage.length-1);
    }

}