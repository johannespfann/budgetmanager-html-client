import { DateSeriesStrategy } from './date-series-strategy';
import { QuarterSeriesProducer } from './quarter-series-producer';
import { StandingOrderConst } from './standing-order-const';

describe('quarter-series-producer tests', function () {

    /**
     * class under test
     */
    let quarterSeriesProducer: DateSeriesStrategy;

    beforeEach(() => {

        /**
         * prepare monthlySeriesProducer
         */
        quarterSeriesProducer = new QuarterSeriesProducer();
    });

    it('should determine quarter-series-pattern as quarter and return true', () => {

        // execute
        const patternResult = quarterSeriesProducer.isValidStrategyPattern(StandingOrderConst.QUARTER_PATTERN);

        // validate
        expect(patternResult).toBe(true);
    });

    it('should produce 0 entries because second date is in the same quartal', () => {

        const lastExecuted = new Date(2018, 0, 5);
        const today = new Date(2018, 1, 25);

        // execute
        const entries = quarterSeriesProducer.produceDateSeries(lastExecuted, today);

        // validate
        expect(entries.length).toBe(0);
    });

    it('should produce 3 entries because first is 2018-8-30 and second is 2019-6-15 ', () => {

        const lastExecuted = new Date(2018, 7, 30);
        const today = new Date(2019, 5, 17);

        // execute
        const entries = quarterSeriesProducer.produceDateSeries(lastExecuted, today);


        entries.forEach( x => console.log(x));

        // validate
        expect(entries.length).toBe(3);
    });



});
