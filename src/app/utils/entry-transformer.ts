import { Entry } from "../models/entry";
import { CryptUtil } from "./crypt-util";
import { Tag } from "../models/tag";
import { EntryServer } from "../models/entry-server";
import { LogUtil } from "./log-util";

export class EntryTransformer {

    private key: string;

    private encryptValue = true;

    constructor() {
        this.key = "testpw";
    }

    public transformEntry(aEntry: Entry): EntryServer {
        LogUtil.info(this, "transformEntry: " + JSON.stringify(aEntry));
        var entryServer: EntryServer = new EntryServer();
        entryServer.hash = aEntry.hash;
        if (this.encryptValue) {
            entryServer.amount = CryptUtil.encryptString(this.key, aEntry.amount.toString());
        }
        else {
            entryServer.amount = aEntry.amount.toString();
        }

        if (this.encryptValue) {
            entryServer.memo = CryptUtil.encryptString(this.key, aEntry.memo);
        }
        else {
            entryServer.memo = aEntry.memo;
        }
        entryServer.created_at = new Date(aEntry.created_at);

        entryServer.tags = aEntry.tags.map((tag: Tag) => {
            var newTag: Tag = new Tag();
            if (this.encryptValue) {
                newTag.name = CryptUtil.encryptStringWithoutSalt(this.key, tag.name);
            }
            else {
                newTag.name = tag.name;
            }

            return newTag;
        });
        LogUtil.info(this, "to -> " + JSON.stringify(entryServer));
        return entryServer;
    }

    public transformEntryServer(aEntryServer: EntryServer): Entry {
        LogUtil.info(this, "transformEntryServer -> " + JSON.stringify(aEntryServer));
        var entry: Entry = new Entry();
        entry.hash = aEntryServer.hash;
        entry.amount = Number(CryptUtil.decryptString(this.key, aEntryServer.amount));
        entry.created_at = new Date(aEntryServer.created_at);
        entry.memo = CryptUtil.decryptString(this.key, aEntryServer.memo);
        entry.tags = aEntryServer.tags.map((tag: Tag) => {
            var newTag: Tag = new Tag();
            newTag.name = CryptUtil.decryptStringWithoutSalt(this.key, tag.name);
            return newTag;
        });
        LogUtil.info(this, "to -> " + JSON.stringify(entry));
        return entry;
    }
}