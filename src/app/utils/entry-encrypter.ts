import { Entry } from "../models/entry";
import { CryptUtil } from "./crypt-util";
import { Tag } from "../models/tag";

export class EntryEncrypter{

    private key: string;

    constructor(akey: string){
        this.key = akey;
    }   

    public encryptEntry(aEntry: Entry): Entry {
        var entry: Entry = new Entry();
        entry.hash = aEntry.hash;
        entry.amount = CryptUtil.encryptNumber(this.key, aEntry.amount);
        entry.created_at = new Date(aEntry.created_at);
        entry.memo = CryptUtil.encryptString(this.key, aEntry.memo);
        entry.tags = aEntry.tags.map( (tag: Tag) => {
                var newTag: Tag = new Tag();
                //newTag.name = CryptUtil.encryptString(this.key, tag.name);
                newTag.name = tag.name;
                return newTag;
        });
        return entry;
    } 

    public decryptEntry(aEntry: Entry): Entry {
        var entry: Entry = new Entry();
        entry.hash = aEntry.hash;
        entry.amount = CryptUtil.decryptNumber(this.key, aEntry.amount);
        entry.created_at = new Date(aEntry.created_at);
        entry.memo = CryptUtil.decryptString(this.key, aEntry.memo);
        entry.tags = aEntry.tags.map( (tag: Tag) => {
                var newTag: Tag = new Tag();
                //newTag.name = CryptUtil.decryptString(this.key, tag.name);
                newTag.name = tag.name;
                return newTag;
        });
        return entry;
    }
}