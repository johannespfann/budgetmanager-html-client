import { RotationEntry } from "../models/rotationentry";
import { Tag } from "../models/tag";
import { CryptUtil } from "./crypt-util";
import { RotationEntryServer } from "../models/rotationentry-server";
import { LogUtil } from "./log-util";

export class RotationEntryTransformer {

    private encryptValue = true;

    public transformRotationEntryServer(aPassword: string, aServerEntry: RotationEntryServer): RotationEntry {
        LogUtil.info(this, "transformRotationEntryServer: " + JSON.stringify(aServerEntry));
        var rotationEntry: RotationEntry = new RotationEntry();


        rotationEntry.hash = aServerEntry.hash.toString();
        rotationEntry.memo = CryptUtil.decryptString(aPassword, aServerEntry.memo);
        let amountString: string = CryptUtil.decryptString(aPassword, aServerEntry.amount);
        rotationEntry.amount = Number(amountString);
        rotationEntry.start_at = new Date(aServerEntry.start_at);
        rotationEntry.end_at = new Date(aServerEntry.end_at);
        rotationEntry.last_executed = new Date(aServerEntry.last_executed);
        rotationEntry.tags = aServerEntry.tags.map((tag: Tag) => {
            var newTag: Tag = new Tag();

            newTag.name = CryptUtil.decryptStringWithoutSalt(aPassword,tag.name);
            return newTag;
        });
        rotationEntry.rotation_strategy = aServerEntry.rotation_strategy;
        LogUtil.info(this, "to -> : " + JSON.stringify(rotationEntry));

        return rotationEntry;
    }

    public transformRotationEntry(aPassword: string, aEntry: RotationEntry): RotationEntryServer {
        LogUtil.info(this, "transformRotationEntry: " + JSON.stringify(aEntry));
        var rotationEntryServer: RotationEntryServer = new RotationEntryServer();
        rotationEntryServer.hash = aEntry.hash.toString();
        
        
        if (this.encryptValue) {
           
            rotationEntryServer.amount = CryptUtil.encryptString(aPassword, aEntry.amount.toString());
           
        }
        else{
            rotationEntryServer.amount = aEntry.amount.toString();
        }
        
        if (this.encryptValue) {
            rotationEntryServer.memo = CryptUtil.encryptString(aPassword, aEntry.memo);
        }
        else{
            rotationEntryServer.memo =aEntry.memo;
        }
        
        rotationEntryServer.start_at = new Date(aEntry.start_at);
        rotationEntryServer.end_at = new Date(aEntry.end_at);
        rotationEntryServer.last_executed = new Date(aEntry.last_executed);

        rotationEntryServer.tags = aEntry.tags.map((tag: Tag) => {
            var newTag: Tag = new Tag();
            if(this.encryptValue){
                newTag.name = CryptUtil.encryptStringWithoutSalt(aPassword,tag.name);
            }
            else{
                newTag.name = tag.name;
            }
            
            return newTag;
        });

        rotationEntryServer.rotation_strategy = aEntry.rotation_strategy;
        LogUtil.info(this, "to -> : " + JSON.stringify(rotationEntryServer));
        return rotationEntryServer;
    }

}