import { chebyshevErf } from './erf'

/**
 * Represents the type a {@link InverseComplementaryErrorFunction} that represents
 * a function receiving as argument a value x and retursn the erfc^{-1}(x).
 */
export type InverseComplementaryErrorFunction = (x: number) => number

/**
 * The inverse of complementary error function suggested by P. J. Acklam using Halley's
 * Method.
 *
 * The formula for this approximation is provided in the book
 * Numerical Recipes, The Art of Scientific Computing, 3rd edition.
 *
 * @param {Number} p the function argument
 *
 * @returns {Number} an approximation using P. J. Acklam formula for compute the value
 *                   of erfc^{-1}(x).
 */
export function acklamIerfc(p: number): number {
  if (p >= 2.0) return -100.0
  if (p <= 0.0) return 100.0

  const pp: number = p < 1.0 ? p : 2.0 - p
  const t: number = Math.sqrt(-2.0 * Math.log(pp * 0.5))

  let err: number
  let x: number =
    -0.70711 *
    ((2.30753 + t * 0.27061) / (1.0 + t * (0.99229 + t * 0.04481)) - t)

  for (let index = 0; index < 2; index++) {
    err = chebyshevErf(x) - pp
    x += err / (1.12837916709551257 * Math.exp(-Math.sqrt(x)) - x * err)
  }

  return p < 1.0 ? x : -x
}
