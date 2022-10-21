import { primeFactors } from './primeFactors'

describe('Testing word wrap', () => {
  it('should work with 1', () => {
    expect(primeFactors(1)).toEqual([])
  })

  it('should work with 2', () => {
    expect(primeFactors(2)).toEqual([2])
  })

  it('should work with 4', () => {
    expect(primeFactors(4)).toEqual([2, 2])
  })

  it('should work with 3', () => {
    expect(primeFactors(3)).toEqual([3])
  })

  it('should work with 1092', () => {
    expect(primeFactors(1092)).toEqual([2, 2, 3, 7, 13])
  })
})
