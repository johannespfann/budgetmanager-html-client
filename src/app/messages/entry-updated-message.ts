import { Message } from './message';

export class EntryUpdatedMessage extends Message {

    constructor() {
        super('EntryUpdatedMessage');
    }
}
