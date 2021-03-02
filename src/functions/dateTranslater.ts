import dayjs,{ Dayjs } from "dayjs";
import convToWeek from './convToWeek';

const dateTranslater = (day: Dayjs): string => {
    const compareDate = dayjs();
    const format = 'YYYY/MM/DD'
    const formatedDay = day.format(format)

    switch(true) {
        case formatedDay === compareDate.format(format):
            return '今日';
        case formatedDay === compareDate.add(1, 'd').format(format):
            return '明日';
        case formatedDay === compareDate.add(2, 'd').format(format):
            return '明後日';
        case formatedDay === compareDate.add(-1, 'd').format(format):
            return '昨日';
        case formatedDay === compareDate.add(-2, 'd').format(format):
            return '一昨日';
        default:
            return `${formatedDay} ${convToWeek(day)}曜日`;
    }
}

export default dateTranslater;