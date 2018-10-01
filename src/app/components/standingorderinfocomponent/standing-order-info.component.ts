import { Component, OnInit } from '@angular/core';
import { StandingOrderInfo } from './standing-order-info';
import { LogUtil } from '../../utils/log-util';

@Component({
    selector: 'app-bm-standing-order-info',
    templateUrl: './standing-order-info.component.html',
    styleUrls: ['./standing-order-info.component.css']
})
export class StandingOrderInfoComponent implements OnInit {


    public startRotationDate: Date;
    public lastExecutedDate: Date;
    public endRotrationDate: Date;
    public isMonthly = false;
    public isQuarterly = false;
    public isYearly = false;


    public constructor() {
        LogUtil.info(this, 'init standingOrderComponent');
        this.cleanStandOrderView();
    }

    public ngOnInit(): void {

    }

    public getStandingOrderInfo(): StandingOrderInfo {
        const standingOrderInfo = new StandingOrderInfo();
        standingOrderInfo.last_executed = this.lastExecutedDate;
        standingOrderInfo.start_at = this.startRotationDate;
        standingOrderInfo.end_at = this.endRotrationDate;
        standingOrderInfo.rotation_strategy = this.getRotationStrategy();
        return standingOrderInfo;
    }

    public initStandingOrderView(orderInfo: StandingOrderInfo): void {
        this.startRotationDate = orderInfo.start_at;
        this.endRotrationDate = orderInfo.end_at;
        this.lastExecutedDate = orderInfo.last_executed;
        this.setRotationStrategy(orderInfo.rotation_strategy);
    }

    public cleanStandOrderView(): void {
        this.setMonthly();
        this.startRotationDate = new Date();
    }

    private setRotationStrategy(aValue: string): void {
        if (aValue === '66122') {
            this.setMonthly();
        }
        if (aValue === '36133') {
            this.setQuarterly();
        }
        if (aValue === '5679') {
            this.setYearly();
        }
    }

    private getRotationStrategy(): string {
        if (this.isMonthly) {
            return '66122';
        }
        if (this.isQuarterly) {
            return '36133';
        }
        if (this.isYearly) {
            return '5679';
        }
    }

    public setMonthly(): void {
        this.isMonthly = true;
        this.isQuarterly = false;
        this.isYearly = false;
    }

    public setQuarterly(): void {
        this.isMonthly = false;
        this.isQuarterly = true;
        this.isYearly = false;
    }

    public setYearly(): void {
        this.isMonthly = false;
        this.isQuarterly = false;
        this.isYearly = true;
    }
}
