import { YearlySeriesProducer } from './yearly-series-producer';
import { DateSeriesStrategy } from './date-series-strategy';
import { StandingOrderConst } from './standing-order-const';

describe('yearly-series-producer tests', function () {

    /**
     * class under test
     */
    let yearlySeriesProducer: DateSeriesStrategy;

    beforeEach(() => {

        /**
         * prepare monthlySeriesProducer
         */
        yearlySeriesProducer = new YearlySeriesProducer();
    });

    it('should determine yearly-series-pattern as yearly and return true', () => {

        // execute
        const patternResult = yearlySeriesProducer.isValidStrategyPattern(StandingOrderConst.YEARLY_PATTERN);

        // validate
        expect(patternResult).toBe(true);
    });


    it('should produce 0 erntries because less then one year', () => {

        const lastExecuted = new Date(2018, 7, 30);
        const today = new Date(2019, 5, 17);

        // execute
        const entries = yearlySeriesProducer.produceDateSeries(lastExecuted, today);


        // validate
        expect(entries.length).toBe(0);
    });

    it('should produce 2 erntries because distance is one year', () => {

        const lastExecuted = new Date(2018, 7, 15);
        const today = new Date(2019, 7, 15);

        // execute
        const entries = yearlySeriesProducer.produceDateSeries(lastExecuted, today);

        // validate
        expect(entries.length).toBe(1);
    });



});
