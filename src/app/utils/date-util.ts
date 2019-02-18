import * as dataFns from 'date-fns';
import { LogUtil } from './log-util';



export class DateUtil {
    public static sameDate(from: Date, start_at: Date): any {
        let same = true;
        if (from.getUTCFullYear() !== start_at.getUTCFullYear()) {
            LogUtil.info(this, 'year -> false : ' + from.getUTCFullYear() + ' and ' + start_at.getUTCFullYear());
            same = false;
        }

        if (from.getUTCMonth() !== start_at.getUTCMonth()) {
            LogUtil.info(this, 'month -> false : ' + from.getUTCMonth() + ' and ' + start_at.getUTCMonth());
            same = false;
        }

        if (from.getUTCDate() !== start_at.getUTCDate()) {
            LogUtil.info(this, 'date -> false : ' + from.getUTCDate() + ' and ' + start_at.getUTCDate());
            same = false;
        }

        if (from.getUTCHours() !== start_at.getUTCHours()) {
            LogUtil.info(this, 'hour -> false : ' + from.getUTCHours() + ' and ' + start_at.getUTCHours());
            same = false;
        }

        if (from.getUTCSeconds() !== start_at.getUTCSeconds()) {
            LogUtil.info(this, 'second -> false : ' + from.getUTCSeconds() + ' and ' + start_at.getUTCSeconds());
            same = false;
        }

        if (from.getMilliseconds() !== start_at.getMilliseconds()) {
            LogUtil.info(this, 'ms -> false : ' + from.getMilliseconds() + ' and ' + start_at.getMilliseconds());
            same = false;
        }

        return same;
    }


    public static getCurrentDate(): number {
        return Date.now();
    }

    public static getMaximumDate(): Date {
        // Date and time method
        return new Date(3500, 6, 4, 12, 30, 0, 0);
    }

    public static getNameOfMonth(date: Date): string {
        const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
            'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
        ];
        return monthNames[date.getMonth()];
    }

    public static differenceInDays(first: Date, second: Date): number {
        return dataFns.differenceInDays(first, second);
    }

    public static differenceInYears(from: Date, to: Date): number {
        let count = 0;

        if (this.firstIsAfterSecond(from, to)) {
            return count;
        }

        for (let index = 1; true; index++) {
            const plusMonthMore = this.plusMonth(from, index * 12);
            if (this.firstIsAfterSecond(plusMonthMore, to)) {
                return count;
            }
            count++;
        }
    }


    public static differenceInQuarter(from: Date, to: Date): number {
        let count = 0;

        if (this.firstIsAfterSecond(from, to)) {
            return count;
        }

        for (let index = 1; true; index++) {
            const plusMonthMore = this.plusMonth(from, index * 3);
            if (this.firstIsAfterSecond(plusMonthMore, to)) {
                return count;
            }
            count++;
        }
    }

    public static differenceInMonth(from: Date, to: Date): number {
        let count = 0;

        if (this.firstIsAfterSecond(from, to)) {
            return count;
        }

        for (let index = 1; true; index++) {
            const plusMonthMore = this.plusMonth(from, index);
            if (this.firstIsAfterSecond(plusMonthMore, to)) {
                return count;
            }
            count++;
        }
    }

    public static firstIsBeforeSecond(first: Date, second: Date): boolean {
        return dataFns.isBefore(first, second);
    }

    public static firstIsAfterSecond(first: Date, second: Date): boolean {
        return dataFns.isAfter(first, second);
    }

    public static plusMonth(date: Date, value: number): Date {
        const tmpDate = new Date(date.getFullYear(), date.getMonth() + value, 1);
        const lastDayOfMonth = dataFns.lastDayOfMonth(tmpDate).getDate();

        let newDate: number;

        if (date.getDate() > lastDayOfMonth) {
           newDate = lastDayOfMonth;
        } else {
            newDate = date.getDate();
        }

        const producedDate = new Date(date.getFullYear(), date.getMonth() + value, newDate);
        return producedDate;
    }


}
