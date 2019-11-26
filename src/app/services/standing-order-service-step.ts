import { User } from "../models/user";
import { AccountItem } from "../models/account-item";
import { RotationEntry } from "../models/standingorder";
import { Observable } from "rxjs";

export interface StandingOrderServiceStep {

    addStandingOrder(user: User, accountItem: AccountItem, standingOrder: RotationEntry): Observable<any>;

    addStandingOrders(user: User, accountItem: AccountItem, standingOrders: RotationEntry[]): Observable<any>;

    getStandingOrder(user: User, accountItem: AccountItem): Observable<Array<RotationEntry>>;

    deleteStandingOrder(user: User, accountItem: AccountItem, standingOrder: RotationEntry): Observable<any>;

    updateStandingOrder(user: User, accountItem: AccountItem, standingOrder: RotationEntry): Observable<any>;
   
}