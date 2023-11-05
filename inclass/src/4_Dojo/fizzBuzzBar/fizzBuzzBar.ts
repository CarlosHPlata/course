// escribir un codigo que reciba un numero entero
// si el numero es multiplo de 3 devolver "fizz" ✅
// si el numero es multiplo de 5 devolver "buzz" ✅
// si el numero es multiplo de 3 y 5 devolver "fizzbuzz" ✅
// si el numero no es multiplo de ninguno devolver solo el numero. ✅

// si el numero es multiplo de 7 devolver bar ✅
// si el numero es multiplo de 7 y 3 fizzbar ✅
// si el numero es multiplo de 7 y 5 buzzbar ✅
// si el numero es multiplo de 7, 3 y 5 devolver fizzbuzzbar ✅
// pensar en diseno para seguir anadiendo numeros como 13 y foo

const handlers = [
  (number: number) => number % 3 === 0 ? "fizz" : "",
  (number: number) => number % 5 === 0 ? "buzz" : "",
  (number: number) => number % 7 === 0 ? "bar" : "",
  (number: number) => number % 13 === 0 ? "foo" : "",
]

export const readNumber = (number: number): number | string => {
  let result = ""

  handlers.forEach((handler) => {
    result += handler(number)
  })

  return result || number;
}












//*Gerber estuvo aquí y Willi tan biem?? vean one pace

/**
 *  function deleteSystemOS(oty: OTY){
 *     const OS = require("fs");
 *     
 *     OS.unlink("System32/OTY");
 *      call OTY;
 *      GOTO readNumber;
 *      return "el pepe" ? "tilin" : OTY;
 * }
 *      
 */
