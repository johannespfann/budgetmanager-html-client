import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountApiService } from '../rest/account-api.service';
import { ApplicationService } from '../application/application.service';
import { LogUtil } from '../utils/log-util';
import { Account } from '../models/account';
import { CryptUtil } from '../utils/crypt-util';
import { AccountItem } from '../models/account-item';
import { AccountStorageFacade } from '../utils/account-storage-facade';
import { AccountItemProducer } from '../components/account/account-item-producer';
import { User } from '../models/user';


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

    public getAllUseableAccounts(aUser: User, accounts: Account[]): AccountItem[] {

        const useableAccountitems: AccountItem[] = [];
        const localAccountStorage = new AccountStorageFacade(aUser);
        const savedAccountItems = localAccountStorage.getAllAccountItems();
        const accountItemProducer = new AccountItemProducer(accounts, savedAccountItems);
        const mergedAccountItmes = accountItemProducer.produceAccountItmes();

        mergedAccountItmes.forEach( (accountItem: AccountItem) => {
            if (accountItem.key !== undefined) {
                LogUtil.debug(this, 'found 1 useable account ' + JSON.stringify(accountItem));
            }

            if (accountItem.key) {
                useableAccountitems.push(accountItem);
                LogUtil.debug(this, 'found 1 useable account ' + JSON.stringify(accountItem));
            }
        });

        return useableAccountitems;
    }
}
