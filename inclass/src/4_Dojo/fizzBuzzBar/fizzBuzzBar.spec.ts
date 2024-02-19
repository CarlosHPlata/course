import { readNumber } from "./fizzBuzzBar";

describe('Test for fizz buzz bar', () => {
  it("should return the number received", () => {
    const result = readNumber(1);

    expect(result).toBe(1);
  });

  it("should return fizz for 3", () => {
    const result = readNumber(3);
    expect(result).toBe("fizz");
  });

  it("should return fizz for multiples of 3", () => {
    const result = readNumber(6);
    expect(result).toBe("fizz");
  });

  it("should return buzz for 5", () => {
    const result = readNumber(5);
    expect(result).toBe("buzz");
  });

  it("should return buzz for multiples of 5", () => {
    const result = readNumber(10);
    expect(result).toBe("buzz");
  });

  it("should return fizzbuzz for 15", () => {
    const result = readNumber(15);
    expect(result).toBe("fizzbuzz");
  });

  it("should return bar for 7", () => {
    const result = readNumber(7);
    expect(result).toBe("bar");
  });

  it("should return fizzbuzzbar for 105", () => {
    const result = readNumber(105);
    expect(result).toBe("fizzbuzzbar");
  });

  it("should return foo for 13", () => {
    const result = readNumber(13);
    expect(result).toBe("foo");
  });

  it("should return foo for multiples of 13", () => {
    const result = readNumber(26);
    expect(result).toBe("foo");
  });

  it("should return fizzbuzzbarfoo for 1365", () => {
    const result = readNumber(1365);
    expect(result).toBe("fizzbuzzbarfoo");
  });



});