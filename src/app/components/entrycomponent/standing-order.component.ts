import { Component } from '@angular/core';
import { StandingOrderInfo } from './standing-order-info';
import { DateUtil } from '../../utils/date-util';
import { LogUtil } from '../../utils/log-util';

@Component({
    selector: 'app-bm-standing-order-info',
    templateUrl: './standing-order.component.html',
    styleUrls: ['./standing-order.component.css']
})
export class StandingOrderComponent {

    public startRotationDate: Date;
    public isMonthly = false;
    public isQuarterly = false;
    public isYearly = false;


    public constructor() {
        LogUtil.info(this, 'init standingOrderComponent');
        this.cleanStandOrderView();
    }

    public getStandingOrderInfo(): StandingOrderInfo {
        const standingOrderInfo = new StandingOrderInfo();
        standingOrderInfo.last_executed = null;
        standingOrderInfo.start_at = this.startRotationDate;
        standingOrderInfo.end_at = DateUtil.getMaximumDate();
        standingOrderInfo.rotation_strategy = this.getRotationStrategy();
        return standingOrderInfo;
    }

    public cleanStandOrderView(): void {
        this.setMonthly();
        this.startRotationDate = new Date();
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
