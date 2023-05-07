
/**
 * Used to generate combinations
 */
export default class Combination {

    /**
     * The concrete implementation of the combination algorithm.
     *
     * @template S - The type of the elements in the input array.
     * @param {Array<S>} elements - The input array containing the elements to generate combination for.
     * @param {number} startIndex - The starting index for.
     * @param {Array<Array<S>>} currentCombination - The accumulated combination during the recursion.
     * @param {number} n - The minimum length of the generated combination (inclusive).
     * @param {number} m - The maximum length of the generated combination (inclusive).
     *
     * @returns {Array<Array<S>>} - An array of arrays, where each inner array is a combination of the input elements.
     */
    private static generateCombination<S>(
        elements: Array<S>,
        startIndex: number,
        currentCombination: S[],
        n: number,
        m: number
    ): Array<Array<S>> {
        const result: Array<Array<S>> = [];

        if (currentCombination.length >= n && currentCombination.length <= m) {
            result.push(currentCombination.slice());
        }

        if(currentCombination.length >= m) {
            return result;
        }

        for (let i = startIndex; i < elements.length; i++) {
            currentCombination.push(elements[i]);
            const combinations = Combination.generateCombination(elements, i + 1, currentCombination, n, m);
            combinations && result.push(...combinations);
            currentCombination.pop();
        }

        return result;
    }

    /**
     * Generates all possible combinations without repetition of a given array of elements, with the option to specify
     * the minimum (n) and maximum (m) lengths of the generated permutations.
     *
     * @template S - The type of the elements in the input array.
     * @param {Array<S>} elements - The input array containing the elements to generate combination for.
     * @param {number} [n=elements.length] - The minimum length of the generated combination (inclusive).
     * @param {number} [m=n] - The maximum length of the generated combination (inclusive).
     * @returns {Array<Array<S>>} - An array of arrays, where each inner array is a combination of the input elements.
     */
    static withoutRepetition<S>(elements: S[], n: number, m: number = n): S[][] {
        const combinations = Combination.generateCombination(elements,0, [], n, m);
        return combinations.sort((a, b) => a.length - b.length);
    }
}
