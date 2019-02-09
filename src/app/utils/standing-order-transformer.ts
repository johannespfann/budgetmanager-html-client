import { StandingOrderServer } from '../modelv2/standing-order-server';
import { StandingOrderPayload } from '../modelv2/standing-order-payload';
import { RotationEntry } from '../models/rotationentry';
import { CryptUtil } from './crypt-util';
import { LogUtil } from './log-util';

export class StandingOrderTransformer {

    public transformRotationEntryServer(aPassword: string, aServerEntry: StandingOrderServer): RotationEntry {
        LogUtil.info(this, 'Receiving StandingOderSErver: ' + JSON.stringify(aServerEntry));
        const rotationEntry: RotationEntry = new RotationEntry();
        rotationEntry.hash = aServerEntry.hash.toString();
        rotationEntry.username = aServerEntry.username;

        const payload = aServerEntry.data;
        const encryptedPayload = CryptUtil.decryptString(aPassword, payload);
        const standingOrderPayload: StandingOrderPayload = JSON.parse(encryptedPayload);

        rotationEntry.amount = standingOrderPayload.amount;
        rotationEntry.currency = standingOrderPayload.currency;
        rotationEntry.memo = standingOrderPayload.memo;
        rotationEntry.tags = standingOrderPayload.tags;
        rotationEntry.start_at = standingOrderPayload.start_at;
        rotationEntry.last_executed = standingOrderPayload.last_executed;
        rotationEntry.end_at = standingOrderPayload.end_at;
        rotationEntry.rotation_strategy = standingOrderPayload.rotation_strategy;
        LogUtil.info(this, 'Produced RotationEntry: ' + JSON.stringify(rotationEntry));

        return rotationEntry;
    }

    /**
     * prepare a rotationentry to send it to server
     * @param aPassword
     * @param aEntry
     */
    public transformRotationEntry(aPassword: string, aEntry: RotationEntry): StandingOrderServer {
        const rotationEntryServer: StandingOrderServer = new StandingOrderServer();
        rotationEntryServer.hash = aEntry.hash.toString();
        rotationEntryServer.username = aEntry.username;
        const standingOrderPayload = new StandingOrderPayload();
        standingOrderPayload.amount = aEntry.amount;
        standingOrderPayload.currency = aEntry.currency;
        standingOrderPayload.memo = aEntry.memo;
        standingOrderPayload.rotation_strategy = aEntry.rotation_strategy;
        standingOrderPayload.start_at = aEntry.start_at;
        standingOrderPayload.last_executed = aEntry.last_executed;
        standingOrderPayload.end_at = aEntry.end_at;
        standingOrderPayload.tags = aEntry.tags;
        const encryptedPayload = CryptUtil.encryptString(
            aPassword,
            JSON.stringify(standingOrderPayload));

        rotationEntryServer.data = encryptedPayload;
        return rotationEntryServer;
    }

}
