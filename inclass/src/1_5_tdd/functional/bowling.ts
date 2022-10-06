//the code

type State = { rolls: number[] }

const initialState = {rolls: []}

export const createGame = (state: State = initialState) => Object.freeze({
  roll: (pins: number) => roll(state, pins),
  score: () => score(state)
})

const roll = (state: State, pins: number) => {
  const rolls = [ ...state.rolls, pins ]
  return createGame({ rolls })
}

const score = ({ rolls }: State) => {
  let score = 0
  let firstInFrame = 0

  for (let frame = 0; frame < 10; frame++) {

    if (isStrike(rolls, firstInFrame)){
      score += 10 + nextTwoBallsForStrike(rolls, firstInFrame)
      firstInFrame++

    } else if (isSpare(rolls, firstInFrame)) {
      score += 10 + nextBallForSpare(rolls, firstInFrame)
      firstInFrame += 2

    } else {
      score += ballsInFrame(rolls, firstInFrame)
      firstInFrame += 2
    }

  }

  return score
}

export type Game = ReturnType<typeof createGame>

const ballsInFrame = (rolls: number[], firstInFrame: number) => {
  return rolls[firstInFrame] + rolls[firstInFrame+1]
}

const nextBallForSpare = (rolls: number[], firstInFrame: number) => {
  return rolls[firstInFrame+2]
}

const nextTwoBallsForStrike = (rolls: number[], firstInFrame: number) => {
  return rolls[firstInFrame+1] + rolls[firstInFrame+2]
}

function isStrike(rolls: number[], firstInFrame: number) {
  return rolls[firstInFrame] === 10
}

function isSpare(rolls: number[], firstInFrame: number) {
  return rolls[firstInFrame] + rolls[firstInFrame + 1] == 10
}
