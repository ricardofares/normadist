import { erf } from '@/util/erf'

describe('checking erf(x) values', () => {
  it(`must return 0 for ${erf.name}(0)`, () => {
    expect(erf(0.0)).toEqual(0.0)
  })

  it(`must return 1 for ${erf.name}(+Infinity)`, () => {
    expect(erf(Number.POSITIVE_INFINITY)).toEqual(1.0)
  })
})
