import { AccountItem } from '../models/account-item';
import { Message } from './message';

export class AddedNewStandingOrderMessage extends Message {

    private accountItem: AccountItem;

    constructor(aAccountItem: AccountItem) {
        super('AddedNewStandingOrderMessage');
        this.accountItem = aAccountItem;
    }

    public getAccountItem(): AccountItem {
        return this.accountItem;
    }

}
