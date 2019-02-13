import { DateSeriesStrategy } from './date-series-strategy';
import { StandingOrderConst } from './standing-order-const';
import { DateUtil } from '../utils/date-util';

export class QuarterSeriesProducer implements DateSeriesStrategy {

    public isValidStrategyPattern(standingOrderStragegy: string): boolean {
        if (standingOrderStragegy === StandingOrderConst.QUARTER_PATTERN) {
            return true;
        }
        return false;
    }

    public produceDateSeries(from: Date, to: Date): Date[] {
        const dates: Date[] = [];

        const differenceInQuarter: number = DateUtil.differenceInQuarter(from, to);

        for (let index = 1; index <= differenceInQuarter; index++) {
            const newDate = DateUtil.plusMonth(from, 3 * index);
            dates.push(newDate);
        }

        return dates;
    }



}
