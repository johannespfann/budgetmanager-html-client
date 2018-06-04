import { Entry } from "../models/entry";
import { CryptUtil } from "./crypt-util";
import { Tag } from "../models/tag";
import { EntryServer } from "../models/entry-server";
import { LogUtil } from "./log-util";

export class EntryTransformer {

    private encryptValue = true;

    public transformEntry(aPassword: string, aEntry: Entry): EntryServer {
        const entryServer: EntryServer = new EntryServer();
        entryServer.hash = aEntry.hash;
        if (this.encryptValue) {
            entryServer.amount = CryptUtil.encryptString(aPassword, aEntry.amount.toString());
        }
        else {
            entryServer.amount = aEntry.amount.toString();
        }

        if (this.encryptValue) {
            entryServer.memo = CryptUtil.encryptString(aPassword, aEntry.memo);
        }
        else {
            entryServer.memo = aEntry.memo;
        }
        entryServer.created_at = new Date(aEntry.created_at);

        entryServer.tags = aEntry.tags.map((tag: Tag) => {
            var newTag: Tag = new Tag();
            if (this.encryptValue) {
                newTag.name = CryptUtil.encryptStringWithoutSalt(aPassword, tag.name);
            }
            else {
                newTag.name = tag.name;
            }
            return newTag;
        });
        return entryServer;
    }

    public transformEntryServer(aPassword: string, aEntryServer: EntryServer): Entry {
        var entry: Entry = new Entry();
        entry.hash = aEntryServer.hash;
        entry.amount = Number(CryptUtil.decryptString(aPassword, aEntryServer.amount));
        entry.created_at = new Date(aEntryServer.created_at);
        entry.memo = CryptUtil.decryptString(aPassword, aEntryServer.memo);
        entry.tags = aEntryServer.tags.map((tag: Tag) => {
            var newTag: Tag = new Tag();
            newTag.name = CryptUtil.decryptStringWithoutSalt(aPassword, tag.name);
            return newTag;
        });
        return entry;
    }
}