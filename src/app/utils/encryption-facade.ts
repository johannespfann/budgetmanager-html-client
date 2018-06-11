import { User } from "../models/user";
import { LogUtil } from "./log-util";

export class EncryptionFacade {

    constructor() {
        // default
    }

    public isEncryptionSaved(user: User): boolean {
        const value = localStorage.getItem(this.createKey(user));
        if (value) {
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
        localStorage.setItem(this.createKey(user), encryptionkey);
    }

    private createKey(user: User): string {
        return 'encryptionkey-' + user.name;
    }
}