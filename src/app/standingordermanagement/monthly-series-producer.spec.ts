import { DateSeriesStrategy } from './date-series-strategy';
import { MonthlySeriesProducer } from './monthly-series-producer';
import { StandingOrderConst } from './standing-order-const';


describe('monthly-series-producer tests', function () {

    /**
     * class under test
     */
    let monthlySeriesProducer: DateSeriesStrategy;

    beforeEach(() => {

        /**
         * prepare monthlySeriesProducer
         */
        monthlySeriesProducer = new MonthlySeriesProducer();
    });

    it('should determine monthly-series-pattern as monthly and return true', () => {

        // execute
        const patternResult = monthlySeriesProducer.isValidStrategyPattern(StandingOrderConst.MONTHLY_PATTERN);

        // validate
        expect(patternResult).toBe(true);
    });

    it('should produce 4 date-objects', () => {
        // prepare
        const lastExecuted = new Date(2018, 0, 5);
        const today = new Date(2018, 4, 5);

        // execute
        const result = monthlySeriesProducer.produceDateSeries(lastExecuted, today);

        // validate
        expect(result.length).toBe(4);
    });

    it('should produce 0 date-objects - today is in the same month ', () => {
        // prepare
        const lastExecuted = new Date(2018, 1, 1);
        const today = new Date(2018, 1, 2);

        // execute
        const result = monthlySeriesProducer.produceDateSeries(lastExecuted, today);

        // validate
        expect(result.length).toBe(0);
    });

    it('should produce 0 date-objects because today is in different month but 1 day before', () => {
        // prepare
        const lastExecuted = new Date(2018, 1, 5);
        const today = new Date(2018, 2, 4);

        // execute
        const result = monthlySeriesProducer.produceDateSeries(lastExecuted, today);

        // validate
        expect(result.length).toBe(0);
    });




});
