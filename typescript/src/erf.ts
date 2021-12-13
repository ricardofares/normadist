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
 * If the degree is not specified, then the default degree is set to 40.
 *
 * The approximation of erf(x) by this function is higher as the degree is.
 * Nevertheless, there is a maximum degree that after that one the accuracy
 * maintains constant.
 *
 * @param {Number} x the function argument
 * @param {Number} degree the Taylor Polynomial degree, the default degree
 *                        is set to 40.
 *
 * @returns {Number} an approximation using Taylor Polynomial for the value of erf(x).
 */
export function taylorErf(x: number, degree: number = 40): number {
  const a: number = 1.1283791670955126 * x
  let b: number = 0

  for (let index = 0; index <= degree; index++) {
    const t: number = index << 1
    const s: number = Math.pow(-1, index)

    b += (s * Math.pow(x, t)) / (factorial(index) * (t + 1))
  }

  return a * b
}

/**
 * The error function formula approximation by Vazquez-Leal that receives
 * a floating-point number x and returns an approximation for the value erf(x).
 *
 * The approximation for the error function is provided in their article:
 * https://www.uv.mx/personal/hvazquez/files/2012/02/124029.pdf
 *
 * The relative error bound for that approximation is: 1.88e-4. The source of
 * this information is provided in:
 * https://arxiv.org/ftp/arxiv/papers/2012/2012.04466.pdf
 *
 * @param {Number} x the function argument
 *
 * @returns {Number} an approximation using Vazquez-Leal for the value of erf(x).
 */
export function vazquezLealErf(x: number): number {
  const a: number = 11.001696879181248
  const b: number = 0.17789761643397722
  const c: number = 55.5

  return Math.tanh(a * x - c * Math.atan(b * x))
}
