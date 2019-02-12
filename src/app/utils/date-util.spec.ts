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

} );
