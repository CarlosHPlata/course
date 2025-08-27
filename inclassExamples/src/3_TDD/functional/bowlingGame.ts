
export type Game = ReturnType<typeof createBowlingGame>
type State = { rolls: number[] }

const INITIAL_STATE: State = { rolls: [] }

export const createBowlingGame = (state: State = INITIAL_STATE) => Object.freeze({
  roll: (pins: number) => roll(state, pins),
  score: () => score(state),
})




function roll(state: State, pins: number) {
  const newRolls = [...state.rolls, pins]; //rolls.add(pins)

  return createBowlingGame({ rolls: newRolls })
}

function score({ rolls }: State) {
  let score = 0;
  const FRAMES = 10;
  let firstRoll = 0

  for (let frame = 0; frame < FRAMES; frame++) {
    if (isStrike(rolls, firstRoll)) {
      score += scoreForStrike(rolls, firstRoll)
      firstRoll++

    } else if (isSpare(rolls, firstRoll)) {
      score += scoreForSpare(rolls, firstRoll)
      firstRoll += 2

    } else {
      score += scoreForFrame(rolls, firstRoll)
      firstRoll += 2
    }
  }

  return score;
}



function scoreForStrike(rolls: number[], firstRoll: number) {
  return 10 + rolls[firstRoll + 1] + rolls[firstRoll + 2];
}

function isStrike(rolls: number[], firstRoll: number) {
  return rolls[firstRoll] === 10;
}

function scoreForFrame(rolls: number[], firstRoll: number) {
  return rolls[firstRoll] + rolls[firstRoll + 1];
}

function scoreForSpare(rolls: number[], firstRoll: number) {
  return 10 + rolls[firstRoll + 2];
}

function isSpare(rolls: number[], firstRoll: number) {
  return rolls[firstRoll] + rolls[firstRoll + 1] == 10;
}

