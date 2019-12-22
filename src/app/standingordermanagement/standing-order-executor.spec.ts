
import { StandingOrder } from '../models/standingorder';
import { StandingOrderExecutor } from './standing-order-executor';
import { Entry } from '../models/entry';
import { HashUtil } from '../utils/hash-util';
import { DateSeriesStrategy } from './date-series-strategy';
import { MonthlySeriesProducer } from './monthly-series-producer';
import { QuarterSeriesProducer } from './quarter-series-producer';
import { YearlySeriesProducer } from './yearly-series-producer';
import { Tag } from '../models/tag';
import { StandingOrderConst } from './standing-order-const';

describe('standing-order-executor', function () {

    /**
     * attributes - standingorderss
     */

    let simpleStandingOrder: StandingOrder;
    let monthlyStandingOrder: StandingOrder;
    let yearlyStandingOrder: StandingOrder;
    let quarterStandingOrder: StandingOrder;

    /**
     * attributes example entry
     */

    let amount: number;
    let currency: string;
    let tags: Tag[] = [];
    let memo: string;
    let username: string;

    /**
     * class under test
     */
    let standingOrderExecutor: StandingOrderExecutor;

    beforeEach(() => {

        /**
         * prepare default - entry
         */

        amount = 2;
        memo = 'defaultmemo';
        tags = [];
        currency = 'EUR';
        username = 'johannes-test';

        /**
         * prepare simplestandingorder
         */

        simpleStandingOrder = new StandingOrder();
        simpleStandingOrder.amount = amount;
        simpleStandingOrder.currency = currency;
        simpleStandingOrder.tags = tags;
        simpleStandingOrder.username = username;
        simpleStandingOrder.memo = memo;
        simpleStandingOrder.hash = HashUtil.getUniqueHash();
        simpleStandingOrder.rotation_strategy = StandingOrderConst.MONTHLY_PATTERN;

        simpleStandingOrder.start_at = new Date(2018, 1, 5);
        simpleStandingOrder.end_at = new Date(2019, 3, 9);
        simpleStandingOrder.last_executed = new Date(2018, 2, 2);


        /**
         * prepare montlyStandingOrder
         */

        monthlyStandingOrder = new StandingOrder();
        monthlyStandingOrder.amount = amount;
        monthlyStandingOrder.currency = currency;
        monthlyStandingOrder.tags = tags;
        monthlyStandingOrder.username = username;
        monthlyStandingOrder.memo = memo;
        monthlyStandingOrder.rotation_strategy = StandingOrderConst.MONTHLY_PATTERN;

        /**
         * prepare yearlyStandingOrder
         */

        yearlyStandingOrder = new StandingOrder();
        yearlyStandingOrder.amount = amount;
        yearlyStandingOrder.currency = currency;
        yearlyStandingOrder.tags = tags;
        yearlyStandingOrder.username = username;
        yearlyStandingOrder.rotation_strategy = StandingOrderConst.YEARLY_PATTERN;

        /**
         * prepare quarterStandingOrder
         */

        quarterStandingOrder = new StandingOrder();
        quarterStandingOrder.amount = amount;
        quarterStandingOrder.currency = currency;
        quarterStandingOrder.tags = tags;
        quarterStandingOrder.username = username;
        quarterStandingOrder.rotation_strategy = StandingOrderConst.QUARTER_PATTERN;


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
        const today = new Date(2018, 1, 5);
        const entries: Entry[] = standingOrderExecutor.generateEntries(today, simpleStandingOrder);
        // validate
        expect(entries.length).toBe(0);
    });


    it('should produce 1 entry and all attribues for entries are valid', () => {
        // prepare

        const startDate = new Date(2018, 1, 2);
        const endDate = new Date(2019, 1, 1);

        monthlyStandingOrder.start_at = startDate;
        monthlyStandingOrder.end_at = endDate;

        const today = new Date(2018, 2, 1);
        const entries: Entry[] = standingOrderExecutor.generateEntries(today, monthlyStandingOrder);
        const entry = entries[0];
        // validate
        expect(entries.length).toBe(1);
        expect(entry.amount).toBe(amount);
        expect(entry.memo).toBe(memo);
        expect(entry.hash).toBeDefined();
        expect(entry.currency).toBe(currency);
        expect(entry.tags).toBe(tags);
    });

    it('should produce 13 entry with monthlyStrategy', () => {
        // prepare

        const startDate = new Date(2018, 1, 1);
        const endDate = new Date(2022, 1, 1);
        monthlyStandingOrder.start_at = startDate;
        monthlyStandingOrder.end_at = endDate;
        const today = new Date(2019, 1, 1);

        // execute
        const entries: Entry[] = standingOrderExecutor.generateEntries(today, monthlyStandingOrder);

        // validate
        expect(entries.length).toBe(13);
    });

    it('should produce 11 entry with monthlyStrategy  + last executed', () => {
        // prepare

        const startDate = new Date(2018, 1, 1);
        const lastExecuted = new Date(2018, 2, 1);
        const endDate = new Date(2022, 1, 1);
        monthlyStandingOrder.start_at = startDate;
        monthlyStandingOrder.last_executed = lastExecuted;
        monthlyStandingOrder.end_at = endDate;
        const today = new Date(2019, 1, 1);

        // execute
        const entries: Entry[] = standingOrderExecutor.generateEntries(today, monthlyStandingOrder);

        // validate
        expect(entries.length).toBe(11);
    });

    it('should produce 2 entry with monthlyStrategy', () => {
        // prepare

        const startDate = new Date(2018, 0, 31);
        const today = new Date(2018, 1, 28);
        const endDate = new Date(2022, 1, 1);
        monthlyStandingOrder.start_at = startDate;
        monthlyStandingOrder.end_at = endDate;


        // execute
        const entries: Entry[] = standingOrderExecutor.generateEntries(today, monthlyStandingOrder);

        // validate
        expect(entries.length).toBe(2);
    });

    it('should produce 2 entry with monthlyStrategy - over feb 28 Problem + last executed', () => {
        // prepare
        const startDate = new Date(2018, 0, 31);
        const lastExecuted = new Date(2018, 1, 28);
        const today = new Date(2018, 3, 30);
        const endDate = new Date(2022, 1, 1);
        monthlyStandingOrder.start_at = startDate;
        monthlyStandingOrder.last_executed = lastExecuted;
        monthlyStandingOrder.end_at = endDate;


        // execute
        const entries: Entry[] = standingOrderExecutor.generateEntries(today, monthlyStandingOrder);

        // validate
        expect(entries.length).toBe(2);
    });


    it('should produce 3 entry with yearlyStrategy', () => {
        // prepare

        const startDate = new Date(2018, 1, 1);
        const today = new Date(2020, 1, 1);
        const endDate = new Date(2022, 1, 1);
        yearlyStandingOrder.start_at = startDate;
        yearlyStandingOrder.end_at = endDate;


        // execute
        const entries: Entry[] = standingOrderExecutor.generateEntries(today, yearlyStandingOrder);

        // validate
        expect(entries.length).toBe(3);
    });

    it('should produce 1 entry with yearlyStrategy', () => {
        // prepare

        const startDate = new Date(2018, 1, 1);
        const lastExecuted = new Date(2019, 1, 1);
        const today = new Date(2020, 1, 1);
        const endDate = new Date(2022, 1, 1);
        yearlyStandingOrder.start_at = startDate;
        yearlyStandingOrder.last_executed = lastExecuted;
        yearlyStandingOrder.end_at = endDate;


        // execute
        const entries: Entry[] = standingOrderExecutor.generateEntries(today, yearlyStandingOrder);

        // validate
        expect(entries.length).toBe(1);
    });

    it('should produce 7 entry with quarterStrategy', () => {
        // prepare
        const startDate = new Date(2018, 1, 1);
        const endDate = new Date(2022, 1, 1);
        const today = new Date(2019, 7, 8);
        quarterStandingOrder.start_at = startDate;
        quarterStandingOrder.end_at = endDate;


        // execute
        const entries: Entry[] = standingOrderExecutor.generateEntries(today, quarterStandingOrder);

        // validate
        expect(entries.length).toBe(7);
    });

    it('should produce 7 entry with quarterStrategy', () => {
        // prepare
        const startDate = new Date(2018, 1, 1);
        const lastExecuted = new Date(2018, 4, 1);
        const today = new Date(2019, 7, 8);
        const endDate = new Date(2022, 1, 1);

        quarterStandingOrder.start_at = startDate;
        quarterStandingOrder.last_executed = lastExecuted;
        quarterStandingOrder.end_at = endDate;


        // execute
        const entries: Entry[] = standingOrderExecutor.generateEntries(today, quarterStandingOrder);

        // validate
        expect(entries.length).toBe(5);
    });

    it('should produce in the second run 0 entries', () => {
         // prepare
         const startDate = new Date(2018, 0, 31);
         const today = new Date(2018, 1, 28);
         const dayOfSecondRun = new Date(2018, 1, 28);
         const endDate = new Date(2022, 1, 1);
         monthlyStandingOrder.start_at = startDate;
         monthlyStandingOrder.end_at = endDate;
 
         // execute
         const entries: Entry[] = standingOrderExecutor.generateEntries(today, monthlyStandingOrder);
         monthlyStandingOrder.last_executed = today
         const secondEntries: Entry[] = standingOrderExecutor.generateEntries(dayOfSecondRun, monthlyStandingOrder);
 
         // validate
         expect(entries.length).toBe(2);
         expect(secondEntries.length).toBe(0)

    });

});
