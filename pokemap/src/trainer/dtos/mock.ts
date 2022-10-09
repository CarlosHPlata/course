import { Gender, Pokemon } from '../../pokemon'

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
