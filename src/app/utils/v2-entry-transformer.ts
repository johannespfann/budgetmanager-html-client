import { EntryServer } from '../modelv2/entry-server';
import { Entry } from '../models/entry';
import { EntryPayload } from '../modelv2/entry-payload';
import { CryptUtil } from './crypt-util';
import { LogUtil } from './log-util';

export class V2EntryTransformer {

    public transformEntry(aPassword: string, aEntry: Entry, aUsername: string): EntryServer {
        const entryServer = new EntryServer();

        entryServer.username = aUsername;
        entryServer.hash = aEntry.hash;
        entryServer.createdAt = aEntry.created_at;

        const entryPayload = new EntryPayload();
        entryPayload.amount = aEntry.amount;
        entryPayload.currency = aEntry.currency;
        entryPayload.memo = aEntry.memo;
        entryPayload.tags = aEntry.tags;

        const encryptedPayload: string = CryptUtil.encryptString(
            aPassword,
            JSON.stringify(entryPayload));

        entryServer.data = encryptedPayload;
        LogUtil.info(this, 'TransformtEntry: ' + JSON.stringify(entryServer));
        return entryServer;
    }

    public transformEntryV2Server(aPassword: string, aEntryServer: EntryServer): Entry {

        const entry: Entry = new Entry();
        entry.hash = aEntryServer.hash;
        entry.created_at = new Date(aEntryServer.createdAt);
        const payload = aEntryServer.data;
        const encryptedPayload = CryptUtil.decryptString(aPassword, payload);
        const entryPayload: EntryPayload = JSON.parse(encryptedPayload);

        entry.amount = entryPayload.amount;
        entry.currency = entryPayload.currency;
        entry.memo = entryPayload.memo;
        entry.tags = entryPayload.tags;

        LogUtil.info(this, 'transformEntryV2Server -> ' + JSON.stringify(entry));
        return entry;
    }

}

