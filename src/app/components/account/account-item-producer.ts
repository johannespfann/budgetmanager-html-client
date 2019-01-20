import { AccountItem } from '../../models/account-item';
import { Account } from '../../models/account';
import { LogUtil } from '../../utils/log-util';
import { CryptUtil } from '../../utils/crypt-util';


export class AccountItemProducer {

    constructor(
        private accounts: Account[],
        private accountItems: AccountItem[]) {
            LogUtil.debug(this, 'Init with: ');
            LogUtil.debug(this, '- Accounts     : ' + JSON.stringify(accounts));
            LogUtil.debug(this, '- AccountItems : ' + JSON.stringify(accountItems));
    }

    /**
     * Richtet sich nur nach den Accounts: Lokal kann immer alt sein!
     * 1) Arbeite alle Accounts durch und erstelle jeweils ein Item
     * 2) Falls von den gespeicherten Item ein gültiger key existiert -> übernehme den gültigen key
     * 3) Falls es keinen gültigen Key oder kein Item gibt, bleibt key einfach leer
     */

    public produceAccountItmes(): AccountItem[] {
        const newAccountItems: AccountItem[] = [];

        this.accounts.forEach( (account: Account) => {

            const newAccountItme = new AccountItem();
            newAccountItme.account = account;
            // Wenn es einen gespeicherten gibt, prüfen und falls gültig setzen.
            if (this.foundAccountItem(account, this.accountItems)) {
                const savedAccountItem = this.getAccountItme(account, this.accountItems);
                if (CryptUtil.encryptionKeyIsValid(account.encryptionText, savedAccountItem.key)) {
                    newAccountItme.key = savedAccountItem.key;
                }
            }
            // Für alle anderen bleibt key leer
            newAccountItems.push(newAccountItme);
        } );
        LogUtil.debug(this, 'Return producedAccountItems: ' + JSON.stringify(newAccountItems));
        return newAccountItems;
    }

    private foundAccountItem(aAccount: Account, aAccountItems: AccountItem[]): boolean {
        const accountItems: AccountItem[] = aAccountItems.filter( (x: AccountItem ) => {
             return x.account.hash === aAccount.hash;
        });
        if (accountItems.length === 1) {
            return true;
        }
        return false;
    }

    private getAccountItme(aAccount: Account, aAccountItmes: AccountItem[]): AccountItem {
        const accountItems: AccountItem[] = aAccountItmes.filter( (x: AccountItem ) => {
            return x.account.hash === aAccount.hash;
       });
       return accountItems[0];
    }


}
