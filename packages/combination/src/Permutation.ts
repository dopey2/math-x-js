/**
 * Use to generate permutation.
 */
export default class Permutation {


    /**
     * Generates all possible permutations without repetition of a given array of elements,
     * with the option to specify the minimum (n) and maximum (m) lengths of the generated permutations.
     * The maximum must be less or equal to the number of elements.
     *
     * @template S - The type of the elements in the input array.
     * @param {Array<S>} elements - The input array containing the elements to generate permutations for.
     * @param {number} [n=elements.length] - The minimum length of the generated permutations (inclusive).
     * @param {number} [m=n] - The maximum length of the generated permutations (inclusive).
     * @param {Array<S>} [combo=[]] - An optional array to store the current combination during recursion.
     * Should not be provided when calling the function initially.
     * @returns {Array<Array<S>>} - An array of arrays, where each inner array is a permutation of the input elements.
     */
    private static generatePermutation <S>(
        elements: Array<S>,
        n: number = elements.length,
        m: number = n,
        combo: Array<S> = []
    ) {
        const results: Array<Array<S>> = [];

        for(let i = 0; i < elements.length; i++) {
            const element = elements[i];
            const rest = [...elements.slice(0, i), ...elements.slice(i + 1, elements.length)];
            combo.push(element);

            if(combo.length >= n && combo.length <= m) {
                results.push([...combo]);
            }
            if(combo.length <= m) {
                results.push(...Permutation.generatePermutation(rest, n, m, combo));
            }

            combo.pop();
        }

        return results;
    }

    /**
     * Generates all possible permutations without repetition of a given array of elements, with the option to specify
     * the minimum (n) and maximum (m) lengths of the generated permutations.
     *
     * @template S - The type of the elements in the input array.
     * @param {Array<S>} elements - The input array containing the elements to generate permutations for.
     * @param {number} [n=elements.length] - The minimum length of the generated permutations (inclusive).
     * @param {number} [m=n] - The maximum length of the generated permutations (inclusive).
     * @returns {Array<Array<S>>} - An array of arrays, where each inner array is a permutation of the input elements.
     */
    static withoutRepetition <S>(elements: Array<S>, n: number = elements.length, m: number = n) {
        const result = Permutation.generatePermutation(elements, n, m, []);
        return result.sort((a, b) => a.length - b.length);
    }

    /**
     * Generates all possible permutations with repetition of a given array of elements, with the option to specify
     * the minimum (n) and maximum (m) lengths of the generated permutations.
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
