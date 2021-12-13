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
}
