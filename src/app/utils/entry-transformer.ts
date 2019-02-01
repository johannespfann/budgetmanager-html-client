import { Entry } from '../models/entry';
import { CryptUtil } from './crypt-util';
import { Tag } from '../models/tag';
import { EntryServer } from '../models/entry-server';

export class EntryTransformer {

    private encryptValue = true;

    public transformEntry(aPassword: string, aEntry: Entry): EntryServer {
        const entryServer: EntryServer = new EntryServer();
        entryServer.hash = aEntry.hash;
        if (this.encryptValue) {
            entryServer.amount = CryptUtil.encryptString(aPassword, aEntry.amount.toString());
        } else {
            entryServer.amount = aEntry.amount.toString();
        }

        if (this.encryptValue) {
            entryServer.currency = CryptUtil.encryptString(aPassword, aEntry.currency);
        } else {
            entryServer.currency = aEntry.currency;
        }


        if (this.encryptValue) {
            entryServer.memo = CryptUtil.encryptString(aPassword, aEntry.memo);
        } else {
            entryServer.memo = aEntry.memo;
        }
        entryServer.created_at = new Date(aEntry.created_at);

        entryServer.tags = aEntry.tags.map((tag: Tag) => {
            const newTag: Tag = new Tag();
            if (this.encryptValue) {
                newTag.name = CryptUtil.encryptString(aPassword, tag.name);
            } else {
                newTag.name = tag.name;
            }
            return newTag;
        });
        return entryServer;
    }

    public transformEntryServer(aPassword: string, aEntryServer: EntryServer): Entry {
        const entry: Entry = new Entry();
        entry.hash = aEntryServer.hash;
        entry.amount = Number(CryptUtil.decryptString(aPassword, aEntryServer.amount));
        entry.currency = CryptUtil.decryptString(aPassword, aEntryServer.currency);
        entry.created_at = new Date(aEntryServer.created_at);
        entry.memo = CryptUtil.decryptString(aPassword, aEntryServer.memo);
        entry.tags = aEntryServer.tags.map((tag: Tag) => {
            const newTag: Tag = new Tag();
            newTag.name = CryptUtil.decryptString(aPassword, tag.name);
            return newTag;
        });
        return entry;
    }

}
