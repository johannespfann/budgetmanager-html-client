import { Component, OnInit } from '@angular/core';
import { StandingOrderInfo } from './standing-order-info';
import { LogUtil } from '../../utils/log-util';
import { StandingOrderConst } from '../../standingordermanagement/standing-order-const';

@Component({
    selector: 'app-standing-order-info',
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
        LogUtil.logInits(this, 'init standingorder-component');
    }

    public ngOnInit(): void {
        this.cleanStandOrderView();
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
        if (aValue === StandingOrderConst.MONTHLY_PATTERN) {
            this.setMonthly();
        }
        if (aValue === StandingOrderConst.QUARTER_PATTERN) {
            this.setQuarterly();
        }
        if (aValue === StandingOrderConst.YEARLY_PATTERN) {
            this.setYearly();
        }
    }

    private getRotationStrategy(): string {
        if (this.isMonthly) {
            return StandingOrderConst.MONTHLY_PATTERN;
        }
        if (this.isQuarterly) {
            return StandingOrderConst.QUARTER_PATTERN;
        }
        if (this.isYearly) {
            return StandingOrderConst.YEARLY_PATTERN;
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
