import { factorial } from './factorial'

/**
 * Represents the type of a {@link ErrorFunction} that represents
 * a function receiving as argument a value x and returns the erf(x).
 */
export type ErrorFunction = (x: number) => number

/**
 * The error function formula approximation by a Taylor Polynomial with
 * a specified degree that receives a floating-pointer number x and returns
 * an approximation for the value erf(x).
 *
 * If the degree is not specified, then the default degree is set to 15.
 *
 * The approximation of erf(x) by this function is higher as the degree is.
 *
 * @param {Number} x the function argument
 * @param {Number} degree the Taylor Polynomial degree, the default degree
 *                        is set to 15.
 *
 * @returns {Number} an approximation using Taylor Polynomial for the value of erf(x).
 */
export function taylorErf(x: number, degree: number = 15): number {
  const a: number = 1.1283791670955126 * x
  let b: number = 0

  for (let index = 0; index <= degree; index++) {
    const t: number = index << 1
    const s: number = Math.pow(-1, index)

    b += (s * Math.pow(x, t)) / (factorial(index) * (t + 1))
  }

  return a * b
}
