import { User } from "../models/user";

export class EncryptLocalStorage{

    public isEncryptionSaved(user: User): boolean {
        let key: string = this.createKey(user);
        console.log('Schaue für key: ' + key)
        let value = localStorage.getItem(key);
        console.log('value war: ' + value);
        if(value){
            return true;
        }
        return false;
    }

    public getEncryptionKey(user: User): string {
        return localStorage.getItem(this.createKey(user));
    }

    public deleteLocalStoredEncryptionKey(user: User): void {
        localStorage.removeItem(this.createKey(user));
    }

    public saveEncryptionKey(user: User, encryptionkey: string): void {
        localStorage.setItem(this.createKey(user),encryptionkey);
    }

    private createKey(user: User): string {
        return 'encryptionkey-' + user.name;
    }
}