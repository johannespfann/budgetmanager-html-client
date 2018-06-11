import { User } from "../models/user";
import { LogUtil } from "./log-util";

export class AuthenticationFacade {


    private username_key = 'username';
    private password_key = 'password';
    private session_token_key = 'session_token';

    constructor() {
        // default
    }

    public cleanSavedCredentials(): void {
        localStorage.removeItem(this.username_key);
        localStorage.removeItem(this.password_key);
    }

    public isUserCredentialsSaved(): boolean {
        const username = localStorage.getItem(this.username_key);
        const password = localStorage.getItem(this.password_key);
        if (username && password){
            return true;
        }
        return false;
    }

    public saveUser(user: User): void {
        LogUtil.info(this, 'Save username: ' + user.name + ' and password ' + user.password + ' to localStorage');
        localStorage.setItem(this.username_key,user.name);
        localStorage.setItem(this.password_key,user.password);
    }

    public getUser(): User {
        const user: User = new User();
        user.name = this.getUserNames();
        user.password = this.getPassword();
        return user;
    }

    public getUserNames(): string {
        return localStorage.getItem(this.username_key);
    }

    public getPassword(): string {
        return localStorage.getItem(this.password_key);
    }
}
