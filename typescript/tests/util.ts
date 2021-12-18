/**
 * Receives two floating-point numbers that are the exact and the approximation values.
 * This method returns the absolute error of these values.
 *
 * @param {Number} exact the exact value
 * @param {Number} approximation the approximation value
 *
 * @returns {Number} the absolute error from difference of exact and approximation values.
 */
export function absoluteError(exact: number, approximation: number) {
  return Math.abs(exact - approximation)
}

/**
 * Receives two floating-point numbers that are the exact and the approximation values.
 * This method returns the relative error of these values.
 *
 * @param {Number} exact the exact value
 * @param {Number} approximation the approximation value
 *
 * @returns {Number} the relative error from these values
 */
export function relativeError(exact: number, approximation: number) {
  return Math.abs((exact - approximation) / exact)
}
