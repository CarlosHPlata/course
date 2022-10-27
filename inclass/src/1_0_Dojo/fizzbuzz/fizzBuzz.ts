// escribir un codigo que reciba un numero entero
// si el numero es multiplo de 3 devolver fizz
// si el numero es multiplo de 5 devolver buzz
// si el numero es multiplo de 3 y 5 devolver fizzbuzz
// si el numero no es multiplo de ninguno devolver solo el numero.

const factors = [
  [3, 'fizz'],
  [5, 'buzz'],
  [7, 'bar'],
  [13, 'foo'],
]

const isDivisible = (x) => (y) => x % y === 0

const appendIfIsDivisible = (num) => (str) => (factor) =>
  isDivisible(num)(factor) ? str : ''

export const fizzBuzz = (num: number) => {
  const appendIfIsDivisibleOfN = appendIfIsDivisible(num)
  return (
    factors.reduce(
      (acc: string, [factor, str]: [number, string]) =>
        acc + appendIfIsDivisibleOfN(str)(factor),
      ''
    ) || num
  )
}
