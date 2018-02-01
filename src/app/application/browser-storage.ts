import { LocalStorageWriter } from "./local-storage-writer";
import { LocalStorageReader } from "./local-storage-reader";
import { User } from "../models/user";
import { stringify } from "querystring";


export class BrowserStorage{

    private LOGIN_USER: string = 'budgetmanager_user';

    private writer: LocalStorageWriter;
    private reader: LocalStorageReader;

    constructor(){
        this.writer = new LocalStorageWriter(localStorage);
        this.reader = new LocalStorageReader(localStorage); 
    }

    public isCurrentUserExists(): boolean {
        if(this.reader.getValue(this.LOGIN_USER)){
            return true;;
        }
        return false;
    }

    public getCurrentUser(): any {
        let user: User =  this.reader.getValue(this.LOGIN_USER);
    }

    public persistCurrentUser(user: User): void {
        let jsonUser: String = JSON.stringify(user);
        this.writer.persist(this.LOGIN_USER,jsonUser);
    }
}
