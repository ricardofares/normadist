import { ErrorFunction, erf as chebyshevErf } from '../util/erf'
import { InverseComplementaryErrorFunction, acklamIerfc } from '../util/ierf'

export class NormalDistribution {
  /**
   * The normal distribution's mean.
   */
  readonly mean: number

  /**
   * The normal distribution's standard deviation.
   */
  readonly standardDeviation: number

  /**
   * The error function approximation that will be used
   * to approximate the value of erf(x).
   */
  readonly erf: ErrorFunction

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
   * The default mean is set to 0 and the default standard deviation is set to 1.
   *
   * The default error function set for this constructor is the Chebyshev's approximation.
   * For more information, see the documentation of {@link chebyshevErf}.
   *
   * @param {Number} [mean] the normal distribution's mean
   * @param {Number} [standardDeviation] the normal distribution's standard deviation
   * @param {ErrorFunction} [erf] the normal distribution's error function formula approximation
   *
   * @throws an exception if the mean or standard deviation is NaN (not-a-number), if the standard deviation
   *         is not positive and finally if the error function approximation is undefined or null
   */
  private constructor(
    mean: number = 0.0,
    standardDeviation: number = 1.0,
    erf: ErrorFunction = chebyshevErf
  ) {
    if (Number.isNaN(mean)) throw 'The mean must be a number.'
    if (Number.isNaN(standardDeviation))
      throw new Error('The standard deviation must be a number')

    if (standardDeviation <= 0)
      throw new Error(
        `The standard deviation must be positive. The inserted standard deviation was ${standardDeviation}.`
      )
    if (erf === undefined || erf === null)
      throw new Error(
        `The error function formula approximation must not be undefined or null.`
      )

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
   * @returns {Number} the value of the probability density function evaluated at x
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
   * @returns {Number} the cumulative distribution function evaluated at x
   */
  cdf(x: number): number {
    return (1.0 + this.erf(this.standardize(x) * Math.SQRT1_2)) / 2.0
  }

  /**
   * Receives a floating-point number x and returns the value of the inverse of cumulative distribution function
   * from a normal distribution with {@link mean} and {@link standardDeviation} evaluated at x.
   *
   * The inverse of cumulative distribution function, also is called as quantile function, percentile function and
   * percent-point function.
   *
   * The inverse of cumulative distribution function is used to return the value p for a normally distributed random
   * variable with these {@link mean} and {@link standardDeviation}, such that, the area below the graphic of the
   * probability density function is equals to x.
   *
   * Besides that, this method provides a way to provide the approximation for the Inverse of Complementary Error Function
   * that is used to calculate the inverse of cumulative distribution function. Thus, the accuracy of the approximation for
   * the ppf is relative to the approximation provided for the ierfc. That said, the default inverse of complementary error
   * function used is {@link acklamIerfc}.
   *
   * @param {Number} x the inverse of cumulative distribution function argument
   * @param {Number} ierfc the inverse of complementary error approximation function
   *
   * @returns {Number} the inverse of cumulative distribution function evaluated at x
   */
  ppf(
    x: number,
    ierfc: InverseComplementaryErrorFunction = acklamIerfc
  ): number {
    return this.mean - this.standardDeviation * Math.SQRT2 * ierfc(2.0 * x)
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
   * @returns {Number} the probability of a normally distributed aleatory variable is located at that interval
   */
  between(startInterval: number, endInterval: number): number {
    /* Check if the interval [s, e] is degenerated or it is empty. */
    if (startInterval >= endInterval) return 0

    return this.cdf(endInterval) - this.cdf(startInterval)
  }

  /**
   * Receives a floating-point number x and returns the standardized value z.
   *
   * For instance, the standardization process is used to simplify the calculation of the value of the cumulative
   * distribution function cdf(x), then instead of calculate directly the cdf(x), supposing that the random variable
   * X is not a standard normal distribution. Hence, the value of x is standardized for a value z and then we have a
   * standard normal distribution, such that, the calculation of cdf(z) is easier than cdf(x).
   *
   * @param {Number} x the number that will be standardized
   *
   * @returns {Number} the standardized x number
   */
  standardize(x: number): number {
    return (x - this.mean) / this.standardDeviation
  }

  /**
   * Returns a normally distributed pseudorandom generated number, such that, the normal distribution
   * has these parameters as {@link mean} and {@link standardDeviation}.
   *
   * This method is implemented using the Marsaglia Polar Method that does not require the computations
   * of cosine and sine functions.
   *
   * @returns a normally distributed pseudorandom generated number
   */
  random(): number {
    let u: number
    let v: number
    let r: number

    do {
      u = Math.random() * 2.0 - 1
      v = Math.random() * 2.0 - 1
      r = u * u + v * v
    } while (r === 0 || r >= 1)

    return (
      this.mean +
      this.standardDeviation * v * Math.sqrt((-2.0 * Math.log(r)) / r)
    )
  }

  /**
   * Returns the variance of the normal distribution
   * @returns the variance of the normal distribution
   */
  variance(): number {
    return this.standardDeviation * this.standardDeviation
  }

  /**
   * Returns an instance of a standard {@link NormalDistribution}.
   *
   * A standard normal distribution represents a normal distribution that has its {@link mean} set as 0 and the
   * {@link standardDeviation} set as 1.
   *
   * Moreover, can be set an approximation for the {@link ErrorFunction} that will be used to calculate the probabilities
   * from the standard normal distribution.
   *
   * @param {ErrorFunction} [erf] the error function approximation. If this argument is not set, then the default error
   *                            function approximation that will be set is that defined at {@link NormalDistribution}
   *                            default constructor
   *
   * @returns an instance of a standard {@link NormalDistribution}
   */
  static standard(erf?: ErrorFunction): NormalDistribution {
    return new NormalDistribution(0.0, 1.0, erf)
  }

  /**
   * Returns an instance of {@link NormalDistributio} with {@link mean}, {@link standardDeviation} and {@link ErrorFunction}
   * possible to be specified.
   *
   * If the {@link mean}, {@link standardDeviation} or {@link ErrorFunction} has been not specified, then the default values
   * set to them are specified by the {@link NormalDistribution}'s default constructor.
   *
   * @param {Number} [mean] the normal distribution's mean
   * @param {Number} [standardDeviation] the normal distribution's standard deviation
   * @param {ErrorFunction} [erf] the normal distribution's error function formula approximation
   *
   * @returns an instance of {@link NormalDistribution}
   */
  static of(
    mean?: number,
    standardDeviation?: number,
    erf?: ErrorFunction
  ): NormalDistribution {
    return new NormalDistribution(mean, standardDeviation, erf)
  }

  /**
   * Returns true if the continous random variable with the given cumulative distribution function, mean and standard deviation
   * is normally distributed. Otherwise, returns false.
   *
   * Furthermore, there is a tolerance that can be adjusted; the default value for that is 1e-2.
   *
   * @param {Function} cdf the cumulative distribution function
   * @param {Number} mean the mean
   * @param {Number} standardDeviation the standard deviation
   * @param {Number} [tolerance] the tolerance. The default value is 0.5e-2
   *
   * @returns  true if the continous random variable with the given cumulative distribution function, mean and standard deviation
   *           is normally distributed. Otherwise, returns false
   *
   * @throws an exception if the mean or if the standard deviation is NaN (not-a-number) and finally if the standard deviation
   *         is not a positive number
   */
  static isNormalDistributed(
    cdf: (x: number) => number,
    mean: number,
    standardDeviation: number,
    tolerance: number = 0.5e-2
  ): boolean {
    if (Number.isNaN(mean)) throw new Error('The mean must be a number')
    if (Number.isNaN(standardDeviation))
      throw new Error('The standard deviation must be a number')
    if (standardDeviation <= 0)
      throw new Error('The standard deviation must be positive')

    const insideFirstStandardDeviation: number =
      cdf(mean + standardDeviation) - cdf(mean - standardDeviation)

    if (
      Math.abs(insideFirstStandardDeviation - 0.6826894772086507) >= tolerance
    )
      return false

    const insideSecondStandardDeviation: number =
      cdf(mean + 2 * standardDeviation) - cdf(mean - 2 * standardDeviation)

    if (
      Math.abs(insideSecondStandardDeviation - 0.954499740219751) >= tolerance
    )
      return false

    const insideThirdStandardDeviation: number =
      cdf(mean + 3 * standardDeviation) - cdf(mean - 3 * standardDeviation)

    if (
      Math.abs(insideThirdStandardDeviation - 0.9973002038534888) >= tolerance
    )
      return false

    return true
  }
}
