import { formatMonth, getMonth } from '@/functions';

describe('正常系', () => {
    const month = getMonth({
        year: 2020,
        month: 10
    })

    it('dayjsオブジェクトを渡したらyear、month(元の指定した状態で)返ってくる', () => {
        const result = formatMonth(month);

        expect(result).toStrictEqual({
            year: 2020,
            month: 10
        })
    })
})