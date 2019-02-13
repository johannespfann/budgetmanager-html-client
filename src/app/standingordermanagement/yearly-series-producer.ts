import { DateSeriesStrategy } from './date-series-strategy';
import { DateUtil } from '../utils/date-util';

export class YearlySeriesProducer implements DateSeriesStrategy {

    public isValidStrategyPattern(standingOrderStragegy: string): boolean {
        if (standingOrderStragegy === 'yearly') {
            return true;
        }
        return false;
    }

    public produceDateSeries(from: Date, to: Date): Date[] {
        const dates: Date[] = [];

        const distanceInYears: number = DateUtil.differenceInYears(from, to);

        for (let index = 1; index <= distanceInYears; index++) {
            const newDate = DateUtil.plusMonth(from, 12 * index);
            dates.push(newDate);
        }

        return dates;
    }

}
