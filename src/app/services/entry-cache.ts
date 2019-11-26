import { EntryServiceStep } from "./entry-service-step";
import { AccountItem } from "../models/account-item";
import { User } from "../models/user";
import { Observable, of } from "rxjs";
import { Entry } from "../models/entry";
import { LogUtil } from "../utils/log-util";
import { tap, catchError } from "rxjs/operators";


export class EntryCacheStep implements EntryServiceStep{

    private currentUser: User;
    private currentAccount: AccountItem;
    private currentEntries: Entry[];
    private isCacheValid: boolean = false

    constructor(private entryServiceStep: EntryServiceStep) {
        this.currentEntries = [];
    }

    getEntries(user: User, accountItem: AccountItem): Observable<Array<Entry>> {

        if(!this.isUserSame(user)){
            this.isCacheValid = false;
        }

        if(!this.isAccountSame(accountItem)){
            this.isCacheValid = false;
        }

        if(!this.isCacheValid) {
            return this.entryServiceStep.getEntries(user, accountItem).pipe(
                tap( entries => {
                    LogUtil.debug(this, "save current entries")
                    this.currentEntries = entries;
                    this.currentAccount = accountItem;
                    this.currentUser = user;
                    this.isCacheValid = true;
                })
            );
        }
        LogUtil.debug(this, "get cached entries")
        return of(this.currentEntries)
    }


    getLasthalfYearEntries(user: User, accountItem: AccountItem): Observable<Array<Entry>> {

        if(!this.isUserSame(user)){
            this.isCacheValid = false;
        }

        if(!this.isAccountSame(accountItem)){
            this.isCacheValid = false;
        }

        if(!this.isCacheValid) {
            return this.entryServiceStep.getLasthalfYearEntries(user, accountItem).pipe(
                tap( entries => {
                    LogUtil.debug(this, "save current entries")
                    this.currentEntries = entries;
                    this.currentAccount = accountItem;
                    this.currentUser = user;
                    this.isCacheValid = true;
                })
            );
        }
        LogUtil.debug(this, "get cached entries")
        return of(this.currentEntries)
    }

    saveEntry(user: User, accountItem: AccountItem, entry: Entry): Observable<any> {
        this.currentEntries.push(entry)
        return this.entryServiceStep.saveEntry(user, accountItem, entry).pipe(
            catchError( error => {
                this.isCacheValid = false;
                return error;
            })
        );
    }
 
    saveEntries(user: User, accountItem: AccountItem, entries: Entry[]): Observable<any> {
        entries.forEach( entry => this.currentEntries.push(entry));
        return this.entryServiceStep.saveEntries(user, accountItem, entries);
    }
 
    delete(user: User, accountItem: AccountItem, entry: Entry): Observable<any> {
        // TODO
        return this.entryServiceStep.delete(user, accountItem, entry);
    }
 
    update(user: User, accountItem: AccountItem, entry: Entry): Observable<any> {
        // TODO
        return this.entryServiceStep.update(user, accountItem, entry);
    }


    private isAccountSame(accountItem: AccountItem) {
        if(this.currentAccount == undefined) {
            return false;
        }
        return accountItem.account.hash == this.currentAccount.account.hash;
    }
    private isUserSame(user: User) {
        if(this.currentUser == undefined) {
            return false
        }
        return user.email = this.currentUser.email
    }


}