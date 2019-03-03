import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account-service';
import { AccountItem } from '../../models/account-item';
import { LogUtil } from '../../utils/log-util';
import { MessagingService } from '../../messages/message.service';
import { SelectAccountItemMessage } from '../../messages/select-accountitem-message';
import { RefreshSelectedAccountItemMessage } from '../../messages/refresh-selected-accountitem-message';
import { ApplicationService } from '../../application/application.service';


@Component({
    selector: 'app-account-menue',
    templateUrl: './account-menue.component.html',
    styleUrls: ['./account-menue.component.css']
})
export class AccountMenueComponent implements OnInit, OnDestroy {


    public accountItems: AccountItem[];

    constructor(
        private router: Router,
        private messagingService: MessagingService,
        private applicationService: ApplicationService,
        private accountService: AccountService) {
        this.accountItems = [];
        messagingService.publish(new RefreshSelectedAccountItemMessage());
    }


    public selectAccount(accountItem: AccountItem): void {
        this.messagingService.publish(new SelectAccountItemMessage(accountItem));
        this.applicationService.setCurrentAccount(accountItem);
        this.router.navigate(['/accountwelcome']);
    }

    public ngOnInit(): void {
        this.accountService.getAllUseableAccounts().subscribe(
            (accountItems: AccountItem[]) => {
                LogUtil.info(this, 'got Accounts');
                this.accountItems = accountItems;
            },
            error => {
                LogUtil.error(this, 'failed to load accounts ' + JSON.stringify(error));
            }
        );
    }

    public ngOnDestroy(): void {
        // TODO
    }
}
