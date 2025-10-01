export type DateFormat = 'ISO' | 'LOCALE' | 'READABLE' | 'SHORT';

export interface DateRange {
    start: Date;
    end: Date;
}

export class DateUtils {
    public static formatDate(date: Date, format: DateFormat = 'LOCALE'): string {
        switch (format) {
            case 'ISO':
                return date.toISOString();

            case 'LOCALE':
                return date.toLocaleDateString('ru-RU');

            case 'READABLE':
                return date.toLocaleDateString('ru-RU', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

            case 'SHORT':
                return date.toLocaleDateString('ru-RU', {
                    month: 'short',
                    day: 'numeric'
                });

            default:
                return date.toISOString();
        }
    }

    public static now(): Date {
        return new Date();
    }

    public static addDays(date: Date, days: number): Date {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    public static subtractDays(date: Date, days: number): Date {
        return this.addDays(date, -days);
    }

    public static isToday(date: Date): boolean {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    }

    public static isPast(date: Date): boolean {
        return date < new Date();
    }

    public static isFuture(date: Date): boolean {
        return date > new Date();
    }

    public static isSameDay(date1: Date, date2: Date): boolean {
        return date1.toDateString() === date2.toDateString();
    }

    public static getDaysDifference(date1: Date, date2: Date): number {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }

    public static isDateInRange(date: Date, range: DateRange): boolean {
        return date >= range.start && date <= range.end;
    }
}

export const {
    formatDate,
    now,
    addDays,
    subtractDays,
    isToday,
    isPast,
    isFuture,
    isSameDay,
    getDaysDifference,
    isDateInRange
} = DateUtils;