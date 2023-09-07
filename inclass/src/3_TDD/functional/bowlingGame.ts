
type State = { pins: number[] }
const INITIAL_STATE: State = { pins: [] }

export const createBowlingGame = (state: State = INITIAL_STATE) => ({

  roll: (pins: number) => roll(state, pins),
  score: () => score(state),

})

const roll = (state: State, pins: number) => {
  return createBowlingGame({ pins: [...state.pins, pins] })
}

const score = ({ pins }: State) => {
  const FRAMES = 10
  let score = 0
  let firstRoll = 0

  for (let i = 0; i < FRAMES; i++) {

    if (isStrike(pins, firstRoll)) {
      score += scoreForStrike(pins, firstRoll)
      firstRoll += 1

    } else if (isSpare(pins, firstRoll)) {
      score += scoreForSpare(pins, firstRoll)
      firstRoll += 2

    } else {
      score += scoreForFrame(pins, firstRoll)
      firstRoll += 2

    }

  }

  return score
}

export type Game = ReturnType<typeof createBowlingGame>

function scoreForStrike(pins: number[], firstRoll: number) {
  return 10 + pins[firstRoll + 1] + pins[firstRoll + 2]
}

function isStrike(pins: number[], firstRoll: number) {
  return pins[firstRoll] === 10
}

function scoreForFrame(pins: number[], firstRoll: number) {
  return pins[firstRoll] + pins[firstRoll + 1]
}

function scoreForSpare(pins: number[], firstRoll: number) {
  return 10 + pins[firstRoll + 2]
}

function isSpare(pins: number[], firstRoll: number) {
  return pins[firstRoll] + pins[firstRoll + 1] === 10
}
