import { pokemonMock } from '@test/pokemon/mocks/pokemon.mock'
import { Gender, Move } from '../../../../src/pokemon'
import * as Utils from '../utils/math.utils'
import {
  getBaseData,
  getPokemonMoves,
  getPokemonStats,
  MAX_SHINY_PROBABILITY,
  SHINY_PROBABILITY,
} from './pokemon.usecase'

describe('Testing pokemon usecases', () => {
  const randomGenFn = jest.fn(() => 1)
  beforeEach(() => {
    jest.spyOn(Utils, 'getRandomInt').mockImplementation(randomGenFn)
  })

  afterEach(() => {
    randomGenFn.mockClear()
  })

  describe('when creating the pokemon base data', () => {
    it('should return a gender', async () => {
      randomGenFn.mockImplementationOnce(() => 6)
      const res1 = await getBaseData()

      randomGenFn.mockImplementationOnce(() => 0)
      const res2 = await getBaseData()

      expect(res1.gender).toBe(Gender.MALE)
      expect(res2.gender).toBe(Gender.FEMALE)
    })

    it(`should return a shiny pokemon with ${SHINY_PROBABILITY} in ${MAX_SHINY_PROBABILITY}`, async () => {
      randomGenFn.mockImplementationOnce(() => 1)
      const base = await getBaseData()

      expect(base.isShiny).toBeTruthy()
    })
  })

  describe('when creating the pokemon moves', () => {
    const moves: Move[] = [
      {
        name: 'test1',
        level: 1,
      },
      {
        name: 'test2',
        level: 0,
      },
      {
        name: 'test3',
        level: 0,
      },
      {
        name: 'test4',
        level: 0,
      },
      {
        name: 'test5',
        level: 0,
      },
    ]

    it('should return a list between 1 to 4 pokemon moves from lvl0', async () => {
      randomGenFn.mockImplementationOnce(() => 2)
      randomGenFn.mockImplementationOnce(() => 0)
      randomGenFn.mockImplementationOnce(() => 0)
      randomGenFn.mockImplementationOnce(() => 0)

      const movesRes = await getPokemonMoves(moves)

      expect(movesRes[0]).toEqual(moves[1])
      expect(movesRes[1]).toEqual(moves[2])
      expect(movesRes[2]).toEqual(moves[3])
      expect(movesRes[3]).toBeNull()
    })
  })

  describe('when calling the getPokemonStats', () => {
    it('should build the pokemon stats', async () => {
      randomGenFn.mockImplementation(() => 0)
      const { stats } = pokemonMock

      const res = await getPokemonStats(stats)

      expect(res.hp.base).toBe(stats.hp.base)
      expect(res.hp.maxEvs).toBe(0)

      expect(res.attack.base).toBe(stats.attack.base)
      expect(res.attack.maxEvs).toBe(0)

      expect(res.defense.base).toBe(stats.defense.base)
      expect(res.defense.maxEvs).toBe(0)

      expect(res.specialAttack.base).toBe(stats.specialAttack.base)
      expect(res.specialAttack.maxEvs).toBe(0)

      expect(res.specialDefense.base).toBe(stats.specialDefense.base)
      expect(res.specialDefense.maxEvs).toBe(0)

      expect(res.speed.base).toBe(stats.speed.base)
      expect(res.speed.maxEvs).toBe(0)
    })
  })
})
