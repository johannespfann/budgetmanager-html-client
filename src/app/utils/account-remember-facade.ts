import { User } from '../models/user';
import { LogUtil } from './log-util';
import { AccountItem } from '../models/account-item';


export class AccountRememberFacade {

    private user: User;

    private ACCOUNT_REMEMBER_PREFIX = 'accountremember';

    constructor(aUser: User) {
        this.user = aUser;
        LogUtil.logInits(this, 'init account-remember-facade');
    }

    public isRememberFunctionActive(): boolean {
        const result = this.getAccountRemeber();

        if (result === undefined) {
            return false;
        }

        if (result === null) {
            return false;
        }

        if (result === '') {
            return false;
        }

        LogUtil.info(this, 'result -> ' + JSON.stringify(result));
        return true;
    }

    public setAccountRemember(aAccountItem: AccountItem): void {
        localStorage.setItem(this.generateStorageKey(this.user.name), aAccountItem.account.hash);
    }

    public getAccountRemeber(): string {
        return localStorage.getItem(this.generateStorageKey(this.user.name));
    }

    public cleanAccountRemeber(): void {
        localStorage.setItem(this.generateStorageKey(this.user.name), '');
    }


    private generateStorageKey(aUsername: string): string {
        return aUsername + '-' + this.ACCOUNT_REMEMBER_PREFIX;
    }

}
