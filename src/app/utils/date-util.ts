export class DateUtil {

    public static getCurrentDate(): number {
        return Date.now();
    }

    public static getMaximumDate(): Date {
        // Date and time method
        return new Date(3500, 6, 4, 12, 30, 0, 0);
    }

    public static getNameOfMonth(date: Date): string {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        return monthNames[date.getMonth()];
    }

}