import { Entry } from "../models/entry";
import { LogUtil } from "../utils/log-util";

export class EntryUpdatedMessage {

    private entry: Entry;

    constructor(aEntry: Entry){
        LogUtil.debug(this,'Init EntryUpdatedMessage');
        this.entry = aEntry
    }

    public getEntry(){
        return this.entry;
    }

}