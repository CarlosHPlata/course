import {
  buildPokemon,
  Gender,
  Move,
  PokemonBaseData,
  PokemonMoves,
  PokemonStats,
} from 'src/pokemon'
import { GarchompMock } from '../dtos/mock'
import { getRandomInt } from '../utils/math.utils'

export const generateRandomPokemon = (id: number) => {
  return GarchompMock
}

///--------------------
///--------------------
///--------------------
const generateRandomGender = () =>
  getRandomInt(1, 10) > 5 ? Gender.MALE : Gender.FEMALE

const canBeRandomShiny = () => {
  const SHINY_PROBABILITY = 1
  const MAX_SHINY_PROBABILITY_HIT = 8192

  return getRandomInt(1, MAX_SHINY_PROBABILITY_HIT) === SHINY_PROBABILITY
}

const generateRandomSetOfMoves = (
  allPokemonMoves: Move[]
): Promise<PokemonMoves> => {
  let movesInLvl0 = allPokemonMoves.filter((m) => m.level === 0)
  const moves: PokemonMoves = [null, null, null, null]

  const maxMoves = getRandomInt(0, 3)
  for (let index = 0; index <= maxMoves; index++) {
    const moveIndex = getRandomInt(0, movesInLvl0.length - 1)
    moves[index] = movesInLvl0[moveIndex]
    movesInLvl0.splice(moveIndex, 1)
  }

  return Promise.resolve(moves)
}

const generateRandomStats = (statsData: PokemonStats): Promise<PokemonStats> =>
  Promise.resolve({
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
