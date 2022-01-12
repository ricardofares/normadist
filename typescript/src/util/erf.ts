import { factorial } from './factorial'

/**
 * Represents the type of a {@link ErrorFunction} that represents
 * a function receiving as argument a value x and returns the erf(x).
 */
export type ErrorFunction = (x: number) => number

/**
 * The error function approximation by the Chebyshev's Formula, receives a floating-point
 * number x and returns an approximation for the value erf(x).
 *
 * The formula for approximation function is provided in the book
 * Numerical Recipes, The Art of Scientific Computing, 3rd edition.
 *
 * The relative error bound for that approximation is: 1.2e-7. The source of that
 * information is in the book cited above, as well.
 *
 * @param {Number} x the function argument
 *
 * @returns {Number} an approximation using Chebyshev's Formula for the value of erf(x)
 */
export function chebyshevErf(x: number): number {
  if (x === 0.0) return 0.0

  const z: number = Math.abs(x)
  const t: number = 2.0 / (2.0 + z)
  const r: number =
    t *
    Math.exp(
      -z * z -
        1.26551223 +
        t *
          (1.00002368 +
            t *
              (0.37409196 +
                t *
                  (0.09678418 +
                    t *
                      (-0.18628806 +
                        t *
                          (0.27886807 +
                            t *
                              (-1.13520398 +
                                t *
                                  (1.48851587 +
                                    t * (-0.82215223 + t * 0.17087277))))))))
    )

  return x >= 0 ? 1 - r : r - 1
}

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
 *                        is set to 40
 *
 * @returns {Number} an approximation using Taylor Polynomial for the value of erf(x)
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
 * The error function approximation by the Vazquez-Leal's Formula, receives
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
 * @returns {Number} an approximation using Vazquez-Leal for the value of erf(x)
 */
export function vazquezLealErf(x: number): number {
  const a: number = 11.001696879181248
  const b: number = 0.17789761643397722
  const c: number = 55.5

  return Math.tanh(a * x - c * Math.atan(b * x))
}

/**
 * The error function approximation by the Soranzo's Formula, receives a floating-point
 * number x and returns an approximation for the value erf(x).
 *
 * The approximation for the error function is provided in the following article:
 * https://arxiv.org/pdf/1201.1320v1.pdf
 *
 * The relative error bound for that approximation is: 1.21e-4. The source of this
 * information is provided is the article above, as well.
 *
 * @param {Number} x the function argument
 *
 * @returns {Number} an approximation using Soranzo's formula for the value of erf(x)
 */
export function soranzoErf(x: number): number {
  const x2 = x * x
  const x4 = x2 * x2

  if (x4 === Infinity) return 1.0

  const a: number = 1.2735457
  const b: number = 0.1487936
  const c: number = 0.1480931
  const d: number = 5.16e-4

  const f: number = Math.sqrt(
    1 - Math.exp((-x2 * (a + b * x2)) / (1 + c * x2 + d * x4))
  )

  /* Note: The Soranzo's formula approximates the error function only for the nonnegative */
  /* values, then since the error function has the property that erf(-x) = -erf(x), we use */
  /* that property to extend the formula approximation for the negative values. */
  return x >= 0 ? f : -f
}