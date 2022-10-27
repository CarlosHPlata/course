import { romanNumbers } from './romanNumerals'

describe('Testing roman numerals conversion', () => {
  it('should return empty string if 0', () => {
    expect(romanNumbers(0)).toBe('')
  })
})
