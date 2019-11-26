import { StandingOrderServiceStep } from "./standing-order-service-step";
import { User } from "../models/user";
import { AccountItem } from "../models/account-item";
import { RotationEntry } from "../models/standingorder";
import { Observable } from "rxjs";


export class StandingOrderLogStep implements StandingOrderServiceStep{


    constructor(private standingOrderServiceStep: StandingOrderServiceStep) {}


    public addStandingOrder(user: User, accountItem: AccountItem, standingOrder: RotationEntry): Observable<any> {
        return this.standingOrderServiceStep.addStandingOrder(user, accountItem, standingOrder);
    }

    public addStandingOrders(user: User, accountItem: AccountItem, standingOrders: RotationEntry[]): Observable<any> {
        return this.standingOrderServiceStep.addStandingOrders(user, accountItem, standingOrders);
    }

    public getStandingOrder(user: User, accountItem: AccountItem): Observable<Array<RotationEntry>> {
        return this.standingOrderServiceStep.getStandingOrder(user, accountItem);
    }

    public deleteStandingOrder(user: User, accountItem: AccountItem, standingOrder: RotationEntry): Observable<any> {
        return this.standingOrderServiceStep.deleteStandingOrder(user, accountItem, standingOrder);
    }

    public updateStandingOrder(user: User, accountItem: AccountItem, standingOrder: RotationEntry): Observable<any> {
        return this.standingOrderServiceStep.updateStandingOrder(user, accountItem, standingOrder);
    }

}