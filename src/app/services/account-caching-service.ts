import { Injectable } from '@angular/core';
import { AccountApiService } from '../rest/account-api.service';
import { LogUtil } from '../utils/log-util';
import { User } from '../models/user';
import { Account } from '../models/account';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountCachingService {

    private cachedAccountItems: Array<Account>;

    constructor(private accountApiService: AccountApiService) {
        LogUtil.debug(this, 'init account-caching-service');
        this.cachedAccountItems = [];
    }

    public getAccounts(aUser: User): Observable<Array<Account>> {

        if (this.cachedAccountItems.length === 0) {
            return this.accountApiService.getAccounts(aUser);
        }

        return Observable.create(this.cachedAccountItems);
    }

    public addAccount(aUser: User, aAccount: Account): Observable<any> {
        return this.accountApiService.addAccount(aUser, aAccount)
        .pipe(
            map( data => {
                this.cleanCaching();
            })
        );;
    }

    public deleteAccount(aUser: User, aAccount: Account): Observable<any> {
        return this.accountApiService.deleteAccount(aUser, aAccount)
        .pipe(
            map( data => {
                this.cleanCaching();
            })
        );
    }

    public cleanCaching(): void {
        LogUtil.debug(this, '====> Cleanded caching!');
        this.cachedAccountItems = [];
    }

}
