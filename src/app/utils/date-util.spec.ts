import { DateUtil } from './date-util';
import { LogUtil } from './log-util';




describe('date-util', function () {

    it('should tell that first is before second date and return true', () => {
        // prepare
        const firstDate = new Date(2018, 2, 1);
        const secondDate = new Date(2018, 3 , 5);

       // execute
        const result: boolean = DateUtil.firstIsBeforeSecond(firstDate, secondDate);

        // validate
        expect(result).toBe(true);
    });

    it('should tell that first is not before second date and return false', () => {
        // prepare
        const firstDate = new Date(2018, 4, 1);
        const secondDate = new Date(2018, 3 , 5);

        // execute
        const result: boolean = DateUtil.firstIsBeforeSecond(firstDate, secondDate);

        // validate
        expect(result).toBe(false);
    });

    it('should tell that first is after second date and return false', () => {
        // prepare
        const firstDate = new Date(2018, 2, 1);
        const secondDate = new Date(2018, 3 , 5);

        // execute
        const result: boolean = DateUtil.firstIsAfterSecond(firstDate, secondDate);

        // validate
        expect(result).toBe(false);
    });

    it('should tell that first is after second date and return true', () => {
        // prepare
        const firstDate = new Date(2018, 4, 1);
        const secondDate = new Date(2018, 3 , 5);

        // validate
        const result: boolean = DateUtil.firstIsAfterSecond(firstDate, secondDate);
        expect(result).toBe(true);
    });


    it('should define 0 months because two dates are in the same month', () => {

        // prepare
        const firstDate = new Date(2018, 3, 1);
        const secondDate = new Date(2018, 3 , 5);

        // execute
        const result: number = DateUtil.differenceInMonth(firstDate, secondDate);

        // vaidate
        expect(result).toBe(0);
    });

    it('should define 1 months because first is 2018-1-30 and second is 2018-2-28', () => {

        // prepare
        const firstDate = new Date(2018, 0, 30);
        const secondDate = new Date(2018, 1 , 28);

        // execute
        const result: number = DateUtil.differenceInMonth(firstDate, secondDate);

        // vaidate
        expect(result).toBe(1);
    });

    it('should produce new date + 1 month  25-2-2018 -> 25-3-2018', () => {
        // prepare
        const first = new Date(2018, 1, 25);
        const expectedDate = new  Date(2018, 2, 25);

        // execute
        const producedDate = DateUtil.plusMonth(first, 1);

        // vaidate
        expect(producedDate.getFullYear()).toBe(expectedDate.getFullYear());
        expect(producedDate.getMonth()).toBe(expectedDate.getMonth());
        expect(producedDate.getDate()).toBe(expectedDate.getDate());
    });

    it('should produce new date + 1 month  30-1-2018 -> 28-2-2018', () => {
        // prepare
        const first = new Date(2018, 0, 30);
        const expectedDate = new  Date(2018, 1, 28);

        // execute
        const producedDate = DateUtil.plusMonth(first, 1);

        // vaidate
        expect(producedDate.getFullYear()).toBe(expectedDate.getFullYear());
        expect(producedDate.getMonth()).toBe(expectedDate.getMonth());
        expect(producedDate.getDate()).toBe(expectedDate.getDate());
    });

    it('should define 1 quarter because first is 2018-1-30 and second is 2018-5-28', () => {

        // prepare
        const firstDate = new Date(2018, 0, 30);
        const secondDate = new Date(2018, 5 , 28);

        // execute
        const result: number = DateUtil.differenceInQuarter(firstDate, secondDate);

        // vaidate
        expect(result).toBe(1);
    });

    it('should define 3 quarter because first is 2018-1-30 and second is 2018-12-28', () => {
        // prepare
        const firstDate = new Date(2018, 0, 30);
        // Start   -> 30 Januar 2018
        // 1 Entry -> 30 April 2018
        // 2 Entry -> 30 Juli 2018
        // 3 Entry -> 30 Oktober 2018
        const secondDate = new Date(2018, 11 , 28);

        // execute
        const result: number = DateUtil.differenceInQuarter(firstDate, secondDate);

        // vaidate
        expect(result).toBe(3);
    });

    it('should define 0 quarter because first is 2017-12-15 and second is 2018-1-28', () => {
        // prepare
        const firstDate = new Date(2017, 11, 15);
        const secondDate = new Date(2018, 0 , 28);

        // execute
        const result: number = DateUtil.differenceInQuarter(firstDate, secondDate);

        // vaidate
        expect(result).toBe(0);
    });

    it('should define 0 year because is less then one year', () => {
        // prepare
        const firstDate = new Date(2017, 11, 15);
        const secondDate = new Date(2018, 10 , 28);

        // execute
        const result: number = DateUtil.differenceInYears(firstDate, secondDate);

        // vaidate
        expect(result).toBe(0);
    });

    it('should define 2 year because first is 2017-10-15 and second 2019-10-15', () => {
        // prepare
        const firstDate = new Date(2017, 9, 15);
        const secondDate = new Date(2019, 9 , 15);

        // execute
        const result: number = DateUtil.differenceInYears(firstDate, secondDate);

        // vaidate
        expect(result).toBe(2);
    });

} );
