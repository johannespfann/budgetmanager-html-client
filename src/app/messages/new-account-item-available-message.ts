import { AccountItem } from '../models/account-item';
import { Message } from './message';

export class NewAccountItemAvailableMessage extends Message {

    private accountItem: AccountItem;

    constructor(aAccountItem: AccountItem) {
        super('NewAccountItemAvailableMessage');
        this.accountItem = aAccountItem;
    }

    public getAccountItem(): AccountItem {
        return this.accountItem;
    }

}
