/* Remember that all your functions have to respect the functional programming rules:
 *  - 🔥 Pure functions and side effects 
 *  - 🔥 First class functions & higher order functions
 *  - 🔥 Immutability ⚠️
 *  - 🔥 Composition 
 *
 * See more info here: 
 * https://www.learningjournal.guru/courses/scala/scala-programming-foundation/elements-of-functional-programming-1/
 * 
 * I'm putting a warning in Immutability to remember you that every time you try
 * to change the state var... just be carefull...⚠️
 */

type State = { /* put params if needed */ }
const INITIAL_STATE: State = {}

export const createBowlingGame = (state: State = INITIAL_STATE) => Object.freeze({
  //myFunction: () => callInnerModuleScopeFunction()
  //myOhterFunction: (...) => myOtherFunction(...)
})

//const myOtherFunction = (...) => {...}