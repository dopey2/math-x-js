import { areCombinationsEqual } from "./common";
import P from "../src/Permutation";

const SET_A = ['a', 'b', 'c'];

const PERMUTATION_A_SIZE_1 = [
    ['a'],
    ['b'],
    ['c'],
];

const PERMUTATION_A_SIZE_2 = [
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

const PERMUTATION_A_SIZE_3 = [
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
];


const SET_B = ['A', 'B', 'C'];

const PERMUTATION_B_SIZE_1 = [
    ['A'],
    ['B'],
    ['C'],
];

const PERMUTATION_B_SIZE_2 = [
    ['A', 'B'],
    ['A', 'C'],
    ['B', 'A'],
    ['B', 'C'],
    ['C', 'A'],
    ['C', 'B'],
];

const PERMUTATION_B_SIZE_3 = [
    ['A', 'B', 'C'],
    ['B', 'A', 'C'],
    ['C', 'A', 'B'],
    ['A', 'C', 'B'],
    ['B', 'C', 'A'],
    ['C', 'B', 'A']
];


export const testPermutation = (Permutation: typeof P) => {
    describe("Permutation with repetition", () => {
        it("Pick elements from the set ['a', 'b', 'c']", () => {
            const combinations = Permutation.withRepetition(SET_A);
            const expected = PERMUTATION_A_SIZE_3;
            const assertion = areCombinationsEqual(combinations, expected);
            expect(assertion).toBe(true);
        });

        it("Pick 1 elements from the set ['a', 'b', 'c']", () => {
            const combinations = Permutation.withRepetition(SET_A, 1);
            const expected = PERMUTATION_A_SIZE_1;
            const assertion = areCombinationsEqual(combinations, expected);
            expect(assertion).toBe(true);
        });

        it("Pick 2 elements from the set ['a', 'b', 'c']", () => {
            const combinations = Permutation.withRepetition(SET_A, 2);
            const expected = PERMUTATION_A_SIZE_2;
            const assertion = areCombinationsEqual(combinations, expected);
            expect(assertion).toBe(true);
        });

        it("Pick 3 elements from the set ['a', 'b', 'c']", () => {
            const combinations = Permutation.withRepetition(SET_A, 3);
            const expected = PERMUTATION_A_SIZE_3;
            const assertion = areCombinationsEqual(combinations, expected);
            expect(assertion).toBe(true);
        });

        it("Pick between 1 and 2 elements from the set ['a', 'b', 'c']", () => {
            const combinations = Permutation.withRepetition(SET_A, 1, 2);
            const expected = [
                ...PERMUTATION_A_SIZE_1,
                ...PERMUTATION_A_SIZE_2
            ];

            const assertion = areCombinationsEqual(combinations, expected);
            expect(assertion).toBe(true);
        });

        it("Pick between 1 and 3 elements from the set ['a', 'b', 'c']", () => {
            const combinations = Permutation.withRepetition(SET_A, 1, 3);

            const expected = [
                ...PERMUTATION_A_SIZE_1,
                ...PERMUTATION_A_SIZE_2,
                ...PERMUTATION_A_SIZE_3,
            ];

            const assertion = areCombinationsEqual(combinations, expected);
            expect(assertion).toBe(true);
        });

        it("Pick between 2 and 3 elements from the set ['a', 'b', 'c']", () => {
            const combinations = Permutation.withRepetition(SET_A, 2, 3);
            const expected = [
                ...PERMUTATION_A_SIZE_2,
                ...PERMUTATION_A_SIZE_3
            ];
            const assertion = areCombinationsEqual(combinations, expected);
            expect(assertion).toBe(true);
        });
    });

    describe("Permutation without repetition", () => {

        it("Pick element from the set ['A', 'B', 'C']", () => {
            const combinations = Permutation.withoutRepetition(SET_B);
            const expected = PERMUTATION_B_SIZE_3;
            const assertion = areCombinationsEqual(combinations, expected);
            expect(assertion).toBe(true);
        });

        it("Pick 1 element from the set ['A', 'B', 'C']", () => {
            const combinations = Permutation.withoutRepetition(SET_B, 1);
            const expected = PERMUTATION_B_SIZE_1;
            const assertion = areCombinationsEqual(combinations, expected);
            expect(assertion).toBe(true);
        });

        it("Pick 2 element from the set ['A', 'B', 'C']", () => {
            const combinations = Permutation.withoutRepetition(SET_B, 2);
            const expected = PERMUTATION_B_SIZE_2;
            const assertion = areCombinationsEqual(combinations, expected);
            expect(assertion).toBe(true);
        });

        it("Pick 3 element from the set ['A', 'B', 'C']", () => {
            const combinations = Permutation.withoutRepetition(SET_B, 3);
            const expected = PERMUTATION_B_SIZE_3;
            const assertion = areCombinationsEqual(combinations, expected);
            expect(assertion).toBe(true);
        });

        it("Pick between 1 and 2 element from the set ['A', 'B', 'C']", () => {
            const combinations = Permutation.withoutRepetition(SET_B, 1, 2);
            const expected = [
                ...PERMUTATION_B_SIZE_1,
                ...PERMUTATION_B_SIZE_2
            ];
            const assertion = areCombinationsEqual(combinations, expected);
            expect(assertion).toBe(true);
        });

        it("Pick between 1 and 3 element from the set ['A', 'B', 'C']", () => {
            const combinations = Permutation.withoutRepetition(SET_B, 1, 3);
            const expected = [
                ...PERMUTATION_B_SIZE_1,
                ...PERMUTATION_B_SIZE_2,
                ...PERMUTATION_B_SIZE_3,
            ];
            const assertion = areCombinationsEqual(combinations, expected);
            expect(assertion).toBe(true);
        });

        it("Pick between 2 and 3 element from the set ['A', 'B', 'C']", () => {
            const combinations = Permutation.withoutRepetition(SET_B, 2, 3);
            const expected = [
                ...PERMUTATION_B_SIZE_2,
                ...PERMUTATION_B_SIZE_3,
            ];
            const assertion = areCombinationsEqual(combinations, expected);
            expect(assertion).toBe(true);
        });
    });
}
