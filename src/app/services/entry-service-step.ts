import { Observable } from "rxjs";
import { Entry } from "../models/entry";
import { AccountItem } from "../models/account-item";
import { User } from "../models/user";


export interface EntryServiceStep {

   getEntries(user: User, accountItem: AccountItem): Observable<Array<Entry>>

   getLasthalfYearEntries(user: User, accountItem: AccountItem): Observable<Array<Entry>>

   saveEntry(user: User, accountItem: AccountItem, entry: Entry): Observable<any>

   saveEntries(user: User, accountItem: AccountItem, entries: Entry[]): Observable<any>

   delete(user: User, aAccount: AccountItem, entries: Entry): Observable<any>

   update(user: User, accountItem: AccountItem, entry: Entry): Observable<any>

   
}