import { DateSeriesStrategy } from './date-series-strategy';
import { LogUtil } from '../utils/log-util';
import { DateUtil } from '../utils/date-util';


export class MonthlySeriesProducer implements DateSeriesStrategy {

    public isValidStrategyPattern(standingOrderStragegy: string): boolean {
        if (standingOrderStragegy === 'monthly') {
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
