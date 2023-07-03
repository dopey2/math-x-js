const cppAddon = require('../../node_addons/Release/generix_cpp.node');


/**
 * Class to generate combinations with & without repetition.
 */
export default class Combination {
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
        const result: Array<Array<S>> = cppAddon.c_withoutRepetition(elements, n, m);
        return result.sort((a, b) => a.length - b.length);
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
        const result: Array<Array<S>> = cppAddon.c_withRepetition(elements, n, m);
        return result;
    }
}
