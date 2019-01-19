import { Component } from '@angular/core';
import { LogUtil } from '../../utils/log-util';
import { AccountService } from '../../services/account-service';
import { ApplicationService } from '../../application/application.service';
import { User } from '../../models/user';
import { Account } from '../../models/account';
import { HashUtil } from '../../utils/hash-util';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent {

    public showAddNewAccount = true;
    public accounts: Account[];

    constructor(
        private applicationService: ApplicationService,
        private accountService: AccountService) {
        LogUtil.info(this, 'init account-component');

        accountService.getAccounts().subscribe(
            (loadedAccounds: Account[]) => {
                 this.accounts = loadedAccounds;
                },
            error => {
                LogUtil.info(this, 'Error while loading Accounts' + JSON.stringify(error))
                }
            );
    }


    public onAddNewAccountPressed(aAccount: Account) {
        LogUtil.info(this, 'Account: ' + JSON.stringify(aAccount));

        const user: User = this.applicationService.getCurrentUser();
        aAccount.owner = user.name;
        aAccount.activated = true;
        aAccount.hash = HashUtil.getUniqueHash().toString();

        LogUtil.info(this, 'Add new Account :' + JSON.stringify(aAccount));
        this.accountService.addAccount(aAccount).subscribe(
            data => {
                this.cleanView();
                this.closeView();
                this.updateAccounts();
            },
            error => {
                LogUtil.error(this, 'Failed to add new account! ' + JSON.stringify(error));
            }

        );
        LogUtil.info(this, 'onAddNewAccountPressed');
    }

    public onCancelPressed(value: any) {
        this.showAddNewAccount = false;
        LogUtil.info(this, 'onCancelPressed');
    }

    public onEncryptionPressed(aAccount: Account): void {

    }

    public onDeletedPressed(aAccount: Account): void {

    }

    public pressButtonAddNewAccount(): void {
        this.showAddNewAccount = true;
    }

    private updateAccounts() {
        this.accountService.getAccounts().subscribe(
            (accounts: Account[]) => {
                this.accounts = accounts;
            },
            error => {
                LogUtil.error(this, 'Failed to load accounts ' + JSON.stringify(error));
            }
        )
    }

    private closeView(): void {
        this.showAddNewAccount = false;
    }
    private cleanView(): void {
        LogUtil.info(this, 'try to clean view ... TODO');
    }



}
