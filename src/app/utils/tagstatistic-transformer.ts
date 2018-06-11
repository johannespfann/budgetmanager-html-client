import { TagStatisticServer } from '../models/tagstatistic-server';
import { TagStatistic } from '../models/tagstatistic';
import { LogUtil } from './log-util';
import { CryptUtil } from './crypt-util';

export class TagStatisticTransformer {

    private encryptValue = true;

    public transformTagStatisticServer(aPassword: string, aServerStatisticTag: TagStatisticServer): TagStatistic {

        const tagStatistic: TagStatistic = new TagStatistic();
        tagStatistic.name = CryptUtil.decryptString(aPassword, aServerStatisticTag.name);
        const weightString = CryptUtil.decryptString(aPassword, aServerStatisticTag.weight);
        tagStatistic.weight = Number(weightString);

        return tagStatistic;
    }

    public transformTagStatistic(aPassword: string, aTagStatistic: TagStatistic): TagStatisticServer {
        const tagStatisticServer: TagStatisticServer = new TagStatisticServer();
        if (this.encryptValue) {
            tagStatisticServer.name = CryptUtil.encryptString(aPassword, aTagStatistic.name);
        } else {
            tagStatisticServer.name = aTagStatistic.name;
        }

        const weightString = String(aTagStatistic.weight);

        if (this.encryptValue) {
            tagStatisticServer.weight = CryptUtil.encryptString(aPassword, weightString);
        } else {
            tagStatisticServer.weight = weightString;
        }

        return tagStatisticServer;
    }
}
