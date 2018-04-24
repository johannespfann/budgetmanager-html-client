import { RotationEntry } from "../models/rotationentry";
import { Tag } from "../models/tag";
import { CryptUtil } from "./crypt-util";

export class RotationEntryEncrypter{

    private key: string;

    constructor(aKey: string){
        this.key = aKey;
    }   

    public encryptEntry(aEntry: RotationEntry): RotationEntry {
        var rotationEntry: RotationEntry = new RotationEntry();
        rotationEntry.hash = aEntry.hash;
        rotationEntry.amount = CryptUtil.encryptNumber(this.key, aEntry.amount);
        rotationEntry.memo = CryptUtil.encryptString(this.key, aEntry.memo);
       
        rotationEntry.start_at = new Date(aEntry.start_at);
        rotationEntry.end_at = new Date(aEntry.end_at);
        rotationEntry.last_executed = new Date(aEntry.last_executed);
        
        rotationEntry.tags = aEntry.tags.map( (tag: Tag) => {
                var newTag: Tag = new Tag();
                //newTag.name = CryptUtil.encryptString(this.key, tag.name);
                newTag.name = tag.name;
                return newTag;
        });
        rotationEntry.rotation_strategy = aEntry.rotation_strategy;
        return rotationEntry;
    } 

    public decryptEntry(aEntry: RotationEntry): RotationEntry {
        var rotationEntry: RotationEntry = new RotationEntry();
        rotationEntry.hash = aEntry.hash;
        rotationEntry.amount = CryptUtil.decryptNumber(this.key, aEntry.amount);
        rotationEntry.memo = CryptUtil.decryptString(this.key, aEntry.memo);
       
        rotationEntry.start_at = new Date(aEntry.start_at);
        rotationEntry.end_at = new Date(aEntry.end_at);
        rotationEntry.last_executed = new Date(aEntry.last_executed);
        
        rotationEntry.tags = aEntry.tags.map( (tag: Tag) => {
                var newTag: Tag = new Tag();
                //newTag.name = CryptUtil.decryptString(this.key, tag.name);
                newTag.name = tag.name;
                return newTag;
        });
        rotationEntry.rotation_strategy = aEntry.rotation_strategy;
        return rotationEntry;
    }

}