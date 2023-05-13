import Combination from "../src/Combination";

const SET_A = ['a','b','c', 'd', 'e'];

const COMBINATION_A_SIZE_1 = [
    ['a'],
    ['b'],
    ['c'],
    ['d'],
    ['e'],
];

const COMBINATION_A_SIZE_2 = [
    ['a', 'b'],
    ['a', 'c'],
    ['a', 'd'],
    ['a', 'e'],
    ['b', 'c'],
    ['b', 'd'],
    ['b', 'e'],
    ['c', 'd'],
    ['c', 'e'],
    ['d', 'e'],
];

const COMBINATION_A_SIZE_3 = [
    ['a', 'b', 'c'],
    ['a', 'b', 'd'],
    ['a', 'b', 'e'],
    ['a', 'c', 'd'],
    ['a', 'c', 'e'],
    ['a', 'd', 'e'],
    ['b', 'c', 'd'],
    ['b', 'c', 'e'],
    ['b', 'd', 'e'],
    ['c', 'd', 'e'],
];

const COMBINATION_A_SIZE_4 = [
    ['a', 'b', 'c', 'd'],
    ['a', 'b', 'c', 'e'],
    ['a', 'b', 'd', 'e'],
    ['a', 'c', 'd', 'e'],
    ['b', 'c', 'd', 'e'],
];

const COMBINATION_A_SIZE_5 = [
    ['a', 'b', 'c', 'd', 'e']
];

const SET_B = ['A','B','C', 'D', 'E'];

const COMBINATION_B_SIZE_1 = [
    ['A'],
    ['B'],
    ['C'],
    ['D'],
    ['E']
];

const COMBINATION_B_SIZE_2 = [
    ['A', 'A'],
    ['A', 'B'],
    ['A', 'C'],
    ['A', 'D'],
    ['A', 'E'],
    ['B', 'B'],
    ['B', 'C'],
    ['B', 'D'],
    ['B', 'E'],
    ['C', 'C'],
    ['C', 'D'],
    ['C', 'E'],
    ['D', 'D'],
    ['D', 'E'],
    ['E', 'E'],
];

const COMBINATION_B_SIZE_3 = [
    ['A', 'A', 'A'],
    ['A', 'A', 'B'],
    ['A', 'A', 'C'],
    ['A', 'A', 'D'],
    ['A', 'A', 'E'],
    ['A', 'B', 'B'],
    ['A', 'B', 'C'],
    ['A', 'B', 'D'],
    ['A', 'B', 'E'],
    ['A', 'C', 'C'],
    ['A', 'C', 'D'],
    ['A', 'C', 'E'],
    ['A', 'D', 'D'],
    ['A', 'D', 'E'],
    ['A', 'E', 'E'],
    ['B', 'B', 'B'],
    ['B', 'B', 'C'],
    ['B', 'B', 'D'],
    ['B', 'B', 'E'],
    ['B', 'C', 'C'],
    ['B', 'C', 'D'],
    ['B', 'C', 'E'],
    ['B', 'D', 'D'],
    ['B', 'D', 'E'],
    ['B', 'E', 'E'],
    ['C', 'C', 'C'],
    ['C', 'C', 'D'],
    ['C', 'C', 'E'],
    ['C', 'D', 'D'],
    ['C', 'D', 'E'],
    ['C', 'E', 'E'],
    ['D', 'D', 'D'],
    ['D', 'D', 'E'],
    ['D', 'E', 'E'],
    ['E', 'E', 'E'],
];

const COMBINATION_B_SIZE_4 = [
    ['A','A','A','A'],
    ['A','A','A','B'],
    ['A','A','A','C'],
    ['A','A','A','D'],
    ['A','A','A','E'],
    ['A','A','B','B'],
    ['A','A','B','C'],
    ['A','A','B','D'],
    ['A','A','B','E'],
    ['A','A','C','C'],
    ['A','A','C','D'],
    ['A','A','C','E'],
    ['A','A','D','D'],
    ['A','A','D','E'],
    ['A','A','E','E'],
    ['A','B','B','B'],
    ['A','B','B','C'],
    ['A','B','B','D'],
    ['A','B','B','E'],
    ['A','B','C','C'],
    ['A','B','C','D'],
    ['A','B','C','E'],
    ['A','B','D','D'],
    ['A','B','D','E'],
    ['A','B','E','E'],
    ['A','C','C','C'],
    ['A','C','C','D'],
    ['A','C','C','E'],
    ['A','C','D','D'],
    ['A','C','D','E'],
    ['A','C','E','E'],
    ['A','D','D','D'],
    ['A','D','D','E'],
    ['A','D','E','E'],
    ['A','E','E','E'],
    ['B','B','B','B'],
    ['B','B','B','C'],
    ['B','B','B','D'],
    ['B','B','B','E'],
    ['B','B','C','C'],
    ['B','B','C','D'],
    ['B','B','C','E'],
    ['B','B','D','D'],
    ['B','B','D','E'],
    ['B','B','E','E'],
    ['B','C','C','C'],
    ['B','C','C','D'],
    ['B','C','C','E'],
    ['B','C','D','D'],
    ['B','C','D','E'],
    ['B','C','E','E'],
    ['B','D','D','D'],
    ['B','D','D','E'],
    ['B','D','E','E'],
    ['B','E','E','E'],
    ['C','C','C','C'],
    ['C','C','C','D'],
    ['C','C','C','E'],
    ['C','C','D','D'],
    ['C','C','D','E'],
    ['C','C','E','E'],
    ['C','D','D','D'],
    ['C','D','D','E'],
    ['C','D','E','E'],
    ['C','E','E','E'],
    ['D','D','D','D'],
    ['D','D','D','E'],
    ['D','D','E','E'],
    ['D','E','E','E'],
    ['E','E','E','E']
]


