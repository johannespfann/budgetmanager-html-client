import { DateSeriesStrategy } from './date-series-strategy';
import { DateUtil } from '../utils/date-util';
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

        const dates: Date[] = [];
        const differenceInMonth: number = DateUtil.differenceInMonth(from, to);

        for (let index = 1; index <= differenceInMonth; index++) {
            const newDate = DateUtil.plusMonth(from, index);
            dates.push(newDate);
        }

        return dates;
    }

}
