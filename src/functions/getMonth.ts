import dayjs, { Dayjs } from 'dayjs';
import { CalenderInfo } from '@/types';

/**
 * year、monthを渡すとその月のDayjsオブジェクトを返す(月の数が-1されているので注意)
 * @param info CalenderInfo
 */
const getMonth = (info: CalenderInfo): Dayjs => {
    const { month, year } = info;
    return dayjs(`${year}-${month}`);
}

export default getMonth;