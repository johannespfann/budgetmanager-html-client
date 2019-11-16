import { Component, ViewChild, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { LogUtil } from '../../utils/log-util';
import { EntryInfoComponent } from '../../shared/entryinfocomponent/entry-info.component';
import { StandingOrderInfoComponent } from '../../shared/standingorderinfocomponent/standing-order-info.component';
import { RotationEntry } from '../../models/standingorder';
import { EntryInfo } from '../../shared/entryinfocomponent/entry-info';
import { StandingOrderInfo } from '../../shared/standingorderinfocomponent/standing-order-info';

@Component({
    selector: 'app-edit-standingorder-component',
    templateUrl: './edit-standingorder.component.html',
    styleUrls: ['./edit-standingorder.component.css']
})
export class EditStandingOrderComponent implements OnInit, OnChanges {

    @ViewChild(EntryInfoComponent)
    public entryComponent: EntryInfoComponent;

    @ViewChild(StandingOrderInfoComponent)
    public standingOrderComponent: StandingOrderInfoComponent;

    @Input()
    public standingorder: RotationEntry;

    @Output()
    public cancelPressed = new EventEmitter<boolean>();

    @Output()
    public deletedPressed = new EventEmitter<RotationEntry>();

    @Output()
    public changedPressed = new EventEmitter<RotationEntry>();

    constructor() {
        LogUtil.logInits(this, 'init standingorder-edit-component');
    }

    public ngOnInit(): void {
        this.initStandingOrderView(this.standingorder);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.initStandingOrderView(this.standingorder);
    }

    public change(): void {
        this.changedPressed.emit(this.createUpdatedStandingOrder());
    }

    public delete(): void {
        this.deletedPressed.emit(this.createUpdatedStandingOrder());
    }

    public cancel(): void {
        this.cancelPressed.emit(true);
    }

    private initStandingOrderView(standingOrder: RotationEntry) {
        const entryInfo = new EntryInfo();
        entryInfo.amount = standingOrder.amount;
        entryInfo.currency = 'EUR';
        entryInfo.memo = standingOrder.memo;
        entryInfo.tags = standingOrder.tags;
        const standingOrderInfo = new StandingOrderInfo();
        standingOrderInfo.start_at = standingOrder.start_at;
        standingOrderInfo.last_executed = standingOrder.last_executed;
        standingOrderInfo.end_at = standingOrder.end_at;
        standingOrderInfo.rotation_strategy = standingOrder.rotation_strategy;
        this.entryComponent.initEntryView(entryInfo);
        this.standingOrderComponent.initStandingOrderView(standingOrderInfo);
    }

    private createUpdatedStandingOrder(): RotationEntry {
        const newStandingOrder = new RotationEntry();
        const entryInfo = this.entryComponent.getEntryInfo();
        const standingOrderInfo = this.standingOrderComponent.getStandingOrderInfo();
        newStandingOrder.hash = this.standingorder.hash;
        newStandingOrder.amount = entryInfo.amount;
        newStandingOrder.currency = entryInfo.currency;
        newStandingOrder.memo = entryInfo.memo;
        newStandingOrder.tags = entryInfo.tags;
        newStandingOrder.start_at = standingOrderInfo.start_at;
        newStandingOrder.last_executed = standingOrderInfo.last_executed;
        newStandingOrder.end_at = standingOrderInfo.end_at;
        newStandingOrder.rotation_strategy = standingOrderInfo.rotation_strategy;
        return newStandingOrder;
    }

}
