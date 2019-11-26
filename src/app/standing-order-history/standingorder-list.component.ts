import { Component, OnChanges, Input, Output, EventEmitter, SimpleChanges, OnInit } from '@angular/core';
import { StandingOrder } from '../models/standingorder';
import { LogUtil } from '../utils/log-util';
import { StandingOrderConst } from '../standingordermanagement/standing-order-const';

@Component({
    selector: 'app-standingorder-list',
    templateUrl: './standingorder-list.component.html',
    styleUrls: ['./standingorder-list.component.css']
})
export class StandingOrderListComponent implements OnChanges, OnInit {

    @Input()
    public standingOrders: StandingOrder[];

    public monthlyStandingOrders: StandingOrder[];
    public quarterlyStandOrder: StandingOrder[];
    public yeartlyStandingOrder: StandingOrder[];

    @Output()
    public editPressed = new EventEmitter<StandingOrder>();

    constructor() {
        LogUtil.logInits(this, 'init standingorder-list-component');
    }

    public editStandingOrder(aStandingOrder: StandingOrder): void {
        this.editPressed.emit(aStandingOrder);
    }

    public ngOnInit(): void {
       // default
    }

    public ngOnChanges(aCanges: SimpleChanges): void {
        this.updateRotationEntries();
    }

    private updateRotationEntries() {
        this.monthlyStandingOrders = [];
        this.quarterlyStandOrder = [];
        this.yeartlyStandingOrder = [];

        if (!this.standingOrders) {
            LogUtil.error(this, 'was undefined');
            return;
        }

        this.standingOrders.forEach( (aRotatatinEntry: StandingOrder) => {
            if (aRotatatinEntry.rotation_strategy === StandingOrderConst.MONTHLY_PATTERN) {
                this.monthlyStandingOrders.push(aRotatatinEntry);
            }

            if (aRotatatinEntry.rotation_strategy === StandingOrderConst.QUARTER_PATTERN) {
                this.quarterlyStandOrder.push(aRotatatinEntry);
            }

            if (aRotatatinEntry.rotation_strategy === StandingOrderConst.YEARLY_PATTERN) {
                this.yeartlyStandingOrder.push(aRotatatinEntry);
            }
        });

    }
}
