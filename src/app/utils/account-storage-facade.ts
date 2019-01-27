import { AccountItem } from '../models/account-item';
import { User } from '../models/user';
import { LogUtil } from './log-util';

export class AccountStorageFacade {

    private user: User;

    private ACCOUNT_ITEM_PREFIX = 'accountitems';

    constructor(aUser: User) {
        this.user = aUser;
        LogUtil.debug(this, 'init accountStorageFacade with User: ' + this.user.name + ' and password: ' + this.user.password);
    }

    public getAllAccountItems(): AccountItem[] {
        const accounts: AccountItem[] = [];

        const accountsAsString = localStorage.getItem(this.generateStorageKey(this.user.name));

        if (accountsAsString === undefined) {
            return accounts;
        }
        const convertedAccounts: AccountItem[] = JSON.parse(accountsAsString);

        if (convertedAccounts) {
            convertedAccounts.forEach((x: AccountItem) => {
                if (x !== null) {
                    accounts.push(x);
                }
            });
        }

        return accounts;
    }

    public saveAllAccountItems(aAccountItems: AccountItem[]): void {
        localStorage.setItem(this.generateStorageKey(this.user.name), JSON.stringify(aAccountItems));
    }

    private generateStorageKey(aUsername: string): string {
        return aUsername + '-' + this.ACCOUNT_ITEM_PREFIX;
    }

}
