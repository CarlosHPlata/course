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

type State = {
  rolls: number[];
};

const MAX_FRAMES = 10;

const INITIAL_STATE: State = {
  rolls: [],
};

export const createBowlingGame = (state: State = INITIAL_STATE) =>
  Object.freeze({
    roll: (pins: number) => roll(state, pins),
    getScore: () => getScore(state),
  });

const roll = (state: State, pins: number) => {
  return createBowlingGame({ rolls: [...state.rolls, pins] });
};

const getScore = ({ rolls }: State) => {
  let score = 0;
  let firstTry = 0;

  for (let frame = 0; frame < MAX_FRAMES; frame++) {
    if (isStrike(rolls, firstTry)) {
      score += calculateScoreForStrike(rolls, firstTry);
      firstTry += 1;
    } else if (isSpare(rolls, firstTry)) {
      score += calculateScoreForSpare(rolls, firstTry);
      firstTry += 2;
    } else {
      score += calculateScoreForFrame(rolls, firstTry);
      firstTry += 2;
    }
  }

  return score;
};

const calculateScoreForStrike = (rolls: number[], attempt: number) => {
  return 10 + rolls[attempt + 1] + rolls[attempt + 2];
};

const calculateScoreForSpare = (rolls: number[], attempt: number) => {
  return 10 + rolls[attempt + 2];
};

const calculateScoreForFrame = (rolls: number[], attempt: number) => {
  return rolls[attempt] + rolls[attempt + 1];
};

const isSpare = (rolls: number[], attempt: number) => {
  return rolls[attempt] + rolls[attempt + 1] == 10;
};

const isStrike = (rolls: number[], attempt: number) => {
  return rolls[attempt] == 10;
};
