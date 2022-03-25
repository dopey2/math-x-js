
/**
 * Utils class.
 */
export default class Utils {
    /**
     * Find the greatest common divisor.
     *
     * @example gcd(15, 20) = 5.
     *
     * @param {number} a A number.
     * @param {number} b A number.
     * @returns {number} The gcd.
     */
    static gcd = (a: number, b: number): number => {
        if (a === 0) {
            return b;
        }

        return Utils.gcd(b % a, a);
    };

    /**
     * Find the least common multiple.
     *
     * @example lcm(3, 4) = 12.
     * @example lcm(5, 10) = 10.
     *
     * @param {number} a A number.
     * @param {number} b A number.
     * @returns {number} The lcm.
     */
    static lcm = (a: number, b: number) => {
        return (a * b) / Utils.gcd(a, b);
    };
}
