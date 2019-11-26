import { StandingOrderServiceStep } from "./standing-order-service-step";
import { User } from "../models/user";
import { AccountItem } from "../models/account-item";
import { StandingOrder } from "../models/standingorder";
import { Observable } from "rxjs";


export class StandingOrderCacheStep implements StandingOrderServiceStep {

    constructor(private standingOrderServiceStep: StandingOrderServiceStep) {}

    public addStandingOrder(user: User, accountItem: AccountItem, standingOrder: StandingOrder): Observable<any> {
        return this.standingOrderServiceStep.addStandingOrder(user, accountItem, standingOrder);
    }

    public addStandingOrders(user: User, accountItem: AccountItem, standingOrders: StandingOrder[]): Observable<any> {
        return this.standingOrderServiceStep.addStandingOrders(user, accountItem, standingOrders);
    }

    public getStandingOrder(user: User, accountItem: AccountItem): Observable<Array<StandingOrder>> {
        return this.standingOrderServiceStep.getStandingOrder(user, accountItem);
    }

    public deleteStandingOrder(user: User, accountItem: AccountItem, standingOrder: StandingOrder): Observable<any> {
        return this.standingOrderServiceStep.deleteStandingOrder(user, accountItem, standingOrder);
    }

    public updateStandingOrder(user: User, accountItem: AccountItem, standingOrder: StandingOrder): Observable<any> {
        return this.standingOrderServiceStep.updateStandingOrder(user, accountItem, standingOrder);
    }

}