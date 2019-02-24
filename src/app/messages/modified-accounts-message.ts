import { Message } from './message';

export class ModifiedAccountsMessage extends Message {

    public messagename: string;

    constructor() {
        super('ModifiedAccountsMessage');
        this.messagename = 'modifiedaccountmessage';
    }
}