const SET_C = ['X', 'Y', 'Z'];

const COMBINATION_C_SIZE_1 = [
    ['X'],
    ['Y'],
    ['Z'],
];

const COMBINATION_C_SIZE_2 = [
    ['X', 'X'],
    ['X', 'Y'],
    ['X', 'Z'],
    ['Y', 'Y'],
    ['Y', 'Z'],
    ['Z', 'Z'],
];

const COMBINATION_C_SIZE_3 = [
    ['X','X','X'],
    ['X','X','Y'],
    ['X','X','Z'],
    ['X','Y','Y'],
    ['X','Y','Z'],
    ['X','Z','Z'],
    ['Y','Y','Y'],
    ['Y','Y','Z'],
    ['Y','Z','Z'],
    ['Z','Z','Z']
];

const COMBINATION_C_SIZE_4 = [
    ['X','X','X','X'],
    ['X','X','X','Y'],
    ['X','X','X','Z'],
    ['X','X','Y','Y'],
    ['X','X','Y','Z'],
    ['X','X','Z','Z'],
    ['X','Y','Y','Y'],
    ['X','Y','Y','Z'],
    ['X','Y','Z','Z'],
    ['X','Z','Z','Z'],
    ['Y','Y','Y','Y'],
    ['Y','Y','Y','Z'],
    ['Y','Y','Z','Z'],
    ['Y','Z','Z','Z'],
    ['Z','Z','Z','Z'],
];

