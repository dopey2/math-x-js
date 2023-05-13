
/**
 * Class to generate combinations with & without repetition.
 */
export default class Combination {

    /**
     * The concrete implementation of the combination without repetition algorithm.
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
    private static generateWithoutRepetition<S>(
        elements: Array<S>,
        startIndex: number,
        currentCombination: Array<S>,
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
            const combinations = Combination.generateWithoutRepetition(
                elements,
                i + 1,
                currentCombination,
                n,
                m
            );
            result.push(...combinations);
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
    static withoutRepetition<S>(elements: S[], n: number = elements.length, m: number = n): S[][] {
        const result = Combination.generateWithoutRepetition(elements,0, [], n, m);
        return result.sort((a, b) => a.length - b.length);
    }

    /**
     * The concrete implementation of the combination with repetition algorithm.
     *
     * @template S - The type of the elements in the input array.
     * @param {Array<S>} elements - The input array containing the elements to generate combination for.
     * @param {Array<number>} currentIndexes - The combination indexes accumulated during recursion.
     * @param {number} n - The minimum length of the generated combination (inclusive).
     * @param {number} index - The current index, initially this should be 0.
     * @param {number} startIndex - The starting index from where the combination should begin.
     *
     * @returns {Array<Array<S>>} - An array of arrays, where each inner array is a combination of the input elements.
     */
    static generateWithRepetition<S>(
        elements: S[],
        currentIndexes: number[],
        n: number,
        index: number,
        startIndex: number

    ): S[][] {

        const result = [];

        if(index === n) {
            const combo = [];
            for(let i = 0; i < n; i++) {
                combo.push(elements[currentIndexes[i]]);
            }
            return [combo];
        }

        for(let i = startIndex; i < elements.length; i++) {
            currentIndexes[index] = i;
            result.push(...Combination.generateWithRepetition(
                elements,
                currentIndexes,
                n,
                index + 1,
                i
            ));
        }

        return result;
    }

    /**
     * Generates all possible combinations with repetition of a given array of elements, with the option to specify
     * the minimum (n) and maximum (m) lengths of the generated permutations.
     *
     * @template S - The type of the elements in the input array.
     * @param {Array<S>} elements - The input array containing the elements to generate combination for.
     * @param {number} [n=elements.length] - The minimum length of the generated combination (inclusive).
     * @param {number} [m=n] - The maximum length of the generated combination (inclusive).
     * @returns {Array<Array<S>>} - An array of arrays, where each inner array is a combination of the input elements.
     */
    static withRepetition<S>(elements: S[], n: number = elements.length, m: number = n): S[][] {
        const result = [];

        for(let i = n; i <= m; i++) {
            const currentIndexes = [];

            for(let j = 0; j < i; j++) {
                currentIndexes.push(0);
            }

            result.push(...Combination.generateWithRepetition(
                elements,
                currentIndexes,
                i,
                0,
                0
            ));
        }

        return result;
    }
}
