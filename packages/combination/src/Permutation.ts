/* eslint-disable */
// @ts-nocheck

/**
 * Use to generate permutation.
 */
export default class Permutation {


    /**
     *
     * @param elements
     * @param n
     */
    static withoutRepetition <S>(elements: Array<S>, n: number) {
        throw new Error("Implement this");
    }

    /**
     * Given a set of elements, generate all the possible permutation with a size between n and m using these elements.
     *
     * @template S The type of elements in the input array and resulting permutations.
     * @param {Array<S>} elements A set of elements used during the generation process.
     * @param {number} n The minimum number of elements in the generated permutations (inclusive).
     * The default value is the size of "elements".
     * @param {number} m The maximum number of elements in the generated permutations.
     *
     * @returns {Array<Array<S>>} An array of arrays containing all the possible permutations.
     *
     * @example
     * // Generate permutations with repetition for the elements 'a', 'b', and 'c', with a size between 2 and 3
     * const result = Permutations.withRepetition(['a', 'b', 'c'], 2, 3);
     * [['a', 'a'], ['a', 'b'], ['a', 'c'], ['b', 'b'], ['b', 'c'], ['c', 'c'], ['a', 'a', 'a'], ['a', 'a', 'b'], ...]
     */
    static withRepetition <S>(elements: Array<S>, n: number = elements.length, m: number = n): Array<Array<S>> {
        const combinations: Array<Array<S>> = [];
        const validCombinations: Array<Array<S>> = [];

        for(const s of elements) {
            combinations.push([s]);
            if(n <= 1) {
                validCombinations.push([s]);
            }
        }

        let startIndex = 0;
        let endIndex = combinations.length;

        for(let i = 0; i < m - 1; i++) {
            for(let j = startIndex; j < endIndex; j++) {
                const c = combinations[j];

                const newCombos = [];

                for(let k = 0; k < elements.length; k++) {
                    newCombos.push([...c, elements[k]]);
                    if(c.length + 1 >= n && c.length - 1 <= m) {
                        validCombinations.push([...c, elements[k]]);
                    }
                }

                combinations.push(...newCombos);
            }

            startIndex = endIndex;
            endIndex = combinations.length;
        }

        return validCombinations;
    };
}
