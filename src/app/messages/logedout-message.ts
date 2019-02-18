import { LogUtil } from '../utils/log-util';

export class LogedOutMessage {

    constructor() {
        LogUtil.logMessages(this, 'init logout-message');
    }

}
