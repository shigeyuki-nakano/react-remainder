import { nullToUndefined } from '@/functions';

describe('正常系', () => {
    it('nullがundefinedに変換されている', () => {
        const testData = {
            test1: null,
            test2: null,
            test3: undefined
        }

        const expectResult = {
            test1: undefined,
            test2: undefined,
            test3: undefined
        }

        const result = nullToUndefined(testData);
        console.log(result)

        expect(result).toEqual(expectResult);

        // Object.keys(result).forEach((key) => {
        //     expect(result[key]).toBe(undefined)
        // })
    })
})