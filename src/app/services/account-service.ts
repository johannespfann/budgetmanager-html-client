import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationService } from '../application/application.service';
import { LogUtil } from '../utils/log-util';
import { Account } from '../models/account';
import { AccountItem } from '../models/account-item';
import { AccountStorageFacade } from '../utils/account-storage-facade';
import { AccountItemProducer } from '../accountsetting/account-item-producer';
import { map } from 'rxjs/operators';
import { AccountCachingService } from './account-caching-service';
import { CryptUtil } from '../utils/crypt-util';

@Injectable()
export class AccountService {

    constructor(
        private accountCachingservice: AccountCachingService,
        private appService: ApplicationService) {
        LogUtil.logInits(this, 'init accountservice');
    }

    public getAccounts(): Observable<AccountItem[]> {
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
            map(accounts => accounts.filter(accountItem => accountItem.key !== undefined))
        );
    }

    public deleteAccount(aAccount: AccountItem): Observable<any> {
        LogUtil.debug(this, 'Delete Account' + JSON.stringify(aAccount));
        return this.accountCachingservice.deleteAccount(this.appService.getCurrentUser(), aAccount.account);
    }

    public addAccount(aAccount: AccountItem): Observable<any> {
        return this.accountCachingservice.addAccount(this.appService.getCurrentUser(), aAccount.account)
            .pipe(
                map((accountItem: AccountItem) => {
                    const user = this.appService.getCurrentUser();
                    const localAccountStorage = new AccountStorageFacade(user);
                    const savedAccountItems = localAccountStorage.getAllAccountItems();
                    savedAccountItems.push(aAccount);
                    localAccountStorage.saveAllAccountItems(savedAccountItems);
                })
            );
    }

    public isAccountReadyToUse(account: AccountItem): boolean {
        if (CryptUtil.encryptionKeyIsValid(account.account.encryptionText, account.key)) {
            return true;
        }
        return false;
    }




}
