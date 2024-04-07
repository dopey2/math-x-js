/**
 * Generates all the cartesian products for a given array of elements.
 *
 * @template S - The type of the elements in the input array.
 * @param {Array<S>} elements - The input array containing the elements to generate cartesian product for.
 * @returns {Array<Array<S>>} - An array of arrays, where each inner array is a cartesian product of the input elements.
 */
export default function cartesianProduct<S>(elements: Array<Array<S>>): Array<Array<S>> {
    let result:Array<Array<S>> = [[]];

    for(let i = 0; i < elements.length; i++) {
        let temp = [];
        for(let j = 0; j < elements[i].length; j++) {
            for(let k = 0; k < result.length; k++) {
                temp.push([...result[k], elements[i][j]]);
            }
        }
        result = temp;
    }

    return result;
}
