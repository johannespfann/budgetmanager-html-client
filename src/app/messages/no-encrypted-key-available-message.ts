import { Message } from './message';


export class NoEncryptedKeyAvailableMessage extends Message {

    constructor() {
        super('NoEncryptedKeyAvailableMessage');
    }

}
