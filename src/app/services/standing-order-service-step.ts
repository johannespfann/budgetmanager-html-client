import { User } from "../models/user";
import { AccountItem } from "../models/account-item";
import { StandingOrder } from "../models/standingorder";
import { Observable } from "rxjs";

export interface StandingOrderServiceStep {

    addStandingOrder(user: User, accountItem: AccountItem, standingOrder: StandingOrder): Observable<any>;

    addStandingOrders(user: User, accountItem: AccountItem, standingOrders: StandingOrder[]): Observable<any>;

    getStandingOrder(user: User, accountItem: AccountItem): Observable<Array<StandingOrder>>;

    deleteStandingOrder(user: User, accountItem: AccountItem, standingOrder: StandingOrder): Observable<any>;

    updateStandingOrder(user: User, accountItem: AccountItem, standingOrder: StandingOrder): Observable<any>;
   
}