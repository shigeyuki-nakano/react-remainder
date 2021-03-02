import { CalenderInfo } from '@/types';
import dayjs, { Dayjs } from 'dayjs';

/**
 * dayjsオブジェクトを指定したらyear、month(元の数に戻して)を返す
 * @param dayObj Dayjs
 */
const formatMonth = (dayObj: Dayjs): CalenderInfo => {
    return {
        year: dayObj.year(),
        month: dayObj.month() + 1
    }
}

export default formatMonth;