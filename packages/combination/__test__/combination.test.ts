import Combination from "../src/Combination";

const SET_A = ['A','B','C', 'D', 'E'];

const COMBINATION_A_SIZE_1 = [
    ['A'],
    ['B'],
    ['C'],
    ['D'],
    ['E'],
];

const COMBINATION_A_SIZE_2 = [
    ['A', 'B'],
    ['A', 'C'],
    ['A', 'D'],
    ['A', 'E'],
    ['B', 'C'],
    ['B', 'D'],
    ['B', 'E'],
    ['C', 'D'],
    ['C', 'E'],
    ['D', 'E'],
];

const COMBINATION_A_SIZE_3 = [
    ['A', 'B', 'C'],
    ['A', 'B', 'D'],
    ['A', 'B', 'E'],
    ['A', 'C', 'D'],
    ['A', 'C', 'E'],
    ['A', 'D', 'E'],
    ['B', 'C', 'D'],
    ['B', 'C', 'E'],
    ['B', 'D', 'E'],
    ['C', 'D', 'E'],
];

const COMBINATION_A_SIZE_4 = [
    ['A', 'B', 'C', 'D'],
    ['A', 'B', 'C', 'E'],
    ['A', 'B', 'D', 'E'],
    ['A', 'C', 'D', 'E'],
    ['B', 'C', 'D', 'E'],
];

const COMBINATION_A_SIZE_5 = [
    ['A', 'B', 'C', 'D', 'E']
];


const arrayDeepEqual = (arr1: Array<any>, arr2: Array<any>) => {
    return arr1.length === arr2.length && arr1.every((v, i) => v === arr2[i]);
};

const check = (arr1: Array<Array<any>>, arr2: Array<Array<any>>) => {
    if (arr1.length !== arr2.length) {
        return false;
    }

    return arr1.every((comb1) => {
        return arr2.find((comb2) => {
            return arrayDeepEqual(comb1, comb2);
        });
    });
};


describe("Combination without repetition", () => {
    it("Pick 1 elements from the set ['A', 'B', 'C', 'D', 'E']", () => {
        const combinations = Combination.withoutRepetition(SET_A, 1);
        const expected = COMBINATION_A_SIZE_1;
        const assertion = check(combinations, expected);
        expect(assertion).toBe(true);
    });

    it("Pick 2 elements from the set ['A', 'B', 'C', 'D', 'E']", () => {
        const combinations = Combination.withoutRepetition(SET_A, 2);
        const expected = COMBINATION_A_SIZE_2;
        const assertion = check(combinations, expected);
        expect(assertion).toBe(true);
    });

    it("Pick 3 elements from the set ['A', 'B', 'C', 'D', 'E']", () => {
        const combinations = Combination.withoutRepetition(SET_A, 3);
        const expected = COMBINATION_A_SIZE_3;
        const assertion = check(combinations, expected);
        expect(assertion).toBe(true);
    });

    it("Pick 4 elements from the set ['A', 'B', 'C', 'D', 'E']", () => {
        const combinations = Combination.withoutRepetition(SET_A, 4);
        const expected = COMBINATION_A_SIZE_4;
        const assertion = check(combinations, expected);
        expect(assertion).toBe(true);
    });

    it("Pick 5 elements from the set ['A', 'B', 'C', 'D', 'E']", () => {
        const combinations = Combination.withoutRepetition(SET_A, 5);
        const expected = COMBINATION_A_SIZE_5;
        const assertion = check(combinations, expected);
        expect(assertion).toBe(true);
    });

    it("Pick between 1 and 2 elements from the set ['A', 'B', 'C', 'D', 'E']", () => {
        const combinations = Combination.withoutRepetition(SET_A, 1, 2);
        const expected = [
            ...COMBINATION_A_SIZE_1,
            ...COMBINATION_A_SIZE_2
        ];
        const assertion = check(combinations, expected);
        expect(assertion).toBe(true);
    });

    it("Pick between 1 and 3 elements from the set ['A', 'B', 'C', 'D', 'E']", () => {
        const combinations = Combination.withoutRepetition(SET_A, 1, 3);
        const expected = [
            ...COMBINATION_A_SIZE_1,
            ...COMBINATION_A_SIZE_2,
            ...COMBINATION_A_SIZE_3
        ];
        const assertion = check(combinations, expected);
        expect(assertion).toBe(true);
    });

    it("Pick between 1 and 4 elements from the set ['A', 'B', 'C', 'D', 'E']", () => {
        const combinations = Combination.withoutRepetition(SET_A, 1, 4);
        const expected = [
            ...COMBINATION_A_SIZE_1,
            ...COMBINATION_A_SIZE_2,
            ...COMBINATION_A_SIZE_3,
            ...COMBINATION_A_SIZE_4
        ];
        const assertion = check(combinations, expected);
        expect(assertion).toBe(true);
    });

    it("Pick between 2 and 4 elements from the set ['A', 'B', 'C', 'D', 'E']", () => {
        const combinations = Combination.withoutRepetition(SET_A, 2, 4);
        const expected = [
            ...COMBINATION_A_SIZE_2,
            ...COMBINATION_A_SIZE_3,
            ...COMBINATION_A_SIZE_4
        ];
        const assertion = check(combinations, expected);
        expect(assertion).toBe(true);
    });

    it("Pick between 3 and 5 elements from the set ['A', 'B', 'C', 'D', 'E']", () => {
        const combinations = Combination.withoutRepetition(SET_A, 3, 5);
        const expected = [
            ...COMBINATION_A_SIZE_3,
            ...COMBINATION_A_SIZE_4,
            ...COMBINATION_A_SIZE_5
        ];
        const assertion = check(combinations, expected);
        expect(assertion).toBe(true);
    });
});
