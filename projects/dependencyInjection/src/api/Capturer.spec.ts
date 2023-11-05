import { Capturer } from './Capturer'
import { TrainerRepository } from './TrainerRepository'
import { Gender, Pokemon } from './dtos/pokemon.dto'
import * as Utils from './utils'

jest.mock('./utils', () => ({
  __esModule: true,
  ...jest.requireActual('./utils')
}))

class TrainerRepositoryMock implements TrainerRepository {

  async capturePokemon() {
    const pokemon: Pokemon = { ...GarchompMock, pcId: 1 }
    return await Promise.resolve(pokemon)
  };

}

describe('Testing Capturer', () => {

  let capturer: Capturer
  let randomHitterMock: jest.SpyInstance

  beforeEach(() => {
    capturer = new Capturer(new TrainerRepositoryMock())
    randomHitterMock = jest.spyOn(Utils, 'getRandomHit')
  })

  it('should return false if pokemon can\'t be captured', async () => {
    randomHitterMock.mockReturnValue(-1)

    const result = await capturer
      .withId(1)
      .tryCapture(GarchompMock)

    expect(result.captured).toBeFalsy()
  })

  it('should return true and id if pokemon is captured', async () => {
    randomHitterMock.mockReturnValue(1)

    const result = await capturer
      .withId(1)
      .tryCapture(GarchompMock)

    expect(result.captured).toBeTruthy()
    expect(result.pcId).toBe(1)
  })

  it('should throw error if trainer id is not passed and pokemon is caputred', async () => {
    expect.assertions(1)
    randomHitterMock.mockReturnValue(1)

    try {
      await capturer.tryCapture(GarchompMock)
    } catch (e) {
      expect((e as Error).message).toBe('trainer id not defined')
    }
  })

})


export const GarchompMock: Pokemon = {
  id: 445,
  pokedexNumber: 570,
  name: 'garchomp',
  weight: 950,
  height: 19,
  isShiny: false,
  gender: Gender.MALE,
  customName: 'myPokemon',
  types: ['dragon', 'ground'],
  sprite:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/445.png',
  stats: {
    hp: {
      base: 108,
      maxEvs: 0
    },
    attack: {
      base: 130,
      maxEvs: 3
    },
    defense: {
      base: 95,
      maxEvs: 0
    },
    specialAttack: {
      base: 80,
      maxEvs: 0
    },
    specialDefense: {
      base: 85,
      maxEvs: 0
    },
    speed: {
      base: 102,
      maxEvs: 0
    }
  },
  moves: [
    { name: 'swords-dance', level: 0 },
    { name: 'cut', level: 0 },
    { name: 'sand-attack', level: 1 },
    { name: 'headbutt', level: 0 }
  ]
}
