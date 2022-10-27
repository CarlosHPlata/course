// El teorema de factores primos (prime factors) dice que cualquier numero
// entero natural puede ser expresado como producto de dos o mas
// numeros primos.
//
// Escriba una funcion que reciba un numero entero y devuelva un Array
// que contenga todos los prime factors

export const primeFactors = (num: number) => {
  const result = []

  let current = 2
  while (num >= 2) {
    if (num % current === 0) {
      result.push(current)
      num /= current
    } else {
      current++
    }
  }

  // for (let current = 2; current <= num; current++) {
  //   for (; num % current === 0; num /= current) {
  //     result.push(current)
  //   }
  // }
  return result
}
