import { Message } from './message';

export class EncryptionReadyMessage extends Message {

    public messagename: string;

    constructor() {
        super('EncryptionReadyMessage');
    }
}
