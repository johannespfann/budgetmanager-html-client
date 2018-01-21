import { LogUtil } from "../utils/log-util";


export class LocalStorageWriter{

    private localStorage: Storage;

    constructor(aLocalStorage: Storage){
        this.localStorage = aLocalStorage;
    }

    public persist(aKey: String, aValue: any){
        LogUtil.info(this,'Persist Item with key: ' + aKey + ' and Value: ' + aValue);
        this.localStorage.setItem(aKey + '',aValue) + '';
    }
}