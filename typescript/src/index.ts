import { ErrorFunction } from './erf'

export default class NormalDistribution {
  /**
   * The normal distribution's mean.
   */
  private readonly mean: number

  /**
   * The normal distribution's standard deviation.
   */
  private readonly standardDeviation: number

  /**
   * The error function approximation that will be used
   * to approximate the value of erf(x).
   */
  private readonly erf: ErrorFunction

  /**
   * Default constructor of {@link NormalDistribution} that defines the normal
   * distribution's mean, standard deviation and error function approximation.
   *
   * If the inserted standard deviation must be non negative. Otherwise, an
   * exception will be thrown. Moreover, if the inserted error function formula
   * approximation is undefined or null, then an exception will be thrown as well.
   *
   * Besides that, if the error function formula produces an inadequate approximation
   * then the normal distribution calculations are inadequate approximations, as well.
   * For that purpose, there are provided many error function formula approximations
   * in this library.
   *
   * @param {Number} mean the normal distribution's mean
   * @param {Number} standardDeviation the normal distribution's standard deviation
   * @param {ErrorFunction} erf the normal distribution's error function formula approximation.
   */
  constructor(mean: number, standardDeviation: number, erf: ErrorFunction) {
    if (standardDeviation < 0)
      throw `The standard deviation must be nonnegative. The inserted standard deviation was ${standardDeviation}.`
    if (erf === undefined || erf === null)
      throw `The error function formula approximation must not be undefined or null.`

    this.mean = mean
    this.standardDeviation = standardDeviation
    this.erf = erf
  }

  /**
   * Receives a floating-point number x and returns the value of the probability density function
   * from a normal distribution with {@link mean} and {@link standardDeviation} evaluated at x.
   *
   * @param {Number} x the probability density function argument
   *
   * @returns {Number} the value of the probability density function evaluated at x.
   */
  pdf(x: number): number {
    const inverseStandardDeviation: number = 1.0 / this.standardDeviation
    const a: number = 0.3989422804014327 * inverseStandardDeviation
    const b: number = Math.pow((x - this.mean) * inverseStandardDeviation, 2)
    const c: number = Math.exp(-b / 2.0)

    return a * c
  }

  /**
   * Receives a floating-point number x and returns the value of the cumulative distribution function
   * from a normal distribution with {@link mean} and {@link standardDeviation} evaluated at x.
   *
   * The cumulative distribution function, represented as cdf, when evaluated at a number x, represented
   * as cdf(x) returns the area below the probability density function pdf from the -Infinity to x.
   *
   * The charateristic of the cdf is that when the value of x is sufficiently greater than the {@link mean}
   * the cdf(x) returns a value approximately to 1, such that, if x tends to +Infinity then cdf(x) tends to 1.
   * On other hand, when the value of x is sufficiently lower than the {@link mean} the cdf(x) returns a value
   * approximately to 0, such that, if x tends to -Infinity then cdf(x) tends to 0.
   *
   * Moreover, the quantity that x must have to be sufficiently greater than {@link mean} that cdf(x) tends to 1
   * or the quantity that x must have to be sufficiently lower than {@link mean} that cdf(x) tends to 0, depdends on
   * the value of the {@link standardDeviation}.
   *
   * @param {Number} x the cumulative distribution function argument
   *
   * @returns {Number} the cumulative distribution function evaluated at x.
   */
  cdf(x: number): number {
    return (1.0 + this.erf(x * Math.SQRT1_2)) / 2.0
  }
}
