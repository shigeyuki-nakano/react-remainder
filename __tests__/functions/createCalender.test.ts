import { CalenderInfo } from '@/types';
import { createCalender } from '@/functions';

describe('正常系', () => {
    const calender = createCalender({
        year: 2020,
        month: 10
    });

    it('年、月を渡すと配列形式で返ってくる', () => {
        expect(Array.isArray(calender)).toBe(true);
    })
    it('index数35個の配列が返ってくる', () => {
        expect(calender.length).toBe(35);
    })
    it('日曜始まりで返ってくる', () => {
        expect(calender[0].day()).toBe(0);

        const calender2 = createCalender({
            year: 2020,
            month: 11
        })

        expect(calender2[0].day()).toBe(0);
    })
})