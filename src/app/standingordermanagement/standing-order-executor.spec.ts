
import { RotationEntry } from '../models/rotationentry';
import { StandingOrderExecutor } from './standing-order-executor';
import { Entry } from '../models/entry';
import { HashUtil } from '../utils/hash-util';
import { DateSeriesStrategy } from './date-series-strategy';
import { MonthlySeriesProducer } from './monthly-series-producer';
import { QuarterSeriesProducer } from './quarter-series-producer';
import { YearlySeriesProducer } from './yearly-series-producer';

describe('standing-order-executor', function () {

    /**
     * attributes
     */
    let simpleStandingOrder: RotationEntry;

    /**
     * class under test
     */
    let standingOrderExecutor: StandingOrderExecutor;

    beforeEach(() => {

        /**
         * prepare simplestandingorder
         */
        simpleStandingOrder = new RotationEntry();
        simpleStandingOrder.amount = 2;
        simpleStandingOrder.currency = 'EUR';
        simpleStandingOrder.tags = [];
        simpleStandingOrder.username = 'johannes-test';
        simpleStandingOrder.hash = HashUtil.getUniqueHash();
        simpleStandingOrder.memo = 'Memo';
        simpleStandingOrder.rotation_strategy = 'montly';

        simpleStandingOrder.start_at = new Date(2018, 1, 5);
        simpleStandingOrder.end_at = new Date(2019, 3, 9);
        simpleStandingOrder.last_executed = new Date(2018, 2, 2);

        /**
         * prepare standingorderexecutor
         */
        const strategies: DateSeriesStrategy[] = [];
        strategies.push(new MonthlySeriesProducer());
        strategies.push(new QuarterSeriesProducer());
        strategies.push(new YearlySeriesProducer());
        standingOrderExecutor = new StandingOrderExecutor(strategies);
    });

    it('should produce 0 entries because today is before start_date', () => {
        // prepare
        const today = new Date(2018, 1, 1);
        const entries: Entry[] = standingOrderExecutor.generateEntries(today, simpleStandingOrder);
        // validate
        expect(entries.length).toBe(0);
    });

    it('should produce 0 entries because today is after end_date', () => {
        // prepare
        const today = new Date(2018, 2, 5);
        const entries: Entry[] = standingOrderExecutor.generateEntries(today, simpleStandingOrder);
        // validate
        expect(entries.length).toBe(0);
    });


    it('TODO -> ', () => {
        // prepare
        const today = new Date(2018, 2, 5);
        const entries: Entry[] = standingOrderExecutor.generateEntries(today, simpleStandingOrder);
        // validate
        expect(entries.length).toBe(2);
    });

} );
