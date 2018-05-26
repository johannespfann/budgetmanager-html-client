import { TagStatisticServer } from "../models/tagstatistic-server";
import { TagStatistic } from "../models/tagstatistic";
import { LogUtil } from "./log-util";
import { CryptUtil } from "./crypt-util";

export class TagStatisticTransformer {

    private encryptValue = true;

    public transformTagStatisticServer(aPassword: string, aServerStatisticTag: TagStatisticServer): TagStatistic {
        LogUtil.info(this, 'transformTagStatissticServer' + JSON.stringify(aServerStatisticTag));

        var tagStatistic: TagStatistic = new TagStatistic();
        tagStatistic.name = CryptUtil.decryptString(aPassword, aServerStatisticTag.name);
        var weightString = CryptUtil.decryptString(aPassword, aServerStatisticTag.weight);
        tagStatistic.weight = Number(weightString);


        LogUtil.info(this, 'Descrypted: ' + JSON.stringify(tagStatistic));
        return tagStatistic;

    }

    public transformTagStatistic(aPassword: string, aTagStatistic: TagStatistic): TagStatisticServer {
        LogUtil.info(this, 'transformTAgStatistic ' + JSON.stringify(aTagStatistic));

        var tagStatisticServer: TagStatisticServer = new TagStatisticServer();
        if (this.encryptValue) {
            tagStatisticServer.name = CryptUtil.encryptString(aPassword, aTagStatistic.name);
        }
        else {
            tagStatisticServer.name = aTagStatistic.name;
        }

        var weightString = String(aTagStatistic.weight);

        if (this.encryptValue) {
            tagStatisticServer.weight = CryptUtil.encryptString(aPassword, weightString);
        }
        else {
            tagStatisticServer.weight = weightString;
        }

        LogUtil.info(this,'Encrypted: ' + JSON.stringify(tagStatisticServer));
        return tagStatisticServer;

    }
}