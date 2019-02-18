import { EntryV2Service } from '../services/entryV2.service';
import { StandingOrderService } from '../services/standing-order.service';
import { StandingOrderExecutor } from './standing-order-executor';
import { AccountItem } from '../models/account-item';
import { RotationEntry } from '../models/rotationentry';
import { LogUtil } from '../utils/log-util';
import { Observable } from 'rxjs';
import { SortUtil } from '../utils/sort-util';


export class StandingOrderJob {

    constructor(
        private standingOrderExecutor: StandingOrderExecutor,
        private entryService: EntryV2Service,
        private standingOrderService: StandingOrderService) {
    }

    public executeStandingOrders(accountItem: AccountItem): void {

        this.standingOrderService.getRotationEntries(accountItem).subscribe(
            (standingOrders: RotationEntry[]) => {
                standingOrders.forEach( (standingOrder: RotationEntry) => {
                    LogUtil.info(this, 'prepare following standingORders: ' + JSON.stringify(standingOrder));
                    const entries = this.standingOrderExecutor.generateEntries(new Date(), standingOrder);

                    LogUtil.info(this, 'Generate Entries ' + JSON.stringify(entries));

                    if (entries.length === 0) {
                        LogUtil.debug(this, 'nothing to save');
                        return;
                    }

                    LogUtil.debug(this, 'neue entries: ' + entries.length);

                    const lastExecutedDate = SortUtil.getLatestCreatedEntry(entries).created_at;
                    standingOrder.last_executed = lastExecutedDate;

                    this.entryService.addEntries(accountItem, entries).subscribe(
                        success => {
                            LogUtil.debug(this, 'saved all entries and try to perist standing-order');
                            this.updateStandingOrder(accountItem, standingOrder);
                        },
                        error => {
                            LogUtil.error(this, 'failed to persist entries :-(');
                        }
                    );

                });
                return Observable.create();
            },
            error => {
                LogUtil.error(this, 'Failed to load standingOrders from account: ' + JSON.stringify(accountItem.account));
            }
        );
    }


    private updateStandingOrder(aAccountItem: AccountItem, aStandingOrder: RotationEntry): void {
        this.standingOrderService.updateRotationEntry(aAccountItem, aStandingOrder).subscribe(
            standingOrderResponse => {
                LogUtil.debug(this, 'Updated standingOrder: ' + JSON.stringify(aStandingOrder));
            },
            error => {
                // was passiert wenn hier was passiert? möglichst alles abbrechen
                LogUtil.error(this, 'Failed to update standingOrder: ' + JSON.stringify(aStandingOrder));
            }
        );
    }
}
