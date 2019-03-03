import { Message } from './message';
import { AccountItem } from '../models/account-item';



export class SelectAccountItemMessage extends Message {

    private accountItem: AccountItem;

    constructor(accountItem: AccountItem) {
        super('SelectAccountItemMessage');
        this.accountItem = accountItem;
    }

    public getAccountItem(): AccountItem {
        return this.accountItem;
    }

}
