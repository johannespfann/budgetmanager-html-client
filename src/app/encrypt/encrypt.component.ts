import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../application/application.service';
import { CopyRepositoryRest } from '../services/copy-repository-rest';
import { EntryService } from '../services/entry.service';
import { StandingOrderService } from '../services/standing-order.service';
import { User } from '../models/user';
import { AccountItem } from '../models/account-item';

@Component({
  selector: 'app-encrypt',
  templateUrl: './encrypt.component.html',
  styleUrls: ['./encrypt.component.scss']
})
export class EncryptComponent implements OnInit {

  private selectedAccount: AccountItem;
  private currentUser: User;

  constructor(
    private applicationService: ApplicationService,
    private copyService: CopyRepositoryRest,
    private entryService: EntryService,
    private rotationService: StandingOrderService) { 
      this.selectedAccount = applicationService.getCurrentAccount();
      this.currentUser = applicationService.getCurrentUser();
  }

  ngOnInit() {

  }

  encryptEntries(): void {  
    this.entryService.getEntries(this.selectedAccount).subscribe(
      entries => {
        this.copyService.addEntries(this.currentUser, this.selectedAccount, entries).subscribe(
          data => console.log('success')
        );
      },
      error => {
        console.log('Could not load entries -> ' + JSON.stringify(error));
      }
    )
  }

  encryptStandingOrders(): void {
    this.rotationService.getRotationEntries(this.selectedAccount).subscribe(
      orders => {
        this.copyService.addStandingOrders(this.currentUser, this.selectedAccount, orders).subscribe(
          data => console.log('success')
        );
      },
      error => {
        console.log('Could not load standingorders -> ' + JSON.stringify(error));
      }
    )
  }


}
