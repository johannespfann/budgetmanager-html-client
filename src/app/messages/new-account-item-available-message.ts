import { AccountItem } from '../models/account-item';

export class NewAccountItemAvailableMessage {

    private accountItem: AccountItem;

    constructor(aAccountItem: AccountItem) {
        this.accountItem = aAccountItem;
    }

    public getAccountItem(): AccountItem {
        return this.accountItem;
    }

}
