import * as CryptoJS from 'crypto-js';
import { LogUtil } from './log-util';

export class CryptUtil {

    private static initialVector: string = CryptoJS.enc.Base64.parse('#base64IV#');
    private static basekey = CryptoJS.enc.Base64.parse('#base64Key#');

    public static encryptStringWithoutSalt(aKey: string, aMessage: string): string {

        const preparedMessage: string = String(aMessage);
        const key: string = this.basekey;
        const encryptedMessageAsByte = CryptoJS.AES.encrypt(preparedMessage, key, {iv: this.initialVector});
        const convertedMessage: string = encryptedMessageAsByte.toString();
        const wrapedMessage: string = this.wrapEncryptedStringMessage(convertedMessage);
        return wrapedMessage;
    }

    public static decryptStringWithoutSalt(aKey: string, aMessage: string): string {

        const preparedMessage: string = String(aMessage);
        const key: string = this.basekey;
        if (this.isStringEncrypted(preparedMessage)) {
            const extractedMessage: string = this.extractEncryptedStringMessage(preparedMessage);
            const decryptedMessageAsByte = CryptoJS.AES.decrypt(extractedMessage, key, {iv: this.initialVector});
            const convertedMessage: string =  decryptedMessageAsByte.toString(CryptoJS.enc.Utf8);
            return convertedMessage;
        }
        // LogUtil.info(this, 'Message: ' + aMessage + ' -> was not encrypted!');
        return aMessage;
    }

    public static encryptString(aKey: string, aMessage: string): string {
        const ciphertext = CryptoJS.AES.encrypt(String(aMessage), aKey);
        return this.wrapEncryptedStringMessage(ciphertext.toString());
    }

    public static decryptString(aKey: string, aMessage: string): string {
        const preparedMessage: string = String(aMessage);
        if (this.isStringEncrypted(preparedMessage)) {
            const extractedMessage: string = this.extractEncryptedStringMessage(preparedMessage);
            const decryptedMessageAsByte = CryptoJS.AES.decrypt(extractedMessage, aKey, {iv: this.initialVector});
            const convertedMessage: string =  decryptedMessageAsByte.toString(CryptoJS.enc.Utf8);
            return convertedMessage;
        }

        return preparedMessage;
    }

    public static isStringEncrypted(aMessage: string): boolean {
        if (aMessage.charAt(0) !== '{') {
            return false;
        }
        if (aMessage.charAt(aMessage.length - 1 ) !== '}') {
            return false;
        }
        return true;
    }

    public static wrapEncryptedStringMessage(aMessage: string): string {
        return String('{' + aMessage + '}');
    }

    public static extractEncryptedStringMessage(aMessage: string): string {
        return String(aMessage.slice(1, aMessage.length - 1));
    }
}
