import { LogUtil } from '../utils/log-util';
import { Message } from './message';

export class EncryptionReadyMessage extends Message {

    public messagename: string;

    constructor() {
        super('EncryptionReadyMessage');
    }
}
