import { StandingOrder } from '../models/standingorder';
import { Entry } from '../models/entry';
import { DateUtil } from '../utils/date-util';
import { DateSeriesStrategy } from './date-series-strategy';
import { HashUtil } from '../utils/hash-util';
import { Tag } from '../models/tag';


export class StandingOrderExecutor {

    public static PRODUCER_PREFIX = 'automatic-order:'

    private dateSeriesStrategies: DateSeriesStrategy[];

    constructor(strategies: DateSeriesStrategy[]) {
        this.dateSeriesStrategies = strategies;
    }


    public generateEntries(today: Date, standingOrder: StandingOrder): Entry[] {

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

    private produceEntries(generatedDatesTemp: Date[], standingOrder: StandingOrder): Entry[] {
        const entries: Entry[] = [];
        generatedDatesTemp.forEach( (date: Date) => {
            const entry = new Entry();
            entry.amount = standingOrder.amount;
            entry.currency = standingOrder.currency;
            entry.hash = HashUtil.getUniqueHash().toString();
            entry.memo = standingOrder.memo;
            entry.tags = standingOrder.tags;
            const tag = new Tag()
            tag.name = StandingOrderExecutor.PRODUCER_PREFIX + standingOrder.hash;
            entry.tags.push(tag)
            entry.created_at = date;
            entries.push(entry);
        });
        return entries;
    }

    private produceBeginningDate(standingOrder: StandingOrder): Date {
        const beginningDate: Date = new Date();

        // falls noch nie ausgeführt
        if (!standingOrder.last_executed) {
            standingOrder.last_executed = standingOrder.start_at;
        }

        if (DateUtil.firstIsAfterSecond(standingOrder.start_at, standingOrder.last_executed)) {
            standingOrder.last_executed = standingOrder.start_at;
        }

        beginningDate.setFullYear(standingOrder.last_executed.getFullYear());
        beginningDate.setMonth(standingOrder.last_executed.getMonth());

        const dayOfLastExecuted = standingOrder.last_executed.getDate();

        // lastexecuted ist ab jetzt immer der ausführungstag -> beginnen immer bei der letzten ausführung oder immer am starttag?

        beginningDate.setDate(dayOfLastExecuted);
        

        beginningDate.setHours(standingOrder.last_executed.getHours());
        beginningDate.setMinutes(standingOrder.last_executed.getMinutes());
        beginningDate.setSeconds(standingOrder.last_executed.getSeconds());
        beginningDate.setMilliseconds(standingOrder.last_executed.getMilliseconds());

        return beginningDate;
    }

    private isInScope(today: Date, standingOrder: StandingOrder): boolean {
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
