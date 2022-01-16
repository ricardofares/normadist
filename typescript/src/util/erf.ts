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
export function erf(x: number): number {
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
