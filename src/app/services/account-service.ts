import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationService } from '../application/application.service';
import { LogUtil } from '../utils/log-util';
import { Account } from '../models/account';
import { AccountItem } from '../models/account-item';
import { AccountStorageFacade } from '../utils/account-storage-facade';
import { AccountItemProducer } from '../components/account/account-item-producer';
import { map } from 'rxjs/operators';
import { AccountCachingService } from './account-caching-service';

@Injectable()
export class AccountService {

    constructor(
        private accountCachingservice: AccountCachingService,
        private appService: ApplicationService) {
        LogUtil.debug(this, 'init accountservice');
    }

    public getAccounts(): Observable<AccountItem[]> {
        LogUtil.info(this, 'Get all Accounts in  method getallaccounts');

        const user = this.appService.getCurrentUser();
        const localAccountStorage = new AccountStorageFacade(user);
        const savedAccountItems = localAccountStorage.getAllAccountItems();

        return this.accountCachingservice.getAccounts(this.appService.getCurrentUser()).pipe(
            map((accounts: Array<Account>) => {
                const accountItemProducer = new AccountItemProducer(accounts, savedAccountItems);
                const newAccountItmes = accountItemProducer.produceAccountItmes();

                localAccountStorage.saveAllAccountItems(newAccountItmes);
                return newAccountItmes;
            })
        );
    }

    public getAllUseableAccounts(): Observable<AccountItem[]> {
        return this.getAccounts().pipe(
            map( accounts => accounts.filter( accountItem => accountItem.key !== undefined))
        );
    }

    public deleteAccount(aAccount: AccountItem): Observable<any> {
        LogUtil.info(this, 'Delete Account' + JSON.stringify(aAccount));
        return this.accountCachingservice.deleteAccount(this.appService.getCurrentUser(), aAccount.account);
    }

    public addAccount(aAccount: AccountItem): Observable<any> {
        LogUtil.info(this, 'addAccounts ->');
        return this.accountCachingservice.addAccount(this.appService.getCurrentUser(), aAccount.account);
    }

}
