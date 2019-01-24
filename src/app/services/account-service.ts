import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountApiService } from '../rest/account-api.service';
import { ApplicationService } from '../application/application.service';
import { LogUtil } from '../utils/log-util';
import { Account } from '../models/account';
import { AccountItem } from '../models/account-item';
import { AccountStorageFacade } from '../utils/account-storage-facade';
import { AccountItemProducer } from '../components/account/account-item-producer';
import { map } from 'rxjs/operators';
import { AccountCachingService } from './account-caching-service';
import { MessagingService } from '../messages/message.service';
import { NoEncryptedKeyAvailableMessage } from '../messages/no-encrypted-key-available-message';
import { EncryptionKeyAvailableMessage } from '../messages/encryption-key-available-message';


@Injectable()
export class AccountService {

    constructor(
        private messagingService: MessagingService,
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

                this.checkNumberOfAccounts(newAccountItmes);
                this.checkAvailableEncryptionKeys(newAccountItmes);

                localAccountStorage.saveAllAccountItems(newAccountItmes);
                return newAccountItmes;
            })
        );
    }
    private checkAvailableEncryptionKeys(accounts: AccountItem[]): any {
        const foundAccounts = accounts.filter( (x: AccountItem) => x.key === undefined );
        if (foundAccounts.length === 0) {
            this.messagingService.publish(NoEncryptedKeyAvailableMessage);
        } else {
            this.messagingService.publish(EncryptionKeyAvailableMessage);
        }
    }
    private checkNumberOfAccounts(accounts: AccountItem[]): any {
        if (accounts.length === 0) {
            this.messagingService.publish(NoEncryptedKeyAvailableMessage);
        }
    }

    public addAccount(aAccount: AccountItem): Observable<any> {
        LogUtil.info(this, 'addAccounts ->');
        this.updateCaching();
        return this.accountCachingservice.addAccount(this.appService.getCurrentUser(), aAccount.account);
    }

    public deleteAccount(aAccount: Account): Observable<any> {
        LogUtil.info(this, 'Delete Account' + JSON.stringify(aAccount));
        this.updateCaching();
        return this.accountCachingservice.deleteAccount(this.appService.getCurrentUser(), aAccount);
    }

    public getAllUseableAccounts(): AccountItem[] {
        let foundAccounts: AccountItem[] = [];

        this.getAccounts().subscribe(
            (accounts: AccountItem[]) => {
                foundAccounts = this.findAllAccountWithEncryptionkey(accounts);
            });

        return foundAccounts;
    }

    public isAtLeastOneKeyReady(): boolean {

        this.getAccounts().subscribe(
            (accounts: AccountItem[]) => {
                if (this.foundAccountWithEncryptionkey(accounts)) {
                    return true;
                }
                return false;
            });

        return false;
    }


    private findAllAccountWithEncryptionkey(aAccounts: AccountItem[]): Array<AccountItem> {
        const foundAccounts: AccountItem[] = [];

        LogUtil.debug(this, 'looking for accountItem');

        aAccounts.forEach((accountItem: AccountItem) => {
            if (accountItem.key) {
                LogUtil.debug(this, 'found accountitem with key');
                foundAccounts.push(accountItem);
            }
        });

        return foundAccounts;
    }

    private foundAccountWithEncryptionkey(aAccounts: AccountItem[]): boolean {
        if (this.findAllAccountWithEncryptionkey(aAccounts).length >= 1) {
            return true;
        }
        return false;
    }

    private updateCaching(): void {
        this.getAccounts().subscribe((accountItems: Array<AccountItem>) => {
            this.accountCachingservice.cleanCaching();
        });
    }
}
