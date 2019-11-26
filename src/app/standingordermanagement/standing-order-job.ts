import { EntryService } from '../services/entry.service';
import { StandingOrderService } from '../services/standing-order.service';
import { StandingOrderExecutor } from './standing-order-executor';
import { AccountItem } from '../models/account-item';
import { StandingOrder } from '../models/standingorder';
import { LogUtil } from '../utils/log-util';
import { Observable } from 'rxjs';
import { SortUtil } from '../utils/sort-util';


export class StandingOrderJob {

    constructor(
        private standingOrderExecutor: StandingOrderExecutor,
        private entryService: EntryService,
        private standingOrderService: StandingOrderService) {
    }

    public executeStandingOrders(accountItem: AccountItem): void {
        LogUtil.info(this, 'process standingorders');
        this.standingOrderService.getRotationEntries(accountItem).subscribe(
            (standingOrders: StandingOrder[]) => {
                LogUtil.debug(this, 'Get All rotationEntries: ' + JSON.stringify(standingOrders.length));
                standingOrders.forEach( (standingOrder: StandingOrder) => {
                    LogUtil.debug(this, 'Process StandingOrder ' + standingOrder.memo);
                    const entries = this.standingOrderExecutor.generateEntries(new Date(), standingOrder);

                    if (entries.length === 0) {
                        LogUtil.debug(this, 'nothing to save');
                        return;
                    }

                    LogUtil.debug(this, 'generate and save ' + entries.length + ' entries for ' + standingOrder.memo);

                    const lastExecutedDate = SortUtil.getLatestCreatedEntry(entries).created_at;
                    const lastDate = new Date();
                    lastDate.setFullYear(lastExecutedDate.getFullYear());
                    lastDate.setMonth(lastExecutedDate.getMonth());
                    lastDate.setDate(lastExecutedDate.getDate());
                    lastDate.setHours(lastExecutedDate.getHours());
                    lastDate.setMinutes(lastExecutedDate.getMinutes());

                    standingOrder.last_executed = lastDate;

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


    private updateStandingOrder(aAccountItem: AccountItem, aStandingOrder: StandingOrder): void {
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
