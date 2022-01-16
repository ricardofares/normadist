/**
 * This variable represents the maximum factorial argument
 * that can be inserted in the {@link factorial} function
 * before produces +Infinity.
 */
const MAX_FACTORIAL_ARG: number = 170

/**
 * This variable represents an array in which contains the all
 * following factorials previously calculated: 1!, 16!, 32!, 48!,
 * 64!, 80!, 96!, 112!, 128!, 144! and 160!.
 *
 * It is extremely userful the use of this table of previously
 * calculated factorial to calculate any factorial using the
 * function {@link factorial}.
 *
 * Furthermore, this array of values are provided in
 * https://github.com/google/guava/blob/master/guava/src/com/google/common/math/DoubleMath.java
 */
const everySinxteenthFactorial: number[] = [
  1.0, 2.0922789888e13, 2.631308369336935e35, 1.2413915592536073e61,
  1.2688693218588417e89, 7.156945704626381e118, 9.916779348709496e149,
  1.974506857221074e182, 3.856204823625804e215, 5.5502938327393044e249,
  4.7147236359920616e284
]

/**
 * This function receives an integer number x and returns the factorial
 * from that number, represented by x!.
 *
 * If the value of x is greater than {@link MAX_FACTORIAL_ARG}, then the
 * result is +Infinity.
 *
 * If the value of x is NaN (Not-a-Number), then the result is also a NaN.
 *
 * If the value of x is a floating-point number, then the value returned
 * by the function is the factorial of the largest integer lower than x,
 * that is, the factorial of floor(x).
 *
 * If the value of x is negative, then an exception will be thrown.
 *
 * Moreover, the implementation of this algorithm to calculate this factorial
 * is provided by the Google Guava Java API. The source of the implementation
 * is located at https://github.com/google/guava/blob/master/guava/src/com/google/common/math/DoubleMath.java.
 *
 * @param {Number} x the number in which the factorial will be calculated
 *
 * @returns {Number} the factorial from a positive integer number x
 */
export default function factorial(x: number): number {
  if (x < 0) throw `The argument must be nonnegative. The argument was ${x}.`

  const fx: number = Math.floor(x)

  if (Number.isNaN(fx)) return Number.NaN
  if (fx > MAX_FACTORIAL_ARG) return Number.POSITIVE_INFINITY

  let s: number = 1.0
  for (let index = 1 + (fx & ~0xf); index <= fx; index++) s *= index
  return s * everySinxteenthFactorial[fx >> 4]
}
