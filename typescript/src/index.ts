import { ErrorFunction, chebyshevErf } from './erf'

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
   * The default error function set for this constructor is the Chebyshev's approximation.
   * For more information, see the documentation of {@link chebyshevErf}.
   *
   * @param {Number} mean the normal distribution's mean
   * @param {Number} standardDeviation the normal distribution's standard deviation
   * @param {ErrorFunction} erf the normal distribution's error function formula approximation.
   */
  constructor(
    mean: number,
    standardDeviation: number,
    erf: ErrorFunction = chebyshevErf
  ) {
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
    return (
      (1.0 +
        this.erf(((x - this.mean) / this.standardDeviation) * Math.SQRT1_2)) /
      2.0
    )
  }

  /**
   * Receives two values that represents the minimum and maximum bound of a real, closed interval and returns
   * the probability of a normally distributed aleatory variable is in there.
   *
   * The value returned by this function is calculated using the {@link cdf} and since the {@link cdf} is calculated
   * using the {@link erf}, then the use of a {@link erf} function can affect the significant digits of accuracy of
   * the returned value.
   *
   * If the interval is degenerated, that is, the minimum and the maximum bound are equal, the returned value is 0.
   * Analytically, the probability between two values is the bounds of integration of the probability density function
   * pdf, since the bounds are equals, then by basic integral calculus property the result value is 0. On other hand,
   * graphically that integral represents the area below the pdf curve, and the area below a single point degenerates to 0.
   *
   * Moreover, if the interval is empty, that is, the start interval is greater than the end interval, the returned value
   * is 0, because there is not any value that the normally distributed aleatory variable could have.
   *
   * @param {Number} startInterval the minimum bound of a real, closed interval
   * @param {Number} endInterval the maximum bound of real, closed interval
   *
   * @returns {Number} the probability of a normally distributed aleatory variable is located at that interval.
   */
  between(startInterval: number, endInterval: number): number {
    /* Check if the interval [s, e] is degenerated or its empty. */
    if (startInterval >= endInterval) return 0

    return this.cdf(endInterval) - this.cdf(startInterval)
  }
}
