import { Entry } from '../models/entry';
import { LogUtil } from '../utils/log-util';

export class EntryUpdatedMessage {

    constructor() {
        LogUtil.debug(this, 'Init EntryUpdatedMessage');
    }
}