const COMBINATION_C_SIZE_5 = [
    ['X','X','X','X','X'],
    ['Y','Y','Y','Y','Y'],
    ['Z','Z','Z','Z','Z'],
    ['X','X','X','X','Y'],
    ['X','X','X','X','Z'],
    ['X','Y','Y','Y','Y'],
    ['X','Z','Z','Z','Z'],
    ['Y','Y','Y','Y','Z'],
    ['Y','Z','Z','Z','Z'],
    ['X','X','X','Y','Y'],
    ['X','X','X','Z','Z'],
    ['X','X','Y','Y','Y'],
    ['X','X','Z','Z','Z'],
    ['Y','Y','Y','Z','Z'],
    ['Y','Y','Z','Z','Z'],
    ['X','X','X','Y','Z'],
    ['X','Y','Y','Y','Z'],
    ['X','Y','Z','Z','Z'],
    ['X','X','Y','Y','Z'],
    ['X','X','Y','Z','Z'],
    ['X','Y','Y','Z','Z']
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
    it("Pick 1 element from the set ['a', 'b', 'c', 'd', 'e']", () => {
        const combinations = Combination.withoutRepetition(SET_A, 1);
        const expected = COMBINATION_A_SIZE_1;
        const assertion = check(combinations, expected);
        expect(assertion).toBe(true);
    });

    it("Pick 2 elements from the set ['a', 'b', 'c', 'd', 'e']", () => {
        const combinations = Combination.withoutRepetition(SET_A, 2);
        const expected = COMBINATION_A_SIZE_2;
        const assertion = check(combinations, expected);
        expect(assertion).toBe(true);
    });

    it("Pick 3 elements from the set ['a', 'b', 'c', 'd', 'e']", () => {
        const combinations = Combination.withoutRepetition(SET_A, 3);
        const expected = COMBINATION_A_SIZE_3;
        const assertion = check(combinations, expected);
        expect(assertion).toBe(true);
    });

    it("Pick 4 elements from the set ['a', 'b', 'c', 'd', 'e']", () => {
        const combinations = Combination.withoutRepetition(SET_A, 4);
        const expected = COMBINATION_A_SIZE_4;
        const assertion = check(combinations, expected);
        expect(assertion).toBe(true);
    });

    it("Pick 5 elements from the set ['a', 'b', 'c', 'd', 'e']", () => {
        const combinations = Combination.withoutRepetition(SET_A, 5);
        const expected = COMBINATION_A_SIZE_5;
        const assertion = check(combinations, expected);
        expect(assertion).toBe(true);
    });

    it("Pick between 1 and 2 elements from the set ['a', 'b', 'c', 'd', 'e']", () => {
        const combinations = Combination.withoutRepetition(SET_A, 1, 2);
        const expected = [
            ...COMBINATION_A_SIZE_1,
            ...COMBINATION_A_SIZE_2
        ];
        const assertion = check(combinations, expected);
        expect(assertion).toBe(true);
    });

    it("Pick between 1 and 3 elements from the set ['a', 'b', 'c', 'd', 'e']", () => {
        const combinations = Combination.withoutRepetition(SET_A, 1, 3);
        const expected = [
            ...COMBINATION_A_SIZE_1,
            ...COMBINATION_A_SIZE_2,
            ...COMBINATION_A_SIZE_3
        ];
        const assertion = check(combinations, expected);
        expect(assertion).toBe(true);
    });

    it("Pick between 1 and 4 elements from the set ['a', 'b', 'c', 'd', 'e']", () => {
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

    it("Pick between 2 and 4 elements from the set ['a', 'b', 'c', 'd', 'e']", () => {
        const combinations = Combination.withoutRepetition(SET_A, 2, 4);
        const expected = [
            ...COMBINATION_A_SIZE_2,
            ...COMBINATION_A_SIZE_3,
            ...COMBINATION_A_SIZE_4
        ];
        const assertion = check(combinations, expected);
        expect(assertion).toBe(true);
    });

    it("Pick between 3 and 5 elements from the set ['a', 'b', 'c', 'd', 'e']", () => {
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


describe("Combination with repetition", () => {
    it("Pick 1 element from the set ['A', 'B', 'C', 'D', 'E']", () => {
        const combinations = Combination.withRepetition(SET_B, 1);
        const expected = COMBINATION_B_SIZE_1;
        const assertion = check(combinations, expected);
        expect(assertion).toBe(true);
    });

    it("Pick 2 elements from the set ['A', 'B', 'C', 'D', 'E']", () => {
        const combinations = Combination.withRepetition(SET_B, 2);
        const expected = COMBINATION_B_SIZE_2;
        const assertion = check(combinations, expected);
        expect(assertion).toBe(true);
    });

    it("Pick 3 elements from the set ['A', 'B', 'C', 'D', 'E']", () => {
        const combinations = Combination.withRepetition(SET_B, 3);
        const expected = COMBINATION_B_SIZE_3;
        const assertion = check(combinations, expected);
        expect(assertion).toBe(true);
    });

    it("Pick 4 elements from the set ['A', 'B', 'C', 'D', 'E']", () => {
        const combinations = Combination.withRepetition(SET_B, 4);
        const expected = COMBINATION_B_SIZE_4;
        const assertion = check(combinations, expected);
        expect(assertion).toBe(true);
    });

    it("Pick between 1 and 2 elements from the set ['A', 'B', 'C', 'D', 'E']", () => {
        const combinations = Combination.withRepetition(SET_B, 1, 2);
        const expected = [
            ...COMBINATION_B_SIZE_1,
            ...COMBINATION_B_SIZE_2,
        ];
        const assertion = check(combinations, expected);
        expect(assertion).toBe(true);
    });

    it("Pick between 1 and 3 elements from the set ['A', 'B', 'C', 'D', 'E']", () => {
        const combinations = Combination.withRepetition(SET_B, 1, 3);
        const expected = [
            ...COMBINATION_B_SIZE_1,
            ...COMBINATION_B_SIZE_2,
            ...COMBINATION_B_SIZE_3,
        ];
        const assertion = check(combinations, expected);
        expect(assertion).toBe(true);
    });

    it("Pick between 1 and 4 elements from the set ['A', 'B', 'C', 'D', 'E']", () => {
        const combinations = Combination.withRepetition(SET_B, 1, 4);
        const expected = [
            ...COMBINATION_B_SIZE_1,
            ...COMBINATION_B_SIZE_2,
            ...COMBINATION_B_SIZE_3,
            ...COMBINATION_B_SIZE_4,
        ];
        const assertion = check(combinations, expected);
        expect(assertion).toBe(true);
    });

    it("Pick between 1 and 5 elements from the set ['X', 'Y', 'Z']", () => {
        const combinations = Combination.withRepetition(SET_C, 1, 5);
        const expected = [
            ...COMBINATION_C_SIZE_1,
            ...COMBINATION_C_SIZE_2,
            ...COMBINATION_C_SIZE_3,
            ...COMBINATION_C_SIZE_4,
            ...COMBINATION_C_SIZE_5,
        ];
        const assertion = check(combinations, expected);
        expect(assertion).toBe(true);
    });
});
