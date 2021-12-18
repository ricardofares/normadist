import {
  ErrorFunction,
  chebyshevErf,
  taylorErf,
  vazquezLealErf,
  soranzoErf
} from '../src/erf'

/**
 * This array contains the all functions that represents
 * the approximation formulas for the error function erf(x).
 */
const erfs: ErrorFunction[] = [
  chebyshevErf,
  taylorErf,
  vazquezLealErf,
  soranzoErf
]

describe('checking erf(x) values', () => {
  erfs.forEach((erf) => {
    it(`must return 0 for ${erf.name}(0)`, () => {
      expect(erf(0.0)).toEqual(0.0)
    })

    if (erf !== taylorErf)
      it(`must return 1 for ${erf.name}(+Infinity)`, () => {
        expect(erf(Number.POSITIVE_INFINITY)).toEqual(1.0)
      })
  })
})
