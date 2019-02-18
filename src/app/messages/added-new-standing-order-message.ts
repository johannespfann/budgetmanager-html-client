import { AccountItem } from '../models/account-item';

export class AddedNewStandingOrderMessage {

    private accountItem: AccountItem;

    constructor(aAccountItem: AccountItem) {
        this.accountItem = aAccountItem;
    }

    public getAccountItem(): AccountItem {
        return this.accountItem;
    }

}
