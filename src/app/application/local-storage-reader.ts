export class LocalStorageReader{
    
    private localStorage: Storage;

    constructor(aLocalStorage: Storage){
        this.localStorage = aLocalStorage;
    }

    public getValue(aKey: string): any {
        return this.localStorage.getItem(aKey + '');
    }
}