import {
  Gender,
  Move,
  PokemonMoves,
  PokemonStats,
} from '../../../../src/pokemon'
import { getRandomInt } from '../utils/math.utils'

export const SHINY_PROBABILITY = 1
export const MAX_SHINY_PROBABILITY = 8192
export const getBaseData = async () => {
  const gender = getRandomInt(1, 10) > 5 ? Gender.MALE : Gender.FEMALE
  const isShiny = getRandomInt(1, MAX_SHINY_PROBABILITY) === SHINY_PROBABILITY

  return {
    gender,
    isShiny,
  }
}

export const getPokemonMoves = async (
  allMoves: Move[]
): Promise<PokemonMoves> => {
  let movesLvl0 = allMoves.filter((m) => m.level === 0)
  const moves: PokemonMoves = [null, null, null, null]

  const maxMoves = getRandomInt(0, 3)
  for (let index = 0; index <= maxMoves; index++) {
    const moveIndex = getRandomInt(0, movesLvl0.length - 1)
    moves[index] = movesLvl0[moveIndex]
    movesLvl0.splice(moveIndex, 1)
  }

  return moves
}

export const getPokemonStats = async (statsData: PokemonStats) => ({
  hp: {
    base: statsData.hp.base,
    maxEvs: getRandomInt(0, statsData.hp.maxEvs),
  },
  attack: {
    base: statsData.attack.base,
    maxEvs: getRandomInt(0, statsData.attack.maxEvs),
  },
  defense: {
    base: statsData.defense.base,
    maxEvs: getRandomInt(0, statsData.defense.maxEvs),
  },
  specialAttack: {
    base: statsData.specialAttack.base,
    maxEvs: getRandomInt(0, statsData.specialAttack.maxEvs),
  },
  specialDefense: {
    base: statsData.specialDefense.base,
    maxEvs: getRandomInt(0, statsData.specialDefense.maxEvs),
  },
  speed: {
    base: statsData.speed.base,
    maxEvs: getRandomInt(0, statsData.speed.maxEvs),
  },
})
