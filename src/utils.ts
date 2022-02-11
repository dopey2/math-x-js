
export default class Utils {
    /**
   * GCD = Greatest common divisor
   * ex: gcd(15, 20) = 25
   */
    static gcd = (a: number, b: number): number => {
        if (a === 0) {
            return b;
        }

        return Utils.gcd(b % a, a);
    };


    static lcm = (a: number, b: number) => {
        return (a * b) / Utils.gcd(a, b);
    };
}