import { EntryServiceStep } from "./entry-service-step";
import { AccountItem } from "../models/account-item";
import { User } from "../models/user";
import { Observable } from "rxjs";
import { Entry } from "../models/entry";
import { LogUtil } from "../utils/log-util";
import { tap } from "rxjs/operators";


export class EntryLogStep implements EntryServiceStep {
    

    constructor(private entryServiceStep: EntryServiceStep) {}

    getEntries(user: User, accountItem: AccountItem): Observable<Array<Entry>> {
        LogUtil.debug(this, "[Request] getEntries()")
        return this.entryServiceStep.getEntries(user, accountItem).pipe(
            tap( x => LogUtil.debug(this, "[Response] getEntries"))
        );
    }

    getLasthalfYearEntries(user: User, accountItem: AccountItem): Observable<Array<Entry>> {
        LogUtil.debug(this, "[Request] getLasthalfYearEntries()")
        return this.entryServiceStep.getLasthalfYearEntries(user,accountItem).pipe(
            tap( x => LogUtil.debug(this, "[Response] getLasthalfYearEntries"))
        );
    }

    saveEntry(user: User, accountItem: AccountItem, aEntry: Entry): Observable<any> {
        return this.entryServiceStep.saveEntry(user, accountItem, aEntry);
    }
 
    saveEntries(user: User, accountItem: AccountItem, entries: Entry[]): Observable<any> {
        return this.entryServiceStep.saveEntries(user, accountItem, entries);
    }
 
    delete(user: User, accountItem: AccountItem, entry: Entry): Observable<any> {
        return this.entryServiceStep.delete(user, accountItem, entry);
    }
 
    update(user: User, accountItem: AccountItem, entry: Entry): Observable<any> {
        return this.entryServiceStep.update(user, accountItem, entry);
    }

}

/**
 *  
    constructor(private entryServiceStep: EntryServiceStep) {}

    getEntries(user: User, accountItem: AccountItem): Observable<Array<Entry>> {
        return this.entryServiceStep.getEntries(user, accountItem);
    }

    getLasthalfYearEntries(user: User, accountItem: AccountItem): Observable<Array<Entry>> {
        return this.entryServiceStep.getLasthalfYearEntries(user,accountItem);
    }

    saveEntry(user: User, accountItem: AccountItem, aEntry: Entry): Observable<any> {
        return this.entryServiceStep.saveEntry(user, accountItem, aEntry);
    }
 
    saveEntries(user: User, accountItem: AccountItem, entries: Entry[]): Observable<any> {
        return this.entryServiceStep.saveEntries(user, accountItem, entries);
    }
 
    delete(user: User, accountItem: AccountItem, entry: Entry): Observable<any> {
        return this.entryServiceStep.delete(user, accountItem, entry);
    }
 
    update(user: User, accountItem: AccountItem, entry: Entry): Observable<any> {
        return this.entryServiceStep.update(user, accountItem, entry);
    }

 */