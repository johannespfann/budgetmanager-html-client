import { DateSeriesStrategy } from './date-series-strategy';
import { LogUtil } from '../utils/log-util';
import { DateUtil } from '../utils/date-util';
import { StandingOrderApiService } from '../rest/standing-order-api.service';
import { StandingOrderConst } from './standing-order-const';


export class MonthlySeriesProducer implements DateSeriesStrategy {

    public getStrategyName(): string {
        return MonthlySeriesProducer.name;
    }

    public isValidStrategyPattern(standingOrderStragegy: string): boolean {
        if (standingOrderStragegy === StandingOrderConst.MONTHLY_PATTERN) {
            return true;
        }
        return false;
    }

    public produceDateSeries(from: Date, to: Date): Date[] {
        LogUtil.info(this, 'Starttime: ' + from);
        LogUtil.info(this, 'Endtime  : ' + to);

        const dates: Date[] = [];
        const differenceInMonth: number = DateUtil.differenceInMonth(from, to);


        for (let index = 1; index <= differenceInMonth; index++) {
            const newDate = DateUtil.plusMonth(from, index);
            dates.push(newDate);
        }


        LogUtil.info(this, 'Produced: ' + JSON.stringify(dates));
        return dates;
    }


}
