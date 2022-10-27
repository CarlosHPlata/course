import { fizzBuzz } from './fizzBuzz'

describe('Testing prime factors', () => {
  it('should return the number', () => {
    const res = fizzBuzz(1)

    expect(res).toBe(1)
  })

  it('should return fizz if is factor of 3', () => {
    const fizz = fizzBuzz(3)

    expect(fizz).toBe('fizz')
  })

  it('should return buzz if is factor of 5', () => {
    const buzz = fizzBuzz(5)

    expect(buzz).toBe('buzz')
  })

  it('should return bar if is factor of 7', () => {
    const fb = fizzBuzz(7)

    expect(fb).toBe('bar')
  })

  it('should return fizzbuzz if is factor of 3 and 5', () => {
    const fb = fizzBuzz(45)

    expect(fb).toBe('fizzbuzz')
  })

  it('should return bar if is factor of 7, 3 y/o 5', () => {
    const fb = fizzBuzz(105)

    expect(fb).toBe('fizzbuzzbar')
  })

  it('should return foo if is factor of 13', () => {
    const foo = fizzBuzz(1365)

    expect(foo).toBe('fizzbuzzbarfoo')
  })
})
