import * as CryptoJS from 'crypto-js';
import { LogUtil } from './log-util';

export class CryptUtil{

    public static encryptStringWithoutSalt(aKey: string, aMessage: string): string {
        var key = CryptoJS.enc.Base64.parse("#base64Key#");
        var iv  = CryptoJS.enc.Base64.parse("#base64IV#");

        var encrypted = CryptoJS.AES.encrypt(aMessage, aKey, {iv: iv});
        return this.wrapEncryptedStringMessage(encrypted.toString());
    }

    public static decryptStringWithoutSalt(aKey: string, aMessage: string): string {
        var key = CryptoJS.enc.Base64.parse("#base64Key#");
        var iv  = CryptoJS.enc.Base64.parse("#base64IV#");
        if(this.isStringEncrypted(aMessage)){
            return CryptoJS.AES.decrypt(this.extractEncryptedStringMessage(aMessage), aKey, {iv: iv});
        }
        LogUtil.info(this,'Message: ' + aMessage + ' -> was not encrypted');
        return aMessage;
    }
  
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