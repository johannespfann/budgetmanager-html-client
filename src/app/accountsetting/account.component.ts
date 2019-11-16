import { Component, OnInit } from '@angular/core';
import { LogUtil } from '../utils/log-util';
import { AccountService } from '../services/account-service';
import { ApplicationService } from '../application/application.service';
import { AccountItem } from '../models/account-item';
import { AccountStorageFacade } from '../utils/account-storage-facade';
import { MessagingService } from '../messages/message.service';
import { ModifiedAccountsMessage } from '../messages/modified-accounts-message';
import { NewAccountItemAvailableMessage } from '../messages/new-account-item-available-message';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {

    public showAddNewAccount: boolean;
    public accountItems: AccountItem[];

    constructor(
        private messageService: MessagingService,
        private applicationService: ApplicationService,
        private accountService: AccountService) {
        LogUtil.logInits(this, 'init account-component');
        this.showAddNewAccount = false;
    }

    public ngOnInit(): void {
        this.updateAccounts();
    }

    private updateAccounts() {
        this.accountService.getAccounts().subscribe(
            (accounts: AccountItem[]) => {
                this.accountItems = accounts;
            },
            error => {
                LogUtil.error(this, 'Failed to load accounts ' + JSON.stringify(error));
            }
        );
    }


    public onAddNewAccountPressed(aAccount: AccountItem) {
        aAccount.account.owner = this.applicationService.getCurrentUser().name;
        LogUtil.info(this, 'Add new Account :' + JSON.stringify(aAccount));
        this.accountService.addAccount(aAccount).subscribe(
            data => {
                this.cleanView();
                this.closeAddAccountView();
                this.updateAccounts();
                this.messageService.publish(new ModifiedAccountsMessage());
            },
            error => {
                LogUtil.error(this, 'Failed to add new account! ' + JSON.stringify(error));
            }

        );
    }

    public onCancelPressed(value: any) {
        this.showAddNewAccount = false;
        LogUtil.info(this, 'onCancelPressed');
    }

    public onEncryptionPressed(aAccount: AccountItem): void {
        LogUtil.debug(this, 'onEncryptionPressed in AccountComponent: ' + JSON.stringify(aAccount));
        const localAccountStorage = new AccountStorageFacade(this.applicationService.getCurrentUser());
        const savedAccountItems: AccountItem[] = localAccountStorage.getAllAccountItems();

        savedAccountItems.map( (accountItem: AccountItem) => {
            if (accountItem.account.hash === aAccount.account.hash) {
                accountItem.key = aAccount.key;
            }
        });

        LogUtil.debug(this, 'Save new accountItems : ' + JSON.stringify(savedAccountItems));
        localAccountStorage.saveAllAccountItems(savedAccountItems);
        this.messageService.publish(new ModifiedAccountsMessage());
        this.messageService.publish(new NewAccountItemAvailableMessage(aAccount));
        this.updateAccounts();
    }

    public onDeletedPressed(aAccountItem: AccountItem): void {
        this.accountService.deleteAccount(aAccountItem).subscribe(
            data => {
                LogUtil.info(this, 'Deleted Account: ' + aAccountItem.account);
                this.updateAccounts();
                this.messageService.publish(new ModifiedAccountsMessage());
            },
            error => {
                LogUtil.error(this, 'Failed to delete Account: ' + aAccountItem.account);
            }
        );
    }

    public pressButtonAddNewAccount(): void {
        this.showAddNewAccount = true;
    }

    private closeAddAccountView(): void {
        this.showAddNewAccount = false;
    }

    private cleanView(): void {
        LogUtil.info(this, 'try to clean view ... TODO');
    }


}
