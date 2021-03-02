import { Dayjs } from 'dayjs';

const convToWeek = (day: Dayjs) => {
    const week = ['日', '月', '火', '水', '木', '金', '土'];

    console.log(day.get('day'));
    const dayIndex = day.get('day');
    return week[dayIndex]
}

export default convToWeek;