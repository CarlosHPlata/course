import { readNumber } from "./fizzBuzzBar";

describe('Test for fizz buzz bar', () => {


  it('should pass an integer', () => {
    expect(readNumber(1)).toBe(1)
  })

  it('should get fizz', () => {
    expect(readNumber(3)).toEqual('fizz');
  });

  it('should be multiple of 3 and get fizz', () => {
    expect(readNumber(6)).toEqual('fizz');
  });

  it('should get buzz', () => {
    expect(readNumber(5)).toEqual('buzz');
  });

  it('should be multiple of 5 and get buzz', () => {
    expect(readNumber(20)).toEqual('buzz');
  });

  it('should get fizzbuzz', () => {
    expect(readNumber(15)).toEqual('fizzbuzz');
  });

  it('should return bar', () => {
    expect(readNumber(14)).toEqual('bar');
  });

  it('should return fizzbuzzbar', () => {
    expect(readNumber(105)).toEqual('fizzbuzzbar');
  });

  it('should return foo', () => {
    expect(readNumber(13)).toEqual('foo');
  });

  it('should return fizzbuzzbarfoo', () => {
    expect(readNumber(1365)).toEqual('fizzbuzzbarfoo');
  });

});