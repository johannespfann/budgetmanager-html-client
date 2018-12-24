import { Component, OnChanges, Input, Output, EventEmitter, SimpleChanges, OnInit } from '@angular/core';
import { RotationEntry } from '../../models/rotationentry';
import { LogUtil } from '../../utils/log-util';
import { Packager } from '../../utils/packager';

@Component({
    selector: 'app-standingorder-list',
    templateUrl: './standingorder-list.component.html',
    styleUrls: ['./standingorder-list.component.css']
})
export class StandingOrderListComponent implements OnChanges, OnInit {

    @Input()
    public standingOrders: RotationEntry[];

    public monthlyStandingOrders: RotationEntry[];
    public quarterlyStandOrder: RotationEntry[];
    public yeartlyStandingOrder: RotationEntry[];

    @Output()
    public editPressed = new EventEmitter<RotationEntry>();

    constructor() {
        LogUtil.debug(this, 'init standingorder-list-component');
        this.standingOrders = [];
    }

    public editStandingOrder(aStandingOrder: RotationEntry): void {
        this.editPressed.emit(aStandingOrder);
    }

    public ngOnInit(): void {
       // default
    }

    public ngOnChanges(aCanges: SimpleChanges): void {
        LogUtil.debug(this, 'onChanges');
        this.updateRotationEntries();
    }

    private updateRotationEntries() {
        this.monthlyStandingOrders = [];
        this.quarterlyStandOrder = [];
        this.yeartlyStandingOrder = [];

        if (this.standingOrders === undefined) {
            LogUtil.error(this, 'standingOrder was undefined!');
            return;
        }

        this.standingOrders.forEach( (aRotatatinEntry: RotationEntry) => {
            if (aRotatatinEntry.rotation_strategy === '66122') {
                this.monthlyStandingOrders.push(aRotatatinEntry);
            }

            if (aRotatatinEntry.rotation_strategy === '36133') {
                this.quarterlyStandOrder.push(aRotatatinEntry);
            }

            if (aRotatatinEntry.rotation_strategy === '5679') {
                this.yeartlyStandingOrder.push(aRotatatinEntry);
            }
        });

    }
}
