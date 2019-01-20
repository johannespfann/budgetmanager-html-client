import { AccountItem } from '../models/account-item';
import { User } from '../models/user';
import { LogUtil } from './log-util';

export class AccountStorageFacade {

    private user: User;

    private ACCOUNT_ITEM_PREFIX = 'accountitems';

    constructor(aUser: User) {
        this.user = aUser;
        LogUtil.debug(this, 'init accountStorageFacade with User: ' + this.user.name +  ' and password: ' + this.user.password);
    }

    public getAllAccountItems(): AccountItem[] {
        LogUtil.debug(this, 'Get all accounts');
        const accounts: AccountItem[] = [];

        const accountsAsString = localStorage.getItem(this.generateStorageKey(this.user.name));
        LogUtil.debug(this, 'found as string -> ' + accountsAsString);

        if (accountsAsString === undefined) {
            LogUtil.error(this, 'was undefined');
            return accounts;
        }
        const convertedAccounts: AccountItem[] = JSON.parse(accountsAsString);


        if (convertedAccounts) {
            convertedAccounts.forEach( (x: AccountItem) => accounts.push(x) );
        }

        LogUtil.debug(this, 'return ' + accounts.length + ' accounts');
        return accounts;
    }

    public saveAllAccountItems(aAccountItems: AccountItem[]): void {
        LogUtil.debug(this, 'Save all accounts');
        localStorage.setItem(this.generateStorageKey(this.user.name), JSON.stringify(aAccountItems));
    }

    private generateStorageKey(aUsername: string): string {
        return aUsername + '-' + this.ACCOUNT_ITEM_PREFIX;
    }

}
