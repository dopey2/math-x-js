import Permutation from "../src/Permutation";

const SET_A = ['a', 'b', 'c'];

const COMBO_A_SIZE_1 = [
    ['a'],
    ['b'],
    ['c'],
];

const COMBO_A_SIZE_2 = [
    ['a', 'a'],
    ['a', 'b'],
    ['a', 'c'],
    ['b', 'a'],
    ['b', 'b'],
    ['b', 'c'],
    ['c', 'a'],
    ['c', 'b'],
    ['c', 'c'],
];

const COMBO_A_SIZE_3 = [
    ['a', 'a', 'a'],
    ['a', 'a', 'b'],
    ['a', 'a', 'c'],
    ['a', 'b', 'a'],
    ['a', 'b', 'b'],
    ['a', 'b', 'c'],
    ['a', 'c', 'a'],
    ['a', 'c', 'b'],
    ['a', 'c', 'c'],
    ['b', 'a', 'a'],
    ['b', 'a', 'b'],
    ['b', 'a', 'c'],
    ['b', 'b', 'a'],
    ['b', 'b', 'b'],
    ['b', 'b', 'c'],
    ['b', 'c', 'a'],
    ['b', 'c', 'b'],
    ['b', 'c', 'c'],
    ['c', 'a', 'a'],
    ['c', 'a', 'b'],
    ['c', 'a', 'c'],
    ['c', 'b', 'a'],
    ['c', 'b', 'b'],
    ['c', 'b', 'c'],
    ['c', 'c', 'a'],
    ['c', 'c', 'b'],
    ['c', 'c', 'c'],
]


const arrayDeepEqual = (arr1: Array<any>, arr2: Array<any>) => {
    return arr1.length === arr2.length && arr1.every((v, i) => v === arr2[i]);
}

const check = (arr1: Array<Array<any>>, arr2: Array<Array<any>>) => {
    if(arr1.length !== arr2.length) {
        return false;
    }

    return arr1.every((comb1) => {
        return arr2.find((comb2) => {
            return arrayDeepEqual(comb1, comb2)
        });
    });
}


describe("Permutation", () => {
    describe("With Repetition", () => {

        it("Pick 1 elements from the set ['a', 'b', 'c']", () => {
            const combinations = Permutation.withRepetition(SET_A, 1);
            const expected = COMBO_A_SIZE_1;
            const assertion = check(combinations, expected);
            expect(assertion).toBe(true);
        });

        it("Pick 2 elements from the set ['a', 'b', 'c']", () => {
            const combinations = Permutation.withRepetition(SET_A, 2);
            const expected = COMBO_A_SIZE_2
            const assertion = check(combinations, expected);
            expect(assertion).toBe(true);
        });

        it("Pick 3 elements from the set ['a', 'b', 'c']", () => {
            const combinations = Permutation.withRepetition(SET_A, 3);
            const expected = COMBO_A_SIZE_3
            const assertion = check(combinations, expected);
            expect(assertion).toBe(true);
        });

        it("Pick between 1 and 2 elements from the set ['a', 'b', 'c']", () => {
            const combinations = Permutation.withRepetition(SET_A, 1, 2);
            const expected = [
                ...COMBO_A_SIZE_1,
                ...COMBO_A_SIZE_2
            ]

            const assertion = check(combinations, expected);
            expect(assertion).toBe(true);
        });

        it("Pick between 1 and 3 elements from the set ['a', 'b', 'c']", () => {
            const combinations = Permutation.withRepetition(SET_A, 1, 3);

            const expected = [
                ...COMBO_A_SIZE_1,
                ...COMBO_A_SIZE_2,
                ...COMBO_A_SIZE_3,
            ]

            const assertion = check(combinations, expected);
            expect(assertion).toBe(true);
        });

        it("Pick between 2 and 3 elements from the set ['a', 'b', 'c']", () => {
            const combinations = Permutation.withRepetition(SET_A, 2, 3);
            const expected = [
                ...COMBO_A_SIZE_2,
                ...COMBO_A_SIZE_3
            ]
            const assertion = check(combinations, expected);
            expect(assertion).toBe(true);
        });
    });
});
