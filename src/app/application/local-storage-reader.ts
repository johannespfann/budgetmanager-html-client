export class LocalStorageReader{
    
    private localStorage: Storage;

    constructor(aLocalStorage: Storage){
        this.localStorage = aLocalStorage;
    }

    public getValue(aKey: String): any {
        return this.localStorage.getItem(aKey + '');
    }
}