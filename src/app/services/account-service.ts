import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountApiService } from '../rest/account-api.service';
import { ApplicationService } from '../application/application.service';
import { LogUtil } from '../utils/log-util';
import { Account } from '../models/account';


@Injectable()
export class AccountService {


    constructor(private accountApiService: AccountApiService,
        private appService: ApplicationService) {
            LogUtil.debug(this, 'init accountservice');
    }

    public getAccounts(): Observable<Array<Account>> {
        LogUtil.info(this, 'getAccounts ->');
        return this.accountApiService.getAccounts(this.appService.getCurrentUser());
    }

    public addAccount(aAccount: Account): Observable<any> {
        LogUtil.info(this, 'addAccounts ->');
        return this.accountApiService.addAccount(this.appService.getCurrentUser(), aAccount);
    }

    public deleteAccount(aAccount: Account): Observable<any> {
        LogUtil.info(this, 'Delete Account' + JSON.stringify(aAccount));
        return this.accountApiService.deleteAccount(this.appService.getCurrentUser(), aAccount);
    }

}
