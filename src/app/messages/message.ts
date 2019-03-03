import { LogUtil } from '../utils/log-util';

export abstract class Message {

    protected channelName: string;

    constructor(aChannelName: string) {
        LogUtil.logMessages(this, 'init message: ' + this.channelName);
        this.channelName = aChannelName;
    }

    public getChannelName(): string {
        return this.channelName;
    }

}
