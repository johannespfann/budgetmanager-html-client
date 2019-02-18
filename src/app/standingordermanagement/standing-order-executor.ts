import { RotationEntry } from '../models/rotationentry';
import { Entry } from '../models/entry';
import { DateUtil } from '../utils/date-util';
import { DateSeriesStrategy } from './date-series-strategy';
import { HashUtil } from '../utils/hash-util';


export class StandingOrderExecutor {

    private dateSeriesStrategies: DateSeriesStrategy[];

    constructor(strategies: DateSeriesStrategy[]) {
        this.dateSeriesStrategies = strategies;
    }


    public generateEntries(today: Date, standingOrder: RotationEntry): Entry[] {

        let generatedEntries: Entry[] = [];

        if (!this.isInScope(today, standingOrder)) {
            return generatedEntries;
        }

        this.dateSeriesStrategies.forEach( strategy => {
            if (strategy.isValidStrategyPattern(standingOrder.rotation_strategy)) {
                const from: Date = this.produceBeginningDate(standingOrder);
                const collectedDates: Date[] = [];


                if (DateUtil.sameDate(from, standingOrder.start_at)) {
                    collectedDates.push(from);
                }

                strategy.produceDateSeries(from, today).forEach( date => {
                    collectedDates.push(date);
                });

                generatedEntries = this.produceEntries(collectedDates, standingOrder);
            }
        });

        return generatedEntries;
    }

    private produceEntries(generatedDatesTemp: Date[], standingOrder: RotationEntry): Entry[] {
        const entries: Entry[] = [];
        generatedDatesTemp.forEach( (date: Date) => {
            const entry = new Entry();
            entry.amount = standingOrder.amount;
            entry.currency = standingOrder.currency;
            entry.hash = HashUtil.getUniqueHash().toString();
            entry.memo = standingOrder.memo;
            entry.tags = standingOrder.tags;
            entry.created_at = date;
            entries.push(entry);
        });
        return entries;
    }

    private produceBeginningDate(standingOrder: RotationEntry): Date {
        const beginningDate: Date = new Date();

        if (!standingOrder.last_executed) {
            standingOrder.last_executed = standingOrder.start_at;
        }

        if (DateUtil.firstIsAfterSecond(standingOrder.start_at, standingOrder.last_executed)) {
            standingOrder.last_executed = standingOrder.start_at;
        }

        beginningDate.setFullYear(standingOrder.last_executed.getFullYear());
        beginningDate.setMonth(standingOrder.last_executed.getMonth());

        const dayOfStartDate = standingOrder.start_at.getDate();
        const dayOfLastDate = standingOrder.last_executed.getDate();

        if (dayOfLastDate < dayOfStartDate) {
            beginningDate.setDate(dayOfLastDate);
        } else {
            beginningDate.setDate(dayOfStartDate);
        }

        beginningDate.setHours(standingOrder.last_executed.getHours());
        beginningDate.setMinutes(standingOrder.last_executed.getMinutes());
        beginningDate.setSeconds(standingOrder.last_executed.getSeconds());
        beginningDate.setMilliseconds(standingOrder.last_executed.getMilliseconds());

        return beginningDate;
    }

    private isInScope(today: Date, standingOrder: RotationEntry): boolean {
        let result = true;

        if (DateUtil.firstIsBeforeSecond(today, standingOrder.start_at)) {
            result = false;
        }

        if (DateUtil.firstIsAfterSecond(today, standingOrder.end_at)) {
            result = false;
        }
        return result;
    }
}
