import { CalenderInfo } from "@/types";
import { DISPLAY_DATE } from '@/constants';
import { getMonth } from '@/functions';
import dayjs, { Dayjs } from 'dayjs';

dayjs.locale('ja');

/**
 * year、monthを渡すとその月のカレンダー情報が作成される
 * @param info CalenderInfo
 */
const createCalender = (info: CalenderInfo): Dayjs[] => {
    const nowMonthInfo = getMonth(info);
    const firstDayIndex = nowMonthInfo.day();

    return Array(DISPLAY_DATE).fill(0).map((_, i) => {
        const diffFromFirstDay = i - firstDayIndex;
        const day = nowMonthInfo.add(diffFromFirstDay, 'day');

        return day;
    })
}

export default createCalender;