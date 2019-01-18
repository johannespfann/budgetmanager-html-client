import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountApiService } from '../rest/account-api.service';
import { ApplicationService } from '../application/application.service';
import { LogUtil } from '../utils/log-util';


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

}
