import { AccountItem } from '../models/account-item';
import { LogUtil } from '../utils/log-util';
import { Message } from './message';

export class AddedNewStandingOrderMessage implements Message {
    
    public channel: string;
    data: any;

    private accountItem: AccountItem;

    constructor(aAccountItem: AccountItem) {
        LogUtil.logMessages(this, 'init added-new-standingorder-message');
        this.accountItem = aAccountItem;
    }

    public getAccountItem(): AccountItem {
        return this.accountItem;
    }

}
