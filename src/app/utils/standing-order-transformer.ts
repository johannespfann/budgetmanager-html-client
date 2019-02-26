import { StandingOrderServer } from '../models/standing-order-server';
import { StandingOrderPayload } from '../models/standing-order-payload';
import { RotationEntry } from '../models/standingorder';
import { CryptUtil } from './crypt-util';
import { LogUtil } from './log-util';

export class StandingOrderTransformer {

    public transformRotationEntryServer(aPassword: string, aServerEntry: StandingOrderServer): RotationEntry {
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

        rotationEntry.rotation_strategy = standingOrderPayload.rotation_strategy;

        rotationEntry.start_at = new Date(standingOrderPayload.start_at);
        rotationEntry.last_executed = new Date(standingOrderPayload.last_executed);
        rotationEntry.end_at = new Date(standingOrderPayload.end_at);

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
