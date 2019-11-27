import { StandingOrderServiceStep } from "./standing-order-service-step";
import { User } from "../models/user";
import { AccountItem } from "../models/account-item";
import { StandingOrder } from "../models/standingorder";
import { Observable, of, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { LogUtil } from "../utils/log-util";
import { Entry } from "../models/entry";


export class StandingOrderCacheStep implements StandingOrderServiceStep {

    private currentUser: User;
    private currentAccount: AccountItem;
    private currentStandingOrders: StandingOrder[];
    private isCacheValid: boolean = false;

    constructor(
            private standingOrderServiceStep: StandingOrderServiceStep) {
        this.currentStandingOrders = [];
    }

    public addStandingOrder(user: User, accountItem: AccountItem, standingOrder: StandingOrder): Observable<any> {
        this.currentStandingOrders.push(standingOrder);
        return this.standingOrderServiceStep.addStandingOrder(user, accountItem, standingOrder).pipe(
            catchError( error => {
                this.isCacheValid = false;
                return error;
            })
        );
    }

    public addStandingOrders(user: User, accountItem: AccountItem, standingOrders: StandingOrder[]): Observable<any> {
        standingOrders.forEach(element => {
            this.currentStandingOrders.push(element);
        }); 
        return this.standingOrderServiceStep.addStandingOrders(user, accountItem, standingOrders).pipe(
            catchError( error => {
                this.isCacheValid = false;
                return error;
            })
        );
    }

    public getStandingOrder(user: User, accountItem: AccountItem): Observable<Array<StandingOrder>> {
        if(!this.isUserSame(user)){
            this.isCacheValid = false;
        }

        if(!this.isAccountSame(accountItem)){
            this.isCacheValid = false;
        }

        if(!this.isCacheValid) {
            return this.standingOrderServiceStep.getStandingOrder(user, accountItem).pipe(
                tap( entries => {
                    this.currentStandingOrders = entries;
                    this.currentAccount = accountItem;
                    this.currentUser = user;
                    this.isCacheValid = true;
                }),
                catchError(error => {
                    this.isCacheValid = false;
                    return of([]);
                })
            );
        }
        
        LogUtil.debug(this, "get cached standingorders")
        return of(this.currentStandingOrders)
    }

    public deleteStandingOrder(user: User, accountItem: AccountItem, standingOrder: StandingOrder): Observable<any> {
        this.currentStandingOrders = this.currentStandingOrders.filter( element => element.hash != standingOrder.hash );
        return this.standingOrderServiceStep.deleteStandingOrder(user, accountItem, standingOrder).pipe(
            catchError( error => {
                this.isCacheValid = false;
                return error;
            })
        );
    }

    public updateStandingOrder(user: User, accountItem: AccountItem, standingOrder: StandingOrder): Observable<any> {
        this.currentStandingOrders = this.currentStandingOrders.map( element => {
            if(element.hash == standingOrder.hash) {
                return standingOrder;
            }
            return element;
         });
        return this.standingOrderServiceStep.updateStandingOrder(user, accountItem, standingOrder).pipe(
            catchError( error => {
                this.isCacheValid = false;
                return error;
            })
        );
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