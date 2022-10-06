import { Gender } from '../../../src/pokemon/dtos/metadata'
import { Pokemon } from '../../../src/pokemon/dtos/pokemon.dto'
// import IPokemonGateway from '../../../src/traveler/domain/interfaces/pokemon.gateway'

// export const pokemonGatewayMock: IPokemonGateway = {
//   generatePokemon: jest.fn(() => Promise.resolve(pokemonMock)),
// }

export const pokemonMock: Pokemon = {
  id: 445,
  pokedexNumber: 570,
  name: 'garchomp',
  weight: 950,
  height: 19,
  types: ['dragon', 'ground'],
  customName: 'garchomp',
  isShiny: false,
  gender: Gender.FEMALE,
  sprite:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/445.png',
  stats: {
    hp: {
      base: 108,
      maxEvs: 0,
    },
    attack: {
      base: 130,
      maxEvs: 3,
    },
    defense: {
      base: 95,
      maxEvs: 0,
    },
    specialAttack: {
      base: 80,
      maxEvs: 0,
    },
    specialDefense: {
      base: 85,
      maxEvs: 0,
    },
    speed: {
      base: 102,
      maxEvs: 0,
    },
  },
  moves: [
    { name: 'swords-dance', level: 0 },
    { name: 'cut', level: 0 },
    { name: 'sand-attack', level: 1 },
    { name: 'headbutt', level: 0 },
  ],
}
