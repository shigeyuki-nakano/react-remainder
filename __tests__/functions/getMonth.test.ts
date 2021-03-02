import { getMonth } from '@/functions';

describe('正常系', () => {
    const month = getMonth({
        year: 2020,
        month: 10
    })
    it('年、月を指定したらその月の情報がDayjsオブジェクトで返ってくる', () => {
        expect(month.month()).toBe(9);
        expect(month.year()).toBe(2020);
    })
})