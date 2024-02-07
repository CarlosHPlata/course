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

type State = { rolls: number[] } 
const INITIAL_STATE: State = { rolls: [] }  

export const createBowlingGame = (state: State = INITIAL_STATE) => Object.freeze({
  roll: (pins: number) => roll(pins, state),
  score: () => getScore(state)
});

const roll = (pins: number, state: State) => {
  const newState = { rolls: [...state.rolls, pins] }
  return createBowlingGame(newState)
}

const getScore = (state: State) => {
  const FRAMES = 10
  let score = 0
  let firstTry = 0
  for (let i = 0; i < FRAMES; i++) {
    if (isStrike(firstTry, state)) {
      score = scoreForStrike(firstTry, state)
      firstTry++
    } else if (isSpare(firstTry, state)) {
      score += scoreForSpare(firstTry, state)
      firstTry += 2
    } else {
      score += scoreForFrame(firstTry, state)
      firstTry += 2
    }
  }
  return score;
}

function scoreForStrike(firstTry: number, state: State) {
  return 10 + state.rolls[firstTry + 1] + state.rolls[firstTry + 2];
}

function isStrike(firstTry: number, state: State) {
  return state.rolls[firstTry] == 10;
}

function scoreForFrame(firstTry: number, state: State) {
  return state.rolls[firstTry] + state.rolls[firstTry + 1];
}

function isSpare(firstTry: number, state: State) {
  return state.rolls[firstTry] + state.rolls[firstTry + 1] == 10;
}

function scoreForSpare(firstTry: number, state: State) {
  return 10 + state.rolls[firstTry + 2];
}

export type BowlingGame =  ReturnType<typeof createBowlingGame>;
